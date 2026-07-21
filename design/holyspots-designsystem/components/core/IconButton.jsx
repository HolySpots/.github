import React from 'react';
export function IconButton({icon,label,filled,onClick,style}){
const [hover,setHover]=React.useState(false);
return <button aria-label={label} title={label} onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{width:'var(--control-h-md)',height:'var(--control-h-md)',border:filled?0:'1px solid var(--cloud-200)',borderRadius:'var(--radius-btn)',background:filled?'var(--cloud-200)':'var(--surface-page)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0,filter:hover?'brightness(.94)':'none',transition:'filter var(--dur-fast) var(--ease-standard)',...style}}><img src={icon} alt="" style={{maxHeight:22,maxWidth:22}}/></button>;
}
