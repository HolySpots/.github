# Specifications: HolySpots Backend v2026a Endpoints

> Version: 1.0
> Status: DRAFT
> Last Updated: 2026-07-16

## Project Structure

```
app/holyspots-backend-v2026a/
├── node/
│   ├── package.json
│   ├── src/
│   │   ├── index.js                 # Entry point, Express app setup
│   │   ├── config/
│   │   │   ├── supabase.js          # Supabase client configuration
│   │   │   └── swagger.js           # Swagger setup
│   │   │
│   │   ├── middleware/
│   │   │   ├── cors.js              # CORS configuration
│   │   │   ├── language.js          # Accept-Language parsing
│   │   │   ├── errorHandler.js      # Global error handler
│   │   │   └── auth.js              # Auth middleware (v2026)
│   │   │
│   │   ├── routes/
│   │   │   ├── v2012/               # API v2012 routes
│   │   │   │   ├── index.js         # Router setup
│   │   │   │   ├── regions.js       # GetRegions
│   │   │   │   ├── spots.js         # GetSpots
│   │   │   │   ├── guides.js        # GetGuides
│   │   │   │   ├── maps.js          # GetMaps
│   │   │   │   ├── reviews.js       # GetReviews, AddReview
│   │   │   │   ├── places.js        # GetPlaces
│   │   │   │   └── directions.js    # GetDirections
│   │   │   │
│   │   │   └── v2026/               # API v2026 routes
│   │   │       ├── index.js         # Router setup
│   │   │       ├── admin/           # Admin CRUD endpoints
│   │   │       │   ├── countries.js
│   │   │       │   ├── cities.js
│   │   │       │   ├── spots.js
│   │   │       │   ├── routes.js
│   │   │       │   ├── events.js
│   │   │       │   ├── profiles.js
│   │   │       │   ├── stories.js
│   │   │       │   ├── reviews.js
│   │   │       │   ├── places.js
│   │   │       │   ├── directions.js
│   │   │       │   ├── maps.js
│   │   │       │   └── upload.js
│   │   │       ├── public/          # Public read endpoints
│   │   │       │   ├── cities.js
│   │   │       │   ├── spots.js
│   │   │       │   ├── routes.js
│   │   │       │   ├── events.js
│   │   │       │   ├── countries.js
│   │   │       │   └── search.js
│   │   │       └── user/            # User endpoints
│   │   │           ├── profile.js
│   │   │           └── favorites.js
│   │   │
│   │   ├── services/
│   │   │   ├── supabaseService.js   # Database operations
│   │   │   ├── storageService.js    # File upload operations
│   │   │   └── searchService.js     # Full-text search
│   │   │
│   │   ├── transformers/
│   │   │   ├── v2012/               # Transform Supabase → v2012 format
│   │   │   │   ├── regionTransformer.js
│   │   │   │   ├── spotTransformer.js
│   │   │   │   ├── guideTransformer.js
│   │   │   │   ├── reviewTransformer.js
│   │   │   │   ├── placeTransformer.js
│   │   │   │   ├── directionTransformer.js
│   │   │   │   └── mapTransformer.js
│   │   │   └── v2026/               # Transform for v2026 format
│   │   │       └── commonTransformer.js
│   │   │
│   │   └── utils/
│   │       ├── response.js          # Response helpers
│   │       ├── pagination.js        # Pagination helpers
│   │       └── validation.js        # Input validation
│   │
│   ├── openapi-v2012.yaml           # Swagger spec for v2012
│   └── openapi-v2026.yaml           # Swagger spec for v2026
```

---

## API v2012 Specifications

### Base URL
```
/api/Data
```

### Response Format
```typescript
interface V2012Response<T> {
  code: 0 | 1 | 100;  // 0=SUCCESS, 1=ERROR, 100=CONNECTION_ERROR
  msg: string;
  data: T[];
}
```

### Common Query Parameters
```
?lastLoad={unix_timestamp}  // For incremental sync (seconds)
```

### Language Header
```
Accept-Language: ru | en | hi
```

---

### GET /api/Data/GetRegions

**Description:** Возвращает список регионов (городов) для мобильного приложения.

**Mapping:** `cities` table → `Region` model

