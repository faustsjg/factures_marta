/* @ds-bundle: {"format":3,"namespace":"OneUI9DesignSystem_a427e9","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"ListRow","sourcePath":"components/data-display/ListRow.jsx"},{"name":"Snackbar","sourcePath":"components/feedback/Snackbar.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NowBar","sourcePath":"components/media/NowBar.jsx"},{"name":"WaveScrubber","sourcePath":"components/media/WaveScrubber.jsx"},{"name":"LargeTitleHeader","sourcePath":"components/navigation/LargeTitleHeader.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"assets/icons.js":"e20d224ae34d","components/buttons/Button.jsx":"1adb44755b6d","components/buttons/IconButton.jsx":"8a5bd5481fe1","components/data-display/Avatar.jsx":"db463e3d1554","components/data-display/Badge.jsx":"9156bd8c7054","components/data-display/Card.jsx":"30c80aea2fc3","components/data-display/ListRow.jsx":"461735029cc8","components/feedback/Snackbar.jsx":"3b117442331d","components/forms/Input.jsx":"dd3a4bebede3","components/forms/SegmentedControl.jsx":"b24a233b2c9a","components/forms/Slider.jsx":"863a6d3aef99","components/forms/Switch.jsx":"e8dd7ab929f6","components/media/NowBar.jsx":"2a2e781c48ab","components/media/WaveScrubber.jsx":"f0da9ee3836d","components/navigation/LargeTitleHeader.jsx":"1a7262ab89ea","components/navigation/NavBar.jsx":"fc1679cd21fd","ui_kits/calendar/CalendarMonth.jsx":"d6bac6ccae06","ui_kits/lockscreen/LockScreen.jsx":"d47a67f667ca","ui_kits/phone/ContactsScreen.jsx":"6881330d1246","ui_kits/phone/DialerScreen.jsx":"1f60da77ab7b","ui_kits/phone/PhoneChrome.jsx":"f4de09d5bedd","ui_kits/phone/RecentsScreen.jsx":"2448899dc542","ui_kits/settings/SettingsScreen.jsx":"3bd3700699a2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OneUI9DesignSystem_a427e9 = window.OneUI9DesignSystem_a427e9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons.js
try { (() => {
/* One UI 9 icon set — substitution.
   Samsung's One UI icons are proprietary. These are clean, rounded
   line glyphs in the same spirit (2px stroke, round caps/joins).
   Attached to window.OneUIIcons so plain-babel cards & kits can use them.
   ▶ SUBSTITUTION FLAGGED — swap for licensed One UI glyphs if available. */
(function () {
  const React = window.React;
  function Icon(props) {
    const {
      size = 24,
      stroke = 2,
      fill = 'none',
      children,
      style,
      ...rest
    } = props;
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill,
      stroke: 'currentColor',
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        display: 'block',
        ...style
      },
      ...rest
    }, children);
  }
  const p = (d, extra) => React.createElement('path', {
    d,
    ...(extra || {})
  });
  const el = (tag, attrs) => React.createElement(tag, attrs);
  const Icons = {
    Plus: pr => Icon({
      ...pr,
      children: [p('M12 5v14', {
        key: 'a'
      }), p('M5 12h14', {
        key: 'b'
      })]
    }),
    Search: pr => Icon({
      ...pr,
      children: [el('circle', {
        key: 'c',
        cx: 11,
        cy: 11,
        r: 7
      }), p('M21 21l-4.3-4.3', {
        key: 'l'
      })]
    }),
    More: pr => Icon({
      ...pr,
      children: [el('circle', {
        key: 1,
        cx: 12,
        cy: 5,
        r: 1.6,
        fill: 'currentColor',
        stroke: 'none'
      }), el('circle', {
        key: 2,
        cx: 12,
        cy: 12,
        r: 1.6,
        fill: 'currentColor',
        stroke: 'none'
      }), el('circle', {
        key: 3,
        cx: 12,
        cy: 19,
        r: 1.6,
        fill: 'currentColor',
        stroke: 'none'
      })]
    }),
    Star: pr => Icon({
      ...pr,
      children: p('M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z')
    }),
    StarFill: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: p('M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z')
    }),
    User: pr => Icon({
      ...pr,
      children: [el('circle', {
        key: 1,
        cx: 12,
        cy: 8,
        r: 4
      }), p('M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6', {
        key: 2
      })]
    }),
    UserFill: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: [el('circle', {
        key: 1,
        cx: 12,
        cy: 8,
        r: 4
      }), p('M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5z', {
        key: 2
      })]
    }),
    Chevron: pr => Icon({
      ...pr,
      children: p('M9 6l6 6-6 6')
    }),
    ChevronLeft: pr => Icon({
      ...pr,
      children: p('M15 6l-6 6 6 6')
    }),
    Phone: pr => Icon({
      ...pr,
      children: p('M6.5 3.5l2 .3 1.2 3.2-1.7 1.4a12 12 0 0 0 4.9 4.9l1.4-1.7 3.2 1.2.3 2c0 .9-.7 1.6-1.6 1.6A13.5 13.5 0 0 1 4.9 5.1c0-.9.7-1.6 1.6-1.6z', {
        fill: 'currentColor',
        stroke: 'none'
      })
    }),
    PhoneCall: pr => Icon({
      ...pr,
      children: p('M6.5 4l2 .3 1.2 3.2-1.7 1.4a12 12 0 0 0 4.9 4.9l1.4-1.7 3.2 1.2.3 2A1.6 1.6 0 0 1 16.6 19 13.5 13.5 0 0 1 5 5.6 1.6 1.6 0 0 1 6.5 4z', {
        fill: 'currentColor',
        stroke: 'none'
      })
    }),
    Keypad: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: [3, 8.5, 14].flatMap((y, r) => [4.5, 11, 17.5].map((x, c) => el('circle', {
        key: `${r}-${c}`,
        cx: x,
        cy: y + 1.5,
        r: 1.5
      })))
    }),
    Recents: pr => Icon({
      ...pr,
      children: [p('M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', {
        key: 1
      }), p('M3 3v5h5', {
        key: 2
      }), p('M12 7v5l4 2', {
        key: 3
      })]
    }),
    Play: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: p('M7 4.5v15l13-7.5z')
    }),
    Pause: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: [el('rect', {
        key: 1,
        x: 6.5,
        y: 4.5,
        width: 3.6,
        height: 15,
        rx: 1.4
      }), el('rect', {
        key: 2,
        x: 13.9,
        y: 4.5,
        width: 3.6,
        height: 15,
        rx: 1.4
      })]
    }),
    SkipNext: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: [p('M6 5v14l9-7z', {
        key: 1
      }), el('rect', {
        key: 2,
        x: 16,
        y: 5,
        width: 3,
        height: 14,
        rx: 1.2
      })]
    }),
    SkipPrev: pr => Icon({
      ...pr,
      fill: 'currentColor',
      stroke: 'none',
      children: [p('M18 5v14l-9-7z', {
        key: 1
      }), el('rect', {
        key: 2,
        x: 5,
        y: 5,
        width: 3,
        height: 14,
        rx: 1.2
      })]
    }),
    Shuffle: pr => Icon({
      ...pr,
      children: [p('M16 4h4v4', {
        key: 1
      }), p('M4 20L20 4', {
        key: 2
      }), p('M4 4l5 5', {
        key: 3
      }), p('M16 20h4v-4', {
        key: 4
      }), p('M14.5 14.5L20 20', {
        key: 5
      })]
    }),
    Check: pr => Icon({
      ...pr,
      children: p('M5 12.5l4.5 4.5L19 6.5')
    }),
    Close: pr => Icon({
      ...pr,
      children: [p('M6 6l12 12', {
        key: 1
      }), p('M18 6L6 18', {
        key: 2
      })]
    }),
    Speaker: pr => Icon({
      ...pr,
      children: [el('rect', {
        key: 1,
        x: 5,
        y: 3,
        width: 14,
        height: 18,
        rx: 3
      }), el('circle', {
        key: 2,
        cx: 12,
        cy: 14,
        r: 3
      }), el('circle', {
        key: 3,
        cx: 12,
        cy: 6.5,
        r: 0.8,
        fill: 'currentColor'
      })]
    }),
    Settings: pr => Icon({
      ...pr,
      children: [el('circle', {
        key: 1,
        cx: 12,
        cy: 12,
        r: 3
      }), p('M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3', {
        key: 2
      })]
    }),
    Cast: pr => Icon({
      ...pr,
      children: [p('M3 6h18v12h-6', {
        key: 1
      }), p('M3 10a8 8 0 0 1 8 8M3 14a4 4 0 0 1 4 4', {
        key: 2
      }), el('circle', {
        key: 3,
        cx: 3.5,
        cy: 18.5,
        r: 0.9,
        fill: 'currentColor',
        stroke: 'none'
      })]
    }),
    Message: pr => Icon({
      ...pr,
      children: p('M4 5h16v11H9l-4 3v-3H4z')
    }),
    Video: pr => Icon({
      ...pr,
      children: [el('rect', {
        key: 1,
        x: 3,
        y: 6,
        width: 13,
        height: 12,
        rx: 3
      }), p('M16 10l5-3v10l-5-3', {
        key: 2
      })]
    }),
    Lock: pr => Icon({
      ...pr,
      children: [el('rect', {
        key: 1,
        x: 5,
        y: 10,
        width: 14,
        height: 10,
        rx: 3
      }), p('M8 10V7a4 4 0 0 1 8 0v3', {
        key: 2
      })]
    }),
    Camera: pr => Icon({
      ...pr,
      children: [p('M4 8h3l1.5-2h7L17 8h3v11H4z', {
        key: 1
      }), el('circle', {
        key: 2,
        cx: 12,
        cy: 13,
        r: 3.2
      })]
    })
  };
  window.OneUIIcons = Icons;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons.js", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * One UI 9 Button — a pill-shaped action with springy press feedback.
 * Variants: filled (primary blue), tonal (soft blue fill), grey
 * (neutral tonal, common in dialogs), text (borderless).
 */
