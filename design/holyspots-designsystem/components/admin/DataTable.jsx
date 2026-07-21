import React from 'react';
export function DataTable({columns=[],rows=[],onRowClick}){
return <table style={{width:'100%',borderCollapse:'separate',borderSpacing:0,borderTop:'1px solid var(--surface-cloud)',borderBottom:'1px solid var(--surface-cloud)',fontFamily:'var(--font-core)',fontSize:'var(--fs-admin-body)',color:'var(--text-admin)'}}>
<tbody>
{rows.map((row,ri)=><tr key={ri} onClick={()=>onRowClick&&onRowClick(ri)} style={{cursor:onRowClick?'pointer':'default'}}>
{row.map((cell,ci)=><td key={ci} style={{border:'1px solid var(--surface-cloud)',borderLeft:ci===0?0:undefined,borderRight:ci===row.length-1?0:undefined,verticalAlign:'middle',height:'var(--admin-cell-h)',boxSizing:'border-box',padding:columns[ci]==='image'?0:10,fontWeight:columns[ci]==='title'?'var(--fw-bold)':'var(--fw-regular)',width:columns[ci]==='actions'?120:(columns[ci]==='title'?'100%':undefined),textAlign:columns[ci]==='actions'?'right':'left'}}>
{columns[ci]==='image'?<div style={{height:100,width:212,backgroundImage:'url('+cell+')',backgroundSize:'cover',backgroundPosition:'50%'}}></div>:cell}
</td>)}
</tr>)}
</tbody></table>;
}
