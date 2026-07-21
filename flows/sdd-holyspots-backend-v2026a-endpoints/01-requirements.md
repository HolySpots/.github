# Requirements: HolySpots Backend v2026a Endpoints

> Version: 1.2
> Status: DRAFT
> Last Updated: 2026-07-16

## Problem Statement

Необходимо создать единый бэкенд на Node.js (`app/holyspots-backend-v2026a`) с двумя версиями API:

1. **API v2012 (`/api/`)** - для существующих мобильных приложений (ПРИОРИТЕТ):
   - `holyspots-mobile-java-v2012` (Android)
   - `holyspots-mobile-swift-v2012` (iOS)
   - **Полная обратная совместимость** - ни одна строка в мобильных приложениях не должна меняться

2. **API v2026 (`/api/v2026`)** - структурированные REST эндпоинты:
   - Раздел `/api/v2026/admin` - для админок (старый макет v2012 и новая Flutter v2026a)
   - Публичные эндпоинты для Flutter-клиента

Старая админка `holyspots-admin-v2012` - deprecated и не затрагивается.

## Технические решения

- **Web Framework**: Express.js
- **База данных**: Supabase (PostgreSQL) - уже настроена в holyspots-admin-v2026j
- **Supabase URL**: `https://sb.productmind.ru` (proxy)
- **Авторизация API v2012**: Без авторизации (только Accept-Language header)
- **Авторизация API v2026**: Позже (не в этой итерации)

## Существующая база данных (Supabase)

Анализ `holyspots-admin-v2026j`:

### Таблицы в Supabase

| Таблица | Описание | Поля |
|---------|----------|------|
| `countries` | Страны | id, name (JSONB), info (JSONB), cities_count, images |
| `cities` | Города | id, name (JSONB), name_eng, info (JSONB), country, spots_count, routes_count, events_count, images |
| `spots` | Святые места | id, name (JSONB), info (JSONB), city, type, point (geometry), images |
| `routes` | Маршруты | id, name (JSONB), info (JSONB), images, type, duration, status |
| `events` | События | id, name (JSONB), info (JSONB), type, time, status, capacity, price, contact_info, teacher_info, location_details, registration_deadline, requirements, images |
| `profiles` | Пользователи | id, full_name, avatar_url, updated_at |
| `stories` | Истории | id, title, content |
| `spot_route` | Связь spot-route | spot_id, route_id, order |
| `spot_event` | Связь spot-event | spot_id, event_id |
| `route_event` | Связь route-event | route_id, event_id |
| `route_track` | GPS-треки | id, route, point (geometry), order, created_at |

### JSONB Multilingual Format
```json
{
  "ru": "Текст на русском",
  "en": "English text",
  "hi": "हिंदी पाठ"
}
```

## User Stories

### Primary

**As a** мобильный клиент (Android/iOS v2012)
**I want** получать данные о регионах, местах, гидах, картах, отзывах через стабильный API v2012
**So that** существующие приложения продолжают работать без изменений

**As a** Flutter админка v2026a
**I want** полный CRUD доступ к данным через `/api/v2026/admin`
**So that** можно управлять всем контентом HolySpots

### Secondary

**As a** разработчик
**I want** иметь Swagger документацию для обоих версий API
**So that** легко интегрировать и тестировать эндпоинты

## Acceptance Criteria

### Must Have

1. **Given** существующий мобильный клиент v2012
   **When** он вызывает `/api/Data/GetRegions`, `/api/Data/GetSpots`, и другие эндпоинты
   **Then** получает данные в том же формате, что и раньше

2. **Given** админка Flutter v2026a
   **When** она вызывает `/api/v2026/admin/*` эндпоинты
   **Then** получает данные с поддержкой пагинации, фильтрации, JSONB мультиязычных полей

3. **Given** любой клиент
   **When** он запрашивает `/api-docs` или `/api/v2026-docs`
   **Then** получает Swagger UI для соответствующей версии API

### Should Have

- Валидация входных данных
- Обработка ошибок с понятными сообщениями
- CORS для web-клиентов

### Won't Have (This Iteration)

- Авторизация для API v2026
- WebSocket для реального времени
- Rate limiting

## Constraints

- **Technical**: Backend на Node.js (Express.js), база данных Supabase (PostgreSQL)
- **Compatibility**: API v2012 должен быть полностью совместим с существующими мобильными клиентами
- **Database**: Использовать существующие таблицы из Supabase

---

## API v2012 Endpoints (для мобильных клиентов)

