import React from 'react';
export function Pagination({pages=1,active=1,onChange}){
return <ul style={{listStyle:'none',display:'flex',gap:10,margin:12,padding:0,fontFamily:'var(--font-core)',fontSize:'var(--fs-admin-body)'}}>
{Array.from({length:pages},(_,i)=>i+1).map(p=><li key={p}><a href="#" onClick={e=>{e.preventDefault();onChange&&onChange(p);}} style={{textDecoration:'none',color:'#3D3E3A',fontWeight:p===active?'var(--fw-bold)':'var(--fw-regular)'}}>{p}</a></li>)}
</ul>;
}
