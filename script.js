const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200)};

/* ---------- content ---------- */
const projects=[
 {t:'Sentinel',live:0,m:'Aug to Sep 2026 · Smart India Hackathon (internal) · NYXARA_IN',d:'An AI-powered, tamper-proof consumer protection shield built around the Legal Metrology (Packaged Commodities) Rules, 2011. It cross-links inventory and compliance data across supply chains using edge computing and IoT. I led the architecture and network protocol integration.',g:['AI','IoT','Edge computing','Architecture']},
 {t:'CurVitae',live:1,m:'Sep to Oct 2026 · NYXARA_IN',d:'An AI-integrated, ATS-friendly resume maker. It parses an existing resume or builds one from your details, then formats it with custom styles for the job you are targeting.',g:['Flutter','Android','AI']},
 {t:'SKEIN',live:0,m:'Nov 2026 to now · NYXARA_IN',d:'"Every thread. One connection." A messaging product from NYXARA_IN, in development and coming soon.',g:['Flutter','Mobile apps']},
 {t:'CELESTIFY',live:0,m:'Nov 2026 to now · NYXARA_IN',d:'An upcoming interactive cosmic pet companion that rethinks the virtual pet, with a living island, dream world and friendship network.',g:['Flutter','Android','Game design']},
 {t:'Emergency Ambulance Route Priority',live:0,m:'Sep 2026 · AI Conclave Hackathon · Team Sentinel',d:'Smart ambulances use IoT and edge computing to clear the way through traffic and save critical minutes in an emergency.',g:['IoT','Edge computing','Generative AI']}
];
const certs=[
 ['Claude Academy: Claude Code 101','Anthropic · Oct 2026','ai'],
 ['Claude Academy: Claude 101','Anthropic · Oct 2026','ai'],
 ['Cyber Job Simulation','Deloitte Australia via Forage · Feb 2026','cyber'],
 ['Certified Software Engineering Job Simulation','Forage · Feb 2026','cyber'],
 ['IoT-Network Specialist Certificate Programme','Reliance Foundation · Feb 2026','cyber'],
 ['Cybersecurity Assessment','LearnTube.ai · Feb 2026','cyber'],
 ['Microsoft Azure Essentials','Microsoft Press on LinkedIn · Sep 2026','cloud'],
 ['End-to-end analytics using Microsoft Fabric','Microsoft · Feb 2026','cloud'],
 ['Copilot in Microsoft Fabric','Microsoft · Feb 2026','ai'],
 ['Data Analyst Career Path','Microsoft · Feb 2026','cloud'],
 ['Power BI and DAX series (8 courses)','Microsoft · Feb 2026','cloud'],
 ['Git, GitHub and GitHub Copilot (4 courses)','Microsoft · Aug to Sep 2026','dev'],
 ['SQL (Basic)','HackerRank · Oct 2026','dev'],
 ['What Is Generative AI?','LinkedIn · Sep 2026','ai'],
 ['AI Conclave Hackathon','Amal Jyothi College · Sep 2026','hack'],
 ['Smart India Hackathon 2026 (Internal)','Amal Jyothi College · Sep 2026','hack']
];
const cats={all:'All',cyber:'Cybersecurity and IoT',cloud:'Cloud and data',ai:'AI',dev:'Development',hack:'Hackathons'};
const groups={
 'Security and networks':['Cyber Defense','Network Security','TCP/IP','IoT Security','Threat Assessment'],
 'Apps and backend':['Flutter','Android','Python','REST APIs','Apache Kafka','SQL'],
 'Cloud and data':['Microsoft Azure','Microsoft Fabric','Power BI','DAX','Git and GitHub'],
 'AI and leadership':['Machine Learning','Generative AI','Copilot','Team Leadership','Project Management']
};
const ringSkills=['Flutter','Python','Cyber Defense','Network Security','IoT Security','Apache Kafka','Azure','Fabric','Power BI','Generative AI','Machine Learning','Team Leadership'];

