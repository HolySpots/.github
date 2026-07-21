import React from 'react';
export function CheckboxChip({checked,onChange,square,children}){
return <button onClick={()=>onChange&&onChange(!checked)} style={{display:'inline-block',boxSizing:'border-box',border:0,cursor:'pointer',padding:'6px',minWidth:square?'var(--control-h-md)':64,height:square?'var(--control-h-md)':undefined,textAlign:'center',borderRadius:'var(--radius-chip)',fontFamily:'var(--font-core)',fontSize:'var(--fs-admin-body)',background:checked?'var(--blue-400)':'var(--cloud-200)',color:checked?'var(--text-inverse)':'var(--blue-400)',transition:'background var(--dur-fast) var(--ease-standard)'}}>{children}</button>;
}