**Request:**
```
GET /api/Data/GetRegions?lastLoad=0
Accept-Language: ru
```

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "photo": "holyspots/cities/uuid/main.jpg",
      "name": "Вриндаван",
      "descr": "Священный город...",
      "order": 1,
      "isDeleted": false,
      "spotsCount": 15
    }
  ]
}
```

**Transformer Logic:**
```javascript
// cities row → Region
{
  id: row.id,                           // UUID → will need integer mapping
  photo: row.images?.[0] || null,       // First image
  name: row.name[lang] || row.name.en,  // JSONB by language
  descr: row.info[lang] || row.info.en, // JSONB by language
  order: row.order || 0,
  isDeleted: false,                     // No soft delete in current schema
  spotsCount: row.spots_count || 0
}
```

**Note:** v2012 uses integer IDs, Supabase uses UUIDs. Need ID mapping strategy.

---

### GET /api/Data/GetSpots

**Description:** Возвращает список святых мест.

**Mapping:** `spots` table → `Spot` model

**Request:**
```
GET /api/Data/GetSpots?lastLoad=0
Accept-Language: en
```

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "mainPhoto": "holyspots/spots/uuid/main.jpg",
      "name": "Krishna Balarama Mandir",
      "info": "ISKCON temple",
      "descr": "This magnificent temple was built...",
      "latitude": 27.5735,
      "longitude": 77.6899,
      "workDays": 127,
      "timeZone": "Asia/Kolkata",
      "order": 1,
      "isDeleted": false,
      "beaconId": null,
      "beaconMajor": null,
      "beaconMinor": null,
      "workTimes": [
        {"from": "04:30", "to": "13:00"},
        {"from": "16:00", "to": "20:45"}
      ],
      "regions": [1],
      "photos": [
        {"id": 1, "photo": "holyspots/spots/uuid/1.jpg", "isDeleted": false}
      ],
      "videos": []
    }
  ]
}
```

**Transformer Logic:**
```javascript
// spots row → Spot
{
  id: row.id,
  mainPhoto: row.images?.[0] || null,
  name: row.name[lang],
  info: extractShortInfo(row.info[lang]),      // First 100 chars
  descr: row.info[lang],
  latitude: row.point?.coordinates[1] || 0,    // GeoJSON [lng, lat]
  longitude: row.point?.coordinates[0] || 0,
  workDays: 127,                               // Default: all days (bitmask)
  timeZone: "Asia/Kolkata",                    // Default
  order: row.order || 0,
  isDeleted: false,
  beaconId: null,
  beaconMajor: null,
  beaconMinor: null,
  workTimes: [],                               // Parse from info or separate field
  regions: [cityIdToRegionId(row.city)],       // Map city UUID to integer
  photos: row.images?.slice(1).map((img, i) => ({
    id: i + 1,
    photo: img,
    isDeleted: false
  })) || [],
  videos: []
}
```

---

### GET /api/Data/GetGuides

**Description:** Возвращает список гидов (маршрутов), с поддержкой иерархии.

**Mapping:** `routes` table → `Guide` model

**Request:**
```
GET /api/Data/GetGuides?lastLoad=0
```

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "parentId": null,
      "photo": "holyspots/routes/uuid/main.jpg",
      "name": "Vrindavan Parikrama",
      "descr": "A sacred walking route...",
      "order": 1,
      "isDeleted": false,
      "spots": [1, 2, 3],
      "spotsCount": 3
    }
  ]
}
```

**Transformer Logic:**
```javascript
// routes row + spot_route → Guide
{
  id: row.id,
  parentId: row.parent_id || null,           // For hierarchical guides
  photo: row.images?.[0] || null,
  name: row.name[lang],
  descr: row.info[lang],
  order: row.order || 0,
  isDeleted: false,
  spots: spotIds,                             // From spot_route junction
  spotsCount: spotIds.length
}
```

---

### GET /api/Data/GetMaps

**Description:** Возвращает список оффлайн карт для скачивания.

**Mapping:** `offline_maps` table → `Map` model

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "regionId": 1,
      "file": "holyspots/maps/uuid/vrindavan.mbtiles",
      "isDeleted": false
    }
  ]
}
```

---

### GET /api/Data/GetReviews

**Description:** Возвращает отзывы о местах.

