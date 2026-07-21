# Implementation Plan: HolySpots Backend v2026a Endpoints

> Version: 1.0
> Status: DRAFT
> Last Updated: 2026-07-16

## Overview

Пошаговый план создания Node.js backend с двумя версиями API.

**Estimated Tasks:** 25
**Directory:** `app/holyspots-backend-v2026a/node/`

---

## Phase 1: Project Setup (Tasks 1-4)

### Task 1: Initialize Node.js project
**Files:**
- `package.json` (create)
- `.env.example` (create)
- `.gitignore` (create)

**Actions:**
```bash
cd app/holyspots-backend-v2026a/node
npm init -y
npm install express cors dotenv @supabase/supabase-js multer swagger-ui-express yamljs
```

**package.json:**
```json
{
  "name": "holyspots-backend-v2026a",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  }
}
```

---

### Task 2: Create Express app entry point
**Files:**
- `src/index.js` (create)

**Content:**
- Express app initialization
- Middleware setup (cors, json, language)
- Route mounting
- Error handler
- Server start

---

### Task 3: Setup Supabase client
**Files:**
- `src/config/supabase.js` (create)

**Content:**
- Supabase client initialization
- Environment variables

---

### Task 4: Setup middleware
**Files:**
- `src/middleware/cors.js` (create)
- `src/middleware/language.js` (create)
- `src/middleware/errorHandler.js` (create)

**Content:**
- CORS configuration
- Accept-Language header parsing
- Global error handler with v2012/v2026 format detection

---

## Phase 2: Utilities & Services (Tasks 5-8)

### Task 5: Create response utilities
**Files:**
- `src/utils/response.js` (create)

**Content:**
```javascript
// v2012 response helper
export const v2012Response = (res, data, code = 0, msg = '') => {...}

// v2026 response helper
export const v2026Response = (res, data, pagination = null) => {...}

// Error responses
export const v2012Error = (res, msg, code = 1) => {...}
export const v2026Error = (res, error, status = 400) => {...}
```

---

### Task 6: Create pagination utilities
**Files:**
- `src/utils/pagination.js` (create)

**Content:**
- Parse page/pageSize from query
- Calculate offset/limit
- Build pagination response object

---

### Task 7: Create Supabase service
**Files:**
- `src/services/supabaseService.js` (create)

**Content:**
- Generic CRUD operations
- Pagination support
- Filter building
- Search functionality

---

### Task 8: Create storage service
**Files:**
- `src/services/storageService.js` (create)

**Content:**
- Upload file to Supabase Storage
- Delete file from Storage
- Generate public URL

---

## Phase 3: Transformers (Tasks 9-12)

### Task 9: Create v2012 region transformer
**Files:**
- `src/transformers/v2012/regionTransformer.js` (create)

**Content:**
- Transform `cities` row → `Region` model
- Handle JSONB language extraction
- Handle images array

---

### Task 10: Create v2012 spot transformer
**Files:**
- `src/transformers/v2012/spotTransformer.js` (create)

**Content:**
- Transform `spots` row → `Spot` model
- Parse GeoJSON point → lat/lng
- Build photos/videos arrays
- Handle workTimes

---

### Task 11: Create v2012 guide transformer
**Files:**
- `src/transformers/v2012/guideTransformer.js` (create)

**Content:**
- Transform `routes` row → `Guide` model
- Include spot IDs from junction table

---

### Task 12: Create remaining v2012 transformers
**Files:**
- `src/transformers/v2012/reviewTransformer.js` (create)
- `src/transformers/v2012/placeTransformer.js` (create)
- `src/transformers/v2012/directionTransformer.js` (create)
- `src/transformers/v2012/mapTransformer.js` (create)

---

## Phase 4: API v2012 Routes (Tasks 13-16)

### Task 13: Create v2012 router setup
**Files:**
- `src/routes/v2012/index.js` (create)

**Content:**
- Mount all v2012 routes under `/api/Data`

---

### Task 14: Create GetRegions, GetSpots endpoints
**Files:**
- `src/routes/v2012/regions.js` (create)
- `src/routes/v2012/spots.js` (create)

**Endpoints:**
- `GET /api/Data/GetRegions`
- `GET /api/Data/GetSpots`

---

### Task 15: Create GetGuides, GetMaps endpoints
**Files:**
- `src/routes/v2012/guides.js` (create)
- `src/routes/v2012/maps.js` (create)

**Endpoints:**
- `GET /api/Data/GetGuides`
- `GET /api/Data/GetMaps`

---

### Task 16: Create Reviews, Places, Directions endpoints
**Files:**
- `src/routes/v2012/reviews.js` (create)
- `src/routes/v2012/places.js` (create)
- `src/routes/v2012/directions.js` (create)

