/* @ds-bundle: {"format":4,"namespace":"HolySpotsDesignSystem_cfcab4","components":[{"name":"AdminMenu","sourcePath":"components/admin/AdminMenu.jsx"},{"name":"DataTable","sourcePath":"components/admin/DataTable.jsx"},{"name":"Pagination","sourcePath":"components/admin/Pagination.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CheckboxChip","sourcePath":"components/core/CheckboxChip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"AppToolbar","sourcePath":"components/mobile/AppToolbar.jsx"},{"name":"CheckInBar","sourcePath":"components/mobile/CheckInBar.jsx"},{"name":"RegionCard","sourcePath":"components/mobile/RegionCard.jsx"},{"name":"ReviewCard","sourcePath":"components/mobile/ReviewCard.jsx"},{"name":"SmileRating","sourcePath":"components/mobile/SmileRating.jsx"},{"name":"SpotListItem","sourcePath":"components/mobile/SpotListItem.jsx"},{"name":"StatusLabel","sourcePath":"components/mobile/StatusLabel.jsx"},{"name":"Tabs","sourcePath":"components/mobile/Tabs.jsx"}],"sourceHashes":{"components/admin/AdminMenu.jsx":"881848e600eb","components/admin/DataTable.jsx":"ed35e9c5a1e1","components/admin/Pagination.jsx":"f450963f9317","components/core/Button.jsx":"a7e89a6cab6d","components/core/CheckboxChip.jsx":"a14e261ed6bb","components/core/IconButton.jsx":"e617cdcd5b3a","components/core/Input.jsx":"5be0d05d3b2e","components/core/Select.jsx":"89698cb42428","components/mobile/AppToolbar.jsx":"e94a3224e104","components/mobile/CheckInBar.jsx":"9bd62915d1bc","components/mobile/RegionCard.jsx":"1f9e6cae8640","components/mobile/ReviewCard.jsx":"db478b519375","components/mobile/SmileRating.jsx":"4fddf200ff82","components/mobile/SpotListItem.jsx":"d071f59be5a3","components/mobile/StatusLabel.jsx":"9d82d2472096","components/mobile/Tabs.jsx":"00ee388d5a1a","ui_kits/admin/app.jsx":"73274620099d","ui_kits/mobile/app.jsx":"6a895c8a1083"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HolySpotsDesignSystem_cfcab4 = window.HolySpotsDesignSystem_cfcab4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/admin/AdminMenu.jsx
try { (() => {
function AdminMenu({
  items = [],
  selected,
  onSelect,
  userName,
  assets = '../../assets'
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 20,
      alignItems: 'center',
      background: 'var(--surface-cloud)',
      boxSizing: 'border-box',
      padding: 14,
      fontFamily: 'var(--font-core)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(it);
    },
    style: {
      display: 'block',
      minWidth: 'var(--btn-min-w)',
      height: 'var(--control-h-xl)',
      lineHeight: '59px',
      textAlign: 'center',
      textDecoration: 'none',
      borderRadius: 'var(--radius-chip)',
      fontSize: 'var(--fs-admin-menu)',
      padding: '0 16px',
      background: it === selected ? 'var(--blue-500)' : 'var(--surface-page)',
      color: it === selected ? 'var(--text-inverse)' : 'var(--blue-500)'
    }
  }, it))), /*#__PURE__*/React.createElement("li", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 20,
      alignItems: 'center'
    }
  }, userName && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--control-h-xl)',
      lineHeight: '59px',
      fontSize: 'var(--fs-admin-menu)',
      color: 'var(--blue-500)'
    }
  }, userName), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    "aria-label": "Log out",
    style: {
      display: 'block',
      minWidth: 76,
      height: 'var(--control-h-xl)',
      borderRadius: 'var(--radius-chip)',
      background: 'url(' + assets + '/admin-icons/logout.png) center no-repeat var(--surface-page)'
    }
  })));
}
Object.assign(__ds_scope, { AdminMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/AdminMenu.jsx", error: String((e && e.message) || e) }); }

// components/admin/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  onRowClick
}) {
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderTop: '1px solid var(--surface-cloud)',
      borderBottom: '1px solid var(--surface-cloud)',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-admin-body)',
      color: 'var(--text-admin)'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    onClick: () => onRowClick && onRowClick(ri),
    style: {
      cursor: onRowClick ? 'pointer' : 'default'
    }
  }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      border: '1px solid var(--surface-cloud)',
      borderLeft: ci === 0 ? 0 : undefined,
      borderRight: ci === row.length - 1 ? 0 : undefined,
      verticalAlign: 'middle',
      height: 'var(--admin-cell-h)',
      boxSizing: 'border-box',
      padding: columns[ci] === 'image' ? 0 : 10,
      fontWeight: columns[ci] === 'title' ? 'var(--fw-bold)' : 'var(--fw-regular)',
      width: columns[ci] === 'actions' ? 120 : columns[ci] === 'title' ? '100%' : undefined,
      textAlign: columns[ci] === 'actions' ? 'right' : 'left'
    }
  }, columns[ci] === 'image' ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 100,
      width: 212,
      backgroundImage: 'url(' + cell + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50%'
    }
  }) : cell))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/admin/Pagination.jsx
