/* @ds-bundle: {"format":3,"namespace":"SudokuADayDesignSystem_aa4cbb","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"StatTile","sourcePath":"components/core/StatTile.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"DifficultyChip","sourcePath":"components/game/DifficultyChip.jsx"},{"name":"NumberPad","sourcePath":"components/game/NumberPad.jsx"},{"name":"SAMPLE_PUZZLE","sourcePath":"components/game/SudokuBoard.jsx"},{"name":"SudokuBoard","sourcePath":"components/game/SudokuBoard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b4e322a801a2","components/core/Button.jsx":"ce6daad5df12","components/core/Card.jsx":"0041d9ffd701","components/core/Icon.jsx":"2b99c99a1fb8","components/core/SegmentedControl.jsx":"2678498761bc","components/core/StatTile.jsx":"92fda1afe927","components/core/Switch.jsx":"a114f7f3568a","components/game/DifficultyChip.jsx":"ae1b5db9385e","components/game/NumberPad.jsx":"d2c638e56ff0","components/game/SudokuBoard.jsx":"a526ec8257ad","ui_kits/app/CompleteScreen.jsx":"c36a66c6c3ce","ui_kits/app/GameScreen.jsx":"ff6468c22ab0","ui_kits/app/HomeScreen.jsx":"a989de05f4ce","ui_kits/app/PhoneFrame.jsx":"cc1d756e7192"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SudokuADayDesignSystem_aa4cbb = window.SudokuADayDesignSystem_aa4cbb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    bg: "var(--surface-sunken)",
    fg: "var(--text-body)"
  },
  violet: {
    bg: "var(--violet-tint)",
    fg: "var(--violet-deep)"
  },
  red: {
    bg: "var(--red-tint)",
    fg: "var(--red-deep)"
  },
  gold: {
    bg: "var(--gold-tint)",
    fg: "var(--gold-deep)"
  },
  ink: {
    bg: "var(--ink)",
    fg: "#fff"
  },
  success: {
    bg: "#DCF3E6",
    fg: "var(--success)"
  }
};

/**
 * Sudoku a Day — small status / category badge.
 */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  dot = false,
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.neutral;
  const solidBg = {
    violet: "var(--violet)",
    red: "var(--red)",
    gold: "var(--gold)",
    ink: "var(--ink)",
    success: "var(--success)",
    neutral: "var(--gray-300)"
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: "var(--fw-bold)",
      lineHeight: 1,
      letterSpacing: "0.01em",
      padding: "6px 10px",
      borderRadius: "var(--radius-pill)",
      background: solid ? solidBg : t.bg,
      color: solid ? "#fff" : t.fg,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: solid ? "#fff" : t.fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    fontSize: 14,
    padding: "8px 14px",
    radius: "var(--radius-sm)",
    gap: 6
  },
  md: {
    fontSize: 16,
    padding: "12px 20px",
    radius: "var(--radius-md)",
    gap: 8
  },
  lg: {
    fontSize: 18,
    padding: "16px 26px",
    radius: "var(--radius-lg)",
    gap: 10
  }
};
const variants = {
  primary: {
    background: "var(--violet)",
    color: "var(--text-on-color)",
    border: "var(--border-w) solid transparent",
    boxShadow: "var(--shadow-pop)"
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-strong)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-xs)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "var(--border-w) solid transparent",
    boxShadow: "none"
  },
  danger: {
    background: "var(--red)",
    color: "var(--text-on-color)",
    border: "var(--border-w) solid transparent",
    boxShadow: "0 8px 20px rgba(255,51,52,0.24)"
  }
};

/**
 * Sudoku a Day — primary action button.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverFx = !disabled && hover ? variant === "primary" ? {
    background: "var(--violet-deep)"
  } : variant === "danger" ? {
    background: "var(--red-deep)"
  } : variant === "ghost" ? {
    background: "var(--surface-sunken)"
  } : {
    background: "var(--gray-50)",
    borderColor: "var(--line-strong)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      fontFamily: "var(--font-brand)",
      fontWeight: "var(--fw-bold)",
      fontSize: s.fontSize,
      letterSpacing: "-0.006em",
      padding: s.padding,
      borderRadius: s.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transform: press && !disabled ? "scale(0.97)" : "scale(1)",
      transition: "transform var(--dur-fast) var(--ease-spring), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      ...v,
      ...hoverFx,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const pads = {
  sm: "var(--space-4)",
  md: "var(--space-6)",
  lg: "var(--space-8)"
};
const elevs = {
  flat: "none",
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)"
};

/**
 * Sudoku a Day — surface card / sheet.
 */
