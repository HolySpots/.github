const A='../../assets';
const DS=window.HolySpotsDesignSystem_cfcab4;
const {AdminMenu,DataTable,Pagination,Button,IconButton,Input,Select,CheckboxChip}=DS;
const R=window.React;

const REGIONS=[
{name:'Vrindavan',photo:A+'/images/region_photo_1.jpg'},
{name:'Mayapur',photo:A+'/images/region_photo_2.jpg'},
{name:'Rishikesh',photo:A+'/images/region_photo_3.jpg'},
{name:'Jagannath Puri',photo:A+'/images/region_photo_4.jpg'},
];

function LoginScreen({onLogin}){
return <div style={{background:'var(--surface-cloud)',minHeight:'100vh',position:'relative'}}>
<form onSubmit={e=>{e.preventDefault();onLogin();}} style={{background:'#fff',borderRadius:'var(--radius-card)',width:340,padding:20,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
{[['Login','text'],['Password','password']].map(([l,t])=><div key={l} style={{display:'flex',alignItems:'center',marginBottom:20}}>
<label style={{width:80,marginRight:20,textAlign:'right',fontWeight:'var(--fw-bold)',fontSize:18,color:'var(--text-admin)'}}>{l}</label>
<input type={t} style={{width:225,padding:'9px 5px',borderRadius:'var(--radius-input)',border:'2px solid var(--gray-500)',fontSize:18,boxSizing:'border-box'}}/>
</div>)}
<button type="submit" style={{height:59,border:0,padding:'12px 12px 12px 50px',borderRadius:'var(--radius-btn)',marginLeft:100,background:'url('+A+'/admin-icons/login.png) no-repeat 12px center var(--blue-500)',color:'#fff',cursor:'pointer',fontSize:18,textAlign:'left',fontFamily:'var(--font-core)'}}>Log in</button>
</form></div>;
}

function RegionsScreen({onOpen,nav}){
return <div>
{nav}
<div style={{padding:'0 0 20px'}}>
<Button variant="secondary" icon={A+'/admin-icons/add.png'} style={{margin:'18px 15px'}}>Add region</Button>
<DataTable columns={['image','title','actions']} onRowClick={onOpen}
rows={REGIONS.map(r=>[r.photo,r.name,<IconButton icon={A+'/admin-icons/remove.png'} label="Remove"/>])}/>
<Pagination pages={2} active={1}/>
</div></div>;
}

function EditScreen({region,onBack,nav}){
const [days,setDays]=R.useState([true,true,true,true,true,true,false]);
const cell={border:'1px solid var(--surface-cloud)',verticalAlign:'middle',boxSizing:'border-box',padding:10,height:100};
const label={...cell,color:'var(--blue-400)',width:140,borderLeft:0};
return <div>
{nav}
<table style={{width:'100%',borderCollapse:'separate',borderSpacing:0,borderTop:'1px solid var(--surface-cloud)',borderBottom:'1px solid var(--surface-cloud)',tableLayout:'fixed',fontSize:18,color:'var(--text-admin)',fontFamily:'var(--font-core)'}}><tbody>
<tr><td style={label}>Name</td><td style={{...cell,borderRight:0,padding:0}}><input defaultValue={region.name} style={{border:0,height:'100%',width:'100%',boxSizing:'border-box',fontFamily:'var(--font-serif-data)',fontSize:18,padding:10,color:'var(--text-admin)',outline:'none'}}/></td></tr>
<tr><td style={label}>Description</td><td style={{...cell,borderRight:0,padding:0}}><textarea defaultValue="The land of Krishna's childhood pastimes on the bank of the Yamuna river." style={{border:0,height:96,width:'100%',boxSizing:'border-box',fontFamily:'var(--font-serif-data)',fontSize:18,padding:10,color:'var(--text-admin)',resize:'none',outline:'none'}}/></td></tr>
<tr><td style={label}>Photo</td><td style={{...cell,borderRight:0}}><div style={{display:'flex',alignItems:'center',gap:16}}><div style={{height:100,width:212,backgroundImage:'url('+region.photo+')',backgroundSize:'cover',backgroundPosition:'50%'}}></div><input type="file" style={{fontSize:15,color:'var(--text-admin)'}}/></div></td></tr>
<tr><td style={label}>Work time</td><td style={{...cell,borderRight:0}}>
<div style={{display:'flex',alignItems:'center',gap:10,padding:'0 0 0 42px',background:'url('+A+'/admin-icons/calendar.png) no-repeat left center'}}>
{['Mo','Tu','We','Th','Fr','Sa','Su'].map((w,i)=><CheckboxChip key={w} square checked={days[i]} onChange={v=>setDays(days.map((x,j)=>j===i?v:x))}>{w}</CheckboxChip>)}
</div>
<div style={{display:'flex',alignItems:'center',gap:10,marginTop:12,padding:'0 0 0 42px',background:'url('+A+'/admin-icons/clock.png) no-repeat left center',color:'var(--blue-400)'}}>
<Select filled options={['07:00','08:00','09:00']}/>&nbsp;—&nbsp;<Select filled options={['20:30','21:00']}/>
</div></td></tr>
</tbody></table>
<div style={{textAlign:'center',margin:'35px 0',display:'flex',justifyContent:'center',gap:24}}>
<Button variant="save" fixedWidth onClick={onBack}>Save</Button>
<Button variant="cancel" fixedWidth onClick={onBack}>Cancel</Button>
<Button variant="delete" fixedWidth>Delete</Button>
</div></div>;
}

function App(){
const [screen,setScreen]=R.useState('login');
const [sel,setSel]=R.useState('Regions');
const nav=<AdminMenu assets={A} items={['Regions','Spots','Guides','Maps','Reviews','Places','Directions']} selected={sel} onSelect={s=>{setSel(s);setScreen('list');}} userName="admin"/>;
if(screen==='login')return <LoginScreen onLogin={()=>setScreen('list')}/>;
if(screen==='edit')return <EditScreen region={REGIONS[0]} nav={nav} onBack={()=>setScreen('list')}/>;
return <RegionsScreen nav={nav} onOpen={()=>setScreen('edit')}/>;
}
window.HolySpotsAdminApp=App;
