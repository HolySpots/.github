const A='../../assets';
const DS=window.HolySpotsDesignSystem_cfcab4;
const {AppToolbar,Tabs,RegionCard,SpotListItem,SmileRating,StatusLabel,CheckInBar,ReviewCard}=DS;

const REGIONS=[
{id:1,name:'Vrindavan',photo:A+'/images/region_photo_1.jpg',count:52,descr:'The land of Krishna\u2019s childhood pastimes on the bank of the Yamuna river. Thousands of temples, sacred kunds and groves.'},
{id:2,name:'Mayapur',photo:A+'/images/region_photo_2.jpg',count:34,descr:'The birthplace of Sri Chaitanya Mahaprabhu at the confluence of the Ganges and Jalangi rivers.'},
{id:3,name:'Rishikesh',photo:A+'/images/region_photo_3.jpg',count:21,descr:'The gateway to the Himalayas on the banks of the holy Ganga. Ashrams, ghats and mountain trails.'},
{id:4,name:'Jagannath Puri',photo:A+'/images/region_photo_4.jpg',count:18,descr:'The abode of Lord Jagannath by the ocean, famous for the yearly Ratha-yatra festival.'},
];
const SPOTS=[
{id:1,region:1,name:'Sri Krishna Balaram Mandir',photo:A+'/images/region_photo_1.jpg',info:'Open till 8:30 PM',status:'open',descr:'You can get a raja bhoga here. The temple is a fantastic place for worship and japa chanting. Deities read your mind deeply with high compassion and understanding.',photos:12},
{id:2,region:1,name:'Kesi Ghat',photo:A+'/images/region_photo_3.jpg',info:'Bank of the Yamuna',status:'open',descr:'Very peaceful darshan and japa hideout on the bank of the Yamuna.',photos:7},
{id:3,region:1,name:'Seva Kunj',photo:A+'/images/region_photo_4.jpg',info:'Closes at sunset',status:'closed',descr:'A sacred grove. Very beautiful place with big mystical power.',photos:5},
];
const GUIDES=[
{id:1,name:'Vraja Mandala Parikrama',photo:A+'/images/guide_photo_1.jpg',descr:'A walking route around the sacred places of Vrindavan.'},
{id:2,name:'Navadvipa Parikrama',photo:A+'/images/guide_photo_2.jpg',descr:'Nine islands of Mayapur dhama in four days.'},
];
const REVIEWS=[
{title:'Amazing place!',date:'17 Nov',text:'Big mystical power!'},
{title:'Very peaceful',date:'27 Jan',text:'Very peaceful darshan/japa hideout.'},
{title:'Loved it',date:'8 Jul',text:'Fantastic place for worship and japa chanting'},
];

function RegionActions({onReviews}){
const items=[['ic_message_small.png','Reviews',onReviews],['ic_stay_small.png','Hotels'],['ic_food_small.png','Food'],['ic_way_small.png','Route']];
return <div style={{display:'flex',borderBottom:'1px solid var(--divider)'}}>
{items.map(([ic,label,fn],i)=><button key={label} onClick={fn} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:10,border:0,borderLeft:i?'1px solid var(--divider-light)':0,background:'none',cursor:'pointer',fontFamily:'var(--font-core)',fontSize:'var(--fs-caption)',color:'var(--text-secondary)'}}><img src={A+'/icons/'+ic} alt="" style={{height:18}}/>{label}</button>)}
</div>;
}

function HomeScreen({go}){
const [tab,setTab]=window.React.useState(0);
return <div>
<AppToolbar title="Holy Spots" assets={A} actions={[{icon:'icon_search.png',label:'Search'},{icon:'icon_map.png',label:'Map'}]}/>
<Tabs tabs={['Spots','Guides']} active={tab} onChange={setTab}/>
{tab===0?REGIONS.map(r=><RegionCard key={r.id} assets={A} photo={r.photo} name={r.name} spotCount={r.count} onClick={()=>go({name:'region',id:r.id})}/>)
:GUIDES.map(g=><SpotListItem key={g.id} assets={A} photo={g.photo} name={g.name} info={g.descr}/>)}
</div>;
}