function Card({
  children,
  padding = "md",
  elevation = "sm",
  bordered = false,
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      padding: pads[padding] || pads.md,
      boxShadow: hover ? "var(--shadow-md)" : elevs[elevation] || elevs.sm,
      border: bordered ? "var(--border-w) solid var(--line-soft)" : "none",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sudoku a Day — icon set.
 * Glyphs are Lucide (lucide.dev, ISC license): 24×24, 2px round stroke —
 * the rounded stroke matches the brand's soft geometry.
 */
const PATHS = {
  undo: "M9 14 4 9l5-5 M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11",
  eraser: "m7 21-4.3-4.3a1 1 0 0 1 0-1.4l9.6-9.6a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 21 M22 21H7 M5 11l9 9",
  pencil: "M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  bulb: "M9 18h6 M10 22h4 M15.09 14c.18-.79.65-1.47 1.16-2.08A6 6 0 1 0 6 8c0 1 .23 2.23 1.75 4 .51.61.98 1.29 1.16 2.08",
  settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
  chart: "M3 3v16a2 2 0 0 0 2 2h16 M18 17V9 M13 17V5 M8 17v-3",
  close: "M18 6 6 18 M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  pause: "M14 4v16 M6 4v16",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13",
  calendar: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  chevronRight: "m9 18 6-6-6-6",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2Z"
};
function Icon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  style = {},
  ...rest
}) {
  const d = PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    "aria-hidden": "true"
  }, rest), d.split(" M").map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: i === 0 ? seg : "M" + seg
  })));
}
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * Sudoku a Day — segmented control (difficulty / mode switcher).
 */
