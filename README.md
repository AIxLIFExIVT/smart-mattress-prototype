# Smart Mattress Prototype

A static, bilingual interface prototype for a smart mattress and electric bed. It uses HTML, CSS, and JavaScript; no build step is required.

## Included

- English and Simplified Chinese interface
- Kanit with Noto Sans SC and system font fallbacks
- Home, Bed Control, Sleep Report, and Profile screens
- Web and phone preview modes with a responsive, interactive device frame
- Design tokens and implementation guidance

## Important

All sleep, pressure, heart-rate, and AI suggestion values are illustrative sample data. Controls update this browser prototype only. It does not connect to a bed, sensors, accounts, or health services.

## Preview

Open `index.html` from a local static web server, or deploy this repository to a static hosting service. On wider screens, use the **Web / Phone** switch in the upper-right area to change between the dashboard and a scaled, interactive phone mockup. At mobile widths, the site automatically uses its responsive mobile layout. `netlify.toml` configures the repository root as the publish directory.

## Design rules

Read `DESIGN.md` and `design-tokens.json` before changing interface styles. Use existing tokens for visual values. If a needed value is missing, propose it and get product-owner approval before adding it.
