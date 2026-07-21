import React from 'react';
export function ReviewCard({title,text,date,photos=[],assets='../../assets'}){
return <div style={{padding:'15px',borderBottom:'1px solid var(--divider)',fontFamily:'var(--font-core)',background:'var(--surface-page)'}}>
<div style={{display:'flex',justifyContent:'space-between',gap:10,marginBottom:6}}>
<span style={{fontSize:'var(--fs-list-title)',color:'var(--text-title)'}}>{title}</span>
{date&&<span style={{fontSize:'var(--fs-small)',color:'var(--text-tertiary)',flexShrink:0}}>{date}</span>}
</div>
<p style={{margin:'0 0 10px',fontSize:'var(--fs-body)',fontWeight:'var(--fw-light)',lineHeight:'var(--lh-body)',color:'var(--text-body)'}}>&ldquo;{text}&rdquo;</p>
{photos.length>0&&<div style={{display:'flex',gap:8}}>{photos.map((p,i)=><img key={i} src={p} alt="" style={{width:'var(--review-photo)',height:'var(--review-photo)',objectFit:'cover'}}/>)}</div>}
</div>;
}
