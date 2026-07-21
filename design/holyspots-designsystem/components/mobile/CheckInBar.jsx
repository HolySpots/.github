import React from 'react';
export function CheckInBar({checkedIn,onCheckIn,onDelete,assets='../../assets'}){
if(!checkedIn)return <button onClick={onCheckIn} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:5,width:'100%',height:'var(--control-h-lg)',border:0,cursor:'pointer',background:'var(--blue-300)',color:'var(--text-inverse)',fontFamily:'var(--font-core)',fontWeight:'var(--fw-medium)',fontSize:'var(--fs-body)'}}><img src={assets+'/icons/icon_checkin_white.png'} alt="" style={{height:18}}/>CHECK IN</button>;
return <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',gap:5,width:'100%',height:'var(--control-h-lg)',boxSizing:'border-box',borderTop:'1px solid var(--divider-strong)',background:'var(--surface-page)',fontFamily:'var(--font-core)'}}>
<img src={assets+'/icons/icon_checkin.png'} alt="" style={{height:18}}/>
<span style={{fontWeight:'var(--fw-medium)',fontSize:'var(--fs-body)',color:'var(--blue-300)'}}>YOU WERE HERE</span>
<button onClick={onDelete} style={{position:'absolute',right:10,border:0,background:'none',cursor:'pointer',fontSize:'var(--fs-small)',color:'var(--text-disabled)',fontFamily:'var(--font-core)'}}>DELETE</button>
</div>;
}
