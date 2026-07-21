import React from 'react';
import {StatusLabel} from './StatusLabel.jsx';
export function SpotListItem({photo,name,info,status,checkedIn,onClick,assets='../../assets'}){
return <div onClick={onClick} style={{display:'flex',background:'var(--surface-page)',cursor:onClick?'pointer':'default',borderBottom:'1px solid var(--divider)'}}>
<img src={photo||assets+'/images/guide_placeholder_small.png'} alt="" style={{width:'var(--thumb-size)',height:'var(--thumb-size)',objectFit:'cover',flexShrink:0}}/>
<div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'15px 15px 10px',fontFamily:'var(--font-core)'}}>
<div style={{display:'flex',gap:10,justifyContent:'space-between'}}>
<span style={{fontSize:'var(--fs-list-title)',color:'var(--text-title)',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{name}</span>
{status&&<StatusLabel status={status} style={{marginTop:5,flexShrink:0}}/>}
</div>
<div style={{display:'flex',gap:10,justifyContent:'space-between',alignItems:'flex-end'}}>
<span style={{fontSize:'var(--fs-small)',color:'var(--text-secondary)',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{info}</span>
{checkedIn&&<img src={assets+'/icons/icon_checkin.png'} alt="Checked in" style={{height:16,flexShrink:0}}/>}
</div></div></div>;
}