### Формат ответа

```json
{
  "code": 0,        // 0 = SUCCESS, 1 = ERROR, 100 = CONNECTION_ERROR
  "msg": "",        // сообщение об ошибке
  "data": [...]     // массив объектов
}
```

### Эндпоинты

| Endpoint | Метод | Описание | Маппинг на Supabase |
|----------|-------|----------|---------------------|
| `/api/Data/GetRegions` | GET | Список регионов | `cities` → Region format |
| `/api/Data/GetSpots` | GET | Список святых мест | `spots` → Spot format |
| `/api/Data/GetGuides` | GET | Список гидов (маршрутов) | `routes` → Guide format |
| `/api/Data/GetMaps` | GET | Данные для оффлайн карт | Новая таблица или storage |
| `/api/Data/GetReviews` | GET | Отзывы о местах | Новая таблица `reviews` |
| `/api/Data/AddReview` | POST | Добавить отзыв (multipart) | Новая таблица `reviews` |
| `/api/Data/GetPlaces` | GET | Список мест (hotels, food) | Новая таблица `places` |
| `/api/Data/GetDirections` | GET | Маршруты/направления | Новая таблица `directions` |
| `/api/Data/FindGuideRequest` | POST | Запрос на поиск гида | Email notification |

**Важно**: Параметр `lastLoad` - unix timestamp (секунды) для инкрементальной синхронизации.

### Модели данных API v2012

#### Region (из cities)
```json
{
  "id": 1,
  "photo": "/images/region.jpg",
  "name": "Varanasi",
  "descr": "Sacred city...",
  "order": 1,
  "isDeleted": false,
  "spotsCount": 15
}
```

#### Spot (из spots)
```json
{
  "id": 1,
  "mainPhoto": "/images/spot.jpg",
  "name": "Kashi Vishwanath",
  "info": "Short info",
  "descr": "Full description...",
  "latitude": 25.3109,
  "longitude": 83.0107,
  "workDays": 127,
  "timeZone": "Asia/Kolkata",
  "order": 1,
  "isDeleted": false,
  "workTimes": [...],
  "regions": [1, 2],
  "photos": [...],
  "videos": [...]
}
```

#### Guide (из routes)
```json
{
  "id": 1,
  "parentId": null,
  "photo": "/images/guide.jpg",
  "name": "Holy Varanasi Tour",
  "descr": "Description...",
  "order": 1,
  "isDeleted": false,
  "spots": [1, 2, 3],
  "spotsCount": 3
}
```

---

## API v2026 Endpoints

### Структура

```
/api/v2026/
├── admin/                    # Админские эндпоинты (CRUD)
│   ├── countries/           # CRUD страны
│   ├── cities/              # CRUD города
│   ├── spots/               # CRUD места
│   ├── routes/              # CRUD маршруты
│   ├── events/              # CRUD события
│   ├── profiles/            # CRUD профили
│   ├── stories/             # CRUD истории
│   ├── reviews/             # CRUD отзывы (новая таблица)
│   ├── places/              # CRUD places (новая таблица)
│   ├── directions/          # CRUD directions (новая таблица)
│   ├── maps/                # CRUD оффлайн карты (новая таблица)
│   └── upload/              # Загрузка файлов
│
├── public/                   # Публичные эндпоинты (для сайта/клиентов)
│   ├── cities/              # Список городов, по ID
│   ├── spots/               # Места: по ID, по городу, по маршруту, по событию
│   ├── routes/              # Маршруты: по ID, по городу, по spot, по событию
│   ├── events/              # События: по ID, по городу, по spot, по маршруту
│   ├── search/              # Полнотекстовый поиск
│   └── countries/           # Список стран
│
└── user/                     # Пользовательские эндпоинты (требуют auth)
    ├── profile/             # Профиль пользователя
    └── favorites/           # Избранное (cities, spots, routes, events)
```

### Admin Endpoints Pattern

Для каждой сущности:
- `GET /api/v2026/admin/{entity}` - список с пагинацией, фильтрацией, сортировкой
- `GET /api/v2026/admin/{entity}/:id` - получить по ID
- `POST /api/v2026/admin/{entity}` - создать
- `PUT /api/v2026/admin/{entity}/:id` - обновить
- `DELETE /api/v2026/admin/{entity}/:id` - удалить

### Query Parameters (для списков)

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

