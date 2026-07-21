import React from 'react';
export function AdminMenu({items=[],selected,onSelect,userName,assets='../../assets'}){
return <ul style={{listStyle:'none',margin:0,display:'flex',flexWrap:'wrap',gap:20,alignItems:'center',background:'var(--surface-cloud)',boxSizing:'border-box',padding:14,fontFamily:'var(--font-core)'}}>
{items.map(it=><li key={it}><a href="#" onClick={e=>{e.preventDefault();onSelect&&onSelect(it);}} style={{display:'block',minWidth:'var(--btn-min-w)',height:'var(--control-h-xl)',lineHeight:'59px',textAlign:'center',textDecoration:'none',borderRadius:'var(--radius-chip)',fontSize:'var(--fs-admin-menu)',padding:'0 16px',background:it===selected?'var(--blue-500)':'var(--surface-page)',color:it===selected?'var(--text-inverse)':'var(--blue-500)'}}>{it}</a></li>)}
<li style={{marginLeft:'auto',display:'flex',gap:20,alignItems:'center'}}>
{userName&&<div style={{height:'var(--control-h-xl)',lineHeight:'59px',fontSize:'var(--fs-admin-menu)',color:'var(--blue-500)'}}>{userName}</div>}
<a href="#" onClick={e=>e.preventDefault()} aria-label="Log out" style={{display:'block',minWidth:76,height:'var(--control-h-xl)',borderRadius:'var(--radius-chip)',background:'url('+assets+'/admin-icons/logout.png) center no-repeat var(--surface-page)'}}></a>
</li></ul>;
}
