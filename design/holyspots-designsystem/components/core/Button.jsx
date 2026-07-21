import React from 'react';
const V={
primary:{background:'var(--blue-500)',color:'var(--text-inverse)'},
save:{background:'var(--blue-400)',color:'var(--text-inverse)'},
secondary:{background:'var(--cloud-200)',color:'var(--color-primary)'},
cancel:{background:'var(--cloud-200)',color:'var(--color-danger)'},
delete:{background:'var(--color-danger)',color:'var(--text-inverse)'},
};
export function Button({variant='primary',size='lg',icon,fullWidth,fixedWidth,children,style,...rest}){
const [hover,setHover]=React.useState(false);
const s={display:'inline-flex',alignItems:'center',justifyContent:icon?'flex-start':'center',gap:12,boxSizing:'border-box',border:0,cursor:'pointer',textDecoration:'none',fontFamily:'var(--font-core)',fontSize:size==='md'?16:'var(--fs-admin-body)',borderRadius:'var(--radius-btn)',padding:icon?'12px 12px 12px 14px':'12px',height:size==='md'?'var(--control-h-md)':'var(--control-h-xl)',width:fullWidth?'100%':(fixedWidth?'var(--btn-w)':undefined),minWidth:icon?undefined:66,transition:'filter var(--dur-fast) var(--ease-standard)',filter:hover?'brightness(.94)':'none',...V[variant],...style};
return <button style={s} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} {...rest}>{icon&&<img src={icon} alt="" style={{height:22}}/>}{children}</button>;
}
