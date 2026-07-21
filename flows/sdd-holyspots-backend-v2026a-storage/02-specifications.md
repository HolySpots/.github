# Specifications: HolySpots Backend v2026a Storage (Legacy Static Paths)

> Version: 1.0  
> Status: DRAFT  
> Last Updated: 2026-07-17  
> Requirements: [01-requirements.md](./01-requirements.md)

## Overview

Добавляем в `app/holyspots-backend-v2026a/node/` два компонента:

1. **Legacy static routes** — Express routes `GET /Images/*`, `/Maps/*`, `/downloads/*` (и lowercase/alias варианты), которые отвечают **HTTP 302** на public URL Supabase Storage через proxy `https://sb.productmind.ru`.
2. **Path normalization utility** — единый модуль конвертации Supabase paths ↔ legacy paths, используемый в API v2012 transformers и upload handlers.

Мобильные клиенты v2012 не меняются. Они по-прежнему запрашивают `{HOST}/Images/...` и следуют redirect.

## Decisions (from requirements approval)

| Question | Decision |
|----------|----------|
| Subfolder mapping | **Flatten** — `holyspots/spots/{id}/file.jpg` → `/Images/file.jpg` |
| Case sensitivity | **Both** — `/Images/` + `/images/`, `/Maps/` + `/maps/`, `/Downloads/` + `/downloads/` |
| Review photo sizes | **Pre-generated in Storage** — `/Images/180/...`, `/Images/1242/...`, `/Images/...` |
| `map.bin` | **Already in Storage** at `downloads/map.bin` (or bucket root — resolve at implementation) |
| Delivery strategy | **302 redirect** to `https://sb.productmind.ru/storage/v1/object/public/holyspots/{key}` |

## Affected Systems

| System | Impact | Notes |
|--------|--------|-------|
| `node/src/index.js` | Modify | Mount legacy static routes before API |
| `node/src/routes/legacyStorage.js` | Create | 302 redirect handlers |
| `node/src/utils/legacyPathUtils.js` | Create | Path conversion + storage key resolution |
| `node/src/services/storageService.js` | Modify | Reuse `PROXY_BASE_URL`, `BUCKET_NAME`; add redirect URL builder |
| `node/src/transformers/v2012/*.js` | Modify | Normalize all photo/file paths in API responses |
| `node/src/routes/v2012/reviews.js` | Modify | Store legacy-compatible paths on upload; normalize in response |
| `node/src/docs/v2012.yaml` | Modify | Document legacy static routes |

**Out of scope:** v2026 API, mobile apps, admin UI, Supabase bucket migration.

## Architecture

### Component Diagram

```
Mobile App v2012
    │
    ├─ GET /api/Data/GetSpots  ──→ v2012 transformers ──→ legacy paths in JSON
    │                              (/Images/uuid.jpg)
    │
    └─ GET /Images/uuid.jpg  ──→ legacyStorage route
                                      │
                                      ├─ legacyPathUtils.resolveStorageKey()
                                      │
                                      └─ 302 → https://sb.productmind.ru/storage/v1/object/public/holyspots/{key}
                                                    │
                                                    └─ Supabase Storage bucket "holyspots"
```

### Data Flow

```
1. API sync:  DB stores "holyspots/spots/uuid/abc.jpg"
              transformer → "/Images/abc.jpg" in response

2. Image load: GET /Images/abc.jpg
              resolveStorageKey("images", "abc.jpg")
                try: "abc.jpg" (root)
                try: list subfolders ending with "abc.jpg"
              302 Location: .../holyspots/spots/uuid/abc.jpg

3. Review photo: API returns "/Images/*abc.jpg"
              iOS replaces * → "180" → GET /Images/180/abc.jpg
              resolve → "180/abc.jpg" or "reviews/{id}/180/abc.jpg"
              302 → public URL
```

## Interfaces

### `legacyPathUtils.js`

```javascript
/**
 * Convert any storage/URL path to legacy mobile path.
 * @param {string|null} storagePath
 * @param {'image'|'map'|'download'} type
 * @param {object} [options]
 * @param {boolean} [options.reviewWildcard] - use /Images/*{name} for review photos
 * @returns {string|null}
 */
function toLegacyPath(storagePath, type, options = {}) {}

/**
 * Parse legacy URL segment (after /Images/ etc.) to storage object key(s).
 * @param {'images'|'maps'|'downloads'} category
 * @param {string} urlPath - e.g. "180/uuid.jpg", "map.bin"
 * @returns {Promise<string|null>} storage key within bucket (no "holyspots/" prefix)
 */
async function resolveStorageKey(category, urlPath) {}

/**
 * Build 302 redirect URL for a resolved storage key.
 * @param {string} storageKey
 * @returns {string}
 */
function buildPublicRedirectUrl(storageKey) {}
```