function SegmentedControl({
  options = [],
  value,
  onChange = () => {},
  size = "md",
  style = {}
}) {
  const norm = options.map(o => typeof o === "string" ? {
    label: o,
    value: o
  } : o);
  const pad = size === "sm" ? "7px 12px" : "10px 16px";
  const fs = size === "sm" ? 13 : 15;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 4,
      padding: 4,
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, norm.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => onChange(o.value),
      style: {
        fontFamily: "var(--font-brand)",
        fontWeight: "var(--fw-semibold)",
        fontSize: fs,
        padding: pad,
        border: "none",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        color: active ? "var(--text-strong)" : "var(--text-muted)",
        background: active ? "var(--surface-card)" : "transparent",
        boxShadow: active ? "var(--shadow-sm)" : "none",
        transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)"
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/StatTile.jsx
try { (() => {
const shapeSrc = {
  hexagon: "hexagon",
  seal: "seal",
  triangle: "triangle"
};

/**
 * Sudoku a Day — stat tile with a brand-mark accent.
 * `assetBase` is the path prefix to /assets (default "assets").
 */
function StatTile({
  value,
  label,
  shape = "hexagon",
  tone = "violet",
  assetBase = "assets",
  style = {}
}) {
  const toneColor = {
    violet: "var(--violet)",
    red: "var(--red)",
    gold: "var(--gold)",
    ink: "var(--ink)"
  }[tone] || "var(--violet)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: "var(--space-5)",
      overflow: "hidden",
      ...style
    }
  }, shape && /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-${shapeSrc[shape] || "hexagon"}.svg`,
    alt: "",
    style: {
      position: "absolute",
      top: -14,
      right: -14,
      width: 56,
      height: 56,
      opacity: 0.16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontFeatureSettings: "var(--num-feature)",
      fontSize: "var(--fs-h1)",
      fontWeight: "var(--fw-black)",
      letterSpacing: "-0.02em",
      color: toneColor,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
/**
 * Sudoku a Day — toggle switch.
 */
function Switch({
  checked = false,
  onChange = () => {},
  disabled = false,
  size = "md",
  style = {}
}) {
  const w = size === "sm" ? 40 : 50;
  const h = size === "sm" ? 24 : 30;
  const knob = h - 6;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange(!checked),
    style: {
      position: "relative",
      width: w,
      height: h,
      borderRadius: "var(--radius-pill)",
      border: "none",
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      background: checked ? "var(--violet)" : "var(--gray-300)",
      transition: "background var(--dur-base) var(--ease-out)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: 3,
      width: knob,
      height: knob,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? `translateX(${w - knob - 6}px)` : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-spring)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/game/DifficultyChip.jsx
try { (() => {
const map = {
  Easy: {
    shape: "triangle",
    tone: "var(--gold)",
    tint: "var(--gold-tint)"
  },
  Medium: {
    shape: "hexagon",
    tone: "var(--violet)",
    tint: "var(--violet-tint)"
  },
  Hard: {
    shape: "seal",
    tone: "var(--red)",
    tint: "var(--red-tint)"
  },
  Evil: {
    shape: "seal",
    tone: "var(--ink)",
    tint: "var(--gray-100)"
  }
};

/**
 * Sudoku a Day — difficulty selector chip with brand mark.
 * `assetBase` is the path prefix to /assets (default "assets").
 */
function DifficultyChip({
  level = "Medium",
  selected = false,
  onClick = () => {},
  assetBase = "assets",
  style = {}
}) {
  const m = map[level] || map.Medium;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--space-4)",
      borderRadius: "var(--radius-pill)",
      border: `var(--border-w) solid ${selected ? m.tone : "var(--line-soft)"}`,
      background: selected ? m.tint : "var(--surface-card)",
      cursor: "pointer",
      fontFamily: "var(--font-brand)",
      fontWeight: "var(--fw-bold)",
      fontSize: 15,
      color: selected ? m.tone : "var(--text-body)",
      boxShadow: selected ? "none" : "var(--shadow-xs)",
      transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-${m.shape}.svg`,
    alt: "",
    style: {
      width: 20,
      height: 20
    }
  }), level);
}
Object.assign(__ds_scope, { DifficultyChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/DifficultyChip.jsx", error: String((e && e.message) || e) }); }

// components/game/NumberPad.jsx
try { (() => {
/**
 * Sudoku a Day — 1–9 number entry pad with remaining counts.
 */
function NumberPad({
  onNumber = () => {},
  remaining = {},
  disabled = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(9, 1fr)",
      gap: "var(--space-2)",
      width: "100%",
      ...style
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
    const left = remaining[n];
    const done = left === 0;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      disabled: disabled || done,
      onClick: () => onNumber(n),
      style: {
        position: "relative",
        aspectRatio: "1 / 1.15",
        background: "var(--surface-card)",
        border: "var(--border-w) solid var(--line-soft)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-xs)",
        cursor: done ? "default" : "pointer",
        opacity: done ? 0.35 : 1,
        fontFamily: "var(--font-num)",
        fontFeatureSettings: "var(--num-feature)",
        fontSize: "var(--fs-num-lg)",
        fontWeight: "var(--fw-bold)",
        color: "var(--text-strong)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-out)"
      },
      onMouseDown: e => {
        if (!done) e.currentTarget.style.transform = "scale(0.92)";
      },
      onMouseUp: e => {
        e.currentTarget.style.transform = "scale(1)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "scale(1)";
      }
    }, n, typeof left === "number" && !done && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        bottom: 3,
        fontSize: 9,
        fontWeight: "var(--fw-semibold)",
        color: "var(--text-faint)"
      }
    }, left));
  }));
}
Object.assign(__ds_scope, { NumberPad });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/NumberPad.jsx", error: String((e && e.message) || e) }); }