/* ---------- render ---------- */
$('#projects').innerHTML=projects.map(p=>`<article class="card"><span class="meta">${p.m}</span><h3>${p.t}${p.live?'<em class="live">Live</em>':''}</h3><p>${p.d}</p><div class="tags">${p.g.map(x=>`<span>${x}</span>`).join('')}</div></article>`).join('');
$('#groups').innerHTML=Object.entries(groups).map(([k,v])=>`<div class="glass"><h3>${k}</h3><div class="tags">${v.map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('');
$('#filters').innerHTML=Object.entries(cats).map(([k,v],i)=>`<button data-f="${k}" aria-pressed="${i==0}">${v}</button>`).join('');
const drawCerts=f=>{$('#certList').innerHTML=certs.filter(c=>f==='all'||c[2]===f).map((c,i)=>`<div class="card" style="--i:${i}"><span class="meta">${c[1]}</span><h3>${c[0]}</h3></div>`).join('')};
drawCerts('all');
$('#filters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCerts(b.dataset.f)});

/* ---------- tabs ---------- */
const tabs=$$('.tabs [data-t]'),ids=tabs.map(b=>b.dataset.t);let cur=null;
function moveInd(b){const i=$('.ind');i.style.width=b.offsetWidth+'px';i.style.transform=`translateX(${b.offsetLeft}px)`}
function show(id){
  if(!ids.includes(id))id='home';
  if(id===cur)return;
  $$('.panel.off').forEach(p=>p.classList.remove('off'));
  const old=cur&&$('#'+cur);
  if(old){old.classList.remove('on');old.classList.add('off');setTimeout(()=>old.classList.remove('off'),450)}
  const p=$('#'+id);p.classList.add('on');
  [...p.children].forEach((c,i)=>c.style.setProperty('--i',i));
  tabs.forEach(b=>{const s=b.dataset.t===id;b.setAttribute('aria-selected',s);if(s){moveInd(b);b.scrollIntoView({inline:'center',block:'nearest'})}});
  cur=id;scrollTo({top:0});
  if(location.hash!=='#'+id)history.replaceState(null,'','#'+id);
}
tabs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.t)));
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){e.preventDefault();show(g.dataset.go)}});
addEventListener('hashchange',()=>show(location.hash.slice(1)));
addEventListener('resize',()=>{const b=tabs.find(x=>x.dataset.t===cur);b&&moveInd(b);buildRing()});
$$('.tabs [data-t]').forEach(b=>b.addEventListener('keydown',e=>{const i=ids.indexOf(b.dataset.t);if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:-1)+ids.length)%ids.length];n.focus();show(n.dataset.t)}}));
document.fonts&&document.fonts.ready.then(()=>{const b=tabs.find(x=>x.dataset.t===cur);b&&moveInd(b)});

/* ---------- 3D tilt (cards and photo) ---------- */
let hot=null;
const rest=el=>el&&['--rx','--ry'].forEach(k=>el.style.setProperty(k,'0deg'));
document.addEventListener('pointermove',e=>{
  if(calm||e.pointerType==='touch')return;
  const host=e.target.closest('.card,[data-tilt]');
  if(hot&&hot!==host)rest(hot.matches('[data-tilt]')&&hot.querySelector('.slab')||hot);
  hot=host;if(!host)return;
  const tgt=host.matches('[data-tilt]')&&host.querySelector('.slab')||host;
  const r=host.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  tgt.style.setProperty('--ry',((x-.5)*18).toFixed(1)+'deg');
  tgt.style.setProperty('--rx',((.5-y)*18).toFixed(1)+'deg');
  host.style.setProperty('--mx',x*100+'%');host.style.setProperty('--my',y*100+'%');
});

/* ---------- typed roles ---------- */
const roles=['secure systems.','Flutter and Android apps.','machine learning products.','teams that ship.'];
(function type(){
  const el=$('#typed');if(calm){el.textContent=roles[0];return}
  let r=0,c=0,del=false;
  (function tick(){const w=roles[r];c+=del?-1:1;el.textContent=w.slice(0,c);
    let t=del?35:70;
    if(!del&&c===w.length){del=true;t=1700}else if(del&&c===0){del=false;r=(r+1)%roles.length;t=350}
    setTimeout(tick,t)})();
})();

/* ---------- skills ring ---------- */
let spin=0,drag=null,vel=.25;
function buildRing(){
  const ring=$('#ring'),n=ringSkills.length,w=Math.min(innerWidth*.3,150),rad=Math.round((w/2)/Math.tan(Math.PI/n))+24;
  ring.style.width=w+'px';
  ring.innerHTML=ringSkills.map((s,i)=>`<span style="transform:rotateY(${i*360/n}deg) translateZ(${rad}px)">${s}</span>`).join('');
}
buildRing();
const scene=$('#ringScene');
scene.addEventListener('pointerdown',e=>{drag=e.clientX;scene.setPointerCapture(e.pointerId);scene.style.cursor='grabbing'});
scene.addEventListener('pointermove',e=>{if(drag===null)return;vel=(e.clientX-drag)*.35;spin+=vel;drag=e.clientX});
['pointerup','pointercancel'].forEach(ev=>scene.addEventListener(ev,()=>{drag=null;scene.style.cursor='grab'}));

/* ---------- 3D node globe background ---------- */
const cv=$('#bg'),g=cv.getContext('2d'),N=150,P=[],E=[];
for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.399963;P.push([Math.cos(a)*r,y,Math.sin(a)*r])}
for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const d=Math.hypot(P[i][0]-P[j][0],P[i][1]-P[j][1],P[i][2]-P[j][2]);if(d<.42)E.push([i,j])}
let W,H,dpr,ang=0,mx=0,my=0,tx=0,ty=0;
function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0)}
size();addEventListener('resize',size);
addEventListener('pointermove',e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5});
function frame(){
  g.clearRect(0,0,W,H);
  if(!calm)ang+=.0028;
  tx+=(mx*1.2-tx)*.05;ty+=(my*.9-ty)*.05;
  const ya=ang+tx,xa=.35+ty,cy=Math.cos(ya),sy=Math.sin(ya),cx=Math.cos(xa),sx=Math.sin(xa);
  const wide=W>980,ox=wide?W*.72:W*.5,oy=H*(wide?.48:.4),R=Math.min(W,H)*(wide?.52:.46);
  const q=P.map(p=>{let x=p[0]*cy+p[2]*sy,z=-p[0]*sy+p[2]*cy,y=p[1]*cx-z*sx;z=p[1]*sx+z*cx;const k=3/(3-z);return[ox+x*R*k,oy+y*R*k,z,k]});
  g.lineWidth=1;
  for(const[i,j]of E){const a=q[i],b=q[j],d=(a[2]+b[2])/2;g.strokeStyle=`rgba(191,233,255,${.03+.13*(d+1)/2})`;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}
  for(let i=0;i<N;i++){const p=q[i],t=(p[2]+1)/2;g.fillStyle=i%11===0?`rgba(255,122,107,${.4+.6*t})`:`rgba(190,170,255,${.25+.65*t})`;g.beginPath();g.arc(p[0],p[1],(i%11===0?2.6:1.5)*p[3],0,6.283);g.fill()}
  if(cur==='skills'&&drag===null&&!calm){spin+=vel;vel+=(.25-vel)*.02}
  $('#ring').style.setProperty('--spin',spin+'deg');
  if(!calm)requestAnimationFrame(frame)
}
frame();

/* ---------- contact ---------- */
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const v=b.dataset.copy;try{await navigator.clipboard.writeText(v);toast('Copied '+v)}catch(e){toast(v)}}));
$('#cf').addEventListener('submit',e=>{
  e.preventDefault();
  const n=$('#cn').value.trim(),em=$('#ce').value.trim(),m=$('#cm').value.trim();
  const a=document.createElement('a');
  a.href='mailto:amalkunnumpurth@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(m+'\n\n'+n+'\n'+em);
  document.body.appendChild(a);a.click();a.remove();
  toast('Opening your email app. If nothing opens, write to amalkunnumpurth@gmail.com');
});

show(location.hash.slice(1));
