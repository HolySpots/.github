import React from 'react';
export function Select({options=[],filled,value,onChange,style}){
const s={boxSizing:'border-box',appearance:'none',WebkitAppearance:'none',fontFamily:'var(--font-serif-data)',fontSize:'var(--fs-admin-body)',cursor:'pointer',border:filled?0:'2px solid var(--cloud-200)',borderRadius:'var(--radius-chip)',color:filled?'var(--text-inverse)':'var(--color-primary)',height:filled?'var(--control-h-md)':'var(--control-h-xl)',minWidth:filled?54:278,padding:filled?'0 34px 0 10px':'10px 44px 10px 10px',background:(filled?'url(../../assets/admin-icons/arrow-white.png) right 12px center no-repeat var(--blue-400)':'url(../../assets/admin-icons/arrow-blue.png) right 12px center no-repeat var(--surface-page)'),backgroundSize:'14px auto, auto',...style};
return <select value={value} onChange={onChange} style={s}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>;
}