try { (() => {
function Pagination({
  pages = 1,
  active = 1,
  onChange
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      gap: 10,
      margin: 12,
      padding: 0,
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-admin-body)'
    }
  }, Array.from({
    length: pages
  }, (_, i) => i + 1).map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onChange && onChange(p);
    },
    style: {
      textDecoration: 'none',
      color: '#3D3E3A',
      fontWeight: p === active ? 'var(--fw-bold)' : 'var(--fw-regular)'
    }
  }, p))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    background: 'var(--blue-500)',
    color: 'var(--text-inverse)'
  },
  save: {
    background: 'var(--blue-400)',
    color: 'var(--text-inverse)'
  },
  secondary: {
    background: 'var(--cloud-200)',
    color: 'var(--color-primary)'
  },
  cancel: {
    background: 'var(--cloud-200)',
    color: 'var(--color-danger)'
  },
  delete: {
    background: 'var(--color-danger)',
    color: 'var(--text-inverse)'
  }
};
function Button({
  variant = 'primary',
  size = 'lg',
  icon,
  fullWidth,
  fixedWidth,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: icon ? 'flex-start' : 'center',
    gap: 12,
    boxSizing: 'border-box',
    border: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'var(--font-core)',
    fontSize: size === 'md' ? 16 : 'var(--fs-admin-body)',
    borderRadius: 'var(--radius-btn)',
    padding: icon ? '12px 12px 12px 14px' : '12px',
    height: size === 'md' ? 'var(--control-h-md)' : 'var(--control-h-xl)',
    width: fullWidth ? '100%' : fixedWidth ? 'var(--btn-w)' : undefined,
    minWidth: icon ? undefined : 66,
    transition: 'filter var(--dur-fast) var(--ease-standard)',
    filter: hover ? 'brightness(.94)' : 'none',
    ...V[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), icon && /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    style: {
      height: 22
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CheckboxChip.jsx
try { (() => {
function CheckboxChip({
  checked,
  onChange,
  square,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(!checked),
    style: {
      display: 'inline-block',
      boxSizing: 'border-box',
      border: 0,
      cursor: 'pointer',
      padding: '6px',
      minWidth: square ? 'var(--control-h-md)' : 64,
      height: square ? 'var(--control-h-md)' : undefined,
      textAlign: 'center',
      borderRadius: 'var(--radius-chip)',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-admin-body)',
      background: checked ? 'var(--blue-400)' : 'var(--cloud-200)',
      color: checked ? 'var(--text-inverse)' : 'var(--blue-400)',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, children);
}
Object.assign(__ds_scope, { CheckboxChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CheckboxChip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  filled,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 'var(--control-h-md)',
      height: 'var(--control-h-md)',
      border: filled ? 0 : '1px solid var(--cloud-200)',
      borderRadius: 'var(--radius-btn)',
      background: filled ? 'var(--cloud-200)' : 'var(--surface-page)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
      filter: hover ? 'brightness(.94)' : 'none',
      transition: 'filter var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    style: {
      maxHeight: 22,
      maxWidth: 22
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  error,
  serif,
  multiline,
  variant = 'admin',
  style,
  inputStyle,
  ...rest
}) {
  const base = {
    boxSizing: 'border-box',
    width: '100%',
    fontFamily: serif ? 'var(--font-serif-data)' : 'var(--font-core)',
    fontSize: 'var(--fs-admin-body)',
    color: variant === 'login' ? 'var(--text-admin)' : 'var(--color-primary)',
    border: '2px solid ' + (variant === 'login' ? 'var(--gray-500)' : 'var(--cloud-200)'),
    borderRadius: variant === 'login' ? 'var(--radius-input)' : 'var(--radius-chip)',
    padding: variant === 'login' ? '9px 5px' : '10px',
    height: multiline ? undefined : variant === 'filter' ? 'var(--control-h-sm)' : 'var(--control-h-xl)',
    resize: 'none',
    outline: 'none',
    ...inputStyle
  };
  const el = multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: 4,
    style: base
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    style: base
  }, rest));
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-admin-body)',
      color: 'var(--text-admin)',
      marginBottom: 6
    }
  }, label), el, error && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 5,
      color: 'var(--color-error-text)',
      fontSize: 'var(--fs-admin-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  options = [],
  filled,
  value,
  onChange,
  style
}) {
  const s = {
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
    fontFamily: 'var(--font-serif-data)',
    fontSize: 'var(--fs-admin-body)',
    cursor: 'pointer',
    border: filled ? 0 : '2px solid var(--cloud-200)',
    borderRadius: 'var(--radius-chip)',
    color: filled ? 'var(--text-inverse)' : 'var(--color-primary)',
    height: filled ? 'var(--control-h-md)' : 'var(--control-h-xl)',
    minWidth: filled ? 54 : 278,
    padding: filled ? '0 34px 0 10px' : '10px 44px 10px 10px',
    background: filled ? 'url(../../assets/admin-icons/arrow-white.png) right 12px center no-repeat var(--blue-400)' : 'url(../../assets/admin-icons/arrow-blue.png) right 12px center no-repeat var(--surface-page)',
    backgroundSize: '14px auto, auto',
    ...style
  };
  return /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: s
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o)));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/mobile/AppToolbar.jsx
try { (() => {
function AppToolbar({
  title,
  transparent,
  onBack,
  actions,
  assets = '../../assets'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 56,
      padding: '0 8px',
      boxSizing: 'border-box',
      background: transparent ? 'transparent' : 'var(--surface-muted)',
      boxShadow: transparent ? 'none' : 'var(--shadow-toolbar)'
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Back",
    style: {
      border: 0,
      background: 'none',
      cursor: 'pointer',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + (transparent ? '/icons/icon_back_white.png' : '/icons/icon_back.png'),
    alt: "",
    style: {
      height: 18
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-title)',
      color: transparent ? 'var(--text-inverse)' : 'var(--text-body)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: onBack ? 0 : 8
    }
  }, title), (actions || []).map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: a.onClick,
    "aria-label": a.label,
    style: {
      border: 0,
      background: 'none',
      cursor: 'pointer',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/' + a.icon,
    alt: "",
    style: {
      height: 20
    }
  }))));
}
Object.assign(__ds_scope, { AppToolbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/AppToolbar.jsx", error: String((e && e.message) || e) }); }

// components/mobile/CheckInBar.jsx
try { (() => {
function CheckInBar({
  checkedIn,
  onCheckIn,
  onDelete,
  assets = '../../assets'
}) {
  if (!checkedIn) return /*#__PURE__*/React.createElement("button", {
    onClick: onCheckIn,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      width: '100%',
      height: 'var(--control-h-lg)',
      border: 0,
      cursor: 'pointer',
      background: 'var(--blue-300)',
      color: 'var(--text-inverse)',
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-body)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/icon_checkin_white.png',
    alt: "",
    style: {
      height: 18
    }
  }), "CHECK IN");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      width: '100%',
      height: 'var(--control-h-lg)',
      boxSizing: 'border-box',
      borderTop: '1px solid var(--divider-strong)',
      background: 'var(--surface-page)',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/icon_checkin.png',
    alt: "",
    style: {
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-body)',
      color: 'var(--blue-300)'
    }
  }, "YOU WERE HERE"), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    style: {
      position: 'absolute',
      right: 10,
      border: 0,
      background: 'none',
      cursor: 'pointer',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-disabled)',
      fontFamily: 'var(--font-core)'
    }
  }, "DELETE"));
}
Object.assign(__ds_scope, { CheckInBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/CheckInBar.jsx", error: String((e && e.message) || e) }); }

// components/mobile/RegionCard.jsx
try { (() => {
function RegionCard({
  photo,
  name,
  spotCount,
  onClick,
  height = 180,
  assets = '../../assets'
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      position: 'relative',
      height,
      cursor: onClick ? 'pointer' : 'default',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '60%',
      background: 'var(--scrim-photo)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 15,
      right: 15,
      bottom: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      color: 'var(--text-on-photo)',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), spotCount != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-title)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/icon_pin_white.png',
    alt: "",
    style: {
      height: 17
    }
  }), spotCount)));
}
Object.assign(__ds_scope, { RegionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/RegionCard.jsx", error: String((e && e.message) || e) }); }

// components/mobile/ReviewCard.jsx
try { (() => {
function ReviewCard({
  title,
  text,
  date,
  photos = [],
  assets = '../../assets'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px',
      borderBottom: '1px solid var(--divider)',
      fontFamily: 'var(--font-core)',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-list-title)',
      color: 'var(--text-title)'
    }
  }, title), date && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-tertiary)',
      flexShrink: 0
    }
  }, date)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 10px',
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-light)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "\u201C", text, "\u201D"), photos.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, photos.map((p, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: p,
    alt: "",
    style: {
      width: 'var(--review-photo)',
      height: 'var(--review-photo)',
      objectFit: 'cover'
    }
  }))));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/mobile/SmileRating.jsx
