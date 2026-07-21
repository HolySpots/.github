---
name: holyspots-design
description: Use this skill to generate well-branded interfaces and assets for HolySpots, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — full brand guide (content voice, visual foundations, iconography, responsive rules).
- `styles.css` → `tokens/` — colors, typography, spacing, effects as CSS custom properties. Link `styles.css`.
- `assets/` — `brand/` (app icon, splash), `icons/` (mobile PNG glyph set), `admin-icons/`, `images/` (real region/guide photography, spots background, scrim gradient).
- `components/{core,mobile,admin}/` — reusable React primitives (`export function Name`). Read each `.prompt.md` for usage.
- `ui_kits/{mobile,admin}/` — full interactive screen recreations to copy from.
- `guidelines/*.card.html` — foundation specimens.

## Essentials
- One brand blue: `#00ace8`. Coral `#fe835d` for destructive only. Long neutral gray ramp on white; admin sits on cloud `#dce8ec`.
- Roboto (300/400/500). Mobile is square-edged and photo-led with a bottom gradient scrim over images (never capsules). Admin rounds 5–9px and uses a serif face for data-entry fields.
- Icons are the copied PNG set — do not hand-draw SVGs or use emoji in product copy. The brand mark exists only as raster; render "HolySpots" in Roboto Medium where no mark fits.
- Sentence case for prose/buttons; ALL-CAPS for status/action labels (OPENED, CHECK IN). Warm, plain, second-person voice.
