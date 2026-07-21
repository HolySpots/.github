# Requirements: HolySpots Backend v2026a Storage (Legacy Static Paths)

> Version: 1.1  
> Status: APPROVED  
> Last Updated: 2026-07-17

## Problem Statement

Мобильные приложения HolySpots v2012 (Android и iOS) загружают медиафайлы и оффлайн-карты не через Supabase напрямую, а через **legacy URL paths** на том же хосте, что и API:

```
{HOST}/Images/{filename}.jpg
{HOST}/Maps/{filename}.mbtiles
{HOST}/downloads/map.bin
```

Где `HOST` = `http://app.holyspotsapp.com` (production) или dev-окружение.

Файлы физически хранятся в **Supabase Storage** (bucket `holyspots`), но бэкенд `app/holyspots-backend-v2026a` сейчас:

1. **Не отдаёт** статические файлы по legacy paths `/Images/`, `/Maps/`, `/Downloads/` (и `/downloads/`)
2. **Возвращает в API v2012** пути Supabase (`holyspots/spots/uuid/image.jpg`) вместо legacy paths (`/Images/uuid.jpg`)

В результате мобильные клиенты не могут скачать фото мест, отзывов, оффлайн-карт и bundled map database после миграции на новый бэкенд.

**Цель**: добавить в бэкенд слой, который проксирует/отдаёт файлы из Supabase Storage по legacy URL paths, совместимым с `holyspots-mobile-java-v2012` и `holyspots-mobile-swift-v2012` **без изменений в мобильных приложениях**.

## User Stories

### Primary

**As a** пользователь мобильного приложения HolySpots v2012 (Android/iOS)  
**I want** видеть фото мест, отзывов и скачивать оффлайн-карты  
**So that** приложение работает так же, как с legacy сервером `app.holyspotsapp.com`

**As a** бэкенд-разработчик  
**I want** единый источник файлов в Supabase Storage с проксированием через Express  
**So that** не нужно дублировать файлы на диске сервера и мобильные клиенты остаются без изменений

### Secondary

**As a** администратор контента (через admin v2026)  
**I want** загруженные в Supabase файлы автоматически доступны мобильным клиентам  
**So that** новый контент сразу появляется в приложениях после синхронизации API

## Текущее поведение мобильных клиентов

### Android (`holyspots-mobile-java-v2012`)

| Действие | Код | URL |
|----------|-----|-----|
| Загрузка изображения | `HttpFileRequest(BuildConfig.HOST + path)` | `http://app.holyspotsapp.com/Images/uuid.jpg` |
| Загрузка карты | `Uri.parse(BuildConfig.HOST + map.getFile())` | `http://app.holyspotsapp.com/Maps/region.mbtiles` |
| API запросы | `HolySpotsRequest` | `http://app.holyspotsapp.com/api/Data/...` |

Путь `path` приходит из API v2012 в полях `photo`, `mainPhoto`, `file` и т.д.

### iOS (`holyspots-mobile-swift-v2012`)

| Действие | Код | URL |
|----------|-----|-----|
| Загрузка изображения | `[AppHelper getServerURL] + imagePath` | `http://app.holyspotsapp.com/Images/uuid.jpg` |
| Загрузка карты | `kServerUrl + pathFromDB` | `http://app.holyspotsapp.com/Maps/region.mbtiles` |
| Bundled map DB | `mapDBURL` | `http://app.holyspotsapp.com/downloads/map.bin` |
| Review photos (sizes) | `*` → `180`, `1242`, `` (original) | `/Images/180/uuid.jpg`, `/Images/1242/uuid.jpg`, `/Images/uuid.jpg` |

### Legacy формат путей (из `db/holyspots-database-v2012/`)

```
/Images/f09c06d056744606a60b74010fb1b055.jpg
/Maps/{region}.mbtiles          (предполагаемый формат)
/downloads/map.bin              (bundled SQLite map database, lowercase)
```

### Текущий формат в Supabase (из admin/endpoints flow)

```
holyspots/{uuid}.jpg                              # root bucket (legacy migrated files)
holyspots/spots/{spot_id}/{filename}.jpg          # new uploads
holyspots/maps/{city_id}/{filename}.mbtiles       # offline maps
holyspots/reviews/{review_id}/{filename}.jpg      # review photos
```

## Acceptance Criteria

### Must Have

1. **Given** файл `f09c06d056744606a60b74010fb1b055.jpg` существует в Supabase Storage bucket `holyspots`  
   **When** мобильный клиент запрашивает `GET /Images/f09c06d056744606a60b74010fb1b055.jpg`  
   **Then** бэкенд отвечает **HTTP 302** с `Location` на public Supabase URL (`sb.productmind.ru`), или 404 если файл не найден