function RegionScreen({id,go}){
const r=REGIONS.find(x=>x.id===id);
return <div>
<AppToolbar title={r.name} assets={A} onBack={()=>go({name:'home'})} actions={[{icon:'icon_map.png',label:'Map'}]}/>
<div style={{position:'relative',height:'var(--region-photo-h)'}}>
<img src={r.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
</div>
<RegionActions onReviews={()=>go({name:'reviews',back:{name:'region',id}})}/>
<p style={{margin:'20px 15px',fontSize:'var(--fs-body)',fontWeight:300,lineHeight:'var(--lh-body)',color:'var(--text-body)'}}>{r.descr}</p>
<div style={{borderTop:'1px solid var(--divider)'}}>
{SPOTS.map(s=><SpotListItem key={s.id} assets={A} photo={s.photo} name={s.name} info={s.info} status={s.status} onClick={()=>go({name:'spot',id:s.id})}/>)}
</div></div>;
}

function SpotScreen({id,go}){
const s=SPOTS.find(x=>x.id===id);
const [rate,setRate]=window.React.useState(null);
const [checked,setChecked]=window.React.useState(false);
return <div style={{display:'flex',flexDirection:'column',minHeight:'100%'}}>
<div style={{position:'relative',height:'var(--spot-hero-h)',flexShrink:0}}>
<img src={s.photo} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
<div style={{position:'absolute',left:0,right:0,bottom:0,height:'55%',background:'var(--scrim-photo)'}}></div>
<div style={{position:'absolute',top:0,left:0,right:0}}><AppToolbar transparent assets={A} onBack={()=>go({name:'region',id:s.region})} actions={[{icon:'icon_map_white.png',label:'Map'}]}/></div>
<div style={{position:'absolute',right:15,bottom:58,display:'flex',alignItems:'center',gap:8,color:'#fff',fontSize:'var(--fs-counter)'}}><img src={A+'/icons/icon_picture_white.png'} alt="" style={{height:16}}/>{s.photos}</div>
<div style={{position:'absolute',left:15,right:15,bottom:10,color:'#fff'}}>
<div style={{fontSize:'var(--fs-title)',marginBottom:8}}>{s.name}</div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
<span style={{fontSize:'var(--fs-body)',color:'var(--text-tertiary)'}}>{REGIONS.find(r=>r.id===s.region).name}</span>
<StatusLabel status={s.status}/>
</div></div></div>
<button onClick={()=>go({name:'reviews',back:{name:'spot',id}})} style={{display:'flex',alignItems:'center',gap:15,padding:15,border:0,background:'none',cursor:'pointer',fontFamily:'var(--font-core)',fontSize:'var(--fs-small)',color:'var(--text-title)'}}><img src={A+'/icons/ic_message_small.png'} alt="" style={{height:16}}/>Reviews</button>
<SmileRating value={rate} onChange={setRate} assets={A}/>
<p style={{margin:'20px 15px',fontSize:'var(--fs-body)',fontWeight:300,lineHeight:'var(--lh-body)',color:'var(--text-body)'}}>{s.descr}</p>
<div style={{flex:1}}></div>
<CheckInBar checkedIn={checked} onCheckIn={()=>setChecked(true)} onDelete={()=>setChecked(false)} assets={A}/>
</div>;
}

function ReviewsScreen({back,go}){
return <div>
<AppToolbar title="Reviews" assets={A} onBack={()=>go(back)}/>
{REVIEWS.map((r,i)=><ReviewCard key={i} assets={A} title={r.title} date={r.date} text={r.text}/>)}
<div style={{padding:'25px 15px',textAlign:'center'}}><span style={{fontSize:'var(--fs-small)',color:'var(--text-secondary)'}}>Did you visit this place? </span><a href="#" onClick={e=>e.preventDefault()} style={{fontSize:'var(--fs-small)'}}>New review</a></div>
</div>;
}

function App(){
const [screen,setScreen]=window.React.useState({name:'home'});
const body=screen.name==='home'?<HomeScreen go={setScreen}/>:screen.name==='region'?<RegionScreen id={screen.id} go={setScreen}/>:screen.name==='spot'?<SpotScreen id={screen.id} go={setScreen}/>:<ReviewsScreen back={screen.back||{name:'home'}} go={setScreen}/>;
return <div style={{width:390,height:760,margin:'20px auto',background:'var(--surface-page)',boxShadow:'var(--shadow-dialog)',overflowY:'auto',overflowX:'hidden',fontFamily:'var(--font-core)'}}>{body}</div>;
}
window.HolySpotsMobileApp=App;
