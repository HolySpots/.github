import React from 'react';
export function SmileRating({value,onChange,assets='../../assets'}){
const faces=['sad','normal','happy'];
return <div style={{display:'flex',alignItems:'center',background:'var(--surface-like)',fontFamily:'var(--font-core)'}}>
<span style={{padding:15,fontSize:'var(--fs-small)',color:'var(--blue-500)'}}>Did you like this place?</span>
<div style={{flex:1}}></div>
<div style={{display:'flex',marginRight:5}}>
{faces.map((f,i)=><button key={f} aria-label={f} onClick={()=>onChange&&onChange(i)} style={{width:'var(--rate-btn)',height:'var(--rate-btn)',border:0,background:'none',cursor:'pointer',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><img src={assets+'/icons/smile_'+f+(value===i?'_blue':'')+'.png'} alt="" style={{height:24,opacity:value===i||value==null?1:.45}}/></button>)}
</div></div>;
}
