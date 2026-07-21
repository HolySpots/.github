# HolySpots Design System

HolySpots is a pilgrimage travel guide: a mobile app (iOS + Android) that helps seekers discover holy places — temples, ashrams, sacred rivers — organized by region, with offline maps, guides, reviews with photo uploads, check-ins, and nearby hotels/food/routes. It is donation-supported (PayPal) and fully bilingual (English/Russian). Behind it sit an ASP.NET MVC admin panel and a C# backend with a token-localized SQL database.

This design system unifies the best of the two 2012-era native apps and the admin panel, modernized to 2026 practice (CSS custom properties, responsive layouts for iPhone/iPad/Android phones & tablets/web/desktop, ripple-era press states replaced with documented hover/press tokens) — while keeping the exact colors, radii, sizes and copy of the originals. Nothing was invented; every value traces to source.

## Sources
- https://github.com/holyspots/holyspots-mobile-swift-v2012 — iOS app (Obj-C): view controllers, PNG icon set, splash/app icon, colors in `Utils/Constants.h`
- https://github.com/holyspots/holyspots-mobile-java-v2012 — Android app: `res/values/color.xml`, `styles.xml`, `strings.xml`, all screen layouts (the richest UI spec)
- https://github.com/holyspots/holyspots-admin-asp-v2012 — admin panel: `Content/admin.less`, `login.less` (the only real stylesheet in the estate)
- https://github.com/holyspots/holyspots-backend-csharp-v2012 — C# backend (entities: Region, Spot, Guide, Place, Direction, Map, Review, WorkTime)
- https://github.com/holyspots/holyspots-db-v2012 — DB CSVs: real content (11 regions, ~900 spots, guides, reviews)

Readers with access should explore these repos further — especially the Android `res/layout/` XMLs and `admin.less` — to design with higher fidelity.