function Button({
  children,
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  onClick,
  style = {},
  ...rest
}) {
  const [pressed, setPressed] = useState(false);
  const sizes = {
    sm: {
      height: 40,
      padX: 18,
      font: 15
    },
    md: {
      height: 52,
      padX: 24,
      font: 16
    },
    lg: {
      height: 60,
      padX: 30,
      font: 18
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    filled: {
      bg: 'var(--accent)',
      bgPressed: 'var(--accent-pressed)',
      color: 'var(--text-on-accent)'
    },
    tonal: {
      bg: 'var(--accent-subtle)',
      bgPressed: 'var(--blue-100)',
      color: 'var(--blue-600)'
    },
    grey: {
      bg: 'var(--gray-150)',
      bgPressed: 'var(--gray-200)',
      color: 'var(--text-primary)'
    },
    text: {
      bg: 'transparent',
      bgPressed: 'var(--gray-150)',
      color: 'var(--accent)'
    }
  };
  const p = palettes[variant] || palettes.filled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: fullWidth ? '100%' : 'auto',
      height: s.height,
      padding: `0 ${s.padX}px`,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: pressed && !disabled ? p.bgPressed : p.bg,
      color: p.color,
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '-0.005em',
      lineHeight: 1,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: pressed && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      userSelect: 'none',
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, leadingIcon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * One UI 9 IconButton — a circular, finger-sized tap target for a
 * single glyph (the +, search and overflow actions in headers).
 * Variants: plain (transparent, blue glyph), tonal (soft fill),
 * filled (solid accent). Pass an <svg>/icon node as `icon`.
 */
function IconButton({
  icon,
  variant = 'plain',
  size = 48,
  color,
  disabled = false,
  onClick,
  ariaLabel,
  style = {},
  ...rest
}) {
  const [pressed, setPressed] = useState(false);
  const palettes = {
    plain: {
      bg: 'transparent',
      bgPressed: 'var(--gray-150)',
      color: 'var(--accent)'
    },
    tonal: {
      bg: 'var(--accent-subtle)',
      bgPressed: 'var(--blue-100)',
      color: 'var(--blue-600)'
    },
    filled: {
      bg: 'var(--accent)',
      bgPressed: 'var(--accent-pressed)',
      color: 'var(--text-on-accent)'
    },
    glass: {
      bg: 'var(--glass-fill-dark)',
      bgPressed: 'rgba(28,30,38,0.6)',
      color: '#fff'
    }
  };
  const p = palettes[variant] || palettes.plain;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: 'none',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: pressed && !disabled ? p.bgPressed : p.bg,
      color: color || p.color,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: pressed && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
const AVATAR_COLORS = ['var(--accent-periwinkle)', 'var(--accent-coral)', 'var(--accent-forest)', 'var(--accent-lavender)', 'var(--accent-violet)', 'var(--accent-rose)', 'var(--accent-teal)', 'var(--accent-amber)'];
function pickColor(seed) {
  const str = String(seed || '');
  let h = 0;
  for (let i = 0; i < str.length; i++) h = h * 31 + str.charCodeAt(i) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/**
 * One UI 9 Avatar — a colored circle bearing an initial, or a photo.
 * The fill color is derived deterministically from the name so the
 * same contact always gets the same hue (One UI's tonal avatars).
 */
function Avatar({
  name = '',
  src = null,
  size = 48,
  color,
  style = {}
}) {
  const initial = (name.trim()[0] || '?').toUpperCase();
  const bg = color || pickColor(name);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      flex: 'none',
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'var(--gray-150)' : bg,
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: size * 0.42,
      lineHeight: 1,
      userSelect: 'none',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initial);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
/**
 * One UI 9 Badge — a small rounded label or count. Tones map to the
 * semantic palette; `dot` renders a bare indicator.
 */
function Badge({
  children,
  tone = 'accent',
  dot = false,
  style = {}
}) {
  const tones = {
    accent: {
      bg: 'var(--accent)',
      color: '#fff'
    },
    neutral: {
      bg: 'var(--gray-200)',
      color: 'var(--text-primary)'
    },
    success: {
      bg: 'var(--success)',
      color: '#fff'
    },
    danger: {
      bg: 'var(--danger)',
      color: '#fff'
    },
    subtle: {
      bg: 'var(--accent-subtle)',
      color: 'var(--blue-600)'
    }
  };
  const t = tones[tone] || tones.accent;
  if (dot) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: t.bg,
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 22,
      height: 22,
      padding: '0 8px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.color,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 'var(--fw-bold)',
      lineHeight: 1,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * One UI 9 Card — a white, big-radius surface that floats on the
 * gray app background with a whisper-soft shadow. Use `interactive`
 * for press feedback when the whole card is tappable.
 */
function Card({
  children,
  padding = 'var(--pad-card)',
  interactive = false,
  onClick,
  style = {},
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onPointerDown: () => interactive && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding,
      cursor: interactive ? 'pointer' : 'default',
      transform: pressed ? 'scale(0.985)' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-spring), box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/ListRow.jsx
try { (() => {
const {
  useState
} = React;
/**
 * One UI 9 ListRow — a tall, finger-friendly row with an optional
 * leading visual (avatar/icon), a title + subtitle stack, and a
 * trailing slot (chevron, switch, meta). Rows live inside grouped
 * white cards; pressing tints the row.
 */
function ListRow({
  leading = null,
  title,
  subtitle = null,
  trailing = null,
  onClick,
  interactive = true,
  subtitleColor = 'var(--text-secondary)',
  wrapSubtitle = false,
  style = {}
}) {
  const [pressed, setPressed] = useState(false);
  const tappable = interactive && onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onPointerDown: () => tappable && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      minHeight: 'var(--row-height)',
      padding: '8px 4px',
      background: pressed ? 'var(--gray-100)' : 'transparent',
      borderRadius: 'var(--radius-sm)',
      cursor: tappable ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex'
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-headline)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--lh-headline)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-caption)',
      fontWeight: 'var(--fw-regular)',
      color: subtitleColor,
      lineHeight: 'var(--lh-caption)',
      whiteSpace: wrapSubtitle ? 'normal' : 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, subtitle)), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center'
    }
  }, trailing));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Snackbar.jsx
try { (() => {
/**
 * One UI 9 Snackbar — a floating dark pill that confirms an action,
 * with an optional inline action label. Pair with your own timeout.
 */
function Snackbar({
  message,
  actionLabel,
  onAction,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      maxWidth: 460,
      padding: actionLabel ? '14px 8px 14px 22px' : '14px 22px',
      background: 'var(--gray-800)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-floating)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 'var(--fw-medium)',
      color: '#fff',
      lineHeight: 1.3
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      flex: 'none',
      border: 'none',
      background: 'transparent',
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 'var(--fw-bold)',
      color: 'var(--blue-300)',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent'
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Snackbar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * One UI 9 Input — a rounded, softly-filled text field. The field
 * tints and shows an accent ring on focus. Optional label sits above.
 */
function Input({
  value,
  onChange,
  placeholder = '',
  label,
  type = 'text',
  disabled = false,
  leadingIcon = null,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-secondary)',
      paddingLeft: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 18px',
      background: focused ? 'var(--surface-card)' : 'var(--gray-150)',
      borderRadius: 'var(--radius-field)',
      boxShadow: focused ? 'inset 0 0 0 2px var(--accent)' : 'inset 0 0 0 1.5px transparent',
      transition: 'background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
      opacity: disabled ? 0.5 : 1
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-tertiary)'
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: e => onChange && onChange(e.target.value),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 'var(--fw-regular)',
      color: 'var(--text-primary)'
    }
  }, rest))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/**
 * One UI 9 SegmentedControl — a pill-shaped neutral container with a
 * white selected pill that slides between options. Use for 2–4 short
 * mutually-exclusive choices.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  style = {}
}) {
  const idx = Math.max(0, options.findIndex(o => (o.value ?? o) === value));
  const n = options.length || 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      padding: 4,
      gap: 0,
      background: 'var(--gray-150)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      left: `calc(4px + ${idx} * ((100% - 8px) / ${n}))`,
      width: `calc((100% - 8px) / ${n})`,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 1px 3px rgba(21,23,28,0.12)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  }), options.map(o => {
    const v = o.value ?? o;
    const label = o.label ?? o;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        position: 'relative',
        flex: 1,
        zIndex: 1,
        height: 40,
        border: 'none',
        background: 'transparent',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'color var(--dur-base) var(--ease-standard)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
const {
  useRef,
  useState,
  useCallback
} = React;
/**
 * One UI 9 Slider — thin rounded track, filled accent progress and a
 * round handle. Drag or click to set. Controlled via value/onChange
 * (0–100 by default).
 */
function Slider({
  value = 50,
  min = 0,
  max = 100,
  onChange,
  disabled = false,
  trackHeight = 6,
  handle = 20,
  style = {}
}) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const pct = (value - min) / (max - min) * 100;
  const setFromClientX = useCallback(clientX => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onChange && onChange(Math.round(min + ratio * (max - min)));
  }, [min, max, onChange]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onPointerDown: e => {
      if (disabled) return;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    },
    onPointerMove: e => dragging && setFromClientX(e.clientX),
    onPointerUp: () => setDragging(false),
    style: {
      position: 'relative',
      height: Math.max(handle, 28),
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      touchAction: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: trackHeight,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${pct}%`,
      width: handle,
      height: handle,
      transform: `translate(-50%, -50%) scale(${dragging ? 1.15 : 1})`,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 4px rgba(21,23,28,0.3)',
      border: '2px solid var(--accent)',
      transition: 'transform var(--dur-fast) var(--ease-spring)'
    }
  })));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * One UI 9 Switch — pill track with a large knob that slides and
 * springs into place. Off is a neutral gray track; on is accent blue.
 */
function Switch({
  checked = false,
  disabled = false,
  onChange,
  ariaLabel,
  style = {}
}) {
  const W = 52,
    H = 32,
    KNOB = 26,
    PAD = 3;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: 'relative',
      width: W,
      height: H,
      flex: 'none',
      border: 'none',
      padding: 0,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--accent)' : 'var(--gray-300)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--dur-base) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: PAD,
      left: checked ? W - KNOB - PAD : PAD,
      width: KNOB,
      height: KNOB,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(21,23,28,0.25)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/media/NowBar.jsx
try { (() => {
/**
 * One UI 9 NowBar — the collapsed media indicator: a dark translucent
 * capsule that floats above the home indicator, showing a mini
 * visualizer/thumb, the track label, and compact transport controls.
 * Renders over wallpaper; relies on backdrop-blur.
 */
function NowBar({
  title = '',
  artist = '',
  playing = true,
  onToggle,
  onPrev,
  onNext,
  leading = null,
  style = {}
}) {
  const btn = {
    width: 34,
    height: 34,
    flex: 'none',
    border: 'none',
    borderRadius: '50%',
    background: 'transparent',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent'
  };
  const ic = paths => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "#fff"
  }, paths);
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 12px 0 14px',
      maxWidth: 360,
      background: 'var(--glass-fill-dark)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 8px 26px rgba(0,0,0,0.28)',
      ...style
    }
  }, leading || /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      flex: 'none',
      borderRadius: 9,
      background: 'linear-gradient(135deg,#b58ad8,#7d8fd6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      fontWeight: 700,
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), artist && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'rgba(255,255,255,0.72)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, artist)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Previous",
    onClick: onPrev,
    style: btn
  }, ic(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 5v14l-9-7z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "3",
    height: "14",
    rx: "1.2"
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": playing ? 'Pause' : 'Play',
    onClick: onToggle,
    style: btn
  }, playing ? ic(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "6.5",
    y: "4.5",
    width: "3.6",
    height: "15",
    rx: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.9",
    y: "4.5",
    width: "3.6",
    height: "15",
    rx: "1.4"
  }))) : ic(/*#__PURE__*/React.createElement("path", {
    d: "M7 4.5v15l13-7.5z"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Next",
    onClick: onNext,
    style: btn
  }, ic(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 5v14l9-7z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "5",
    width: "3",
    height: "14",
    rx: "1.2"
  }))))));
}
Object.assign(__ds_scope, { NowBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/NowBar.jsx", error: String((e && e.message) || e) }); }

// components/media/WaveScrubber.jsx
try { (() => {
const {
  useRef,
  useState,
  useCallback,
  useMemo
} = React;
/**
 * One UI 9 WaveScrubber — the signature wavy media seekbar. The played
 * portion is a solid accent sine wave; the remaining portion flattens
 * to a faint line. A round handle marks the playhead. Drag to seek.
 */
function WaveScrubber({
  value = 40,
  min = 0,
  max = 100,
  onChange,
  color = 'currentColor',
  remainingColor = 'rgba(255,255,255,0.35)',
  height = 28,
  amplitude = 5,
  wavelength = 26,
  style = {}
}) {
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);
  const W = 1000; // viewBox width; scales to container
  const mid = height / 2;
  const pct = (value - min) / (max - min);
  const wavePath = useMemo(() => {
    const steps = 120;
    let d = `M 0 ${mid}`;
    for (let i = 1; i <= steps; i++) {
      const x = i / steps * W;
      const y = mid - Math.sin(x / wavelength * Math.PI * 0.5) * amplitude;
      d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`;
    }
    return d;
  }, [mid, amplitude, wavelength]);
  const setFromClientX = useCallback(clientX => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onChange && onChange(Math.round(min + ratio * (max - min)));
  }, [min, max, onChange]);
  const clipId = useMemo(() => 'wsc-' + Math.random().toString(36).slice(2), []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onPointerDown: e => {
      setDrag(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    },
    onPointerMove: e => drag && setFromClientX(e.clientX),
    onPointerUp: () => setDrag(false),
    style: {
      position: 'relative',
      width: '100%',
      height,
      cursor: 'pointer',
      touchAction: 'none',
      color,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: height,
    viewBox: `0 0 ${W} ${height}`,
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: clipId
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: W * pct,
    height: height
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: mid,
    x2: W,
    y2: mid,
    stroke: remainingColor,
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: wavePath,
    fill: "none",
    stroke: color,
    strokeWidth: "3.5",
    strokeLinecap: "round",
    clipPath: `url(#${clipId})`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${pct * 100}%`,
      width: 14,
      height: 14,
      transform: `translate(-50%,-50%) scale(${drag ? 1.25 : 1})`,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
      transition: 'transform var(--dur-fast) var(--ease-spring)'
    }
  }));
}
Object.assign(__ds_scope, { WaveScrubber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/WaveScrubber.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LargeTitleHeader.jsx
try { (() => {
/**
 * One UI 9 LargeTitleHeader — the signature One UI layout: an oversized
 * bold title sitting in a generous top area, with a toolbar row of
 * actions beneath it (pushed down into thumb reach). Used on most
 * top-level app screens (Notes, Contacts, Settings home).
 *
 * Pass `back` for a sub-page header instead (compact back-chevron +
 * blue title inline).
 */
function LargeTitleHeader({
  title,
  count = null,
  leading = null,
  actions = [],
  align = 'center',
  back = false,
  onBack,
  titleColor = 'var(--text-heading)',
  topSpace = 28,
  style = {}
}) {
  if (back) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 14px 14px',
        ...style
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Back",
      onClick: onBack,
      style: {
        width: 44,
        height: 44,
        flex: 'none',
        border: 'none',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--accent)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M15 6l-6 6 6 6"
    }))), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 26,
        fontWeight: 'var(--fw-bold)',
        letterSpacing: '-0.01em',
        color: 'var(--text-title)'
      }
    }, title));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: topSpace,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 26px',
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 38,
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '-0.015em',
      lineHeight: 1.08,
      color: titleColor,
      textWrap: 'balance'
    }
  }, title), count != null && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 16,
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-secondary)'
    }
  }, count)), (leading || actions.length > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 14px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, actions)));
}
Object.assign(__ds_scope, { LargeTitleHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LargeTitleHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/**
 * One UI 9 NavBar — the floating bottom navigation pill. Sits over a
 * blurred backdrop, hugs a few destinations, and gives the active one
 * a soft tonal capsule. Each item: { value, label, icon }.
 */
function NavBar({
  items = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: 6,
      background: 'rgba(255,255,255,0.78)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-floating)',
      ...style
    }
  }, items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      type: "button",
      onClick: () => onChange && onChange(it.value),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        minWidth: 76,
        height: 56,
        padding: '0 14px',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--gray-150)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        lineHeight: 0
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        lineHeight: 1
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/calendar/CalendarMonth.jsx
try { (() => {
/* One UI 9 Calendar — month view. Faithful recreation of the Samsung
   Calendar grid: colored category bars, multi-day spanning bands,
   weekend tinting, today badge, week numbers, quick-add pill. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    IconButton
  } = NS;
  const I = window.OneUIIcons;
  window.OneUICalendar = window.OneUICalendar || {};
  const C = {
    blue: '#4a90e8',
    green: '#3fae5a',
    orange: '#f4a51f',
    red: '#e5524b',
    pink: '#e7568f',
    gray: '#b8bcc6'
  };

  // Single-day events keyed by day-of-month (June). Emoji from user content.
  const EV = {
    1: [['blue', 'Direcció Opan']],
    2: [['orange', '🏀 UCAM Murcia']],
    3: [['green', 'Reunió casa'], ['pink', 'Kion 💪'], ['green', 'Piscina Carlota']],
    4: [['orange', '🏀 Barça vs UCAM']],
    6: [['orange', '🏀 UCAM Murcia']],
    8: [['blue', 'Direcció Opan'], ['blue', 'Local plaça Saragossa']],
    9: [['blue', 'Bercofred climatit'], ['orange', '🏀 Barça vs La Lag']],
    10: [['green', 'Reunió casa'], ['pink', 'Kion 💪'], ['green', 'Piscina Carlota']],
    11: [['orange', '🏀 Barça vs La Lag'], ['red', 'Reservation IGN'], ['red', 'Reservation']],
    13: [['orange', '🏀 La Laguna Ten']],
    15: [['orange', 'Màster en fleca ar'], ['blue', 'Direcció Opan'], ['orange', '🏀 La Laguna Ten']],
    16: [['blue', 'Revisió resultats'], ['orange', 'Màster en fleca ar']],
    17: [['green', 'Reunió casa'], ['blue', 'Citació Ju'], ['pink', 'Kion 💪'], ['orange', 'Màster en']],
    18: [['blue', '2125 - O Pan Bruta'], ['green', 'Màster en fleca ar']],
    19: [['green', 'Concert candelight']],
    20: [['orange', '🏀 Valencia Basket']],
    22: [['blue', 'Gutenberg (vei)'], ['blue', 'Direcció'], ['orange', '🏀 Barça']],
    24: [['green', 'Reunió casa'], ['pink', 'Kion 💪'], ['orange', '🏀 Barça vs Valen']],
    26: [['green', 'Festa final de curs']],
    27: [['green', 'Casament Maria i'], ['orange', '🏀 Valencia Basket']],
    29: [['blue', 'Direcció Opan']]
  };
  // Highlighted "all-day" pill events (filled background)
  const PILL = {
    15: ['Màster e', '#fff4e0'],
    19: ['PAGAMENT PAGA', '#cfe0fb'],
    22: ['Matriculació torred', '#bfe8cf'],
    29: ['PAGAMENT NOMII', '#cfe0fb']
  };
  // Multi-day spanning bands: {startDay, endDay, label, color}
  const SPANS = [{
    s: 1,
    e: 2,
    label: 'RE: Pinsa i T80',
    bg: '#cfe0fb',
    fg: '#1b4f8a'
  }, {
    s: 3,
    e: 7,
    label: 'PATUM',
    bg: '#a9e0b8',
    fg: '#1d6b34'
  }];
  // little orange "important date" dots
  const DOTS = {
    21: true,
    22: true,
    23: true,
    24: true,
    25: true,
    26: true,
    27: true
  };
  const WEEKS = [{
    wn: 23,
    days: [1, 2, 3, 4, 5, 6, 7]
  }, {
    wn: 24,
    days: [8, 9, 10, 11, 12, 13, 14]
  }, {
    wn: 25,
    days: [15, 16, 17, 18, 19, 20, 21]
  }, {
    wn: 26,
    days: [22, 23, 24, 25, 26, 27, 28]
  }, {
    wn: 27,
    days: [29, 30, 1, 1, 2, 3, 4],
    next: [false, false, true, true, true, true, true]
  }];
  const NEXT_LABELS = {
    3: 'Reunió casa',
    4: 'Sopar Solidari'
  };
  function EventBar({
    color,
    label
  }) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        gap: 4,
        alignItems: 'stretch',
        minWidth: 0
      }
    }, React.createElement('div', {
      style: {
        width: 3,
        flex: 'none',
        borderRadius: 2,
        background: C[color]
      }
    }), React.createElement('span', {
      style: {
        fontSize: 11,
        lineHeight: 1.12,
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }
    }, label));
  }
  function MonthGrid({
    today = 21,
    selected = 21
  }) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    },
    // weekday header
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '6px 6px 8px'
      }
    }, ['DL.', 'DT.', 'DC.', 'DJ.', 'DV.', 'DS.', 'DG.'].map((d, i) => React.createElement('div', {
      key: d,
      style: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 600,
        color: i === 6 ? 'var(--danger)' : 'var(--text-secondary)'
      }
    }, d))),
    // weeks
    WEEKS.map((wk, wi) => {
      const spans = SPANS.filter(sp => sp.s <= wk.days[wk.days.length - 1] && sp.e >= wk.days[0] && (!wk.next || true) && wk.days.some((d, idx) => !(wk.next && wk.next[idx])));
      const wkSpans = SPANS.filter(sp => wk.days.includes(sp.s) || wk.days.includes(sp.e) || sp.s < wk.days[0] && sp.e > wk.days[0]);
      const hasBand = wkSpans.length > 0 || wk.wn === 27;
      return React.createElement('div', {
        key: wi,
        style: {
          position: 'relative',
          borderTop: '1px solid var(--divider)'
        }
      },
      // day grid
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)'
        }
      }, wk.days.map((d, i) => {
        const isNext = wk.next && wk.next[i];
        const isSunday = i === 6;
        const isToday = !isNext && d === today;
        const isSel = !isNext && d === selected;
        const evs = isNext ? NEXT_LABELS[d] ? [['gray', NEXT_LABELS[d]]] : [] : EV[d] || [];
        const pill = !isNext && PILL[d];
        return React.createElement('div', {
          key: i,
          style: {
            minHeight: 118,
            padding: '4px 4px 6px',
            position: 'relative',
            overflow: 'hidden',
            background: isSel ? 'rgba(120,130,150,0.06)' : isSunday ? 'rgba(229,82,75,0.035)' : 'transparent',
            boxShadow: isSel ? 'inset 0 0 0 1.5px var(--gray-400)' : 'none',
            borderRadius: isSel ? 10 : 0
          }
        },
        // week number on first column
        i === 0 && React.createElement('div', {
          style: {
            position: 'absolute',
            top: 4,
            left: 3,
            fontSize: 10,
            fontWeight: 600,
            color: 'var(--text-tertiary)'
          }
        }, wk.wn),
        // date row
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            height: 24,
            marginBottom: hasBand ? 2 : 4
          }
        }, isToday ? React.createElement('div', {
          style: {
            minWidth: 24,
            height: 24,
            padding: '0 6px',
            borderRadius: 8,
            background: 'var(--danger)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }, d) : React.createElement('span', {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: isNext ? 'var(--gray-300)' : isSunday ? 'var(--danger)' : 'var(--text-primary)'
          }
        }, d), DOTS[d] && !isNext && React.createElement('span', {
          style: {
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--orange-500)'
          }
        })),
        // band spacer
        hasBand && React.createElement('div', {
          style: {
            height: 20
          }
        }),
        // pill event
        pill && React.createElement('div', {
          style: {
            background: pill[1],
            borderRadius: 6,
            padding: '2px 5px',
            marginBottom: 3,
            fontSize: 11,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }, pill[0]),
        // single events
        React.createElement('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }
        }, evs.map((e, ei) => React.createElement(EventBar, {
          key: ei,
          color: e[0],
          label: e[1]
        }))));
      })),
      // multi-day bands overlay
      hasBand && React.createElement('div', {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          pointerEvents: 'none',
          padding: '0 2px'
        }
      }, (wk.wn === 27 ? [{
        s: wk.days[0],
        cStart: 2,
        cSpan: 5,
        label: 'FM Terrassa',
        bg: '#e3e5ea',
        fg: '#9aa0ab'
      }] : wkSpans.map(sp => {
        const cStart = Math.max(0, wk.days.indexOf(sp.s) >= 0 ? wk.days.indexOf(sp.s) : 0);
        const endIdx = wk.days.indexOf(sp.e) >= 0 ? wk.days.indexOf(sp.e) : 6;
        return {
          cStart,
          cSpan: endIdx - cStart + 1,
          label: sp.label,
          bg: sp.bg,
          fg: sp.fg
        };
      })).map((b, bi) => React.createElement('div', {
        key: bi,
        style: {
          gridColumn: `${b.cStart + 1} / span ${b.cSpan}`,
          height: 18,
          borderRadius: 5,
          background: b.bg,
          color: b.fg,
          fontSize: 11,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: '0 1px'
        }
      }, b.label))));
    }));
  }
  window.OneUICalendar.MonthGrid = MonthGrid;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/calendar/CalendarMonth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lockscreen/LockScreen.jsx
try { (() => {
/* One UI 9 Lock Screen — Now Playing. Adaptive color theming:
   prev/next swap the track AND retint the whole wallpaper. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    WaveScrubber,
    NowBar
  } = NS;
  const I = window.OneUIIcons;
  window.OneUILock = window.OneUILock || {};
  const TRACKS = [{
    title: 'Gone',
    artist: 'ROSÉ',
    bg: ['#9f8ada', '#8190d8', '#8fa0e0'],
    art: ['#b58ad8', '#7d8fd6'],
    cur: '2:28',
    dur: '3:27'
  }, {
    title: "As If It's Your Last",
    artist: 'BLACKPINK',
    bg: ['#d84f7e', '#c0506e', '#b85a86'],
    art: ['#e0608f', '#b34a7a'],
    cur: '2:17',
    dur: '3:33'
  }, {
    title: 'My Head & My Heart',
    artist: 'Ava Max',
    bg: ['#7f86d8', '#6f9fd0', '#7aa0d8'],
    art: ['#7aa0d8', '#6f86c6'],
    cur: '2:05',
    dur: '2:55'
  }];
  function GlassBtn({
    size = 52,
    big,
    onClick,
    label,
    children
  }) {
    const [p, setP] = React.useState(false);
    return React.createElement('button', {
      'aria-label': label,
      onClick,
      onPointerDown: () => setP(true),
      onPointerUp: () => setP(false),
      onPointerLeave: () => setP(false),
      style: {
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        border: 'none',
        background: big ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: p ? 'scale(0.92)' : 'scale(1)',
        transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, children);
  }
  function LockScreen({
    chrome
  }) {
    const [idx, setIdx] = React.useState(0);
    const [playing, setPlaying] = React.useState(true);
    const [pos, setPos] = React.useState(64);
    const [collapsed, setCollapsed] = React.useState(false);
    const t = TRACKS[idx];
    const go = d => {
      setIdx(i => (i + d + TRACKS.length) % TRACKS.length);
      setPos(20);
    };
    const bg = `radial-gradient(110% 70% at 25% 8%, ${t.bg[0]} 0%, transparent 55%),` + `radial-gradient(120% 80% at 92% 96%, ${t.bg[1]} 0%, transparent 55%),` + `linear-gradient(150deg, ${t.bg[0]}, ${t.bg[2]} 55%, ${t.bg[1]})`;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        inset: 0,
        background: bg,
        transition: 'background var(--dur-slower) var(--ease-standard)',
        display: 'flex',
        flexDirection: 'column'
      }
    }, chrome.StatusBarLock(),
    // Clock
    React.createElement('div', {
      style: {
        textAlign: 'center',
        marginTop: 14
      }
    }, React.createElement('div', {
      style: {
        fontSize: 80,
        fontWeight: 300,
        letterSpacing: '-0.02em',
        color: '#fff',
        lineHeight: 1
      }
    }, '13:17'), React.createElement('div', {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
        marginTop: 6
      }
    }, 'Wed, 29 April')), collapsed ?
    // Collapsed: just the Now Bar near the bottom
    React.createElement('div', {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 16
      }
    }, React.createElement(NowBar, {
      title: t.title,
      artist: t.artist,
      playing,
      onToggle: () => setPlaying(p => !p),
      onPrev: () => go(-1),
      onNext: () => go(1),
      leading: React.createElement('div', {
        style: {
          width: 30,
          height: 30,
          borderRadius: 9,
          background: `linear-gradient(135deg, ${t.art[0]}, ${t.art[1]})`
        }
      })
    })) :
    // Expanded player
    React.createElement('div', {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 24px 20px'
      }
    },
    // Album art with frosted name overlay
    React.createElement('div', {
      style: {
        position: 'relative',
        width: '78%',
        aspectRatio: '1 / 0.92',
        margin: '0 auto 22px',
        borderRadius: 26,
        overflow: 'hidden',
        background: `linear-gradient(140deg, ${t.art[0]}, ${t.art[1]})`,
        boxShadow: '0 18px 50px rgba(0,0,0,0.32)'
      }
    }, React.createElement('div', {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '34px 20px 18px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.42), transparent)',
        textAlign: 'center'
      }
    }, React.createElement('div', {
      style: {
        fontSize: 20,
        fontWeight: 700,
        color: '#fff',
        textShadow: '0 1px 6px rgba(0,0,0,0.35)'
      }
    }, t.title), React.createElement('div', {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.88)',
        marginTop: 2,
        letterSpacing: '0.04em'
      }
    }, t.artist.toUpperCase()))),
    // Output row
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 12
      }
    }, React.createElement('span', {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, 'This phone'), React.createElement(I.Cast, {
      size: 18
    })),
    // Wave scrubber + times
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: '#fff',
        marginBottom: 14
      }
    }, React.createElement('span', {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        opacity: 0.85
      }
    }, t.cur), React.createElement('div', {
      style: {
        flex: 1
      }
    }, React.createElement(WaveScrubber, {
      value: pos,
      onChange: setPos,
      color: '#fff',
      remainingColor: 'rgba(255,255,255,0.32)'
    })), React.createElement('span', {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        opacity: 0.85
      }
    }, t.dur)),
    // Transport
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6px'
      }
    }, React.createElement(GlassBtn, {
      size: 46,
      label: 'Add',
      onClick: () => setCollapsed(true)
    }, React.createElement(I.Plus, {
      size: 22
    })), React.createElement(GlassBtn, {
      size: 52,
      label: 'Previous',
      onClick: () => go(-1)
    }, React.createElement(I.SkipPrev, {
      size: 24
    })), React.createElement(GlassBtn, {
      size: 66,
      big: true,
      label: playing ? 'Pause' : 'Play',
      onClick: () => setPlaying(p => !p)
    }, playing ? React.createElement(I.Pause, {
      size: 28
    }) : React.createElement(I.Play, {
      size: 28
    })), React.createElement(GlassBtn, {
      size: 52,
      label: 'Next',
      onClick: () => go(1)
    }, React.createElement(I.SkipNext, {
      size: 24
    })), React.createElement(GlassBtn, {
      size: 46,
      label: 'Output',
      onClick: () => setCollapsed(true)
    }, React.createElement(I.Speaker, {
      size: 20
    })))), chrome.HomeIndicatorLock());
  }
  window.OneUILock.LockScreen = LockScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lockscreen/LockScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/phone/ContactsScreen.jsx
try { (() => {
/* Contacts screen — recreation of the One UI Phone › Contactes view. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    Avatar,
    Card,
    ListRow,
    IconButton
  } = NS;
  const I = window.OneUIIcons;
  window.OneUIPhone = window.OneUIPhone || {};
  const FAVORITES = [{
    name: 'Avi Fausto',
    sub: 'Mobile'
  }, {
    name: 'Àvia Carme',
    sub: 'Mobile'
  }, {
    name: 'Àvia Leto',
    sub: 'Mobile'
  }, {
    name: 'Ignasi San José',
    sub: 'Mobile · Work'
  }, {
    name: 'Mare',
    sub: 'Mobile'
  }, {
    name: 'Pare',
    sub: 'Mobile'
  }];
  function Overline({
    icon,
    children,
    style
  }) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        margin: '0 0 10px',
        ...style
      }
    }, icon && React.createElement('span', {
      style: {
        color: 'var(--text-secondary)',
        display: 'flex'
      }
    }, icon), React.createElement('span', {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }
    }, children));
  }
  function ContactsScreen({
    onAdd
  }) {
    const chev = React.createElement('span', {
      style: {
        color: 'var(--text-tertiary)',
        display: 'flex'
      }
    }, React.createElement(I.Chevron, {
      size: 20
    }));
    return React.createElement('div', {
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }
    },
    // Title block
    React.createElement('div', {
      style: {
        padding: '20px 24px 8px',
        textAlign: 'center'
      }
    }, React.createElement('h1', {
      style: {
        margin: 0,
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-title)'
      }
    }, 'Telèfon'), React.createElement('p', {
      style: {
        margin: '10px 0 0',
        fontSize: 16,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, '1257 contactes amb número de telèfon')),
    // Action icons
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 4,
        padding: '14px 18px 6px'
      }
    }, React.createElement(IconButton, {
      variant: 'plain',
      icon: React.createElement(I.Plus),
      ariaLabel: 'Add',
      onClick: onAdd
    }), React.createElement(IconButton, {
      variant: 'plain',
      icon: React.createElement(I.Search),
      ariaLabel: 'Search'
    }), React.createElement(IconButton, {
      variant: 'plain',
      icon: React.createElement(I.More),
      ariaLabel: 'More'
    })),
    // My profile
    React.createElement('div', {
      style: {
        padding: '8px 16px 0'
      }
    }, React.createElement(Overline, null, 'El meu perfil'), React.createElement(Card, {
      padding: '8px 16px'
    }, React.createElement(ListRow, {
      leading: React.createElement(Avatar, {
        name: 'Faust',
        src: null,
        color: 'var(--accent-periwinkle)'
      }),
      title: 'Faust San José Gispert'
    }))),
    // Favorites
    React.createElement('div', {
      style: {
        padding: '22px 16px 0'
      }
    }, React.createElement(Overline, {
      icon: React.createElement(I.StarFill, {
        size: 18,
        style: {
          color: 'var(--accent)'
        }
      })
    }, 'Preferits'), React.createElement(Card, {
      padding: '6px 16px'
    }, FAVORITES.flatMap((c, idx) => {
      const row = React.createElement(ListRow, {
        key: c.name,
        leading: React.createElement(Avatar, {
          name: c.name
        }),
        title: c.name,
        subtitle: c.sub,
        trailing: chev
      });
      if (idx === FAVORITES.length - 1) return [row];
      return [row, React.createElement('div', {
        key: c.name + '-d',
        style: {
          height: 1,
          background: 'var(--divider)',
          margin: '0 0 0 62px'
        }
      })];
    }))), React.createElement('div', {
      style: {
        height: 120
      }
    }));
  }
  window.OneUIPhone.ContactsScreen = ContactsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/phone/ContactsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/phone/DialerScreen.jsx
try { (() => {
/* Dialer / keypad screen. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    IconButton
  } = NS;
  const I = window.OneUIIcons;
  window.OneUIPhone = window.OneUIPhone || {};
  const KEYS = [{
    n: '1',
    s: ''
  }, {
    n: '2',
    s: 'ABC'
  }, {
    n: '3',
    s: 'DEF'
  }, {
    n: '4',
    s: 'GHI'
  }, {
    n: '5',
    s: 'JKL'
  }, {
    n: '6',
    s: 'MNO'
  }, {
    n: '7',
    s: 'PQRS'
  }, {
    n: '8',
    s: 'TUV'
  }, {
    n: '9',
    s: 'WXYZ'
  }, {
    n: '*',
    s: ''
  }, {
    n: '0',
    s: '+'
  }, {
    n: '#',
    s: ''
  }];
  function Key({
    n,
    s,
    onPress
  }) {
    const [p, setP] = React.useState(false);
    return React.createElement('button', {
      onPointerDown: () => setP(true),
      onPointerUp: () => setP(false),
      onPointerLeave: () => setP(false),
      onClick: () => onPress(n),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        height: 72,
        width: 72,
        margin: '0 auto',
        border: 'none',
        borderRadius: '50%',
        background: p ? 'var(--gray-150)' : 'transparent',
        cursor: 'pointer',
        transform: p ? 'scale(0.94)' : 'scale(1)',
        transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, React.createElement('span', {
      style: {
        fontSize: 30,
        fontWeight: 500,
        color: 'var(--text-primary)',
        lineHeight: 1
      }
    }, n), s && React.createElement('span', {
      style: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: 'var(--text-secondary)'
      }
    }, s));
  }
  function DialerScreen() {
    const [val, setVal] = React.useState('');
    const press = k => setVal(v => v.length < 16 ? v + k : v);
    return React.createElement('div', {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }
    },
    // Display
    React.createElement('div', {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 24px 8px',
        minHeight: 120
      }
    }, React.createElement('span', {
      style: {
        fontSize: val.length > 9 ? 32 : 40,
        fontWeight: 400,
        letterSpacing: '0.02em',
        color: 'var(--text-primary)',
        minHeight: 48
      }
    }, val || '')),
    // Keypad
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        rowGap: 6,
        padding: '0 28px'
      }
    }, KEYS.map(k => React.createElement(Key, {
      key: k.n,
      n: k.n,
      s: k.s,
      onPress: press
    }))),
    // Call + backspace row
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '14px 28px 8px'
      }
    }, React.createElement('span', null), React.createElement('button', {
      'aria-label': 'Call',
      style: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        border: 'none',
        background: 'var(--success)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 18px rgba(30,158,99,0.4)',
        justifySelf: 'center'
      }
    }, React.createElement(I.PhoneCall, {
      size: 30
    })), React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, val && React.createElement(IconButton, {
      variant: 'plain',
      ariaLabel: 'Delete',
      color: 'var(--text-secondary)',
      onClick: () => setVal(v => v.slice(0, -1)),
      icon: React.createElement('svg', {
        width: 26,
        height: 26,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }, React.createElement('path', {
        d: 'M21 6H9l-5 6 5 6h12z'
      }), React.createElement('path', {
        d: 'M15 9.5l-4 5M11 9.5l4 5'
      }))
    }))), React.createElement('div', {
      style: {
        height: 110
      }
    }));
  }
  window.OneUIPhone.DialerScreen = DialerScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/phone/DialerScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/phone/PhoneChrome.jsx
try { (() => {
/* Phone chrome — status bar + home indicator. Attaches to window.OneUIPhone. */
(function () {
  const React = window.React;
  const I = window.OneUIIcons;
  window.OneUIPhone = window.OneUIPhone || {};
  function StatusBar({
    dark = false
  }) {
    const fg = dark ? '#fff' : 'var(--text-primary)';
    return React.createElement('div', {
      style: {
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 26px',
        flex: 'none',
        color: fg,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 15
      }
    }, React.createElement('span', {
      style: {
        letterSpacing: '0.01em'
      }
    }, '1:46'), React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7
      }
    },
    // wifi
    React.createElement('svg', {
      width: 18,
      height: 18,
      viewBox: '0 0 24 24',
      fill: fg
    }, React.createElement('path', {
      d: 'M12 18.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM6 13.5a8.5 8.5 0 0 1 12 0l-2 2a5.7 5.7 0 0 0-8 0zM2.5 10a13.4 13.4 0 0 1 19 0l-2 2a10.6 10.6 0 0 0-15 0z'
    })),
    // signal
    React.createElement('svg', {
      width: 18,
      height: 14,
      viewBox: '0 0 24 18',
      fill: fg
    }, [4, 9, 14, 19].map((x, i) => React.createElement('rect', {
      key: i,
      x,
      y: 14 - i * 4,
      width: 3,
      height: 4 + i * 4,
      rx: 1,
      opacity: i === 3 ? 0.4 : 1
    }))),
    // battery
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement('div', {
      style: {
        width: 26,
        height: 15,
        borderRadius: 5,
        background: fg,
        color: dark ? '#000' : '#fff',
        fontSize: 9.5,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, '42'))));
  }
  function HomeIndicator({
    dark = false
  }) {
    return React.createElement('div', {
      style: {
        height: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, React.createElement('div', {
      style: {
        width: 134,
        height: 5,
        borderRadius: 3,
        background: dark ? 'rgba(255,255,255,0.85)' : 'var(--gray-900)'
      }
    }));
  }

  // Phone frame: fixed 412×892 device viewport with rounded screen.
  function PhoneFrame({
    children,
    bg = 'var(--bg-app)'
  }) {
    return React.createElement('div', {
      style: {
        width: 412,
        height: 892,
        background: bg,
        borderRadius: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'var(--font-sans)'
      }
    }, children);
  }
  Object.assign(window.OneUIPhone, {
    StatusBar,
    HomeIndicator,
    PhoneFrame
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/phone/PhoneChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/phone/RecentsScreen.jsx
try { (() => {
/* Recents / call log screen. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    Avatar,
    Card,
    ListRow,
    IconButton
  } = NS;
  const I = window.OneUIIcons;
  window.OneUIPhone = window.OneUIPhone || {};
  const CALLS = [{
    name: 'Àvia Carme',
    type: 'in',
    time: '1:32 PM'
  }, {
    name: 'Ignasi San José',
    type: 'out',
    time: '11:08 AM'
  }, {
    name: 'Mare',
    type: 'missed',
    time: 'Yesterday'
  }, {
    name: '+34 691 023 884',
    type: 'out',
    time: 'Yesterday'
  }, {
    name: 'Avi Fausto',
    type: 'in',
    time: 'Tue'
  }, {
    name: 'Pare',
    type: 'missed',
    time: 'Mon'
  }];
  function CallIcon({
    type
  }) {
    const color = type === 'missed' ? 'var(--danger)' : type === 'in' ? 'var(--success)' : 'var(--text-secondary)';
    const rot = type === 'out' ? 'rotate(0deg)' : 'rotate(0deg)';
    return React.createElement('svg', {
      width: 16,
      height: 16,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: 2.4,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        transform: rot,
        flex: 'none'
      }
    }, type === 'out' ? [React.createElement('path', {
      key: 1,
      d: 'M7 17L17 7'
    }), React.createElement('path', {
      key: 2,
      d: 'M9 7h8v8'
    })] : [React.createElement('path', {
      key: 1,
      d: 'M17 7L7 17'
    }), React.createElement('path', {
      key: 2,
      d: 'M15 17H7V9'
    })]);
  }
  function RecentsScreen() {
    return React.createElement('div', {
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }
    }, React.createElement('div', {
      style: {
        padding: '20px 24px 4px',
        textAlign: 'center'
      }
    }, React.createElement('h1', {
      style: {
        margin: 0,
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-title)'
      }
    }, 'Recents')), React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 4,
        padding: '14px 18px 6px'
      }
    }, React.createElement(IconButton, {
      variant: 'plain',
      icon: React.createElement(I.Search),
      ariaLabel: 'Search'
    }), React.createElement(IconButton, {
      variant: 'plain',
      icon: React.createElement(I.More),
      ariaLabel: 'More'
    })), React.createElement('div', {
      style: {
        padding: '6px 16px 0'
      }
    }, React.createElement(Card, {
      padding: '6px 16px'
    }, CALLS.flatMap((c, idx) => {
      const meta = React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }
      }, React.createElement(CallIcon, {
        type: c.type
      }), React.createElement('span', {
        style: {
          fontSize: 14,
          color: 'var(--text-secondary)'
        }
      }, c.time));
      const row = React.createElement(ListRow, {
        key: c.name + idx,
        leading: React.createElement(Avatar, {
          name: c.name
        }),
        title: c.name,
        subtitle: c.type === 'missed' ? 'Missed call' : c.type === 'in' ? 'Incoming' : 'Outgoing',
        trailing: React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }
        }, meta, React.createElement(IconButton, {
          variant: 'tonal',
          size: 40,
          icon: React.createElement(I.Phone, {
            size: 20
          }),
          ariaLabel: 'Call'
        }))
      });
      if (idx === CALLS.length - 1) return [row];
      return [row, React.createElement('div', {
        key: idx + '-d',
        style: {
          height: 1,
          background: 'var(--divider)',
          margin: '0 0 0 64px'
        }
      })];
    }))), React.createElement('div', {
      style: {
        height: 120
      }
    }));
  }
  window.OneUIPhone.RecentsScreen = RecentsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/phone/RecentsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/settings/SettingsScreen.jsx
try { (() => {
/* One UI 9 Settings screen — the universal grouped-list pattern.
   Large title, search field, grouped white cards with icon rows,
   blue value text, and blue toggles. */
(function () {
  const React = window.React;
  const NS = window.OneUI9DesignSystem_a427e9;
  const {
    Card,
    ListRow,
    Switch,
    Input,
    LargeTitleHeader,
    IconButton
  } = NS;
  const I = window.OneUIIcons;
  window.OneUISettings = window.OneUISettings || {};

  // Rounded square icon tile (One UI settings glyph chips)
  function IconTile({
    bg,
    children
  }) {
    return React.createElement('div', {
      style: {
        width: 40,
        height: 40,
        flex: 'none',
        borderRadius: 12,
        background: bg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, children);
  }
  function SectionLabel({
    children
  }) {
    return React.createElement('div', {
      style: {
        padding: '22px 26px 10px',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }
    }, children);
  }
  function Divider() {
    return React.createElement('div', {
      style: {
        height: 1,
        background: 'var(--divider)',
        margin: '0 0 0 72px'
      }
    });
  }
  function SettingsScreen({
    chrome
  }) {
    const [vals, setVals] = React.useState({
      weeknum: true,
      weather: true,
      reminders: true,
      hideDeclined: true,
      hidePast: false
    });
    const set = k => v => setVals(s => ({
      ...s,
      [k]: v
    }));
    const [q, setQ] = React.useState('');
    const tog = k => React.createElement(Switch, {
      checked: vals[k],
      onChange: set(k)
    });
    return React.createElement('div', {
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }
    }, React.createElement(LargeTitleHeader, {
      title: 'Settings',
      align: 'left',
      topSpace: 18,
      leading: React.createElement(IconButton, {
        variant: 'plain',
        icon: React.createElement(I.ChevronLeft),
        ariaLabel: 'Back'
      }),
      actions: [React.createElement(IconButton, {
        key: 's',
        variant: 'plain',
        icon: React.createElement(I.Search),
        ariaLabel: 'Search'
      }), React.createElement(IconButton, {
        key: 'm',
        variant: 'plain',
        icon: React.createElement(I.More),
        ariaLabel: 'More'
      })]
    }),
    // Search field
    React.createElement('div', {
      style: {
        padding: '4px 16px 6px'
      }
    }, React.createElement(Input, {
      value: q,
      onChange: setQ,
      placeholder: 'Search',
      leadingIcon: React.createElement(I.Search, {
        size: 20
      })
    })),
    // Calendar preview + change style (from the Calendar settings screenshot)
    React.createElement('div', {
      style: {
        padding: '12px 16px 0'
      }
    }, React.createElement(Card, {
      padding: 16
    }, React.createElement('div', {
      style: {
        textAlign: 'center'
      }
    }, React.createElement('div', {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: 8
      }
    }, 'Ajustaments del calendari'), React.createElement('button', {
      style: {
        height: 52,
        padding: '0 28px',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--gray-150)',
        color: 'var(--text-primary)',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer'
      }
    }, 'Canviar estil del calendari')))), SectionLabel('Informació opcional'), React.createElement('div', {
      style: {
        padding: '0 16px'
      }
    }, React.createElement(Card, {
      padding: '4px 16px'
    }, React.createElement(ListRow, {
      title: 'Primer dia de la setmana',
      subtitle: 'Dilluns',
      subtitleColor: 'var(--text-value)',
      onClick: () => {}
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Alternar calendari',
      subtitle: 'Cap',
      subtitleColor: 'var(--text-value)',
      onClick: () => {}
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Mostrar números setmana',
      subtitle: "Comptar des de la setmana amb el primer dijous de l'any",
      subtitleColor: 'var(--text-value)',
      wrapSubtitle: true,
      interactive: false,
      trailing: tog('weeknum')
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Mostrar la previsió del temps',
      interactive: false,
      trailing: tog('weather')
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Mostrar recordatoris completats',
      interactive: false,
      trailing: tog('reminders')
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Oculta esdeveniments rebutjats',
      interactive: false,
      trailing: tog('hideDeclined')
    }), React.createElement(Divider), React.createElement(ListRow, {
      title: 'Ocultar esdeveniments passats',
      subtitle: "Mostra només els del dia actual i propers",
      wrapSubtitle: true,
      interactive: false,
      trailing: tog('hidePast')
    }))), React.createElement('div', {
      style: {
        height: 40
      }
    }));
  }
  window.OneUISettings.SettingsScreen = SettingsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/settings/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NowBar = __ds_scope.NowBar;

__ds_ns.WaveScrubber = __ds_scope.WaveScrubber;

__ds_ns.LargeTitleHeader = __ds_scope.LargeTitleHeader;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
