import React from 'react';
export function StatusLabel({status='open',style}){
const open=status==='open';
return <span style={{fontFamily:'var(--font-core)',fontWeight:'var(--fw-medium)',fontSize:'var(--fs-small)',letterSpacing:'.04em',color:open?'var(--blue-300)':'var(--color-danger-strong)',...style}}>{open?'OPENED':'CLOSED'}</span>;
}