## CONTENT FUNDAMENTALS
- **Voice**: simple, warm, direct second person. "Find Holy places near you", "Would you like to download map for using without the Internet?" Slightly imperfect ESL English is authentic to the product; when writing new copy, keep it short and plain but grammatical.
- **Spiritual framing without preachiness**: "HolySpots is your guide into the spiritual world", "Discover the pilgrimage routes", "Unique content".
- **Casing**: sentence case for prose and buttons ("Submit", "Download map"). ALL-CAPS reserved for status/action labels: `OPENED`, `CLOSED`, `CHECK IN`, `YOU WERE HERE`, `DELETE`.
- **Questions as dialogs**: alerts ask polite questions — "Did you like this place?", "New data from server. Would you like to update?"
- **Playfulness in donations only**: "donate $1, or more ;)" — a winking emoticon, not emoji.
- **Emoji**: never in product UI copy. (User reviews contain them — that's user content.)
- **Bilingual**: every string exists in EN and RU (`values-ru/strings.xml`, `TokensLocalized`). Design for ~30% longer Russian strings.
- **Domain nouns**: Spots, Regions, Guides, Reviews, Hotels, Food, Route, Check-in, Offline maps. "Spot" (not "place") is the core noun; "Places" = hotels/restaurants.
- Section labels are single words: Reviews · Hotels · Food · Route. Empty states say "No information to display".

## VISUAL FOUNDATIONS
- **Color vibe**: sky. One saturated cyan-blue `#00ace8` carries the whole brand (map pin, buttons, links, selected states), supported by lighter blues `#47bfed`/`#60aae5` and the admin's pale cloud `#dce8ec`. Warm coral `#fe835d` is the only counter-color (cancel/delete). Everything else is a long neutral gray ramp on white.
- **Two temperaments, one palette**: the mobile app is airy white with black/gray text and photo-led content; the admin is denser, sits on cloud-`#dce8ec` canvas with white cards/pills.
- **Type**: Roboto (Light 300 for long descriptions, Regular 400 for UI, Medium 500 for emphasis like CHECK IN / work status). Descriptions use 16px / 1.5 line-height. Admin body is a large 18px; data-entry fields are set in serif — a deliberate old-catalog quirk worth keeping.
- **Imagery is the hero**: full-bleed photography of temples and rivers. Region cards are 180px photo strips; spot detail opens with a 280px photo pager. Text sits directly on photos protected by a bottom black **gradient scrim** (`gradient.png` → `--scrim-photo`) — never capsules.
- **Backgrounds**: flat white (mobile) or flat `#dce8ec` (admin). No patterns, no textures, no brand gradients. The only gradient in the system is the photo scrim.
- **Corners**: mobile surfaces are square-edged; photos bleed to edges. Rounding belongs to the admin: 5px cards, 6px chips/selects, 7px buttons, 9px login inputs. Never large radii.
- **Cards**: mobile "cards" are borderless full-width rows separated by hairline dividers (#e0e0e0) — not floating cards. Admin content lives in bordered tables (#dce8ec 1px) and white pills.
- **Shadows**: almost none. 2012 used baked PNG shadow strips under toolbars/list tops; use `--shadow-list-top` / `--shadow-toolbar`. Dialogs float with `--shadow-dialog`.
- **Buttons**: admin buttons are big (59px tall, 184px wide, 7px radius) and color-coded: save = `#47bfed` filled, add/edit = cloud bg with blue text + left icon, delete = coral filled, cancel = cloud bg with coral text. Mobile actions are full-width 50px bars (blue filled CHECK IN) or bare text/icons.
- **Hover (2026)**: darken primary to `#0091c4`; on cloud/white surfaces use a 4–6% black overlay. **Press**: 12% black overlay (`--press-overlay`) — the ripple's descendant. No scale/shrink effects.
- **Animation**: modest and functional — images fade in, dialogs slide up from bottom (donate) or fade (alerts), swipe-back interactive transitions on iOS. 150–250ms, `--ease-standard`. No bounces.
- **Transparency/blur**: none. Toolbars are opaque `#f5f5f5` (or fully transparent over photos with white icons + shadow). No glassmorphism.
- **Layout rules**: toolbar (56px) is fixed; content scrolls under it. Bottom action bars (check-in) are fixed. Lists are edge-to-edge; text blocks inset 15px.
- **Photo color**: warm natural travel photography — golden temples, blue sky, saffron robes. Never filtered, never b&w.

## ICONOGRAPHY
- **Brand mark**: a map pin shaped like a Vaishnava tilaka (U + teardrop), white on brand blue. Copied: `assets/brand/holyspots_app_icon.png`, `assets/brand/splash.png`. No vector logo exists in the repos — only rasters. (Do not redraw it.)
- **App icons**: the original PNG set (thin-line, mixed filled/outline, gray `#9b9b9b` and white variants) is copied into `assets/icons/` — back, map, pin, search, check-in flag, close, picture, locate, download, food/stay/way/message minis, play, donate heart-in-hands, and the 3-smile rating faces (sad/normal/happy in gray & blue, plus circled versions).
- **Admin icons**: small blue/white glyph PNGs in `assets/admin-icons/` — add, edit, remove (×), approve (✓), calendar, clock, arrows, login/logout.
- No icon font, no SVGs, no emoji-as-icons anywhere in the sources. Use the PNGs at their natural ~½ size (they are @2x). If a needed glyph is missing, prefer a Lucide outline icon at 1.5px stroke and flag it.
- Unicode: only `…` (Loading…, Search…) and `;)` in donate copy.

## Responsive & adaptive (2026 layer)
Breakpoints: ≤480 phone · 481–1024 tablet · ≥1025 desktop/web.
- **Phones (iPhone/Android)**: single column, edge-to-edge lists, fixed toolbar + bottom action bar, 44px minimum touch targets.
- **Tablets (iPad/Android)**: split view — regions/spots list (~380px pane) + map or detail on the right; spot hero grows to 360px; use `spots_background_ipad.png` for launch/empty states.
- **Web/desktop**: admin patterns — cloud canvas, centered content up to 1200px, pill menu top bar; hover states active. The mobile app's map+list becomes a two-pane browser layout.
- Density: touch controls (59px admin buttons were desktop-mouse era; keep 59px pills on desktop, 44–50px on touch).

## Index
- `styles.css` → imports `tokens/` (fonts, colors, typography, spacing, effects)
- `assets/` — `brand/` (app icon, splash), `icons/` (mobile PNG set), `admin-icons/`, `images/` (real region/guide photos, spots background, scrim)
- `components/core/` — Button, IconButton, Input, Select, CheckboxChip
- `components/mobile/` — AppToolbar, Tabs, RegionCard, SpotListItem, SmileRating, StatusLabel, CheckInBar, ReviewCard
- `components/admin/` — AdminMenu, DataTable, Pagination
- `guidelines/` — foundation specimen cards (Design System tab)
- `ui_kits/mobile/` — interactive app recreation (Spots → Region → Spot detail)
- `ui_kits/admin/` — login + regions table + spot editor
- `SKILL.md` — agent skill entry point

## Intentional additions
- Hover states, focus rings, and shadow tokens (2026 web needs them; 2012 native apps had ripples/none).
- Responsive breakpoints & split-view guidance (original apps predate adaptive layouts).
- Google-Fonts Roboto substitution (no binaries in repos) — flagged for replacement if the team has licensed originals.
