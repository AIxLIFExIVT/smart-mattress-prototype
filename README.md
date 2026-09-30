# Smart Mattress Prototype

A static, bilingual interface prototype for a smart mattress and electric bed. It uses HTML, CSS, and JavaScript; no build step is required.

## Included

- English and Simplified Chinese interface
- Kanit with Noto Sans SC and system font fallbacks
- Home, Bed Control, Sleep Report, and Profile screens
- Web, iPhone, and iPad preview modes with responsive interactive device frames
- Independent or linked bed-motor models, six body cells arranged as three paired air zones, and a separate pressure-mat preview
- Named position profiles with save/update actions; illustrative AI insight for user review
- Design tokens and implementation guidance

## Important

All sleep, pressure, heart-rate, air-cell, device-feedback, and AI suggestion values are illustrative sample data. Pressure units, ranges, and raw sensor scales live in an editable mock configuration and are not hardware specifications. Controls and saved profiles update this browser prototype only. It does not connect to a bed, sensors, APIs, accounts, or health services.

## Preview

Open `index.html` from a local static web server. On wider screens, use the **Web / iPhone / iPad** switch in the upper-right area to change between the dashboard and scaled, interactive device previews. The iPad preview uses a landscape layout; at mobile widths the site uses its responsive iPhone layout. `netlify.toml` configures the repository root as the publish directory.

## Design rules

Read `DESIGN.md` and `design-tokens.json` before changing interface styles. Use existing tokens for visual values. If a needed value is missing, propose it and get product-owner approval before adding it.
