# Factures Marta — project notes

## Animation guidelines (always apply)
Source: "The ultimate guide to proper use of animation in UX" — Taras Skytskyi (UX Collective).
This is a mobile-first web app for managing classes/invoices. Follow these rules for every animation:

### Duration
- Optimal interface animation: **200–500 ms**. <100 ms isn't noticed; >1 s feels slow.
- **Mobile (Material): 200–300 ms.** Tablet +30% (~400–450 ms). Wearable −30% (~150–200 ms).
- **Pure web transitions: ~150–200 ms** (users expect near-instant). Decorative/attention animations may be longer.
- Duration also scales with object **size + distance**: small elements / small changes move faster; large/complex elements a little slower.

### Easing (use cubic-bezier, never linear for movement)
- **Linear** — only for color/opacity changes where position doesn't change.
- **Ease-out (deceleration)** — element **entering** the screen (flies in fast, slows to stop). Make entrances slightly longer to draw attention.
- **Ease-in (acceleration)** — element leaving the screen **for good** (e.g. dismissing/throwing a card off-screen).
- **Ease-in-out (standard)** — moving within the screen, or leaving but recallable (drawers). Default when unsure.
- Prefer an **asymmetric** standard curve (deceleration longer than acceleration) — emphasizes the final state.
- **Beginning animation ≠ ending animation** (e.g. drawer opens ease-out, closes standard).

### Don'ts
- **No motion blur.** Movement should be clear and sharp.
- **Avoid bounce** effects (only in rare, intentional cases).
- Objects shouldn't pass through each other — they push/slow or rise above.

### Lists
- Stagger list-item entrance by **20–25 ms** per item. Slower stagger annoys users.
- Tables: reveal **diagonally**, not item-by-item (that's too long / zigzags attention).

### Choreography
- Guide attention in **one fluid direction**.
- Animate **as few objects as possible** at once; prefer one central object with others subordinate.
- Disproportional size changes move along an **arc**; proportional changes move in a straight line.

### Overarching rule
Animation should be unobtrusive and never slow the user down. If it distracts, soften or remove it.

## Implementation notes
- Bottom-nav active "pill" (`#navPill`) slides via JS (`positionNavPill()` in app.js), 260 ms, transform+width. Black bar stays fixed.
- Table rows (`renderClasses`) stagger-fade on table-view entry only (22 ms step, gated by `animateClassRows`) — not on every re-render.
- Add-buttons hide their label (`.btn-add-label`) on ≤560px, leaving only the + icon.
