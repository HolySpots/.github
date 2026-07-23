# HolySpots Admin — Interactive Prototype (V3)

Flutter recreation of the HolySpots admin panel, **V3 — original admin style** from the design system:
cloud canvas (`#dce8ec`), a **top pill navigation bar**, white cards, blue `#00ace9` for save/add and
coral `#fe835d` for delete — modernized to 2026. Same functionality as the ASP.NET original.

Single codebase, **adaptive** across:
- **Phone** (iPhone / Android): `AppBar` + hamburger `Drawer`, stacked cards, 44px+ touch targets.
- **Tablet** (iPad / Android tablet): top pill bar (horizontally scrollable) + table rows.
- **Desktop** (Windows / macOS / Linux) & web: full top pill bar with labels, dense tables, hover states.

Layout switches on window width (`lib/responsive.dart`): `<600` phone · `600–1100` tablet · `≥1100` desktop.

## Screens
Login → app shell with the original menu order: **Города · Споты · Маршруты · Карты · Места · Направления · Отзывы**, plus the full **spot editor**.

## Functionality (interactive)
- Manual ordering everywhere via drag handles (⋮⋮) — `ReorderableListView`.
- Spots: filter by city; row/​add opens the spot editor.
- Routes: two-level tree (groups + nested items).
- Reviews: All / Approved / Pending filter; **approve** (✓) and **delete** (✕) mutate the list live.
- Spot editor: removable city chips, work-time day toggles + timezone, videos, iBeacon, images, map with pin.
- Add / delete on every table (delete asks for confirmation).

Data is in-memory mock content (`lib/store.dart`) — no backend.

## Run
```bash
flutter pub get
flutter run                 # attached device / emulator
flutter run -d chrome       # web
flutter run -d windows      # or macos / linux (enable desktop first)
```
Requires Flutter 3.10+ (Dart 3). The brand logo is bundled at `assets/holyspots_app_icon.png`.

> Fonts: uses Flutter's bundled Roboto (the design system's typeface). No extra font files needed.