**Mapping:** `reviews` table → `Review` model

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "spotId": 1,
      "rate": 5,
      "text": "Amazing spiritual place!",
      "date": 1704067200,
      "isDeleted": false,
      "isMine": false,
      "photos": [
        {"id": 1, "photo": "holyspots/reviews/uuid/1.jpg"}
      ]
    }
  ]
}
```

---

### POST /api/Data/AddReview

**Description:** Добавляет новый отзыв с фото (multipart/form-data).

**Request:**
```
POST /api/Data/AddReview
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="spotId"

1
------WebKitFormBoundary
Content-Disposition: form-data; name="rate"

5
------WebKitFormBoundary
Content-Disposition: form-data; name="text"

Great place!
------WebKitFormBoundary
Content-Disposition: form-data; name="photos"; filename="photo1.jpg"
Content-Type: image/jpeg

[binary data]
------WebKitFormBoundary--
```

**Response:**
```json
{
  "code": 0,
  "msg": "Review added successfully",
  "data": []
}
```

**Processing:**
1. Parse multipart form data (multer)
2. Upload photos to Supabase Storage
3. Insert review into `reviews` table
4. Insert photo references into `review_photos` table

---

### GET /api/Data/GetPlaces

**Description:** Возвращает список мест (отели, рестораны).

**Mapping:** `places` table → `Place` model

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "regionId": 1,
      "type": 0,
      "mainPhoto": "holyspots/places/uuid/main.jpg",
      "name": "Hotel Ganges View",
      "descr": "Comfortable hotel...",
      "address": "Dashashwamedh Road",
      "order": 1,
      "isDeleted": false
    }
  ]
}
```

**Place Types:**
- `0` = HOTEL
- `1` = FOOD

---

### GET /api/Data/GetDirections

**Description:** Возвращает направления/инструкции для путешествия.

**Mapping:** `directions` table → `Direction` model

**Response:**
```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": 1,
      "regionId": 1,
      "name": "From Delhi Airport",
      "descr": "Take a taxi or bus...",
      "order": 1,
      "isDeleted": false
    }
  ]
}
```

---

### POST /api/Data/FindGuideRequest

**Description:** Отправляет запрос на поиск гида.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "regionId": 1,
  "message": "Looking for a guide..."
}
```

**Response:**
```json
{
  "code": 0,
  "msg": "Request sent successfully",
  "data": []
}
```

**Processing:** Send email notification (optional, can be implemented later).

---

## API v2026 Specifications

### Base URL
```
/api/v2026
```

### Response Format
```typescript
interface V2026Response<T> {
  success: boolean;
  data: T | T[];
  error?: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}
```

### Query Parameters (for lists)
```
?page=1
&pageSize=10
&search=text
&language=ru
&sortKey=name
&sortAscending=true
&filter[city]=uuid
&filter[type]=temple
```

---

## Admin Endpoints (/api/v2026/admin)

### CRUD Pattern for Each Entity

```
GET    /admin/{entity}           # List with pagination, filters
GET    /admin/{entity}/:id       # Get by ID
POST   /admin/{entity}           # Create
PUT    /admin/{entity}/:id       # Update
DELETE /admin/{entity}/:id       # Delete
```

### Example: Cities

**GET /api/v2026/admin/cities**
```json
// Request
GET /api/v2026/admin/cities?page=1&pageSize=10&search=vrin&language=ru

// Response
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": {"ru": "Вриндаван", "en": "Vrindavan", "hi": "वृन्दावन"},
      "info": {"ru": "Описание...", "en": "Description...", "hi": "..."},
      "country": "uuid",
      "spots_count": 15,
      "routes_count": 3,
      "events_count": 5,
      "images": ["holyspots/cities/uuid/1.jpg"]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalCount": 25,
    "totalPages": 3
  }
}
```

**POST /api/v2026/admin/cities**
```json
// Request
{
  "name": {"ru": "Новый город", "en": "New City"},
  "info": {"ru": "Описание", "en": "Description"},
  "country": "uuid",
  "images": ["holyspots/cities/uuid/1.jpg"]
}

// Response
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "name": {"ru": "Новый город", "en": "New City"},
    ...
  }
}
```

---

## Public Endpoints (/api/v2026/public)

### GET /api/v2026/public/cities

```json
// Response - simplified for public consumption
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": {"ru": "Вриндаван", "en": "Vrindavan", "hi": "वृन्दावन"},
      "description": {"ru": "...", "en": "...", "hi": "..."},
      "thumbnail": "holyspots/cities/uuid/1.jpg",
      "images": [...],
      "spots_count": 15,
      "routes_count": 3,
      "events_count": 5,
      "country": "uuid"
    }
  ]
}
```

### GET /api/v2026/public/spots

```json
// Query params
?city=uuid
&route=uuid
&event=uuid
&type=temple