// components/game/SudokuBoard.jsx
try { (() => {
/** A fully-solvable sample daily puzzle (0 = empty). */
const SAMPLE_PUZZLE = [5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 6, 0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2, 0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0, 0, 8, 0, 0, 7, 9];

/**
 * Sudoku a Day — the 9×9 playing grid.
 * Renders clues, player entries, the active selection, peer/number
 * highlighting, conflict state and pencil notes.
 */
function SudokuBoard({
  puzzle = SAMPLE_PUZZLE,
  values = {},
  notes = {},
  given,
  selected = null,
  conflicts = [],
  onSelect = () => {},
  size = 340,
  style = {}
}) {
  const givenSet = given || puzzle.map(v => v !== 0);
  const selVal = selected != null ? values[selected] ?? puzzle[selected] ?? 0 : 0;
  const selRow = selected != null ? Math.floor(selected / 9) : -1;
  const selCol = selected != null ? selected % 9 : -1;
  const selBox = selected != null ? Math.floor(selRow / 3) * 3 + Math.floor(selCol / 3) : -1;
  const cell = size / 9;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      display: "grid",
      gridTemplateColumns: "repeat(9, 1fr)",
      gridTemplateRows: "repeat(9, 1fr)",
      background: "var(--ink)",
      border: "var(--border-w-strong) solid var(--ink)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      gap: 1,
      fontFamily: "var(--font-num)",
      fontFeatureSettings: "var(--num-feature)",
      ...style
    }
  }, puzzle.map((clue, i) => {
    const r = Math.floor(i / 9),
      c = i % 9;
    const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
    const isGiven = givenSet[i];
    const val = isGiven ? clue : values[i] || 0;
    const isSel = i === selected;
    const isPeer = !isSel && (r === selRow || c === selCol || box === selBox);
    const sameNum = !isSel && val !== 0 && val === selVal;
    const isConflict = conflicts.includes(i);
    const cellNotes = notes[i];
    let bg = "var(--surface-card)";
    if (isPeer) bg = "var(--gray-50)";
    if (sameNum) bg = "var(--violet-tint)";
    if (isSel) bg = "var(--violet-tint)";
    if (isConflict) bg = "var(--red-tint)";

    // thicker separators between 3×3 boxes
    const bThick = "var(--border-w-strong) solid var(--ink)";
    const bThin = "1px solid var(--line-soft)";
    const borderRight = c % 3 === 2 && c !== 8 ? bThick : bThin;
    const borderBottom = r % 3 === 2 && r !== 8 ? bThick : bThin;
    let color = "var(--text-strong)";
    if (!isGiven && val) color = isConflict ? "var(--red-deep)" : "var(--violet)";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => onSelect(i),
      style: {
        position: "relative",
        border: "none",
        borderRight,
        borderBottom,
        background: bg,
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: cell * 0.5,
        fontWeight: isGiven ? "var(--fw-bold)" : "var(--fw-semibold)",
        color,
        boxShadow: isSel ? "inset 0 0 0 2px var(--violet)" : "none",
        transition: "background var(--dur-fast) var(--ease-out)"
      }
    }, val ? val : cellNotes && cellNotes.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 2,
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "repeat(3,1fr)",
        fontSize: cell * 0.22,
        color: "var(--text-faint)",
        fontWeight: "var(--fw-medium)"
      }
    }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, cellNotes.includes(n) ? n : ""))) : null);
  }));
}
Object.assign(__ds_scope, { SAMPLE_PUZZLE, SudokuBoard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/SudokuBoard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CompleteScreen.jsx
try { (() => {
// CompleteScreen — solved celebration. Exposes window.CompleteScreen
function CompleteScreen({
  onHome,
  diff,
  assetBase
}) {
  const {
    Button,
    StatTile,
    Icon
  } = window.SudokuADayDesignSystem_aa4cbb;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 24px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-hexagon.svg`,
    alt: "",
    style: {
      position: "absolute",
      left: 26,
      top: 70,
      width: 34,
      opacity: 0.9,
      transform: "rotate(-12deg)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-seal.svg`,
    alt: "",
    style: {
      position: "absolute",
      right: 36,
      top: 120,
      width: 28,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-triangle.svg`,
    alt: "",
    style: {
      position: "absolute",
      right: 60,
      top: 56,
      width: 24,
      opacity: 0.9,
      transform: "rotate(14deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: 28,
      background: "var(--violet)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-pop)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    size: 48,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--violet)",
      marginTop: 26
    }
  }, "Puzzle solved"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-brand)",
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      textAlign: "center"
    }
  }, "Nicely done."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontSize: 16,
      color: "var(--text-muted)",
      textAlign: "center",
      maxWidth: 280
    }
  }, "That's the ", diff, " grid cleared. Come back tomorrow for a fresh one."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginTop: 30,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: "3:48",
    label: "Time",
    shape: "seal",
    tone: "red",
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "2",
    label: "Hints",
    shape: "hexagon",
    tone: "violet",
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "15",
    label: "Streak",
    shape: "triangle",
    tone: "gold",
    assetBase: assetBase
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 20,
      color: "#fff"
    })
  }, "Share result"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    onClick: onHome
  }, "Back to home")));
}
window.CompleteScreen = CompleteScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CompleteScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/GameScreen.jsx
try { (() => {
// GameScreen — active puzzle. Exposes window.GameScreen
function GameScreen({
  onClose,
  onSolved,
  diff,
  assetBase
}) {
  const {
    SudokuBoard,
    NumberPad,
    Icon,
    Badge,
    SAMPLE_PUZZLE
  } = window.SudokuADayDesignSystem_aa4cbb;
  const [sel, setSel] = React.useState(40);
  const [values, setValues] = React.useState({
    2: 4,
    5: 6
  });
  const [notes, setNotes] = React.useState({
    7: [2, 8],
    16: [1, 3, 5]
  });
  const [noteMode, setNoteMode] = React.useState(false);
  const [t, setT] = React.useState(161);
  React.useEffect(() => {
    const id = setInterval(() => setT(x => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mmss = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  const given = SAMPLE_PUZZLE.map(v => v !== 0);
  const conflicts = sel === 2 ? [2] : [];
  const place = n => {
    if (sel == null || given[sel]) return;
    if (noteMode) {
      setNotes(prev => {
        const cur = prev[sel] || [];
        const next = cur.includes(n) ? cur.filter(x => x !== n) : [...cur, n].sort();
        return {
          ...prev,
          [sel]: next
        };
      });
    } else {
      setValues(prev => ({
        ...prev,
        [sel]: n
      }));
      setNotes(prev => ({
        ...prev,
        [sel]: []
      }));
    }
  };
  const erase = () => {
    if (sel != null && !given[sel]) {
      setValues(p => {
        const c = {
          ...p
        };
        delete c[sel];
        return c;
      });
      setNotes(p => ({
        ...p,
        [sel]: []
      }));
    }
  };

  // remaining counts
  const remaining = {};
  for (let n = 1; n <= 9; n++) {
    let used = 0;
    SAMPLE_PUZZLE.forEach((v, i) => {
      const val = given[i] ? v : values[i];
      if (val === n) used++;
    });
    remaining[n] = Math.max(0, 9 - used);
  }
  const tool = (name, label, onClick, active) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "4px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: active ? "var(--violet-tint)" : "var(--surface-card)",
      boxShadow: active ? "none" : "var(--shadow-xs)",
      border: active ? "1.5px solid var(--violet)" : "1.5px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: 22,
    color: active ? "var(--violet)" : "var(--text-body)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: active ? "var(--violet)" : "var(--text-muted)"
    }
  }, label));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 22px 0"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: hIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 22,
    color: "var(--text-body)"
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: {
      Easy: "gold",
      Medium: "violet",
      Hard: "red",
      Evil: "ink"
    }[diff] || "violet"
  }, diff), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontFeatureSettings: "var(--num-feature)",
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, mmss), /*#__PURE__*/React.createElement("button", {
    style: hIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 20,
    color: "var(--text-body)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px 0",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(SudokuBoard, {
    puzzle: SAMPLE_PUZZLE,
    values: values,
    notes: notes,
    selected: sel,
    conflicts: conflicts,
    onSelect: setSel,
    size: 342
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "22px 24px 0"
    }
  }, tool("undo", "Undo", () => {}, false), tool("eraser", "Erase", erase, false), tool("pencil", "Notes", () => setNoteMode(m => !m), noteMode), tool("bulb", "Hint", () => {}, false)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px 0"
    }
  }, /*#__PURE__*/React.createElement(NumberPad, {
    remaining: remaining,
    onNumber: place
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 28px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onSolved,
    style: {
      width: "100%",
      padding: "16px",
      borderRadius: "var(--radius-lg)",
      border: "none",
      cursor: "pointer",
      background: "var(--violet)",
      color: "#fff",
      fontFamily: "var(--font-brand)",
      fontSize: 17,
      fontWeight: 800,
      boxShadow: "var(--shadow-pop)"
    }
  }, "Check puzzle")));
}
const hIcon = {
  width: 40,
  height: 40,
  borderRadius: 99,
  border: "none",
  background: "var(--surface-card)",
  boxShadow: "var(--shadow-xs)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};
window.GameScreen = GameScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/GameScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
// HomeScreen — "Today" landing. Exposes window.HomeScreen
function HomeScreen({
  onPlay,
  diff,
  setDiff,
  assetBase
}) {
  const {
    Card,
    Badge,
    StatTile,
    Icon,
    DifficultyChip
  } = window.SudokuADayDesignSystem_aa4cbb;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 24px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "0.12em",
      color: "var(--ink)"
    }
  }, "SUDOKU"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 20,
    color: "var(--text-body)"
  })), /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 20,
    color: "var(--text-body)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "var(--text-muted)",
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 16,
    color: "var(--text-muted)"
  }), " Friday, June 20"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "6px 0 0",
      fontFamily: "var(--font-brand)",
      fontSize: 34,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)"
    }
  }, "Today's puzzle")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 24px 0"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    elevation: "md",
    interactive: true,
    onClick: onPlay,
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/shape-hexagon.svg`,
    alt: "",
    style: {
      position: "absolute",
      right: -22,
      top: -22,
      width: 96,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "violet",
    dot: true
  }, "In progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums"
    }
  }, "02:41")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 44,
      fontWeight: 800,
      color: "var(--violet)",
      letterSpacing: "-0.02em"
    }
  }, "62%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, "complete")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 8,
      background: "var(--surface-sunken)",
      borderRadius: 99,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "62%",
      height: "100%",
      background: "var(--violet)",
      borderRadius: 99
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, "Continue"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 20,
    color: "var(--violet)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "New puzzle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 12
    }
  }, ["Easy", "Medium", "Hard", "Evil"].map(l => /*#__PURE__*/React.createElement(DifficultyChip, {
    key: l,
    level: l,
    selected: diff === l,
    onClick: () => setDiff(l),
    assetBase: assetBase
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "Your stats"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: "128",
    label: "Solved",
    shape: "hexagon",
    tone: "violet",
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "14",
    label: "Streak",
    shape: "triangle",
    tone: "gold",
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "4:12",
    label: "Best",
    shape: "seal",
    tone: "red",
    assetBase: assetBase
  }))));
}
const iconBtn = {
  width: 40,
  height: 40,
  borderRadius: 99,
  border: "none",
  background: "var(--surface-card)",
  boxShadow: "var(--shadow-xs)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};
const sectionLabel = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-faint)"
};
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PhoneFrame.jsx
try { (() => {
// PhoneFrame — simple status-bar shell for the Sudoku a Day app surface.
// Exposes window.PhoneFrame
function PhoneFrame({
  children,
  bg = "var(--canvas)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 800,
      background: bg,
      borderRadius: 44,
      boxShadow: "0 30px 80px rgba(26,26,26,0.22), 0 0 0 10px #111, 0 0 0 11px #2a2a2a",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px 0 32px",
      fontSize: 15,
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: 10,
      transform: "translateX(-50%)",
      width: 110,
      height: 30,
      background: "#111",
      borderRadius: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "12",
    viewBox: "0 0 18 12",
    fill: "var(--text-strong)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "4",
    width: "3",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "1.5",
    width: "3",
    height: "10.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "0",
    width: "3",
    height: "12",
    rx: "1",
    opacity: "0.35"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "12",
    viewBox: "0 0 24 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "19",
    height: "10",
    rx: "3",
    fill: "none",
    stroke: "var(--text-strong)",
    strokeOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "14",
    height: "6",
    rx: "1.5",
    fill: "var(--text-strong)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "4",
    width: "2",
    height: "4",
    rx: "1",
    fill: "var(--text-strong)",
    fillOpacity: "0.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, children));
}
window.PhoneFrame = PhoneFrame;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PhoneFrame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.DifficultyChip = __ds_scope.DifficultyChip;

__ds_ns.NumberPad = __ds_scope.NumberPad;

__ds_ns.SAMPLE_PUZZLE = __ds_scope.SAMPLE_PUZZLE;

__ds_ns.SudokuBoard = __ds_scope.SudokuBoard;

})();