2. **Given** оффлайн-карта с path `/Maps/vrindavan.mbtiles` в API v2012 GetMaps  
   **When** клиент запрашивает `GET /Maps/vrindavan.mbtiles`  
   **Then** бэкенд отдаёт `.mbtiles` файл из Supabase Storage

3. **Given** iOS клиент при первом запуске  
   **When** запрашивает `GET /downloads/map.bin`  
   **Then** бэкенд отдаёт bundled map database из Supabase Storage

4. **Given** API v2012 возвращает данные о местах, регионах, отзывах, картах  
   **When** поля `photo`, `mainPhoto`, `file` содержат пути к файлам  
   **Then** пути имеют legacy формат (`/Images/...`, `/Maps/...`), а не Supabase internal paths (`holyspots/...`)

5. **Given** файл не существует в Storage  
   **When** клиент запрашивает legacy path  
   **Then** бэкенд возвращает HTTP 404 (не 500)

6. **Given** существующие мобильные приложения v2012  
   **When** выполняется синхронизация и загрузка медиа  
   **Then** **ни одна строка кода** в `holyspots-mobile-java-v2012` и `holyspots-mobile-swift-v2012` не меняется

### Should Have

- Поддержка review photo size variants: `/Images/180/...`, `/Images/1242/...`, `/Images/...` (original)
- Кэширование через HTTP headers (`Cache-Control`, `ETag` / `Last-Modified`)
- Поддержка обоих регистров path prefix: `/Images/` и `/images/`, `/Maps/` и `/maps/`, `/Downloads/` и `/downloads/`
- `Cache-Control` на 302 ответах для кэширования redirect клиентом

### Won't Have (This Iteration)

- Изменения в мобильных приложениях
- CDN setup (CloudFront и т.п.)
- Upload через legacy paths (upload идёт через `/api/Data/AddReview` и `/api/v2026/admin/upload`)
- Приватные/signed URLs (bucket public)
- Image resizing on-the-fly (если нет pre-generated sizes в Storage)

## Constraints

- **Technical**: Backend Express.js в `app/holyspots-backend-v2026a/node/`, Supabase Storage bucket `holyspots`, proxy `https://sb.productmind.ru`
- **Compatibility**: Полная обратная совместимость с mobile v2012 URL scheme
- **Dependencies**: Flow `sdd-holyspots-backend-v2026a-endpoints` (API v2012 endpoints implemented)
- **Performance**: Файлы могут быть большими (mbtiles, map.bin) — backend не проксирует body, только 302 redirect
- **Platform**: Production host заменяет `app.holyspotsapp.com`; dev/staging — configurable

## Proposed Scope (for specs phase)

Два связанных компонента:

### A. Static File Routes (Express middleware/routes)

```
GET /Images/*path     → Supabase holyspots bucket
GET /Maps/*path       → Supabase holyspots bucket  
GET /downloads/*path  → Supabase holyspots bucket
GET /Downloads/*path  → alias (case compatibility)
```

### B. Path Normalization in API v2012 Transformers

Конвертация Supabase paths → legacy paths при формировании ответов:

```
holyspots/uuid.jpg           → /Images/uuid.jpg
holyspots/spots/x/y.jpg      → /Images/y.jpg  (или сохранить subpath?)
holyspots/maps/x/file.mbtiles → /Maps/file.mbtiles
```

## Resolved Decisions (2026-07-17)

| # | Question | Decision |
|---|----------|----------|
| 1 | Subfolder mapping | **Flatten** — `holyspots/spots/{id}/file.jpg` → `/Images/file.jpg` |
| 2 | Case sensitivity | **Both** — `/Images/` + `/images/`, `/Maps/` + `/maps/`, `/Downloads/` + `/downloads/` |
| 3 | Review photo sizes | **Pre-generated in Storage** — `/Images/180/...`, `/Images/1242/...` |
| 4 | `map.bin` | **Already in Supabase Storage** |
| 5 | Delivery strategy | **302 redirect** to `https://sb.productmind.ru/storage/v1/object/public/holyspots/{key}` |

## Open Questions

- [ ] **Production deployment**: новый backend заменяет `app.holyspotsapp.com` полностью или будет отдельный домен? (не блокирует implementation)

## References

- `flows/sdd-holyspots-backend-v2026a-endpoints/` — API endpoints flow (completed)
- `app/holyspots-backend-v2026a/node/src/services/storageService.js` — текущий storage service
- `app/holyspots-mobile-java-v2012/.../SyncManager.java` — загрузка Images/Maps
- `app/holyspots-mobile-swift-v2012/HolySpots/Utils/AppHelper.m` — `mapDBURL`, `getServerURL`
- `db/holyspots-database-v2012/HolySpots_SpotPhotos.csv` — legacy image paths

---

## Approval

- [ ] Reviewed by: [name]
- [ ] Approved on: [date]
- [ ] Notes: [any conditions or clarifications]
