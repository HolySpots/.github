import React from 'react';
export function Tabs({tabs=[],active=0,onChange}){
return <div style={{display:'flex',height:'var(--control-h-lg)',background:'var(--surface-tab)',borderBottom:'1px solid var(--divider-tab)',position:'relative'}}>
{tabs.map((t,i)=><React.Fragment key={t}>
{i>0&&<div style={{width:1,background:'var(--divider-tab)',margin:'5px 0'}}></div>}
<button onClick={()=>onChange&&onChange(i)} style={{flex:1,border:0,background:'none',cursor:'pointer',fontFamily:'var(--font-core)',fontSize:'var(--fs-title)',color:i===active?'var(--blue-300)':'var(--text-secondary)',transition:'color var(--dur-fast) var(--ease-standard)'}}>{t}</button>
</React.Fragment>)}
<div style={{position:'absolute',left:0,right:0,bottom:-6,height:5,background:'linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,0))',pointerEvents:'none'}}></div>
</div>;
}
