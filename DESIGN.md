---
name: Smart Mattress & Electric Bed Prototype
description: English and Simplified Chinese sleep review and adjustable bed interface, documented from the current HTML prototype.
colors:
  navy-950: "#071521"
  navy-900: "#102536"
  navy-800: "#19384a"
  aqua-300: "#97f0d8"
  aqua-500: "#4fbda2"
  aqua-700: "#237f6e"
  blue-500: "#477cc2"
  neutral-0: "#ffffff"
  neutral-50: "#f4f7f6"
  neutral-100: "#e9f0ee"
  neutral-200: "#d8e3df"
  neutral-500: "#5e7276"
  neutral-700: "#344b51"
  sleep-deep: "#6478bd"
  sleep-rem: "#9b88d4"
  sleep-light: "#4a9eaf"
  sleep-awake: "#bd8151"
  pressure-low: "#e3eeeb"
  pressure-medium: "#92d9c6"
  pressure-high: "#3f967f"
typography:
  display:
    fontFamily: "Kanit, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Kanit, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Kanit, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Kanit, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Kanit, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  small: "8px"
  medium: "14px"
  large: "16px"
  pill: "999px"
spacing:
  micro: "2px"
  xs: "4px"
  tiny: "5px"
  compact: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"
  5xl: "48px"
  6xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.navy-950}"
    textColor: "{colors.aqua-300}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.neutral-0}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  card-surface:
    backgroundColor: "{colors.neutral-0}"
    rounded: "{rounded.large}"
  nav-active:
    backgroundColor: "{colors.navy-800}"
    textColor: "{colors.aqua-300}"
    typography: "{typography.label}"
    rounded: "{rounded.small}"
    padding: "0 12px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.navy-950}"
    textColor: "{colors.aqua-300}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "44px"
  sleep-stage-segment:
    height: "44px"
  bed-angle-range:
    height: "44px"
---

# Design System: Smart Mattress & Electric Bed Prototype

## Overview

**Working creative north star: “The Calm Sleep Instrument.”** This is a descriptive name for the implemented visual direction, not an approved product or brand name. The interface is an English and Simplified Chinese operating prototype for scanning sleep information and trying bed controls. It combines calm, spacious surfaces with clear, instrument-like data details so health-adjacent numbers remain easy to inspect.

