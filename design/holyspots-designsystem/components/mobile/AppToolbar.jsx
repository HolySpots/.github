import React from 'react';
export function AppToolbar({title,transparent,onBack,actions,assets='../../assets'}){
return <div style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',gap:6,height:56,padding:'0 8px',boxSizing:'border-box',background:transparent?'transparent':'var(--surface-muted)',boxShadow:transparent?'none':'var(--shadow-toolbar)'}}>
{onBack&&<button onClick={onBack} aria-label="Back" style={{border:0,background:'none',cursor:'pointer',width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={assets+(transparent?'/icons/icon_back_white.png':'/icons/icon_back.png')} alt="" style={{height:18}}/></button>}
<span style={{flex:1,fontFamily:'var(--font-core)',fontSize:'var(--fs-title)',color:transparent?'var(--text-inverse)':'var(--text-body)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',paddingLeft:onBack?0:8}}>{title}</span>
{(actions||[]).map((a,i)=><button key={i} onClick={a.onClick} aria-label={a.label} style={{border:0,background:'none',cursor:'pointer',width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={assets+'/icons/'+a.icon} alt="" style={{height:20}}/></button>)}
</div>;
}