try { (() => {
function SmileRating({
  value,
  onChange,
  assets = '../../assets'
}) {
  const faces = ['sad', 'normal', 'happy'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-like)',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: 15,
      fontSize: 'var(--fs-small)',
      color: 'var(--blue-500)'
    }
  }, "Did you like this place?"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginRight: 5
    }
  }, faces.map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: f,
    "aria-label": f,
    onClick: () => onChange && onChange(i),
    style: {
      width: 'var(--rate-btn)',
      height: 'var(--rate-btn)',
      border: 0,
      background: 'none',
      cursor: 'pointer',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/smile_' + f + (value === i ? '_blue' : '') + '.png',
    alt: "",
    style: {
      height: 24,
      opacity: value === i || value == null ? 1 : .45
    }
  })))));
}
Object.assign(__ds_scope, { SmileRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/SmileRating.jsx", error: String((e && e.message) || e) }); }

// components/mobile/StatusLabel.jsx
try { (() => {
function StatusLabel({
  status = 'open',
  style
}) {
  const open = status === 'open';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-small)',
      letterSpacing: '.04em',
      color: open ? 'var(--blue-300)' : 'var(--color-danger-strong)',
      ...style
    }
  }, open ? 'OPENED' : 'CLOSED');
}
Object.assign(__ds_scope, { StatusLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/StatusLabel.jsx", error: String((e && e.message) || e) }); }

// components/mobile/SpotListItem.jsx
try { (() => {
function SpotListItem({
  photo,
  name,
  info,
  status,
  checkedIn,
  onClick,
  assets = '../../assets'
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      background: 'var(--surface-page)',
      cursor: onClick ? 'pointer' : 'default',
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo || assets + '/images/guide_placeholder_small.png',
    alt: "",
    style: {
      width: 'var(--thumb-size)',
      height: 'var(--thumb-size)',
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '15px 15px 10px',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-list-title)',
      color: 'var(--text-title)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, name), status && /*#__PURE__*/React.createElement(__ds_scope.StatusLabel, {
    status: status,
    style: {
      marginTop: 5,
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, info), checkedIn && /*#__PURE__*/React.createElement("img", {
    src: assets + '/icons/icon_checkin.png',
    alt: "Checked in",
    style: {
      height: 16,
      flexShrink: 0
    }
  }))));
}
Object.assign(__ds_scope, { SpotListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/SpotListItem.jsx", error: String((e && e.message) || e) }); }

// components/mobile/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active = 0,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 'var(--control-h-lg)',
      background: 'var(--surface-tab)',
      borderBottom: '1px solid var(--divider-tab)',
      position: 'relative'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: t
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--divider-tab)',
      margin: '5px 0'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(i),
    style: {
      flex: 1,
      border: 0,
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-title)',
      color: i === active ? 'var(--blue-300)' : 'var(--text-secondary)',
      transition: 'color var(--dur-fast) var(--ease-standard)'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -6,
      height: 5,
      background: 'linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,0))',
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mobile/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/app.jsx
try { (() => {
const A = '../../assets';
const DS = window.HolySpotsDesignSystem_cfcab4;
const {
  AdminMenu,
  DataTable,
  Pagination,
  Button,
  IconButton,
  Input,
  Select,
  CheckboxChip
} = DS;
const R = window.React;
const REGIONS = [{
  name: 'Vrindavan',
  photo: A + '/images/region_photo_1.jpg'
}, {
  name: 'Mayapur',
  photo: A + '/images/region_photo_2.jpg'
}, {
  name: 'Rishikesh',
  photo: A + '/images/region_photo_3.jpg'
}, {
  name: 'Jagannath Puri',
  photo: A + '/images/region_photo_4.jpg'
}];
function LoginScreen({
  onLogin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-cloud)',
      minHeight: '100vh',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-card)',
      width: 340,
      padding: 20,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }, [['Login', 'text'], ['Password', 'password']].map(([l, t]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      width: 80,
      marginRight: 20,
      textAlign: 'right',
      fontWeight: 'var(--fw-bold)',
      fontSize: 18,
      color: 'var(--text-admin)'
    }
  }, l), /*#__PURE__*/React.createElement("input", {
    type: t,
    style: {
      width: 225,
      padding: '9px 5px',
      borderRadius: 'var(--radius-input)',
      border: '2px solid var(--gray-500)',
      fontSize: 18,
      boxSizing: 'border-box'
    }
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      height: 59,
      border: 0,
      padding: '12px 12px 12px 50px',
      borderRadius: 'var(--radius-btn)',
      marginLeft: 100,
      background: 'url(' + A + '/admin-icons/login.png) no-repeat 12px center var(--blue-500)',
      color: '#fff',
      cursor: 'pointer',
      fontSize: 18,
      textAlign: 'left',
      fontFamily: 'var(--font-core)'
    }
  }, "Log in")));
}
function RegionsScreen({
  onOpen,
  nav
}) {
  return /*#__PURE__*/React.createElement("div", null, nav, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 20px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: A + '/admin-icons/add.png',
    style: {
      margin: '18px 15px'
    }
  }, "Add region"), /*#__PURE__*/React.createElement(DataTable, {
    columns: ['image', 'title', 'actions'],
    onRowClick: onOpen,
    rows: REGIONS.map(r => [r.photo, r.name, /*#__PURE__*/React.createElement(IconButton, {
      icon: A + '/admin-icons/remove.png',
      label: "Remove"
    })])
  }), /*#__PURE__*/React.createElement(Pagination, {
    pages: 2,
    active: 1
  })));
}
function EditScreen({
  region,
  onBack,
  nav
}) {
  const [days, setDays] = R.useState([true, true, true, true, true, true, false]);
  const cell = {
    border: '1px solid var(--surface-cloud)',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: 10,
    height: 100
  };
  const label = {
    ...cell,
    color: 'var(--blue-400)',
    width: 140,
    borderLeft: 0
  };
  return /*#__PURE__*/React.createElement("div", null, nav, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderTop: '1px solid var(--surface-cloud)',
      borderBottom: '1px solid var(--surface-cloud)',
      tableLayout: 'fixed',
      fontSize: 18,
      color: 'var(--text-admin)',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: label
  }, "Name"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      borderRight: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: region.name,
    style: {
      border: 0,
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-serif-data)',
      fontSize: 18,
      padding: 10,
      color: 'var(--text-admin)',
      outline: 'none'
    }
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: label
  }, "Description"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      borderRight: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    defaultValue: "The land of Krishna's childhood pastimes on the bank of the Yamuna river.",
    style: {
      border: 0,
      height: 96,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-serif-data)',
      fontSize: 18,
      padding: 10,
      color: 'var(--text-admin)',
      resize: 'none',
      outline: 'none'
    }
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: label
  }, "Photo"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      borderRight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 100,
      width: 212,
      backgroundImage: 'url(' + region.photo + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50%'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    style: {
      fontSize: 15,
      color: 'var(--text-admin)'
    }
  })))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: label
  }, "Work time"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      borderRight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 0 0 42px',
      background: 'url(' + A + '/admin-icons/calendar.png) no-repeat left center'
    }
  }, ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w, i) => /*#__PURE__*/React.createElement(CheckboxChip, {
    key: w,
    square: true,
    checked: days[i],
    onChange: v => setDays(days.map((x, j) => j === i ? v : x))
  }, w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12,
      padding: '0 0 0 42px',
      background: 'url(' + A + '/admin-icons/clock.png) no-repeat left center',
      color: 'var(--blue-400)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    filled: true,
    options: ['07:00', '08:00', '09:00']
  }), "\xA0\u2014\xA0", /*#__PURE__*/React.createElement(Select, {
    filled: true,
    options: ['20:30', '21:00']
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      margin: '35px 0',
      display: 'flex',
      justifyContent: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "save",
    fixedWidth: true,
    onClick: onBack
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    variant: "cancel",
    fixedWidth: true,
    onClick: onBack
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "delete",
    fixedWidth: true
  }, "Delete")));
}
function App() {
  const [screen, setScreen] = R.useState('login');
  const [sel, setSel] = R.useState('Regions');
  const nav = /*#__PURE__*/React.createElement(AdminMenu, {
    assets: A,
    items: ['Regions', 'Spots', 'Guides', 'Maps', 'Reviews', 'Places', 'Directions'],
    selected: sel,
    onSelect: s => {
      setSel(s);
      setScreen('list');
    },
    userName: "admin"
  });
  if (screen === 'login') return /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => setScreen('list')
  });
  if (screen === 'edit') return /*#__PURE__*/React.createElement(EditScreen, {
    region: REGIONS[0],
    nav: nav,
    onBack: () => setScreen('list')
  });
  return /*#__PURE__*/React.createElement(RegionsScreen, {
    nav: nav,
    onOpen: () => setScreen('edit')
  });
}
window.HolySpotsAdminApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/app.jsx
try { (() => {
const A = '../../assets';
const DS = window.HolySpotsDesignSystem_cfcab4;
const {
  AppToolbar,
  Tabs,
  RegionCard,
  SpotListItem,
  SmileRating,
  StatusLabel,
  CheckInBar,
  ReviewCard
} = DS;
const REGIONS = [{
  id: 1,
  name: 'Vrindavan',
  photo: A + '/images/region_photo_1.jpg',
  count: 52,
  descr: 'The land of Krishna\u2019s childhood pastimes on the bank of the Yamuna river. Thousands of temples, sacred kunds and groves.'
}, {
  id: 2,
  name: 'Mayapur',
  photo: A + '/images/region_photo_2.jpg',
  count: 34,
  descr: 'The birthplace of Sri Chaitanya Mahaprabhu at the confluence of the Ganges and Jalangi rivers.'
}, {
  id: 3,
  name: 'Rishikesh',
  photo: A + '/images/region_photo_3.jpg',
  count: 21,
  descr: 'The gateway to the Himalayas on the banks of the holy Ganga. Ashrams, ghats and mountain trails.'
}, {
  id: 4,
  name: 'Jagannath Puri',
  photo: A + '/images/region_photo_4.jpg',
  count: 18,
  descr: 'The abode of Lord Jagannath by the ocean, famous for the yearly Ratha-yatra festival.'
}];
const SPOTS = [{
  id: 1,
  region: 1,
  name: 'Sri Krishna Balaram Mandir',
  photo: A + '/images/region_photo_1.jpg',
  info: 'Open till 8:30 PM',
  status: 'open',
  descr: 'You can get a raja bhoga here. The temple is a fantastic place for worship and japa chanting. Deities read your mind deeply with high compassion and understanding.',
  photos: 12
}, {
  id: 2,
  region: 1,
  name: 'Kesi Ghat',
  photo: A + '/images/region_photo_3.jpg',
  info: 'Bank of the Yamuna',
  status: 'open',
  descr: 'Very peaceful darshan and japa hideout on the bank of the Yamuna.',
  photos: 7
}, {
  id: 3,
  region: 1,
  name: 'Seva Kunj',
  photo: A + '/images/region_photo_4.jpg',
  info: 'Closes at sunset',
  status: 'closed',
  descr: 'A sacred grove. Very beautiful place with big mystical power.',
  photos: 5
}];
const GUIDES = [{
  id: 1,
  name: 'Vraja Mandala Parikrama',
  photo: A + '/images/guide_photo_1.jpg',
  descr: 'A walking route around the sacred places of Vrindavan.'
}, {
  id: 2,
  name: 'Navadvipa Parikrama',
  photo: A + '/images/guide_photo_2.jpg',
  descr: 'Nine islands of Mayapur dhama in four days.'
}];
const REVIEWS = [{
  title: 'Amazing place!',
  date: '17 Nov',
  text: 'Big mystical power!'
}, {
  title: 'Very peaceful',
  date: '27 Jan',
  text: 'Very peaceful darshan/japa hideout.'
}, {
  title: 'Loved it',
  date: '8 Jul',
  text: 'Fantastic place for worship and japa chanting'
}];
function RegionActions({
  onReviews
}) {
  const items = [['ic_message_small.png', 'Reviews', onReviews], ['ic_stay_small.png', 'Hotels'], ['ic_food_small.png', 'Food'], ['ic_way_small.png', 'Route']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--divider)'
    }
  }, items.map(([ic, label, fn], i) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: fn,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: 10,
      border: 0,
      borderLeft: i ? '1px solid var(--divider-light)' : 0,
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/icons/' + ic,
    alt: "",
    style: {
      height: 18
    }
  }), label)));
}
function HomeScreen({
  go
}) {
  const [tab, setTab] = window.React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppToolbar, {
    title: "Holy Spots",
    assets: A,
    actions: [{
      icon: 'icon_search.png',
      label: 'Search'
    }, {
      icon: 'icon_map.png',
      label: 'Map'
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Spots', 'Guides'],
    active: tab,
    onChange: setTab
  }), tab === 0 ? REGIONS.map(r => /*#__PURE__*/React.createElement(RegionCard, {
    key: r.id,
    assets: A,
    photo: r.photo,
    name: r.name,
    spotCount: r.count,
    onClick: () => go({
      name: 'region',
      id: r.id
    })
  })) : GUIDES.map(g => /*#__PURE__*/React.createElement(SpotListItem, {
    key: g.id,
    assets: A,
    photo: g.photo,
    name: g.name,
    info: g.descr
  })));
}
function RegionScreen({
  id,
  go
}) {
  const r = REGIONS.find(x => x.id === id);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppToolbar, {
    title: r.name,
    assets: A,
    onBack: () => go({
      name: 'home'
    }),
    actions: [{
      icon: 'icon_map.png',
      label: 'Map'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'var(--region-photo-h)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: r.photo,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement(RegionActions, {
    onReviews: () => go({
      name: 'reviews',
      back: {
        name: 'region',
        id
      }
    })
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 15px',
      fontSize: 'var(--fs-body)',
      fontWeight: 300,
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, r.descr), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--divider)'
    }
  }, SPOTS.map(s => /*#__PURE__*/React.createElement(SpotListItem, {
    key: s.id,
    assets: A,
    photo: s.photo,
    name: s.name,
    info: s.info,
    status: s.status,
    onClick: () => go({
      name: 'spot',
      id: s.id
    })
  }))));
}
function SpotScreen({
  id,
  go
}) {
  const s = SPOTS.find(x => x.id === id);
  const [rate, setRate] = window.React.useState(null);
  const [checked, setChecked] = window.React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'var(--spot-hero-h)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.photo,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '55%',
      background: 'var(--scrim-photo)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }
  }, /*#__PURE__*/React.createElement(AppToolbar, {
    transparent: true,
    assets: A,
    onBack: () => go({
      name: 'region',
      id: s.region
    }),
    actions: [{
      icon: 'icon_map_white.png',
      label: 'Map'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 15,
      bottom: 58,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#fff',
      fontSize: 'var(--fs-counter)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/icons/icon_picture_white.png',
    alt: "",
    style: {
      height: 16
    }
  }), s.photos), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 15,
      right: 15,
      bottom: 10,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-title)',
      marginBottom: 8
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body)',
      color: 'var(--text-tertiary)'
    }
  }, REGIONS.find(r => r.id === s.region).name), /*#__PURE__*/React.createElement(StatusLabel, {
    status: s.status
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => go({
      name: 'reviews',
      back: {
        name: 'spot',
        id
      }
    }),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 15,
      padding: 15,
      border: 0,
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-title)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/icons/ic_message_small.png',
    alt: "",
    style: {
      height: 16
    }
  }), "Reviews"), /*#__PURE__*/React.createElement(SmileRating, {
    value: rate,
    onChange: setRate,
    assets: A
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 15px',
      fontSize: 'var(--fs-body)',
      fontWeight: 300,
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, s.descr), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(CheckInBar, {
    checkedIn: checked,
    onCheckIn: () => setChecked(true),
    onDelete: () => setChecked(false),
    assets: A
  }));
}
function ReviewsScreen({
  back,
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppToolbar, {
    title: "Reviews",
    assets: A,
    onBack: () => go(back)
  }), REVIEWS.map((r, i) => /*#__PURE__*/React.createElement(ReviewCard, {
    key: i,
    assets: A,
    title: r.title,
    date: r.date,
    text: r.text
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '25px 15px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, "Did you visit this place? "), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 'var(--fs-small)'
    }
  }, "New review")));
}
function App() {
  const [screen, setScreen] = window.React.useState({
    name: 'home'
  });
  const body = screen.name === 'home' ? /*#__PURE__*/React.createElement(HomeScreen, {
    go: setScreen
  }) : screen.name === 'region' ? /*#__PURE__*/React.createElement(RegionScreen, {
    id: screen.id,
    go: setScreen
  }) : screen.name === 'spot' ? /*#__PURE__*/React.createElement(SpotScreen, {
    id: screen.id,
    go: setScreen
  }) : /*#__PURE__*/React.createElement(ReviewsScreen, {
    back: screen.back || {
      name: 'home'
    },
    go: setScreen
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 760,
      margin: '20px auto',
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-dialog)',
      overflowY: 'auto',
      overflowX: 'hidden',
      fontFamily: 'var(--font-core)'
    }
  }, body);
}
window.HolySpotsMobileApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AdminMenu = __ds_scope.AdminMenu;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CheckboxChip = __ds_scope.CheckboxChip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.AppToolbar = __ds_scope.AppToolbar;

__ds_ns.CheckInBar = __ds_scope.CheckInBar;

__ds_ns.RegionCard = __ds_scope.RegionCard;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.SmileRating = __ds_scope.SmileRating;

__ds_ns.SpotListItem = __ds_scope.SpotListItem;

__ds_ns.StatusLabel = __ds_scope.StatusLabel;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
