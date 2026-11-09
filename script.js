const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=(m)=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200)};
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
  const v=b.dataset.copy;
  try{await navigator.clipboard.writeText(v);toast('Copied '+v)}catch(e){toast(v)}
}));
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{
  $$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const f=b.dataset.f;
  $$('.cert').forEach(c=>{c.hidden=!(f==='all'||c.dataset.c.split(' ').includes(f))});
}));
$('#cf').addEventListener('submit',e=>{
  e.preventDefault();
  const n=$('#cn').value.trim(),em=$('#ce').value.trim(),m=$('#cm').value.trim();
  const a=document.createElement('a');
  a.href='mailto:amalkunnumpurth@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(m+'\n\n'+n+'\n'+em);
  document.body.appendChild(a);a.click();a.remove();
  toast('Opening your email app. If nothing opens, email amalkunnumpurth@gmail.com');
});
const menu=$('.menu'),links=$('.links');
menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
$$('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded',false)}));
const map={home:'#top',about:'#about',projects:'#projects',certifications:'#certifications',contact:'#contact'};
const navA=$$('.links a');
const setActive=id=>navA.forEach(a=>{a.getAttribute('href')===map[id]?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setActive(en.target.id==='top'?'home':en.target.id)}),{rootMargin:'-40% 0px -55% 0px'});
  ['top','about','projects','certifications','contact'].forEach(i=>{const el=document.getElementById(i);el&&io.observe(el)});
}