### `legacyStorage.js` routes

| Method | Route patterns | Handler |
|--------|----------------|---------|
| GET | `/Images/*` | redirectImage |
| GET | `/images/*` | redirectImage (alias) |
| GET | `/Maps/*` | redirectMap |
| GET | `/maps/*` | redirectMap (alias) |
| GET | `/downloads/*` | redirectDownload |
| GET | `/Downloads/*` | redirectDownload (alias) |

All handlers:
1. Extract wildcard path from `req.params[0]` or `req.path`
2. Call `resolveStorageKey(category, path)`
3. If found → `res.redirect(302, buildPublicRedirectUrl(key))`
4. If not found → `res.status(404).send('Not Found')` (plain text or empty body)

**No** `languageMiddleware` side effects. Routes mounted **before** `/api` and **without** auth.

### Modified `storageService.js`

Add:

```javascript
function buildPublicRedirectUrl(storageKey) {
  const key = storageKey.replace(/^holyspots\//, '');
  return `${PROXY_BASE_URL}/${BUCKET_NAME}/${key}`;
}
```

Export for use by legacy routes and path utils.

## Path Mapping Rules

### Storage → Legacy (API transformers)

| Input (stored in DB / Supabase) | Legacy output |
|---------------------------------|---------------|
| `holyspots/uuid.jpg` | `/Images/uuid.jpg` |
| `uuid.jpg` | `/Images/uuid.jpg` |
| `https://sb.productmind.ru/.../holyspots/spots/x/y.jpg` | `/Images/y.jpg` |
| `spots/{id}/y.jpg` | `/Images/y.jpg` |
| `reviews/{id}/y.jpg` | `/Images/*y.jpg` (wildcard for size variants) |
| `reviews/{id}/180/y.jpg` | `/Images/*y.jpg` (API always returns wildcard form) |
| `maps/{city}/vrindavan.mbtiles` | `/Maps/vrindavan.mbtiles` |
| `downloads/map.bin` | `/downloads/map.bin` |

**Rules:**
- Strip bucket prefix `holyspots/` and any full Supabase/proxy URL prefix
- Take **basename only** for images and maps (flatten subfolders)
- Preserve size subfolder in legacy path when present in storage key: `180/file.jpg` → `/Images/180/file.jpg`
- Review photos: always emit wildcard form `/Images/*{basename}` so iOS/Android can substitute `180`, `1242`, or empty string
- Maps: always `/Maps/{basename}`
- Downloads: always `/downloads/{basename}` (lowercase prefix in API; route accepts both cases)

### Legacy → Storage (302 redirect resolution)

#### Images (`/Images/...` or `/images/...`)

Parse `urlPath`:

| Legacy URL path | Candidate storage keys (try in order) |
|-----------------|---------------------------------------|
| `{filename}` | `{filename}` |
| `180/{filename}` | `180/{filename}` |
| `1242/{filename}` | `1242/{filename}` |
| `{filename}` (if root miss) | search subfolders: `spots/**/{filename}`, `reviews/**/{filename}`, `routes/**/{filename}`, `events/**/{filename}` |
| `180/{filename}` (if miss) | `reviews/**/180/{filename}`, `180/{filename}` |
| `1242/{filename}` (if miss) | `reviews/**/1242/{filename}`, `1242/{filename}` |

**Subfolder search:** use Supabase Storage `.list()` on known prefixes (`spots`, `reviews`, `routes`, `events`, `cities`) with pagination; match entries where `name === filename` or path ends with `/{filename}`. Cache positive hits in memory Map `{legacyPath → storageKey}` with TTL 1h.

**Existence check before redirect:** `HEAD` request to public URL OR Supabase `.download()` with range — prefer lightweight HEAD to avoid loading body. If all candidates fail → 404.

#### Maps (`/Maps/...` or `/maps/...`)

| Legacy path | Candidate keys |
|-------------|----------------|
| `{filename}` | `maps/{filename}`, then search `maps/**/{filename}` |

#### Downloads (`/downloads/...` or `/Downloads/...`)

| Legacy path | Candidate keys |
|-------------|----------------|
| `map.bin` | `downloads/map.bin`, `map.bin` |
| `{filename}` | `downloads/{filename}`, `{filename}` |

## Transformer Changes

Apply `toLegacyPath()` in all v2012 transformers for file-bearing fields:

| Transformer | Fields |
|-------------|--------|
| `regionTransformer.js` | `photo` |
| `spotTransformer.js` | `mainPhoto`, `photos[].photo` |
| `guideTransformer.js` | `photo` |
| `mapTransformer.js` | `file` |
| `placeTransformer.js` | `mainPhoto` |
| `reviewTransformer.js` | `photos[].photo` (with `reviewWildcard: true`) |

Extract shared `parseImages()` into `legacyPathUtils` or a small `parseImages` import to avoid duplication — optional refactor, not required if minimal diff preferred.

## Upload Path Compatibility

`POST /api/Data/AddReview` must store paths that round-trip correctly:

- After upload to `reviews/{reviewId}/{timestamp}_{name}.jpg`, store in `review_photos.photo` the **storage key** (e.g. `reviews/{id}/file.jpg`)
- Response via `reviewTransformer` returns `/Images/*file.jpg`

Future uploads via v2026 admin continue storing Supabase keys; v2012 API normalizes on read.

## Behavior Specifications

### Happy Path

1. Client syncs spots → API returns `"mainPhoto": "/Images/abc.jpg"`
2. Client requests `GET /Images/abc.jpg`
3. Backend resolves `abc.jpg` → storage key `abc.jpg` (root)
4. Backend responds `302 Location: https://sb.productmind.ru/storage/v1/object/public/holyspots/abc.jpg`
5. Client follows redirect, downloads image from Supabase proxy

### Edge Cases

| Case | Trigger | Expected Behavior |
|------|---------|-------------------|
| Unknown file | `GET /Images/missing.jpg` | 404, no redirect |
| Double prefix | DB has `/Images/x.jpg` already | `toLegacyPath` idempotent — return as-is |
| Full Supabase URL in DB | Admin stored full URL | Strip to legacy `/Images/{basename}` |
| Case alias | `GET /images/x.jpg` | Same handler as `/Images/x.jpg` |
| Trailing slash | `GET /Images/x.jpg/` | 404 or strip trailing slash (prefer strip) |
| Encoded path | `GET /Images/foo%20bar.jpg` | Decode URI before resolve |
| Large mbtiles | Map download | 302 only — no proxy streaming through backend |
| Review wildcard | API returns `/Images/*uuid.jpg` | Client requests sized URLs; redirect resolves `180/uuid.jpg` |

### Error Handling

| Error | Cause | Response |
|-------|-------|----------|
| 404 | No storage object found | `404 Not Found` |
| 500 | Supabase list API failure | Log error, return 404 (prefer fail-safe over 500 for static) |
| Invalid path | Path traversal `../etc` | Reject — normalize and block `..` segments → 404 |

## Dependencies

### Requires

- `sdd-holyspots-backend-v2026a-endpoints` — API v2012 implemented
- Supabase bucket `holyspots` public read via `sb.productmind.ru`
- Files in Storage including `downloads/map.bin` and sized review images

### Blocks

- Mobile app media loading on new backend host
- Offline map downloads
- iOS initial `map.bin` fetch

## Integration Points

### External

- Supabase Storage public API: `https://sb.productmind.ru/storage/v1/object/public/holyspots/{key}`
- Optional HEAD requests to verify object existence

### Internal

- All v2012 GET endpoints that return image/map paths
- `storageService.js` constants

## Testing Strategy

### Unit Tests

- [ ] `toLegacyPath` — all input formats (relative, full URL, bucket prefix, subfolder)
- [ ] `toLegacyPath` — review wildcard generation
- [ ] `resolveStorageKey` — direct root hit
- [ ] `resolveStorageKey` — size variants `180/`, `1242/`
- [ ] Path traversal rejection

### Integration Tests (manual or supertest)

- [ ] `GET /Images/{known-file}` → 302 with valid Location header
- [ ] `GET /images/{known-file}` → same as above
- [ ] `GET /Maps/{known-mbtiles}` → 302
- [ ] `GET /downloads/map.bin` → 302
- [ ] `GET /Images/nonexistent` → 404
- [ ] `GET /api/Data/GetSpots` → all photo fields start with `/Images/`

### Manual Verification

- [ ] Android app loads spot photos after sync
- [ ] iOS app downloads offline map
- [ ] iOS app fetches `map.bin` on first launch
- [ ] Review photos load at 180px and full size

## Migration / Rollout

- No DB migration required — path normalization is runtime
- Deploy backend with legacy routes on same host as API (`app.holyspotsapp.com` or replacement)
- Verify Supabase public URLs accessible from mobile networks
- Optional: add `Cache-Control` on 302 response (`Cache-Control: public, max-age=3600`) — client caches redirect

## Open Design Questions

- [x] All resolved in requirements approval

---

## Approval

- [ ] Reviewed by: [name]
- [ ] Approved on: [date]
- [ ] Notes:
