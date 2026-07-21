import React from 'react';
export function RegionCard({photo,name,spotCount,onClick,height=180,assets='../../assets'}){
return <div onClick={onClick} style={{position:'relative',height,cursor:onClick?'pointer':'default',background:'#000'}}>
<img src={photo} alt={name} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
<div style={{position:'absolute',left:0,right:0,bottom:0,height:'60%',background:'var(--scrim-photo)'}}></div>
<div style={{position:'absolute',left:15,right:15,bottom:10,display:'flex',justifyContent:'space-between',alignItems:'flex-end',color:'var(--text-on-photo)',fontFamily:'var(--font-core)'}}>
<span style={{fontSize:'var(--fs-title)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</span>
{spotCount!=null&&<span style={{fontSize:'var(--fs-title)',display:'flex',alignItems:'center',gap:6,flexShrink:0}}><img src={assets+'/icons/icon_pin_white.png'} alt="" style={{height:17}}/>{spotCount}</span>}
</div></div>;
}