**Endpoints:**
- `GET /api/Data/GetReviews`
- `POST /api/Data/AddReview` (multipart)
- `GET /api/Data/GetPlaces`
- `GET /api/Data/GetDirections`
- `POST /api/Data/FindGuideRequest`

---

## Phase 5: API v2026 Admin Routes (Tasks 17-19)

### Task 17: Create v2026 router setup
**Files:**
- `src/routes/v2026/index.js` (create)

**Content:**
- Mount admin, public, user routers

---

### Task 18: Create admin CRUD routes (Part 1)
**Files:**
- `src/routes/v2026/admin/index.js` (create)
- `src/routes/v2026/admin/countries.js` (create)
- `src/routes/v2026/admin/cities.js` (create)
- `src/routes/v2026/admin/spots.js` (create)
- `src/routes/v2026/admin/routes.js` (create)

**Endpoints:** Full CRUD for each entity

---

### Task 19: Create admin CRUD routes (Part 2)
**Files:**
- `src/routes/v2026/admin/events.js` (create)
- `src/routes/v2026/admin/profiles.js` (create)
- `src/routes/v2026/admin/stories.js` (create)
- `src/routes/v2026/admin/reviews.js` (create)
- `src/routes/v2026/admin/places.js` (create)
- `src/routes/v2026/admin/directions.js` (create)
- `src/routes/v2026/admin/maps.js` (create)
- `src/routes/v2026/admin/upload.js` (create)

---

## Phase 6: API v2026 Public Routes (Tasks 20-21)

### Task 20: Create public read endpoints
**Files:**
- `src/routes/v2026/public/index.js` (create)
- `src/routes/v2026/public/cities.js` (create)
- `src/routes/v2026/public/spots.js` (create)
- `src/routes/v2026/public/routes.js` (create)
- `src/routes/v2026/public/events.js` (create)
- `src/routes/v2026/public/countries.js` (create)

---

### Task 21: Create search endpoint
**Files:**
- `src/routes/v2026/public/search.js` (create)
- `src/services/searchService.js` (create)

**Content:**
- Full-text search across spots, routes, events
- Filter by city, type

---

## Phase 7: API v2026 User Routes (Tasks 22-23)

### Task 22: Create user profile endpoint
**Files:**
- `src/routes/v2026/user/index.js` (create)
- `src/routes/v2026/user/profile.js` (create)
- `src/middleware/auth.js` (create)

**Content:**
- JWT verification middleware
- Profile GET/PUT endpoints

---

### Task 23: Create favorites endpoints
**Files:**
- `src/routes/v2026/user/favorites.js` (create)

**Endpoints:**
- `GET /api/v2026/user/favorites`
- `POST /api/v2026/user/favorites`
- `DELETE /api/v2026/user/favorites/:type/:id`

---

## Phase 8: Swagger & Testing (Tasks 24-25)

### Task 24: Create OpenAPI specifications
**Files:**
- `openapi-v2012.yaml` (create)
- `openapi-v2026.yaml` (create)
- `src/config/swagger.js` (create)

**Content:**
- Full OpenAPI 3.0 specs for both APIs
- Swagger UI setup at `/api-docs` and `/api/v2026-docs`

---

### Task 25: Final integration & testing
**Actions:**
- Test all v2012 endpoints with mobile app format
- Test all v2026 admin endpoints
- Test all v2026 public endpoints
- Verify Swagger UI works
- Test file upload

---

## File Summary

| Phase | Files to Create | Count |
|-------|-----------------|-------|
| 1. Setup | package.json, .env, index.js, config, middleware | 7 |
| 2. Utils | response.js, pagination.js, services | 4 |
| 3. Transformers | 7 transformer files | 7 |
| 4. v2012 Routes | 8 route files | 8 |
| 5. v2026 Admin | 13 route files | 13 |
| 6. v2026 Public | 7 route files | 7 |
| 7. v2026 User | 3 route files + auth | 4 |
| 8. Swagger | 3 files | 3 |
| **Total** | | **53 files** |

---

## Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "@supabase/supabase-js": "^2.39.0",
  "multer": "^1.4.5-lts.1",
  "swagger-ui-express": "^5.0.0",
  "yamljs": "^0.3.0"
}
```

---

## Database Migrations (if needed)

New tables to create in Supabase:
1. `reviews` - отзывы
2. `review_photos` - фото отзывов
3. `places` - hotels/food
4. `directions` - directions
5. `offline_maps` - оффлайн карты
6. `user_favorites` - избранное (если не существует)

SQL scripts will be provided during implementation.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| UUID ↔ integer ID mismatch | Use hash-based mapping in transformers |
| Missing JSONB fields | Default to empty object or fallback language |
| Large file uploads | Set multer limits, use streaming |
| Supabase rate limits | Implement caching for frequent queries |

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-07-16
- [x] Notes: Plan approved, starting implementation
