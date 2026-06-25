# One UI 9 Design System

A faithful recreation of the **One UI 9** design language — the visual style of
Samsung's Galaxy software (the family that includes One UI 7's "Now Bar" era and
its successors). Light-first, deeply rounded, confidently typographic, with a
single blue accent, expressive tonal avatars, and translucent blurred media
surfaces.

> **Sources.** This system was built from two reference screenshots provided by
> the user (no codebase or Figma was supplied):
> - `uploads/Screenshot_20260621_014653_Phone(1).jpg` — the Phone › *Contactes*
>   view (Catalan locale): big centered blue title, white grouped cards,
>   colorful avatar circles, floating pill bottom-nav.
> - `uploads/Captura de pantalla 2026-06-21 162016.png` — lock screen + media
>   player: purple wallpaper, translucent "Now Bar" media controls, blurred
>   output-picker sheet.
> - Four more (June 2026): `Screenshot_20260621_220026_Calendar.jpg`,
>   `..._220030_Calendar.jpg`, `..._220036_Calendar.jpg` (Samsung Calendar month
>   view, nav drawer, and Calendar settings) and `..._220048_Samsung Notes.jpg`
>   (Samsung Notes home). These drive the Calendar/Settings kits and the
>   large-title + blue-settings-value patterns.
> - `uploads/Samsung OneUI 9.0 - FIRST LOOK 😍.mp4` — a 22s first-look reel
>   (credit @techdroider). Frames extracted to `uploads/frames/`. Confirms the
>   adaptive lock-screen Now Playing experience: wallpaper retints to the album
>   art, a **wavy seekbar**, glassy round transport, the **collapsed Now Bar**
>   pill, and a fluid liquid-blob wallpaper transition.
>
> Everything else is reconstructed from the well-known One UI design language.
> Where exact assets are proprietary (the **One UI Sans** typeface, the One UI
> icon set), the closest free substitutes are used and **flagged** below.

---

## Content fundamentals

How One UI writes copy:

- **Voice is plain, calm, and literal.** It states what a thing is, never sells.
  Labels are nouns or short verb phrases: *Save*, *Cancel*, *New contact*,
  *Missed call*, *Phone speaker*.
- **Sentence case everywhere.** Buttons, menu items, settings rows, dialog
  titles — all sentence case (*"Add to favorites"*, not *"Add To Favorites"*).
  Screen titles are the one exception: a single capitalized noun (*Telèfon*,
  *Recents*, *Settings*).
- **Counts and context, stated flatly.** Supporting lines report facts:
  *"1257 contactes amb número de telèfon"*, *"Cast video"*, *"This phone"*.
- **Second person, sparingly.** The UI addresses *you* only when needed
  (*"Swipe to unlock"*); most chrome is impersonal labels.
- **No emoji, no exclamation, no jokes.** Tone is utilitarian and quietly
  premium. Punctuation is minimal — middots (·) separate metadata
  (*"Mobile · Favorites"*).
- **Localized fully.** The reference is Catalan; the system is locale-agnostic.
  Don't hardcode English where a real string would be translated.

Vibe: *quiet confidence*. Big friendly type, lots of air, nothing shouting.

---

## Visual foundations

- **Color.** Light-first. App background is a soft cool gray
  (`--bg-app` `#EDEEF2`); content sits on **white** cards (`--surface-card`).
  A single **blue** carries every interactive accent — bright `--blue-500`
  `#1C6FE0` for actions, a deep navy `--blue-700` `#174E96` for big "expressive"
  titles. Avatars/chips draw from an **expressive tonal palette** (periwinkle,
  coral, forest, lavender, violet, rose, teal, amber). Status: green success,
  red danger, coral warning.
- **Type.** `--font-sans` (One UI Sans → **Hanken Grotesk** substitute). Big and
  bold. The defining trait is the **large collapsing title**: top-level screens
  open with an oversized bold heading (~38px/700, usually **black**, e.g.
  *Notes*, *JUNY*) sitting in a generous top area, with the toolbar pushed
  *beneath* it into thumb reach. Blue titles (`--text-title`) are reserved for
  **settings sub-pages**. List rows 19px/500, body 16px/400. Tight tracking on
  large sizes. The lock-screen clock is the exception — a thin 72px/300 numeral.
- **Settings rows.** A One UI signature: a row's **value sits under its label in
  blue** (`--text-value`), not gray — e.g. *Primer dia de la setmana* / **Dilluns**.
  Section eyebrows are small gray labels (*Informació opcional*). Toggles are
  blue-on; a faint vertical hairline often precedes the toggle.
- **Spacing.** 4px base grid. One UI *breathes*: 24px screen gutters, tall 72px
  list rows, generous card padding. Touch targets ≥ 48px.
- **Corner radius.** Everything is round. Cards `--radius-lg` 24px, sheets 28px,
  inputs 18px, and all controls (buttons, chips, nav, toggles, FAB) are full
  **pills** (`--radius-pill`).
- **Backgrounds.** Solid cool gray for app surfaces — *no* gradients in chrome.
  Gradients appear only as **wallpaper** behind the lock screen / Now Bar, where
  they're soft, cool-leaning (lilac → periwinkle). Imagery is cool and slightly
  desaturated.