// Response
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "cityId": "uuid",
      "type": "temple",
      "name": {"ru": "...", "en": "...", "hi": "..."},
      "description": {"ru": "...", "en": "...", "hi": "..."},
      "thumbnail": "...",
      "images": [...],
      "location": {
        "latitude": 27.5735,
        "longitude": 77.6899
      },
      "point": {
        "type": "Point",
        "coordinates": [77.6899, 27.5735]
      }
    }
  ]
}
```

### GET /api/v2026/public/routes/:id

```json
// Response - includes pointIds
{
  "success": true,
  "data": {
    "id": "uuid",
    "cityId": "uuid",
    "name": {...},
    "description": {...},
    "thumbnail": "...",
    "images": [...],
    "pointIds": ["spot-uuid-1", "spot-uuid-2", "spot-uuid-3"],
    "distance": 5.2,
    "duration": 120
  }
}
```

### GET /api/v2026/public/search

```json
// Request
GET /api/v2026/public/search?q=krishna&city=uuid&type=temple

// Response
{
  "success": true,
  "data": {
    "spots": [...],
    "routes": [...],
    "events": [...]
  }
}
```

---

## User Endpoints (/api/v2026/user)

**Note:** Require authentication (Supabase Auth JWT in header)

### GET /api/v2026/user/favorites

```json
// Request
GET /api/v2026/user/favorites
Authorization: Bearer {jwt_token}

// Response
{
  "success": true,
  "data": {
    "cities": ["uuid1", "uuid2"],
    "spots": ["uuid3"],
    "routes": ["uuid4"],
    "events": []
  }
}
```

### POST /api/v2026/user/favorites

```json
// Request
{
  "itemId": "uuid",
  "itemType": "spot"
}

// Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "item_id": "uuid",
    "item_type": "spot"
  }
}
```

### DELETE /api/v2026/user/favorites/:itemType/:itemId

```json
// Request
DELETE /api/v2026/user/favorites/spot/uuid

// Response
{
  "success": true,
  "data": null
}
```

---

## ID Mapping Strategy (v2012 ↔ UUID)

v2012 API uses integer IDs, but Supabase uses UUIDs.

### Option A: Hash-based mapping (Recommended)
```javascript
// UUID to integer (for response)
function uuidToInt(uuid) {
  // Use first 8 chars of UUID as hex, convert to int
  return parseInt(uuid.replace(/-/g, '').substring(0, 8), 16);
}

// Integer to UUID (for request)
// Store mapping in Redis/memory cache or lookup by integer hash
```

### Option B: Lookup table
```sql
CREATE TABLE id_mapping (
  int_id SERIAL PRIMARY KEY,
  uuid_id UUID UNIQUE NOT NULL,
  entity_type TEXT NOT NULL
);
```

### Option C: Return UUIDs as strings
Let mobile clients handle UUIDs as strings (may require mobile app update).

---

## Edge Cases

1. **Empty JSONB fields**: Return empty object `{}` or default language
2. **Missing images**: Return `null` or placeholder URL
3. **GeoJSON point**: Parse `{type: "Point", coordinates: [lng, lat]}`
4. **lastLoad filter**: Use `updated_at` column for incremental sync
5. **Soft delete**: v2012 expects `isDeleted` field, need to handle

---

## Error Handling

### v2012 Format
```json
{
  "code": 1,
  "msg": "Error message here",
  "data": []
}
```

### v2026 Format
```json
{
  "success": false,
  "error": "Error message here",
  "data": null
}
```

---

## Dependencies

```json
{
  "express": "^4.18.x",
  "cors": "^2.8.x",
  "@supabase/supabase-js": "^2.x",
  "multer": "^1.4.x",
  "swagger-ui-express": "^5.x",
  "yamljs": "^0.3.x",
  "dotenv": "^16.x"
}
```

---

## Environment Variables

```env
PORT=3000
SUPABASE_URL=https://sb.productmind.ru
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
NODE_ENV=development
```

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-07-16
- [x] Notes: Specs approved, proceeding to PLAN phase
