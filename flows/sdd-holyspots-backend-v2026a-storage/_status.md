# Status: sdd-holyspots-backend-v2026a-storage

## Current Phase

SPECIFICATIONS

## Phase Status

DRAFTING (awaiting review)

## Last Updated

2026-07-17 by Claude

## Blockers

- Ожидается review specifications от пользователя

## Progress

- [x] Requirements drafted
- [x] Requirements approved (2026-07-17)
- [x] Specifications drafted
- [ ] Specifications approved
- [ ] Plan drafted
- [ ] Plan approved
- [ ] Implementation started
- [ ] Implementation complete

## Context Notes

- **Related flow**: `sdd-holyspots-backend-v2026a-endpoints` (COMPLETED)
- **Backend**: `app/holyspots-backend-v2026a/node/`
- **Delivery**: HTTP 302 redirect → `https://sb.productmind.ru/storage/v1/object/public/holyspots/{key}`
- **Path mapping**: flatten subfolders → `/Images/{basename}`, `/Maps/{basename}`, `/downloads/{basename}`
- **Review photos**: API returns `/Images/*{basename}`; sized variants at `180/`, `1242/` in Storage
- **Case**: both `/Images/` and `/images/` (and Maps/Downloads variants)
- **New files planned**: `routes/legacyStorage.js`, `utils/legacyPathUtils.js`
- **Modify**: `index.js`, all v2012 transformers, `storageService.js`

## Next Actions

1. User review `02-specifications.md`
2. После "specs approved" → фаза PLAN