The visual reference is [Minimalismo Sereno de Bem-Estar](https://designmd.app/library/minimalismo-sereno-de-bem-estar), used for its calm, low-noise mood and breathing space. Its palette, typography, and landing-page composition were not copied: the prototype keeps the project’s provisional deep navy and aqua palette, uses the requested Kanit font with Chinese glyph fallbacks, and retains a compact dashboard structure. Report presentation follows the meeting brief’s request for professional scanability, with Grow cited only as a clarity reference, not a brand or screen to reproduce. [UX/UI Agent Skills](https://github.com/plugin87/ux-ui-agent-skills) informed the use of DTCG-style tokens, reusable component rules, and WCAG-oriented interaction checks; its repository was a reference, not a bundled runtime dependency.

**Key Characteristics:**
- English and Simplified Chinese labels on calm light surfaces, anchored by deep navy and aqua.
- Repeated sleep-stage and pressure colors, with text labels and legends alongside color.
- A 16-step night signal and compact data panels keep the experience scannable.
- Provisional visual identity: no approved product name or logo is recorded.

The YAML values here mirror the implemented tokens in [`design-tokens.json`](design-tokens.json). The prototype loads that JSON and exposes the values as CSS custom properties. When a visual token changes, update the JSON and this frontmatter together; do not create a competing CSS value.

## Colors

The palette uses deep blue-black for navigation and selected controls, aqua for the brand-on-dark accent, soft green-gray neutrals for reading surfaces, and distinct hues for stage and pressure states.

### Primary
- **Deep Navy** (`#071521`): Main ink, primary controls, and the dark navigation rail.
- **Navy Structure** (`#102536`, `#19384a`): Navigation hover and active-state layers.
- **Aqua Highlight** (`#97f0d8`): Selected text and marks on navy surfaces.
- **Aqua Signal** (`#4fbda2`, `#237f6e`): Slider progress and positive status accents.
- **Focus Blue** (`#477cc2`): Keyboard focus ring.

### Neutral
- **Soft Canvas** (`#f4f7f6`): Main page background.
- **White Surface** (`#ffffff`): Cards and controls.
- **Mist Surface** (`#e9f0ee`): Quiet surface fills and secondary hover states.
- **Divider Mist** (`#d8e3df`): Borders and separators.
- **Muted Ink** (`#344b51`, `#5e7276`): Supporting copy, captions, and metadata.

### Data Colors
- **Deep Sleep** (`#6478bd`), **REM** (`#9b88d4`), **Light Sleep** (`#4a9eaf`), and **Awake** (`#bd8151`): Sleep-stage timeline and report breakdown.
- **Pressure Low** (`#e3eeeb`), **Pressure Medium** (`#92d9c6`), and **Pressure High** (`#3f967f`): Synthetic pressure-map cells and legend.

**The Sample-State Rule.** A stage or pressure color is always paired with a visible name, legend, or accessible description. Never present these colors as a clinical interpretation.

## Typography

**Display Font:** Kanit, with Noto Sans SC, Microsoft YaHei, and sans-serif fallbacks  
**Body Font:** Same stack; Kanit is the primary Latin typeface, Noto Sans SC supplies Simplified Chinese glyphs, and Microsoft YaHei is the next Chinese-capable system fallback.  
**Data Font:** Same stack with tabular numerals where values need column alignment. Kanit and Noto Sans SC are requested from Google Fonts; Microsoft YaHei and the generic sans-serif fallback remain available according to local system fonts.

**Character:** Kanit gives the English interface a geometric, contemporary feel; Noto Sans SC keeps Simplified Chinese text legible and complete. The prototype uses medium-to-semibold headings and regular body text rather than importing the reference template’s Nunito display style.

### Hierarchy
- **Display** (500, 40px, 1.2 line-height, `-0.035em`): The night-duration figure and other prominent measurements.
- **Headline** (600, 28px, 1.2, `-0.025em`): Page titles on desktop; reduced to the subhead scale on narrow screens.
- **Title** (600, 20px, 1.2, `-0.025em`): Section and card headings.
- **Body** (400, 16px, 1.5): Default English and Simplified Chinese UI copy.
- **Label** (500, 14px, 1.5): Navigation, controls, and compact UI labels. Captions use the existing 12px token.

**The Numeric Clarity Rule.** Keep measurement values on the existing tabular-numeral treatment; do not use decorative type for sensor-like readings.

## Localization & Language Behavior

The prototype supports English (`en`) and Simplified Chinese (`zh-CN`). English is used when no language preference has been saved. The header selector switches languages and stores the choice in this browser so it is restored on a later visit. Switching language updates the document language, title, description, visible labels, dynamic status messages, and translated accessible names and descriptions. Date labels use the matching English or Simplified Chinese locale.

Durations follow each language’s reading conventions: English uses compact `h`/`m` labels in sleep-stage rows, while Chinese uses compact `时`/`分` labels. On narrow report layouts, the Chinese stage-duration column uses the existing wider `stageValueWidth` token (64px); the compact English column uses `stageValueWidthCompact` (54px). Keep both formats on one line and retain the token-defined column widths so stage names and bars remain scannable.

## Layout

The desktop shell uses a fixed 252px navigation rail, a 68px sticky top bar, and a centered content region capped at 1240px. Home pairs the 16-segment night timeline with pressure and suggestion panels; report and settings use the same alignment and surface language. Spacing follows the token scale from 2px micro-gaps through 64px section breathing room.

At 1080px, secondary columns compress; at 760px, the left rail becomes a compact header with a four-item bottom navigation, and content panels stack. At 380px, horizontal padding and metric gaps tighten. The design supports a minimum 320px viewport. The 16-step signal can scroll horizontally on compact screens while its time and selected-segment detail stay inspectable.

## Elevation & Depth

Depth is restrained and combines thin neutral borders with two subtle shadows. `shadow.soft` is `0 12px 36px rgba(7, 21, 33, 0.08)` for broader floating surfaces; `shadow.lift` is `0 4px 14px rgba(7, 21, 33, 0.12)` for the slider thumb and compact raised controls. Do not add extra shadow values or use shadows to imply sensor confidence.

## Shapes

The shape system uses 8px small, 14px medium, and 16px large radii, with 999px pill controls. Cards use the large radius and 1px divider border; selected states use existing color and outline tokens. The standard keyboard focus outline is 3px with a 3px offset, in the focus-blue token.

## Components

### Navigation
- The desktop navigation is a navy rail with localized English or Simplified Chinese labels and line icons. Active links use the navy-800 surface and aqua text, plus a small current-page marker.
- At mobile widths, navigation moves to a fixed bottom bar. The electric-bed control item is removed in mattress-only mode.
- The language selector switches between English and Simplified Chinese and remembers the selected language in this browser.
- Links remain anchors with visible focus and `aria-current` on the active page.

### Buttons, Chips, and Inputs
- Primary actions use a navy pill with aqua text. Secondary/preset controls use a white pill with a quiet border; pressed states are explicit.
- Report period chips show Daily, Weekly, and Monthly sample views, with one selected state at a time.
- Bed-angle range inputs have a 0–60° sample range, a visible value, a labelled control, and a touch-sized interaction area. They change the prototype state only.

### Cards and Data Panels
- `.surface` is a white card with a 1px neutral border and 16px corner radius. Padding comes from the relevant component token and varies by panel and viewport.
- **Night Signal:** Sixteen selectable segments use the four stage tokens. Selecting one updates its time, stage, posture, and example bed angle in the inspector.
- **Pressure Map:** A 10-by-9 grid shows synthetic low, medium, and high pressure zones; a text legend and accessible image label explain the map.
- **Report:** Daily, weekly, and monthly states display example duration, heart-rate chart, stage durations, movement and posture summaries, bed-angle examples, and the pressure map.
- **Suggestion:** Home includes one cautious observation with a visible sample-data label. It is demonstration copy, not a model result or health recommendation.

### Bed Controls and Profile
- **Bed Control:** Left and right sides keep separate head and leg angle values. Preset buttons change the selected side; saving a preset writes to this browser’s local storage. No hardware command is sent.
- **Device Mode:** Profile switches between electric-bed and mattress-only presentation. Mattress-only mode hides the control navigation and returns to Home if Control was open.
- **Profile Settings:** The account card and notification switch are illustrative settings. They do not authenticate a user or configure a production notification service.

### Responsive and Accessible Behavior
- A skip link, semantic landmarks, labelled controls, keyboard focus styling, live status text, and reduced-motion handling are implemented.
- The product’s working target is WCAG 2.2 AA and a minimum 44px touch target for main controls. This documents intent and implementation patterns; it is not a conformance certification.

## Do's and Don'ts

### Do:
- **Do** use the tokens from [`design-tokens.json`](design-tokens.json) for colors, type, spacing, radii, shadows, motion, and component dimensions.
- **Do** preserve both supported languages and the desktop-to-mobile navigation behavior.
- **Do** keep English and Simplified Chinese strings, document language, and accessible labels in sync when editing interface copy.
- **Do** use the Kanit → Noto Sans SC → Microsoft YaHei → sans-serif font stack and the existing Chinese report-duration layout tokens.
- **Do** mark sleep, sensor, pressure-map, posture, and suggestion content as synthetic sample data.
- **Do** keep left/right bed targets explicit and show each selected angle in degrees.
- **Do** pair stage and pressure colors with text, legends, or accessible descriptions.
- **Do** retain keyboard focus visibility and the reduced-motion preference.

### Don't:
- **Don't** invent a product name, official logo, sensor capability, clinical meaning, AI accuracy, or live hardware connection.
- **Don't** treat example heart-rate or sleep figures as real measurements or medical advice.
- **Don't** add pet detection or pet-related sleep interpretation to this Phase 1 concept; it assumes one person.
- **Don't** create ad hoc color, font, spacing, radius, shadow, or motion values. If a value is missing, propose it for owner approval before using it.
- **Don't** overwrite `dist/index.html`; it is the existing project brief artifact.