### Формат ответа v2026

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalCount": 100,
    "totalPages": 10
  }
}
```

---

## Public Endpoints (для holyspots-site-v2026j)

Анализ `holyspots-site-v2026j/src/services/`:

### Cities
- `GET /api/v2026/public/cities` - все города
- `GET /api/v2026/public/cities/:id` - город по ID

### Spots (Points)
- `GET /api/v2026/public/spots` - все места
- `GET /api/v2026/public/spots/:id` - место по ID
- `GET /api/v2026/public/spots?city=:cityId` - места по городу
- `GET /api/v2026/public/spots?route=:routeId` - места по маршруту
- `GET /api/v2026/public/spots?event=:eventId` - места по событию

### Routes
- `GET /api/v2026/public/routes` - все маршруты
- `GET /api/v2026/public/routes/:id` - маршрут по ID (с pointIds)
- `GET /api/v2026/public/routes?city=:cityId` - маршруты по городу
- `GET /api/v2026/public/routes?spot=:spotId` - маршруты содержащие точку
- `GET /api/v2026/public/routes?event=:eventId` - маршруты по событию

### Events
- `GET /api/v2026/public/events` - все события
- `GET /api/v2026/public/events/:id` - событие по ID
- `GET /api/v2026/public/events?city=:cityId` - события по городу
- `GET /api/v2026/public/events?spot=:spotId` - события по месту
- `GET /api/v2026/public/events?route=:routeId` - события по маршруту

### Search
- `GET /api/v2026/public/search?q=text&city=:cityId&type=:type` - полнотекстовый поиск

### Countries
- `GET /api/v2026/public/countries` - все страны

---

## User Endpoints (для авторизованных)

### Profile
- `GET /api/v2026/user/profile` - профиль текущего пользователя
- `PUT /api/v2026/user/profile` - обновить профиль

### Favorites
- `GET /api/v2026/user/favorites` - все избранное пользователя
- `POST /api/v2026/user/favorites` - добавить в избранное
- `DELETE /api/v2026/user/favorites/:itemType/:itemId` - удалить из избранного

---

## Разделы админки (объединение макетов)

### Из старого макета v2012:
- **Spots** - места (есть в Supabase)
- **Regions** - регионы → маппится на `cities`
- **Guides** - гиды → маппится на `routes`
- **Maps** - оффлайн карты (нужна новая таблица)
- **Reviews** - отзывы (нужна новая таблица)
- **Places** - hotels, food (нужна новая таблица)
- **Directions** - направления (нужна новая таблица)

### Из текущей админки v2026j:
- **Countries** - страны (есть в Supabase)
- **Cities** - города (есть в Supabase)
- **Spots** - места (есть в Supabase)
- **Routes** - маршруты (есть в Supabase)
- **Events** - события (есть в Supabase)
- **Profiles** - пользователи (есть в Supabase)
- **Stories** - истории (есть в Supabase)
- **GPS Tracker** - GPS трекинг (route_track есть)
- **Route Optimizer** - оптимизатор маршрутов

---

## Новые таблицы для Supabase

### reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id UUID REFERENCES spots(id),
  rate INTEGER CHECK (rate >= 1 AND rate <= 5),
  text TEXT,
  date TIMESTAMPTZ DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false,
  is_mine BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### review_photos
```sql
CREATE TABLE review_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id),
  photo TEXT,
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### places
```sql
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id),
  type INTEGER, -- 0=HOTEL, 1=FOOD
  main_photo TEXT,
  name JSONB,
  descr JSONB,
  address TEXT,
  "order" INTEGER,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### directions
```sql
CREATE TABLE directions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id),
  name JSONB,
  descr JSONB,
  "order" INTEGER,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### offline_maps
```sql
CREATE TABLE offline_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id),
  file TEXT,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### user_favorites (уже используется в site)
```sql
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('city', 'spot', 'route', 'event')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_id, item_type)
);
```

---

## Files / Storage

### Подход: Гибридный

**API v2012** (для мобильных) - загрузка через backend:
```
POST /api/Data/AddReview
Content-Type: multipart/form-data

- Backend принимает multipart/form-data
- Загружает файлы в Supabase Storage (bucket: holyspots)
- Сохраняет относительные пути в БД
```

**API v2026** (для админки/сайта) - напрямую в Storage:
```
// Клиент загружает напрямую в Supabase Storage
const { error } = await supabase.storage.from('holyspots').upload(path, file);

