
const KEY_USERS='sat_evo_users';
const KEY_STATS='sat_evo_stats_';
const KEY_GAM='sat_evo_gam_';
const KEY_MIS='sat_evo_mistakes_';

function byId(id){return document.getElementById(id);}
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('visible'));
  byId(id).classList.add('visible');
}

function loadUsers(){try{return JSON.parse(localStorage.getItem(KEY_USERS)||'[]');}catch{return[];}}
function loadStats(id){try{return JSON.parse(localStorage.getItem(KEY_STATS+id)||'{}');}catch{return{};}}
function loadGam(id){try{return JSON.parse(localStorage.getItem(KEY_GAM+id)||'{}');}catch{return{};}}
function loadMis(id){try{return JSON.parse(localStorage.getItem(KEY_MIS+id)||'[]');}catch{return[];}}

function satScore(xp){
  const base=400, maxxp=12000;
  let p=xp/maxxp; if(p>1)p=1;
  return Math.round((base+p*1200)/10)*10;
}

document.addEventListener('DOMContentLoaded',()=>{
  byId('pcBtn').onclick=login;
  byId('pcBack').onclick=()=>show('auth');
});

function deriveCode(id){
  return 'P4-' + id.slice(-6).toUpperCase();
}

function login(){
  const code=(byId('pcInput').value||'').trim().toUpperCase();
  const err=byId('pcError');
  const users=loadUsers();
  let found=null;
  for(const u of users){
    const pc=u.parentCode?u.parentCode.toUpperCase():deriveCode(u.id);
    if(pc===code){found=u; break;}
  }
  if(!found){
    err.textContent='Code not found';
    err.style.display='block';
    return;
  }
  err.style.display='none';
  render(found);
}

function render(u){
  show('dash');
  byId('pName').textContent='Progress of '+u.name;
  const s=loadStats(u.id);
  const g=loadGam(u.id);
  const m=loadMis(u.id);

  const total=s.total||0;
  const correct=s.correct||0;
  const acc= total? Math.round(correct/total*100):0;
  const xp=g.xpTotal||0;
  const score=satScore(xp);

  byId('pSummary').textContent=
    total? `${total} answered, accuracy ${acc}%, virtual SAT ${score}`:
    'No data yet. Encourage daily short practice.';

  const ps=byId('pStats');
  ps.innerHTML='';
  ['Questions: '+total, 'Correct: '+correct, 'Accuracy: '+acc+'%', 'XP: '+xp, 'Virtual SAT: '+score]
    .forEach(t=>{const li=document.createElement('li'); li.textContent=t; ps.appendChild(li);});

  const pr=byId('pRec');
  pr.innerHTML='';
  if(!total){
    ['Start with 3 short sessions per week','Use Practice mode daily'].forEach(t=>{
      const li=document.createElement('li'); li.textContent=t; pr.appendChild(li);
    });
  }else{
    ['Keep 4 training days/week','Use Review mistakes ('+m.length+')','Try Timed mode for exam prep']
      .forEach(t=>{const li=document.createElement('li'); li.textContent=t; pr.appendChild(li);});
  }
}
