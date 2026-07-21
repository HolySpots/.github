# Status: sdd-holyspots-backend-v2026a-endpoints

## Current Phase

IMPLEMENTATION

## Phase Status

COMPLETED

## Last Updated

2026-07-16 by Claude

## Blockers

- None

## Progress

- [x] Requirements drafted
- [x] Requirements approved (2026-07-16)
- [x] Specifications drafted
- [x] Specifications approved (2026-07-16)
- [x] Plan drafted
- [x] Plan approved (2026-07-16)
- [x] Implementation started
- [x] Implementation complete (2026-07-16)

## Context Notes

Key decisions and context for resuming:

- **Web Framework**: Express.js
- **База данных**: Supabase (PostgreSQL) через `https://sb.productmind.ru`
- **Авторизация API v2012**: Без авторизации (только Accept-Language header)
- **Авторизация API v2026**: Позже (не в этой итерации)
- **Формат ответа v2012**: `{code: 0|1|100, msg: string, data: array}`
- **Формат ответа v2026**: `{success: boolean, data: array, pagination: {...}}`
- **Backend location**: `app/holyspots-backend-v2026a/node/`

### Существующие таблицы Supabase:
- countries, cities, spots, routes, events, profiles, stories
- spot_route, spot_event, route_event, route_track

### Новые таблицы (нужно создать):
- reviews, review_photos, places, directions, offline_maps
- user_favorites (возможно уже есть, используется в site)

### Маппинг v2012 → Supabase:
| v2012 Model | Supabase Table |
|-------------|----------------|
| Region | cities |
| Spot | spots |
| Guide | routes |
| Review | reviews (новая) |
| Place | places (новая) |
| Direction | directions (новая) |
| Map | offline_maps (новая) |

### API Structure:
- `/api/` - v2012 compatible (для мобильных)
- `/api/v2026/admin/` - админские эндпоинты (CRUD для админок)
- `/api/v2026/public/` - публичные эндпоинты (для сайта holyspots-site-v2026j)
- `/api/v2026/user/` - пользовательские эндпоинты (profile, favorites)

### Swagger files:
- `openapi-v2012.yaml` - для `/api/`
- `openapi-v2026.yaml` - для `/api/v2026`

### Files/Storage:
- **Подход**: Гибридный (v2012 через backend, v2026 напрямую в Storage)
- **Bucket**: `holyspots` в Supabase Storage
- **Proxy URL**: `https://sb.productmind.ru/storage/v1/object/public/`
- **Типы файлов**: картинки, карты (mbtiles), видео, аудио, документы

## Next Actions

1. Ждем approval требований от пользователя
2. После approval → переход к фазе SPECIFICATIONS
3. Создать новые таблицы в Supabase
