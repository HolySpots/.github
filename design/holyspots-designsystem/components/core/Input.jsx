import React from 'react';
export function Input({label,error,serif,multiline,variant='admin',style,inputStyle,...rest}){
const base={boxSizing:'border-box',width:'100%',fontFamily:serif?'var(--font-serif-data)':'var(--font-core)',fontSize:'var(--fs-admin-body)',color:variant==='login'?'var(--text-admin)':'var(--color-primary)',border:'2px solid '+(variant==='login'?'var(--gray-500)':'var(--cloud-200)'),borderRadius:variant==='login'?'var(--radius-input)':'var(--radius-chip)',padding:variant==='login'?'9px 5px':'10px',height:multiline?undefined:(variant==='filter'?'var(--control-h-sm)':'var(--control-h-xl)'),resize:'none',outline:'none',...inputStyle};
const el=multiline?<textarea rows={4} style={base} {...rest}/>:<input type="text" style={base} {...rest}/>;
return <label style={{display:'block',fontFamily:'var(--font-core)',...style}}>{label&&<span style={{display:'block',fontWeight:'var(--fw-bold)',fontSize:'var(--fs-admin-body)',color:'var(--text-admin)',marginBottom:6}}>{label}</span>}{el}{error&&<span style={{display:'block',marginTop:5,color:'var(--color-error-text)',fontSize:'var(--fs-admin-error)'}}>{error}</span>}</label>;
}