// Backend только сохраняет URL/путь в БД
POST /api/v2026/admin/spots/:id
{ images: ["holyspots/image1.jpg", "holyspots/image2.jpg"] }
```

### Типы файлов

| Тип | Расширения | Применение |
|-----|------------|------------|
| Изображения | jpg, jpeg, png, webp, gif | Фото мест, событий, отзывов |
| Карты | mbtiles | Оффлайн карты для мобильных |
| Видео | mp4, mov, webm | Видео мест |
| Аудио | mp3, m4a, ogg | Аудиогиды |
| Документы | pdf | Материалы, гайды |

### Storage Structure

```
supabase-storage/
└── holyspots/                    # Main bucket
    ├── spots/                    # Фото мест
    │   └── {spot_id}/
    ├── events/                   # Фото событий
    │   └── {event_id}/
    ├── reviews/                  # Фото отзывов
    │   └── {review_id}/
    ├── routes/                   # Фото маршрутов
    │   └── {route_id}/
    ├── maps/                     # Оффлайн карты
    │   └── {city_id}/
    ├── media/                    # Видео, аудио
    │   └── {type}/{id}/
    └── avatars/                  # Аватары пользователей
        └── {user_id}/
```

### URL Format

```
# Относительный путь (хранится в БД):
holyspots/spots/uuid/image.jpg

# Полный URL через прокси:
https://sb.productmind.ru/storage/v1/object/public/holyspots/spots/uuid/image.jpg
```

### Backend Endpoints для файлов

**API v2012:**
- `POST /api/Data/AddReview` - multipart с фото отзыва

**API v2026:**
- `POST /api/v2026/admin/upload` - загрузка файла (если нужен proxy upload)
- `DELETE /api/v2026/admin/upload/:path` - удаление файла

---

## Swagger Files

- `openapi-v2012.yaml` - для `/api/` (совместимость с мобильными)
- `openapi-v2026.yaml` - для `/api/v2026` (новый API)

---

## Типы данных для сайта (models.ts)

```typescript
type Language = 'ru' | 'en' | 'hi';

interface City {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  images: string[];
  thumbnail: string;
  spots_count: number;
  routes_count: number;
  events_count: number;
  country: string;
}

interface Point {
  id: string;
  cityId: string;
  type: 'temple' | 'ashram' | 'kund' | 'other';
  name: Record<Language, string>;
  description: Record<Language, string>;
  images: string[];
  thumbnail: string;
  location: { latitude: number; longitude: number };
  point?: GeoJSON.Point;
}

interface Route {
  id: string;
  cityId: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  images: string[];
  thumbnail: string;
  pointIds: string[];
  distance?: number;
  duration?: number;
}

interface Event {
  id: string;
  cityId: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  images: string[];
  thumbnail: string;
  startDate: string;
  endDate?: string;
  type?: string;
}
```

---

## Open Questions

- [x] Какой формат ответа использует текущий API v2012? - `{code, msg, data}`
- [x] Требуется ли авторизация для API v2012? - Нет
- [x] Какой web framework использовать? - Express.js
- [x] Какая база данных? - Supabase (уже настроена)
- [x] Что нужно для сайта? - cities, spots, routes, events, search, favorites
- [x] Как обрабатывать загрузку файлов? - Гибридный подход (v2012 через backend multipart, v2026 напрямую в Storage)
- [x] Какие типы файлов? - Все (картинки, карты, видео, аудио, документы)
- [ ] Нужна ли миграция данных из старой базы v2012?
- [ ] Таблица user_favorites уже существует в Supabase?

---

## References

### Mobile (API v2012)
- `app/holyspots-mobile-java-v2012/app/src/main/java/ru/growapps/holyspots/server/DataService.java`
- `app/holyspots-mobile-java-v2012/app/src/main/java/ru/growapps/holyspots/model/*.java`

### Admin (API v2026/admin)
- `app/holyspots-admin-v2026j/src/services/supabaseService.ts`
- `app/holyspots-admin-v2026j/src/integrations/supabase/types.ts`
- `design/holyspots-full-maket-v2012/06 Админка.dc.html`

### Site (API v2026/public)
- `app/holyspots-site-v2026j/src/services/citiesService.ts`
- `app/holyspots-site-v2026j/src/services/pointsService.ts`
- `app/holyspots-site-v2026j/src/services/routesService.ts`
- `app/holyspots-site-v2026j/src/services/eventsService.ts`
- `app/holyspots-site-v2026j/src/contexts/AuthContext.tsx`
- `app/holyspots-site-v2026j/src/types/models.ts`

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-07-16
- [x] Notes: Requirements approved, proceeding to SPECIFICATIONS phase