- **Calendar grid.** Month view: colored 3px **category bars + truncated text**
  per event, **multi-day events as rounded spanning bands**, today = a **red
  rounded date badge**, Sundays in red, weekend columns faintly tinted, week
  numbers in the left gutter, and a floating **quick-add pill** at the bottom.
  **Emoji appear in user content** (event titles) but never in chrome.
- **FAB.** The floating action button is a **neutral light-gray circle with a
  dark glyph** (e.g. Notes' compose pen) — *not* accent blue. Wide black pills
  (*Veure notes recents com a text*) act as section toggles.
- **Cards.** White, big-radius, **no border**, lifted by a whisper-soft cool
  shadow (`--shadow-card`). Grouped lists live inside one card with hairline
  dividers (`--divider`, ~7% black) inset past the leading avatar.
- **Shadows.** Soft, diffuse, cool-tinted, never hard. Three steps: `card`
  (resting), `raised` (hover), `floating` (nav pill / FAB / snackbar). Inset
  shadow only for sunken fields.
- **Transparency & blur.** The signature One UI move: floating elements over
  wallpaper use **translucent fills + heavy backdrop-blur** (`--blur-glass`
  24px) — the bottom-nav pill, media "Now Bar", and output-picker sheets. On
  plain gray surfaces, no blur — solid fills only.
- **Adaptive color.** On the lock screen / Now Playing, the **whole wallpaper
  retints to the dominant color of the album art** (pink for BLACKPINK, purple
  for ROSÉ, blue for Ava Max). Treat the accent as a runtime variable derived
  from content, not a fixed value, on these surfaces.
- **The Now Bar & wavy seekbar.** One UI's media signature: an expanded player
  (rounded album art with a frosted name overlay, a **wavy/sine seekbar** where
  the played portion is a solid wave and the rest a faint line, glassy circular
  transport) that collapses into the **Now Bar** — a dark translucent pill above
  the home indicator. See `components/media/` and `ui_kits/lockscreen/`.
- **Animation.** Springy and confident. Press = scale to **0.96**; release
  springs back via `--ease-spring` `cubic-bezier(.34,1.56,.64,1)`. Enters
  decelerate (`--ease-standard`), sheets use emphasized easing. Durations
  140 / 220 / 340ms. Nothing linear, nothing bouncing forever.
- **Hover / press states.** No real hover on touch; press feedback is a subtle
  tonal fill (gray-150) on rows/icons plus the scale-down. Selected nav/segment
  gets a soft tonal capsule.
- **Layout rules.** Fixed: status bar (44px) top, home indicator (26px) bottom,
  floating nav pill ~30px above it. Titles are large and **centered** on
  top-level screens; content scrolls beneath the fixed chrome.

---

## Iconography

- **Style.** One UI icons are clean, geometric line glyphs with rounded caps and
  joins, often with a filled active state (e.g. the filled person on the active
  *Contactes* tab). ~2px stroke at 24px.
- **Substitution — FLAGGED.** Samsung's One UI icon set is proprietary and not
  redistributable. This system ships a small hand-built line-icon set in that
  spirit at `assets/icons.js`, attached to `window.OneUIIcons` (Plus, Search,
  More, Star/StarFill, User/UserFill, Phone, Keypad, Recents, Play/Pause, Skip,
  Shuffle, Cast, Speaker, Settings, Check, Close, Chevron, …). Replace with
  licensed One UI glyphs if available, or swap in a CDN set (Lucide is the
  closest free match — rounded, 2px, geometric).
- **No emoji** as UI. No decorative unicode. Glyphs are monochrome and inherit
  `currentColor`.
- **Avatars** are not icons — they're colored initials (or photos), see the
  `Avatar` component and the expressive accent palette.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (import-only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill wrapper.

**`tokens/`** — `fonts.css` (@font-face / Google Fonts substitute), `colors.css`,
`typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`.

**`components/`** — reusable primitives (`window.OneUI9DesignSystem_a427e9`):
- `buttons/` — **Button** (filled · tonal · grey · text), **IconButton**
- `forms/` — **Switch**, **Slider**, **SegmentedControl**, **Input**
- `data-display/` — **Avatar**, **Card**, **ListRow**, **Badge**
- `navigation/` — **NavBar** (floating pill), **LargeTitleHeader** (the
  signature big-title screen header / sub-page back header)
- `feedback/` — **Snackbar**
- `media/` — **WaveScrubber** (wavy seekbar), **NowBar** (collapsed media pill)

**`ui_kits/phone/`** — interactive One UI 9 Phone app recreation
(`index.html` + `ContactsScreen` / `DialerScreen` / `RecentsScreen` + chrome).

**`ui_kits/calendar/`** — Samsung Calendar month view (`index.html` +
`CalendarMonth.jsx`): category bars, multi-day bands, today badge, quick-add.

**`ui_kits/settings/`** — the universal grouped-list settings screen
(`index.html` + `SettingsScreen.jsx`): large title, blue value rows, toggles.

**`ui_kits/lockscreen/`** — the lock-screen Now Playing recreation: adaptive
wallpaper, wavy seekbar, glass transport, collapse-to-Now-Bar (`index.html` +
`LockScreen.jsx`).

**`guidelines/cards/`** — foundation specimen cards (Colors, Type, Spacing,
Brand) rendered in the Design System tab.

**`assets/`** — `icons.js` (icon set).

> **Open asks / caveats** are listed at the end of the build summary — chiefly
> the font + icon substitutions, which need real licensed assets to be exact.
