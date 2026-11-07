// sotetprogram.js – 🕶️ SÖTÉT PROGRAM: külön játékmód. Labor (kitalált, rajzfilmes anyagok – nincs valódi recept), zugpálinka-főzde,
// pályázatfőzde, dílerkedés 8 kerületben, buli, rendőri hő, 150 csak itt használható tárgy, 14 minijáték. Kitalált szereplők.
(()=>{
const $$=i=>document.getElementById(i),RN=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(RN(a,b+1)),pick=a=>a[Math.floor(Math.random()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const f$=n=>Math.round(n).toLocaleString('hu-HU')+' ₷';

// ===================== SZEREPLŐK (kitalált) =====================
const CH={
 ferko:{n:'Profi Ferkó',e:'👨‍🔬',r:'főzőmester',l:['Ez nem kémia, fiam. Ez művészet.','Hőfok! Figyeld a hőfokot!','A tisztaság a minden.']},
 beno:{n:'Bulis Benő',e:'🕺',r:'afterparti-király',l:['Hajnali négy? Az még este!','Ha nincs buli, csinálunk egyet!','A hírnév a táncparketten születik.']},
 csaba:{n:'Csavaros Csaba',e:'🕴️',r:'díler-főnök',l:['A pénz nem büdös, csak gyűrött.','Minden kerületnek megvan az ára.','Ne nézz a kamerába.']},
 tibi:{n:'Tender Tibi',e:'📎',r:'pályázati guru',l:['Egy jó pályázat fele siker, a másik fele pecsét.','A strómann a legjobb barát.','Határidő? Az csak javaslat.']},
 pista:{n:'Pálinkás Pista',e:'🍑',r:'zugfőző',l:['Az eleje mérgező, a vége büdös, a közepe arany!','Gyümölcs nélkül nincs élet.','Egészségedre, csak ne hangosan.']},
 zsaru:{n:'Szigorú Szilárd',e:'👮',r:'nyomozó',l:['Tudom, mit csinálsz.','Egyszer elkaplak.','Ma csak figyelek.']}};

// ===================== 150 TÁRGY (csak ebben a módban) =====================
// t: ing=alapanyag, eq=felszerelés, pr=termék, bo=boost/fogyóeszköz, pp=ingatlan/jármű, co=gyűjthető/kozmetikum
const IT=[];const I=(id,n,e,t,p,x)=>IT.push(Object.assign({id,n,e,t,p},x||{}));
// 40 alapanyag (labor 15 kitalált, pálinka 15 gyümölcs, pályázat 10 papír)
[['kcuk','Kék kristálycukor','🔷',40],['lpor','Lila pezsgőpor','🟣',35],['zfu','Zöld szerencsefű','🌿',30],['ufok','Ufó-por','🛸',90],['sziv','Szivárványszirup','🌈',70],['vlav','Vulkáni láva-só','🌋',60],['jeg','Sarki jégkristály','🧊',55],['hold','Holdpor','🌙',120],['tuz','Tűzpaprika-kivonat','🌶️',45],['csill','Csillagpor','✨',110],['gomba','Nevetőgomba (rajzfilmes)','🍄',65],['mez','Méhkirálynő-méz','🍯',50],['koko','Kókusz-köd','🥥',40],['vill','Villám-gél','⚡',95],['ark','Ősi arkánum','🔮',150],
 ['szilva','Szilva','🟣',8],['barack','Barack','🍑',10],['korte','Körte','🍐',9],['alma','Alma','🍎',6],['cseresznye','Cseresznye','🍒',12],['meggy','Meggy','🍒',11],['birsalma','Birsalma','🍋',14],['som','Som','🔴',18],['eper','Eper','🍓',13],['malna','Málna','🫐',15],['szolo','Szőlő','🍇',9],['dio','Zöld dió','🌰',16],['akac','Akácméz','🍯',20],['bodza','Bodza','🌼',12],['kokorcsin','Kökény','⚫',17],
 ['urlap','Pályázati űrlap','📄',5],['pecset','Gumipecsét','🔏',25],['strom','Strómann-aláírás','✍️',60],['kamu','Kamu árajánlat','🧾',30],['tanu','Tanulmány (AI-írta)','📚',45],['plak','Plakát-terv','🖼️',20],['konz','Konzultációs ív','🗳️',15],['logo','Uniós logó matrica','🇪🇺',10],['hatido','Határidő-hosszabbítás','⏳',80],['nyilt','Nyilatkozat','📜',12]
].forEach(([id,n,e,p],i)=>I(id,n,e,'ing',p,{br:i<15?'lab':i<30?'pal':'pal2'}));
// 30 felszerelés
[['labl','Lombik','⚗️',300,'lab',1],['bunsen','Bunsen-égő','🔥',450,'lab',1],['mer','Precíziós mérleg','⚖️',600,'lab',2],['hut','Hűtőkamra','❄️',1500,'lab',3],['centr','Centrifuga','🌀',2500,'lab',4],['robot','Keverőrobot','🤖',4000,'lab',5],['vak','Vákuumkamra','🫙',6000,'lab',6],['spekt','Spektroszkóp','🔬',9000,'lab',7],['reakt','Kvantum-reaktor','☢️',20000,'lab',9],['maszk','Gázmaszk','😷',200,'lab',1],
 ['ust','Rézüst','🫕',400,'pal',1],['hordo','Erjesztőhordó','🛢️',350,'pal',1],['hom','Hőmérő','🌡️',150,'pal',1],['hut2','Hűtőcsiga','🐌',800,'pal',2],['tolcs','Tölcsér','🔻',60,'pal',1],['dem','Demizson','🍾',120,'pal',1],['aero','Alkoholmérő','📏',500,'pal',2],['tolgy','Tölgyfa érlelő','🪵',3000,'pal',4],['dupla','Dupla lepárló','🏭',7000,'pal',6],['cimke','Címkenyomtató','🏷️',900,'pal',2],
 ['iro','Írógép','⌨️',250,'pal2',1],['nyomt','Nyomtató','🖨️',600,'pal2',1],['iktat','Iktató','🗄️',400,'pal2',1],['pecsetg','Pecsétgép','🔨',1800,'pal2',3],['laptop','Laptop','💻',2500,'pal2',2],['shred','Iratmegsemmisítő','🗑️',1200,'pal2',2],['excel','Kreatív Excel','📊',3500,'pal2',4],['ugyved','Ügyvédi iroda','⚖️',8000,'pal2',6],['offsh','Offshore cég','🏝️',15000,'pal2',8],['kapcs','Kapcsolati háló','🕸️',25000,'pal2',9]
].forEach(([id,n,e,p,br,lv])=>I(id,n,e,'eq',p,{br,lv}));
// 30 termék (kitalált)
const PR=[['p1','Kék Mennyország','🔷','lab',['kcuk','jeg'],400],['p2','Lila Pezsgés','🟣','lab',['lpor','koko'],350],['p3','Zöld Szerencse','🍀','lab',['zfu','mez'],300],['p4','Ufó-Turbó','🛸','lab',['ufok','vill'],900],['p5','Szivárvány-Szérum','🌈','lab',['sziv','csill'],1100],['p6','Lávalámpa','🌋','lab',['vlav','tuz'],700],['p7','Holdkóros','🌙','lab',['hold','jeg'],1300],['p8','Kacagó Gomba','🍄','lab',['gomba','mez'],650],['p9','Villámcsapás','⚡','lab',['vill','tuz'],1000],['p10','Arkánum Elixír','🔮','lab',['ark','csill','hold'],2600],
 ['p11','Szilvapálinka','🥃','pal',['szilva'],120],['p12','Barackpálinka','🥃','pal',['barack'],150],['p13','Körtepálinka','🥃','pal',['korte'],140],['p14','Almapálinka','🥃','pal',['alma'],90],['p15','Cseresznyepálinka','🥃','pal',['cseresznye'],170],['p16','Birspálinka','🥃','pal',['birsalma'],200],['p17','Sompálinka','🥃','pal',['som'],260],['p18','Málnapálinka','🥃','pal',['malna'],220],['p19','Diópálinka','🥃','pal',['dio','akac'],320],['p20','Nagymama-féle Vegyes','🍶','pal',['szilva','alma','korte'],300],
 ['p21','Rotyogó Térkő-pályázat','🧱','pal2',['urlap','kamu'],600],['p22','Kilátó a semmibe','🗼','pal2',['urlap','tanu','pecset'],1500],['p23','Konzultációs kampány','🗳️','pal2',['konz','plak'],900],['p24','Stadion-felújítás','🏟️','pal2',['strom','kamu','pecset'],3000],['p25','Uniós napelempark','☀️','pal2',['logo','tanu','nyilt'],2200],['p26','Kisvasút (sehova)','🚂','pal2',['strom','hatido'],2800],['p27','Tanácsadói szerződés','💼','pal2',['tanu','strom'],2000],['p28','Kamu szoftver','💾','pal2',['urlap','tanu','kamu'],1700],['p29','Lovarda','🐎','pal2',['strom','pecset','kamu'],2500],['p30','Gazdasági stratégia (1 oldal)','📃','pal2',['nyilt'],400]];
PR.forEach(([id,n,e,br,rec,p])=>I(id,n,e,'pr',p,{br,rec}));
// 20 boost
[['kave','Dupla kávé','☕',50,'+20 energia'],['energ','Energiaital','🥤',90,'+40 energia'],['alibi','Alibi-csomag','🕵️',800,'-25 hő'],['ugyv','Ügyvéd hívása','📞',1500,'-50 hő'],['kenopenz','Borítékos ajándék','✉️',2000,'-35 hő, +5 hírnév'],['parfum','Illatosító','🧴',120,'nincs szag: -10 hő'],['kesztyu','Gumikesztyű','🧤',60,'+5% tisztaság'],['katal','Kitalált katalizátor','🧲',400,'+15% tisztaság'],['szerencse','Szerencsepatkó','🧲',700,'+10% ár egy eladásnál'],['flyer','Szórólap','📰',100,'+10 vevő'],['mixtape','Bulis mixtape','💿',300,'+10 hírnév'],['vip','VIP karszalag','🎟️',900,'+25 hírnév'],['napsz','Napszemüveg','🕶️',150,'-5 hő'],['dzseki','Bőrdzseki','🧥',600,'+5% alku'],['hamis','Hamis bajusz','🥸',250,'-15 hő'],['vitamin','Vitamin','💊',80,'+15 energia'],['gyors','Gyorsfőző tabletta (kitalált)','⏩',500,'főzés -1 lépés'],['bonusz','Kémia-tankönyv','📕',350,'+3% tisztaság végleg'],['frisito','Frissítő','🧃',40,'+10 energia'],['csoki','Csoki','🍫',30,'+8 energia']
].forEach(([id,n,e,p,d])=>I(id,n,e,'bo',p,{d}));
// 15 ingatlan / jármű
[['garazs','Garázs-labor','🏚️',5000,'+1 főzés/nap'],['pince','Pince-főzde','🕳️',4000,'pálinka +20%'],['iroda','Fiktív iroda','🏢',8000,'pályázat +20%'],['lakokocsi','Lakókocsi','🚐',12000,'labor bárhol: -10 hő/nap'],['raktar','Raktár','📦',6000,'tárhely ×2'],['klub','Éjszakai klub','🪩',30000,'buli +50% hírnév'],['bolt','Pálinkabolt','🏪',15000,'passzív bevétel'],['robogo','Robogó','🛵',2500,'utazás -1 energia'],['auto','Rozsdás Lada','🚗',6000,'menekülés könnyebb'],['furgon','Furgon','🚚',10000,'több áru eladás'],['hajo','Motorcsónak','🚤',20000,'csempészút'],['heli','Kölcsönhelikopter','🚁',60000,'hő -20/nap'],['villa','Villa a Balatonnál','🏖️',80000,'+hírnév/nap'],['sziget','Saját sziget','🏝️',200000,'végső cél'],['kastely','Kastély','🏰',150000,'+50 hírnév']
].forEach(([id,n,e,p,d])=>I(id,n,e,'pp',p,{d}));
// 15 gyűjthető
[['arany','Arany pipetta','🥇',3000],['sapka','Szerencsés sapka','🧢',800],['kitűzo','Közpénz-kitűző','📛',400],['szobor','Ferkó-szobrocska','🗿',2500],['bakelit','Benő bakelitje','📀',1800],['nyakl','Vastag aranylánc','📿',5000],['ora','Hamis luxusóra','⌚',3500],['plakett','„Év pályázója” plakett','🏅',6000],['dragako','Bulis drágakő','💎',9000],['kartyapak','Díler-kártyapakli','🃏',600],['gumikacsa','Laborkacsa','🦆',300],['festm','Pálinkás csendélet','🖼️',4500],['trofea','Rendőrsapka-trófea','🎖️',7000],['csengo','Pista csengője','🔔',1200],['koronka','Árnyékkorona','👑',50000]
].forEach(([id,n,e,p])=>I(id,n,e,'co',p));
const ITM=Object.fromEntries(IT.map(x=>[x.id,x]));

// ===================== KERÜLETEK =====================
const DIS=[['Csöndes Lakótelep','🏢',.8,10],['Egyetemváros','🎓',1.1,25],['Bulinegyed','🪩',1.4,45],['Villanegyed','🏡',1.8,35],['Kikötő','⚓',1.2,30],['Piactér','🧺',.9,15],['Ipari Zóna','🏭',1,20],['Fesztiválsziget','🎪',1.6,55]];

// ===================== ÁLLAPOT =====================
const NEW=()=>({cash:1500,day:1,en:100,heat:0,rep:0,lvl:{lab:1,pal:1,pal2:1},xp:0,inv:{kcuk:3,jeg:3,szilva:6,urlap:3,kamu:2,labl:1,bunsen:1,ust:1,hordo:1,iro:1,kave:2},own:{},log:[],purity:0,stats:{cook:0,sold:0,earned:0,bust:0,party:0},cust:0,stash:0});
let D=LS('k3dp',null)||NEW();const save=()=>SV('k3dp',D);
const has=(id,n)=>(D.inv[id]||0)>=(n||1),addI=(id,n)=>{D.inv[id]=(D.inv[id]||0)+(n||1);if(D.inv[id]<=0)delete D.inv[id]};
const log=t=>{D.log.unshift('['+D.day+'. nap] '+t);D.log=D.log.slice(0,40)};
const brLv=b=>D.lvl[b]||1;
const tierEq=b=>IT.filter(x=>x.t==='eq'&&x.br===b&&has(x.id)).reduce((s,x)=>s+x.lv,0);

// ===================== UI ALAP =====================
const css=document.createElement('style');css.textContent=`#dp{position:fixed;inset:0;z-index:9500;background:radial-gradient(circle at 30% 20%,#1e1b4b,#020617 70%);color:#e2e8f0;font-family:system-ui,sans-serif;display:none;flex-direction:column}
#dp header{display:flex;align-items:center;gap:12px;padding:10px 16px;background:#0f172acc;border-bottom:2px solid #7c3aed;flex-wrap:wrap}#dp header h1{margin:0;font-size:22px;background:linear-gradient(90deg,#a78bfa,#f472b6);-webkit-background-clip:text;color:transparent}
#dp .st{display:flex;gap:10px;flex-wrap:wrap;font-weight:700;font-size:13px}#dp .st span{background:#1e293b;padding:4px 9px;border-radius:8px}
#dp nav{display:flex;gap:6px;padding:8px 16px;flex-wrap:wrap}#dp nav button,#dp .bt{background:#312e81;color:#fff;border:0;border-radius:9px;padding:8px 12px;font-weight:700;cursor:pointer}#dp nav button.on{background:#7c3aed}#dp .bt:disabled{opacity:.4;cursor:default}
#dp main{flex:1;overflow:auto;padding:12px 16px}#dp .g{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:9px}#dp .c{background:#1e293bdd;border:1px solid #334155;border-radius:12px;padding:10px;font-size:13px}
#dp .say{background:#0f172a;border-left:4px solid #a78bfa;padding:8px 12px;border-radius:8px;margin-bottom:10px}#dp .x{margin-left:auto;background:#ef4444}
#dpmg{position:fixed;inset:0;z-index:9600;background:#000c;display:none;align-items:center;justify-content:center}#dpmg>div{background:#0f172a;border:2px solid #f472b6;border-radius:16px;padding:14px;width:min(640px,calc(100% - 24px));color:#fff;text-align:center;font-family:system-ui}
#dpmg canvas{width:100%;background:#020617;border-radius:10px}#dp .bar{height:8px;background:#0f172a;border-radius:4px;overflow:hidden}#dp .bar i{display:block;height:100%}`;document.head.appendChild(css);
const root=document.createElement('div');root.id='dp';document.body.appendChild(root);
const mgw=document.createElement('div');mgw.id='dpmg';mgw.innerHTML='<div><h3 id="dpmt" style="margin:4px 0"></h3><div id="dpmi" style="font-size:13px;opacity:.85;margin-bottom:6px"></div><canvas id="dpmc" width="600" height="320"></canvas><div id="dpmr" style="margin-top:6px;font-weight:700"></div></div>';document.body.appendChild(mgw);
root.addEventListener('keydown',e=>e.stopPropagation());mgw.addEventListener('keydown',e=>e.stopPropagation());
let TAB='home';
function open(){root.style.display="flex";draw()}
function close(){root.style.display='none';save()}
window.openSotetProgram=open;

// ===================== MINIJÁTÉK-MOTOR (14 db) =====================
// mindegyik: cb(score 0..1)
const MG={};let mgKey=null;
function mg(title,info,fn,cb){mgw.style.display='flex';$$('dpmt').textContent=title;$$('dpmi').textContent=info;$$('dpmr').textContent='';const cv=$$('dpmc'),cx=cv.getContext('2d');let done=false,raf;
 const keys={};const kd=e=>{keys[e.key.toLowerCase()]=true;mgKey&&mgKey(e.key.toLowerCase());if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase()))e.preventDefault()},ku=e=>{keys[e.key.toLowerCase()]=false};
 addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);
 const fin=s=>{if(done)return;done=true;cancelAnimationFrame(raf);mgKey=null;cv.onclick=null;cv.onmousemove=null;removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true);s=cl(s,0,1);$$('dpmr').textContent='Eredmény: '+Math.round(s*100)+'%';setTimeout(()=>{mgw.style.display='none';cb(s)},900)};
 const st={t:0,cx,cv,keys,fin,W:600,H:320};const t0=performance.now();const step=()=>{if(done)return;st.t=(performance.now()-t0)/1000;cx.clearRect(0,0,600,320);fn(st);raf=requestAnimationFrame(step)};
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*600,(e.clientY-r.top)/r.height*320]};st.pos=pos;step();return st}
const txt=(cx,t,x,y,s,c)=>{cx.fillStyle=c||'#fff';cx.font='bold '+(s||18)+'px system-ui';cx.textAlign='center';cx.fillText(t,x,y)};
// 1 hőfoktartás
MG.heat=cb=>{let T=50,v=0,inb=0,tot=0;mg('🌡️ Hőfoktartás','Tartsd a hőt a zöld sávban! SPACE = melegítés (8 mp)',s=>{const{cx,keys,t}=s;v+=keys[' ']?1.1:-.8;v*=.9;T=cl(T+v*.12,0,100);const lo=40+Math.sin(t)*12,hi=lo+18;tot++;if(T>lo&&T<hi)inb++;
 cx.fillStyle='#1e293b';cx.fillRect(270,20,60,280);cx.fillStyle='#16a34a88';cx.fillRect(270,300-hi*2.8,60,(hi-lo)*2.8);cx.fillStyle=T>lo&&T<hi?'#22c55e':'#ef4444';cx.fillRect(280,300-T*2.8,40,T*2.8);txt(cx,Math.round(T)+'°',450,160,32);txt(cx,(8-t).toFixed(1)+' mp',120,160);if(t>8)s.fin(inb/tot)},cb)};
// 2 kevergetés ritmusra
MG.stir=cb=>{let hits=0,n=0,beat=0;mg('🥄 Kevergetés','Kattints, amikor a kör a gyűrűhöz ér! (10 ütem)',s=>{const{cx,t}=s;const ph=(t*1.2)%1,r=20+ph*120;cx.strokeStyle='#a78bfa';cx.lineWidth=6;cx.beginPath();cx.arc(300,160,110,0,7);cx.stroke();cx.fillStyle='#f472b6';cx.beginPath();cx.arc(300,160,r,0,7);cx.globalAlpha=.4;cx.fill();cx.globalAlpha=1;txt(cx,'Talált: '+hits+'/'+n,300,30);
 s.cv.onclick=()=>{if(n>=10)return;n++;if(Math.abs(r-110)<16)hits++;if(n>=10)s.fin(hits/10)};if(t>15)s.fin(hits/10)},cb)};
// 3 időzítés stop-sáv
MG.stop=cb=>{let rounds=0,sc=0;mg('⏱️ Pontos adagolás','Állítsd meg a jelzőt középen! SPACE (5×)',s=>{const{cx,t}=s;const p=(Math.sin(t*(2.5+rounds*.6))+1)/2;cx.fillStyle='#334155';cx.fillRect(50,150,500,24);cx.fillStyle='#22c55e';cx.fillRect(285,150,30,24);cx.fillStyle='#fff';cx.fillRect(50+p*500-3,140,6,44);txt(cx,'Kör: '+rounds+'/5',300,60);
 mgKey=k=>{if(k!==' ')return;const d=Math.abs(p-.5);sc+=d<.03?1:d<.08?.6:d<.15?.25:0;rounds++;if(rounds>=5)s.fin(sc/5)}},cb)};
// 4 Simon-memória
MG.simon=cb=>{const seq=Array.from({length:6},()=>RI(0,3)),C=['#ef4444','#22c55e','#3b82f6','#eab308'];let show=true,i=0,inp=0,flash=-1,ft=0,phase=0;mg('🧠 Receptmemória','Jegyezd meg a sorrendet, aztán kattints ugyanígy!',s=>{const{cx,t}=s;if(show){const k=Math.floor(t/0.7);flash=k<seq.length&&(t%0.7)<0.5?seq[k]:-1;if(k>=seq.length){show=false;flash=-1}}
 C.forEach((c,j)=>{cx.fillStyle=c;cx.globalAlpha=flash===j?1:.35;cx.fillRect(110+(j%2)*200,30+Math.floor(j/2)*140,180,120)});cx.globalAlpha=1;txt(cx,show?'Figyelj...':'Te jössz: '+inp+'/'+seq.length,300,310,16);
 s.cv.onclick=e=>{if(show)return;const[x,y]=s.pos(e);const j=(x>300?1:0)+(y>160?2:0);flash=j;setTimeout(()=>flash=-1,150);if(j===seq[inp]){inp++;if(inp>=seq.length)s.fin(1)}else s.fin(inp/seq.length)}},cb)};
// 5 tisztítás – jó cseppek elkapása
MG.filter=cb=>{let px=300,good=0,bad=0,D2=[];mg('💧 Szűrés','Kapd el a kék cseppeket, kerüld a barnát! ←/→ (12 mp)',s=>{const{cx,keys,t}=s;if(keys.arrowleft||keys.a)px-=7;if(keys.arrowright||keys.d)px+=7;px=cl(px,40,560);if(Math.random()<.08)D2.push({x:RN(20,580),y:0,g:Math.random()<.65});D2.forEach(d=>d.y+=4);
 D2=D2.filter(d=>{if(d.y>280&&Math.abs(d.x-px)<45){d.g?good++:bad++;return false}return d.y<330});D2.forEach(d=>{cx.fillStyle=d.g?'#38bdf8':'#92400e';cx.beginPath();cx.arc(d.x,d.y,8,0,7);cx.fill()});cx.fillStyle='#e5e7eb';cx.fillRect(px-45,285,90,14);txt(cx,'✔ '+good+'  ✖ '+bad,300,30);if(t>12)s.fin(good/(good+bad*2+4))},cb)};
// 6 alku (díler)
MG.haggle=(base,cb)=>{let p=.5,pat=1;mg('🤝 Alku','A vevő türelme fogy. Csúsztasd az árat (egér), kattints az ajánlathoz!',s=>{const{cx,t}=s;pat=1-t/10;const lim=.55+Math.sin(base)*.2;cx.fillStyle='#334155';cx.fillRect(60,150,480,20);cx.fillStyle='#f472b6';cx.fillRect(60+p*480-6,140,12,40);txt(cx,'Ár: '+f$(base*(0.6+p*0.9)),300,110,24);cx.fillStyle='#22c55e';cx.fillRect(60,220,480*pat,10);txt(cx,'Türelem',300,255,14);
 s.cv.onmousemove=e=>{p=cl((s.pos(e)[0]-60)/480,0,1)};s.cv.onclick=()=>{s.fin(p<=lim+pat*.15?(0.6+p*0.9)/1.5:0)};if(pat<=0)s.fin(0)},cb)};
// 7 rendőrüldözés
MG.chase=cb=>{let y=160,obs=[],hit=0;mg('🚓 Üldözés!','Menekülj! ↑/↓ – kerüld az akadályokat (10 mp)',s=>{const{cx,keys,t}=s;if(keys.arrowup||keys.w)y-=6;if(keys.arrowdown||keys.s)y+=6;y=cl(y,20,300);if(Math.random()<.06+t*.004)obs.push({x:620,y:RN(20,300)});obs.forEach(o=>o.x-=6+t*.5);
 obs=obs.filter(o=>{if(Math.abs(o.x-80)<22&&Math.abs(o.y-y)<22){hit++;return false}return o.x>-20});cx.font='30px system-ui';cx.textAlign='center';cx.fillText('🚗',80,y+10);obs.forEach(o=>cx.fillText('🚧',o.x,o.y+10));cx.fillText('🚓',20,y+10+Math.sin(t*5)*8);txt(cx,'Ütközés: '+hit+'/3',300,30);if(hit>=3)s.fin(0);if(t>10)s.fin(1-hit*.3)},cb)};
// 8 buli – ritmus nyilak
MG.dance=cb=>{const K=['arrowleft','arrowup','arrowdown','arrowright'],E=['⬅️','⬆️','⬇️','➡️'];let notes=[],hit=0,miss=0,spawn=0;mg('🕺 Afterparti','Nyomd a nyilat, amikor a vonalhoz ér! (15 mp)',s=>{const{cx,t}=s;spawn-=.016;if(spawn<=0&&t<13){spawn=RN(.35,.7);notes.push({k:RI(0,3),y:-20})}notes.forEach(n=>n.y+=4.5);
 cx.fillStyle='#f472b6';cx.fillRect(0,260,600,4);notes=notes.filter(n=>{if(n.y>320){miss++;return false}return true});cx.font='34px system-ui';cx.textAlign='center';notes.forEach(n=>cx.fillText(E[n.k],150+n.k*100,n.y));txt(cx,'Talált: '+hit+' · Hiba: '+miss,300,30);
 mgKey=k=>{const j=K.indexOf(k);if(j<0)return;const n=notes.find(n=>n.k===j&&Math.abs(n.y-262)<34);if(n){hit++;notes.splice(notes.indexOf(n),1)}else miss++};if(t>15)s.fin(hit/(hit+miss+1))},cb)};
// 9 pálinka-lepárlás: elő/közép/utópárlat vágás
MG.cut=cb=>{let phase=0,sc=0,cuts=[];mg('🍑 Lepárlás','Az eleje mérgező, a vége büdös! Kattints, amikor ZÖLD lesz (közép eleje), majd amikor újra SÁRGA (vége).',s=>{const{cx,t}=s;const p=t/12;const col=p<.3?'#ef4444':p<.75?'#22c55e':p<1?'#eab308':'#78350f';cx.fillStyle=col;cx.fillRect(100,60,400,160);txt(cx,p<.3?'ELŐPÁRLAT – ne!':p<.75?'KÖZÉPPÁRLAT – arany!':p<1?'UTÓPÁRLAT':'kész',300,150,26);
 cx.fillStyle='#fff';cx.fillRect(100+p*400,230,4,30);s.cv.onclick=()=>{cuts.push(p);if(cuts.length===2){const a=Math.abs(cuts[0]-.3),b=Math.abs(cuts[1]-.75);s.fin(1-(a+b)*2.5)}};if(p>1.05)s.fin(cuts.length?.2:0)},cb)};
// 10 erjesztés – buborékok pukkasztása
MG.ferment=cb=>{let B=[],pop=0,lost=0;mg('🫧 Erjesztés','Pukkaszd ki a buborékokat, mielőtt kifut a cefre! (12 mp)',s=>{const{cx,t}=s;if(Math.random()<.09)B.push({x:RN(40,560),y:320,r:RN(10,22)});B.forEach(b=>b.y-=1.8);B=B.filter(b=>{if(b.y<30){lost++;return false}return true});B.forEach(b=>{cx.strokeStyle='#fde68a';cx.lineWidth=3;cx.beginPath();cx.arc(b.x,b.y,b.r,0,7);cx.stroke()});
 txt(cx,'Pukk: '+pop+' · Kifutott: '+lost,300,24);s.cv.onclick=e=>{const[x,y]=s.pos(e);const i=B.findIndex(b=>Math.hypot(b.x-x,b.y-y)<b.r+4);if(i>=0){B.splice(i,1);pop++}};if(t>12)s.fin(pop/(pop+lost*1.5+1))},cb)};
// 11 pályázat – gépelés
MG.type=cb=>{const W=['tanulmány','fejlesztés','konzorcium','fenntartható','innováció','közbeszerzés','tanácsadás','felzárkóztatás','kapacitásbővítés','stratégia'];let cur=pick(W),typed='',ok=0,err=0;mg('⌨️ Pályázatírás','Gépeld be a szavakat! (20 mp)',s=>{const{cx,t}=s;txt(cx,cur,300,130,36,'#a78bfa');txt(cx,typed+'_',300,190,30);txt(cx,'Kész: '+ok+' · Hiba: '+err+' · '+Math.max(0,20-t).toFixed(0)+' mp',300,280,16);
 mgKey=k=>{if(k==='backspace'){typed=typed.slice(0,-1);return}if(k.length!==1)return;typed+=k;if(!cur.startsWith(typed)){err++;typed=''}else if(typed===cur){ok++;typed='';cur=pick(W)}};if(t>20)s.fin(ok/6)},cb)};
// 12 pecsételés
MG.stamp=cb=>{let docs=[],ok=0,bad=0;mg('🔏 Pecsételés','Csak a ZÖLD papírokat pecsételd le! (12 mp)',s=>{const{cx,t}=s;if(Math.random()<.05)docs.push({x:-60,y:RN(60,260),g:Math.random()<.6,dn:false});docs.forEach(d=>d.x+=3.5);docs=docs.filter(d=>d.x<660);
 docs.forEach(d=>{cx.fillStyle=d.g?'#bbf7d0':'#fecaca';cx.fillRect(d.x-30,d.y-38,60,76);if(d.dn){cx.fillStyle='#b91c1c';cx.beginPath();cx.arc(d.x,d.y,16,0,7);cx.fill()}});txt(cx,'✔ '+ok+'  ✖ '+bad,300,26);
 s.cv.onclick=e=>{const[x,y]=s.pos(e);const d=docs.find(d=>!d.dn&&Math.abs(d.x-x)<32&&Math.abs(d.y-y)<40);if(d){d.dn=true;d.g?ok++:bad++}};if(t>12)s.fin(ok/(ok+bad*2+3))},cb)};
// 13 strómann párosítás (memória kártya)
MG.match=cb=>{const F=['🧔','👵','👨‍🌾','🧑‍🍳','👷','🧙'];const cards=[...F,...F].sort(()=>Math.random()-.5).map(f=>({f,up:false,ok:false}));let sel=[],tries=0;mg('🃏 Strómann-párosítás','Párosítsd a strómannokat a cégekhez! (6 pár)',s=>{const{cx,t}=s;cards.forEach((c,i)=>{const x=60+(i%6)*85,y=60+Math.floor(i/6)*110;cx.fillStyle=c.ok?'#166534':c.up?'#334155':'#7c3aed';cx.fillRect(x,y,70,90);if(c.up||c.ok){cx.font='36px system-ui';cx.textAlign='center';cx.fillText(c.f,x+35,y+58)}});txt(cx,'Próbák: '+tries,300,300,16);
 s.cv.onclick=e=>{if(sel.length>=2)return;const[x,y]=s.pos(e);const i=cards.findIndex((c,i)=>{const cx2=60+(i%6)*85,cy=60+Math.floor(i/6)*110;return x>cx2&&x<cx2+70&&y>cy&&y<cy+90});if(i<0||cards[i].up||cards[i].ok)return;cards[i].up=true;sel.push(i);
  if(sel.length===2){tries++;setTimeout(()=>{const[a,b]=sel;if(cards[a].f===cards[b].f){cards[a].ok=cards[b].ok=true}cards[a].up=cards[b].up=false;sel=[];if(cards.every(c=>c.ok))s.fin(cl(1-(tries-6)*.08,0,1))},500)}};if(t>45)s.fin(cards.filter(c=>c.ok).length/12)},cb)};
// 14 rejtekhely – elrejtés razzia előtt
MG.hide=cb=>{const spots=Array.from({length:9},(_,i)=>({i,stash:false}));let left=4,flash=0,raid=false,found=0;mg('🕵️ Razzia!','Rejtsd el a 4 csomagot! Kattints a helyekre – a rendőr a VILLOGÓ helyeket nézi meg.',s=>{const{cx,t}=s;flash=Math.floor(t*2)%9;spots.forEach((p,j)=>{const x=110+(j%3)*140,y=40+Math.floor(j/3)*95;cx.fillStyle=raid&&p.stash&&p.f?'#ef4444':p.stash?'#a16207':'#334155';cx.fillRect(x,y,120,80);cx.font='30px system-ui';cx.textAlign='center';cx.fillText(['🛋️','🪴','🧺','🛏️','🚽','📦','🗄️','🖼️','🧸'][j],x+60,y+52);if(!raid&&j===flash&&t>1){cx.strokeStyle='#facc15';cx.lineWidth=4;cx.strokeRect(x,y,120,80)}});
 txt(cx,raid?'Talált: '+found:'Hátra: '+left,300,315,16);s.cv.onclick=e=>{if(raid||left<=0)return;const[x,y]=s.pos(e);const j=spots.findIndex((p,j)=>{const sx=110+(j%3)*140,sy=40+Math.floor(j/3)*95;return x>sx&&x<sx+120&&y>sy&&y<sy+80});if(j<0||spots[j].stash)return;spots[j].stash=true;spots[j].hot=j===flash;left--;
  if(left<=0){raid=true;spots.forEach(p=>{if(p.stash&&(p.hot||Math.random()<.2)){p.f=true;found++}});setTimeout(()=>s.fin(1-found/4),1200)}}},cb)};

// ===================== JÁTÉKMENET =====================
function useEnergy(n){if(D.en<n){toast('😴 Nincs elég energiád – aludj vagy igyál kávét!');return false}D.en-=n;return true}
function toast(t){const el=$$('dpto');if(el){el.textContent=t;el.style.opacity=1;clearTimeout(el._t);el._t=setTimeout(()=>el.style.opacity=0,2600)}}
function heat(n){D.heat=cl(D.heat+n,0,100);if(D.heat>=100)bust()}
function bust(){D.stats.bust++;const lost=Math.round(D.cash*.4);D.cash-=lost;Object.keys(D.inv).forEach(k=>{if(ITM[k]&&ITM[k].t==='pr')delete D.inv[k]});D.heat=40;log('🚨 RAZZIA! Elvitték a termékeidet és '+f$(lost)+'-t.');toast('🚨 RAZZIA! Szigorú Szilárd lecsapott!')}
const MGSET={lab:['heat','stir','stop','simon','filter'],pal:['ferment','heat','cut','stop'],pal2:['type','stamp','match','stop']};
function cook(pid){const p=ITM[pid];if(!p.rec.every(r=>has(r))){toast('Hiányzó alapanyag!');return}const eqn=tierEq(p.br);if(eqn<1){toast('Nincs felszerelésed ehhez az ághoz!');return}if(!useEnergy(20))return;
 p.rec.forEach(r=>addI(r,-1));const games=MGSET[p.br].slice().sort(()=>Math.random()-.5).slice(0,has('gyors')?2:3);if(has('gyors'))addI('gyors',-1);let sc=[],i=0;
 const nx=()=>{if(i>=games.length){const avg=sc.reduce((a,b)=>a+b,0)/sc.length;let q=cl(avg*.75+eqn*.03+(D.purity||0)*.01+(has('katal')?.15:0)+(has('kesztyu')?.05:0),.05,1);if(has('katal'))addI('katal',-1);
   const n=1+Math.floor(eqn/3)+(D.own.garazs&&p.br==='lab'?1:0)+(D.own.pince&&p.br==='pal'?1:0);D.inv[pid+'_q']=Math.max(D.inv[pid+'_q']||0,Math.round(q*100));addI(pid,n);D.xp+=Math.round(q*30);D.stats.cook++;heat(p.br==='lab'?6:p.br==='pal'?3:4);
   log((CH[p.br==='lab'?'ferko':p.br==='pal'?'pista':'tibi'].e)+' Elkészült: '+n+'× '+p.e+' '+p.n+' ('+Math.round(q*100)+'% minőség)');toast('✅ '+n+'× '+p.n+' – '+Math.round(q*100)+'%');lvlUp(p.br);save();draw();return}
  const g=games[i++];MG[g](s=>{sc.push(s);nx()})};nx()}
function lvlUp(b){const need=brLv(b)*120;if(D.xp>=need&&brLv(b)<10){D.xp-=need;D.lvl[b]++;toast('⭐ '+({lab:'Labor',pal:'Főzde',pal2:'Pályázatfőzde'})[b]+' szint: '+D.lvl[b])}}
function sell(di,pid){const d=DIS[di],p=ITM[pid];if(!has(pid)){toast('Nincs ilyen termékem.');return}if(!useEnergy(D.own.robogo?8:12))return;
 const q=(D.inv[pid+'_q']||50)/100;const base=p.p*d[2]*(.6+q*.8)*(1+D.rep/300)*(has('dzseki')?1.05:1);
 MG.haggle(base,s=>{if(s<=0){toast('🙅 A vevő otthagyott.');heat(2);save();draw();return}let n=Math.min(D.inv[pid],1+(D.own.furgon?2:0)+Math.floor(D.rep/40));let price=Math.round(base*(0.6+s*1.4)*(has('szerencse')?1.1:1));if(has('szerencse'))addI('szerencse',-1);
  addI(pid,-n);D.cash+=price*n;D.stats.sold+=n;D.stats.earned+=price*n;D.rep+=1;heat(p.br==='pal2'?2:p.br==='pal'?3:d[3]/8);log('💸 Eladtál '+n+'× '+p.n+' – '+d[0]+': '+f$(price*n));
  if(Math.random()<D.heat/180){toast('🚓 Rendőr a nyomodban!');MG.chase(c=>{if(c<.4)bust();else{heat(-10);toast('😎 Leráztad őket!')}save();draw()})}else{save();draw()}})}
function party(){if(!useEnergy(25))return;MG.dance(s=>{const g=Math.round(s*20*(D.own.klub?1.5:1)+(has('vip')?25:0));if(has('vip'))addI('vip',-1);D.rep+=g;D.stats.party++;D.cust+=Math.round(s*10);log('🕺 Afterparti Bulis Benővel: +'+g+' hírnév');toast('🕺 +'+g+' hírnév');save();draw()})}
function sleep(){D.day++;D.en=100;let msg=[];D.heat=cl(D.heat-8-(D.own.lakokocsi?10:0)-(D.own.heli?20:0),0,100);if(D.own.bolt){D.cash+=800;msg.push('pálinkabolt +800')}if(D.own.villa){D.rep+=3}
 const ev=Math.random();if(ev<.12){msg.push('🚨 Váratlan razzia!');MG.hide(s=>{if(s<.5)bust();else{toast('😅 Nem találtak semmit!');heat(-15)}save();draw()})}else if(ev<.22){const f=pick(['kcuk','lpor','barack','strom']);addI(f,3);msg.push('🎁 Csaba hozott 3× '+ITM[f].n)}else if(ev<.3){D.cash=Math.round(D.cash*.95);msg.push('💀 Rivális banda: -5% pénz')}
 log('🌅 '+D.day+'. nap. '+(msg.join(' · ')||'Csendes éjszaka.'));save();draw()}
function buy(id,n){const x=ITM[id];const cost=x.p*(n||1);if(D.cash<cost){toast('Nincs elég ₷!');return}if(x.t==='eq'&&x.lv>brLv(x.br)+1){toast('Ehhez magasabb ágszint kell ('+(x.lv-1)+'+)');return}D.cash-=cost;if(x.t==='pp')D.own[id]=1;addI(id,n||1);log('🛒 Vettél: '+(n||1)+'× '+x.e+' '+x.n);save();draw()}
function useBoost(id){const x=ITM[id];if(!has(id))return;addI(id,-1);const d=x.d;if(/energia/.test(d))D.en=cl(D.en+parseInt(d.match(/\d+/)[0]),0,150);if(/-(\d+) hő/.test(d))heat(-parseInt(d.match(/-(\d+) hő/)[1]));if(/\+(\d+) hírnév/.test(d))D.rep+=parseInt(d.match(/\+(\d+) hírnév/)[1]);if(/vevő/.test(d))D.cust+=10;if(id==='bonusz')D.purity=(D.purity||0)+3;toast(x.e+' '+x.n+' használva');save();draw()}
function cashOut(){const ft=Math.floor(D.cash*.1);if(ft<100){toast('Legalább 1000 ₷ kell a pénzmosáshoz.');return}if(!confirm('Pénzmosás: '+f$(D.cash)+' → '+ft.toLocaleString('hu-HU')+' Ft a fő játékba (10%). Mehet?'))return;try{S.c+=ft;save2()}catch(e){}D.cash=0;log('🧺 Pénzmosás: +'+ft+' Ft a fő játékba');saveAll2();draw()}
const save2=()=>{try{window.save&&window.save()}catch(e){}};const saveAll2=()=>{save();save2()};

// ===================== RAJZOLÁS =====================
const say=k=>{const c=CH[k];return'<div class="say">'+c.e+' <b>'+c.n+'</b> <i style="opacity:.6">('+c.r+')</i>: „'+pick(c.l)+'”</div>'};
const bar=(v,c)=>'<div class="bar"><i style="width:'+cl(v,0,100)+'%;background:'+c+'"></i></div>';
function draw(){if(root.style.display==='none')return;const tabs=[['home','🏠 Főhadiszállás'],['lab','🧪 Labor'],['pal','🍑 Pálinkafőzde'],['pal2','📄 Pályázatfőzde'],['deal','💸 Dílerkedés'],['party','🕺 Afterparti'],['shop','🛒 Bolt'],['inv','🎒 Raktár'],['log','📜 Napló']];
 root.innerHTML='<header><h1>🕶️ SÖTÉT PROGRAM</h1><div class="st"><span>📅 '+D.day+'. nap</span><span>💰 '+f$(D.cash)+'</span><span>⚡ '+Math.round(D.en)+'</span><span>🔥 Hő '+Math.round(D.heat)+'%</span><span>⭐ Hírnév '+D.rep+'</span><span>🧪'+brLv('lab')+' 🍑'+brLv('pal')+' 📄'+brLv('pal2')+' · XP '+D.xp+'</span></div><button class="bt" id="dpsl">🌙 Alvás (új nap)</button><button class="bt x" id="dpx">⬅ Vissza a lobbyba</button></header>'+
 '<nav>'+tabs.map(t=>'<button data-t="'+t[0]+'" class="'+(TAB===t[0]?'on':'')+'">'+t[1]+'</button>').join('')+'</nav><main id="dpmain"></main><div id="dpto" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#7c3aed;padding:10px 16px;border-radius:10px;font-weight:700;opacity:0;transition:opacity .4s;pointer-events:none"></div>';
 root.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;draw()});$$('dpx').onclick=close;$$('dpsl').onclick=sleep;const M=$$('dpmain');
 if(TAB==='home'){M.innerHTML=say('csaba')+'<div class="g"><div class="c"><b>🔥 Rendőri hő</b>'+bar(D.heat,'#ef4444')+'<small>100%-nál razzia! Csökken: alvás, alibi, ügyvéd.</small></div><div class="c"><b>⚡ Energia</b>'+bar(D.en,'#22c55e')+'<small>Főzés 20, eladás 12, buli 25.</small></div><div class="c"><b>📊 Statisztika</b><br>Főzés: '+D.stats.cook+'<br>Eladott: '+D.stats.sold+'<br>Bevétel: '+f$(D.stats.earned)+'<br>Razzia: '+D.stats.bust+'<br>Buli: '+D.stats.party+'</div><div class="c"><b>🧺 Pénzmosás</b><br>Az ₷ 10%-a Ft-ként átmegy a fő játékba.<br><button class="bt" id="dpco">Pénzmosás</button></div><div class="c"><b>🏁 Cél</b><br>Vedd meg a 🏝️ Saját szigetet (200 000 ₷), és légy az Árnyékkirály!'+(D.own.sziget?'<br>👑 <b>TELJESÍTVE!</b>':'')+'</div><div class="c"><b>♻️ Új játék</b><br><button class="bt" id="dprs">Mentés törlése</button></div></div><h3>Szereplők</h3><div class="g">'+Object.values(CH).map(c=>'<div class="c">'+c.e+' <b>'+c.n+'</b><br><i>'+c.r+'</i></div>').join('')+'</div><p style="opacity:.5;font-size:11px">Minden szereplő, anyag és cég kitalált. Az anyagok rajzfilmesek, valódi recept nincs a játékban.</p>';
  $$('dpco').onclick=cashOut;$$('dprs').onclick=()=>{if(confirm('Biztosan új játékot kezdesz?')){D=NEW();save();draw()}}}
 if(['lab','pal','pal2'].includes(TAB)){const who=TAB==='lab'?'ferko':TAB==='pal'?'pista':'tibi';const ps=IT.filter(x=>x.t==='pr'&&x.br===TAB);const eq=IT.filter(x=>x.t==='eq'&&x.br===TAB);
  M.innerHTML=say(who)+'<div class="c" style="margin-bottom:8px"><b>Felszerelés</b> (erő: '+tierEq(TAB)+'): '+eq.map(x=>'<span style="opacity:'+(has(x.id)?1:.25)+'" title="'+x.n+'">'+x.e+'</span>').join(' ')+'<br><small>Minden főzés 2–3 minijáték: '+MGSET[TAB].map(g=>({heat:'🌡️hőfok',stir:'🥄kever',stop:'⏱️adagol',simon:'🧠memória',filter:'💧szűrés',ferment:'🫧erjesztés',cut:'🍑lepárlás',type:'⌨️gépelés',stamp:'🔏pecsét',match:'🃏strómann'})[g]).join(', ')+'</small></div><div class="g">'+
  ps.map(p=>{const ok=p.rec.every(r=>has(r));return'<div class="c"><div style="font-size:26px">'+p.e+'</div><b>'+p.n+'</b><br>Alapár: '+f$(p.p)+'<br>Recept: '+p.rec.map(r=>'<span style="color:'+(has(r)?'#86efac':'#fca5a5')+'">'+ITM[r].e+ITM[r].n+'</span>').join(' + ')+'<br>Raktáron: '+(D.inv[p.id]||0)+(D.inv[p.id+'_q']?' ('+D.inv[p.id+'_q']+'%)':'')+'<br><button class="bt" data-c="'+p.id+'" '+(ok?'':'disabled')+'>🔥 Főzés</button></div>'}).join('')+'</div>';
  M.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>cook(b.dataset.c))}
 if(TAB==='deal'){const ps=IT.filter(x=>x.t==='pr'&&has(x.id));M.innerHTML=say('csaba')+'<div class="g">'+DIS.map((d,i)=>'<div class="c"><div style="font-size:26px">'+d[1]+'</div><b>'+d[0]+'</b><br>Árszorzó: ×'+d[2]+' · Kockázat: '+d[3]+'%<br>'+(ps.length?'<select data-s="'+i+'" style="width:100%;margin:4px 0;background:#0f172a;color:#fff">'+ps.map(p=>'<option value="'+p.id+'">'+p.e+' '+p.n+' ('+D.inv[p.id]+')</option>').join('')+'</select><button class="bt" data-d="'+i+'">🤝 Eladás</button>':'<i>Nincs eladható terméked.</i>')+'</div>').join('')+'</div>';
  M.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const s=M.querySelector('[data-s="'+b.dataset.d+'"]');sell(+b.dataset.d,s.value)})}
 if(TAB==='party'){M.innerHTML=say('beno')+'<div class="g"><div class="c"><b>🕺 Afterparti</b><br>Ritmusjáték, hírnevet ad. Magasabb hírnév → több vevő, jobb ár.<br><button class="bt" id="dppa">Bulizzunk!</button></div><div class="c"><b>🎤 Karaoke-párbaj</b><br>Gépelj gyorsabban, mint Benő!<br><button class="bt" id="dpka">Párbaj</button></div><div class="c"><b>🎲 Kockapóker a sarokban</b><br>Tét: 200 ₷ – dupla vagy semmi.<br><button class="bt" id="dpdi">Dobás</button></div></div>';
  $$('dppa').onclick=party;$$('dpka').onclick=()=>{if(!useEnergy(10))return;MG.type(s=>{const g=Math.round(s*15);D.rep+=g;toast('🎤 +'+g+' hírnév');save();draw()})};$$('dpdi').onclick=()=>{if(D.cash<200){toast('Nincs 200 ₷-od');return}const a=RI(1,6)+RI(1,6),b=RI(1,6)+RI(1,6);if(a>b){D.cash+=200;toast('🎲 '+a+' vs '+b+' – nyertél 200 ₷!')}else{D.cash-=200;toast('🎲 '+a+' vs '+b+' – vesztettél.')}save();draw()}}
 if(TAB==='shop'){const cats=[['ing','🧂 Alapanyagok'],['eq','🔧 Felszerelés'],['bo','⚡ Boostok'],['pp','🏠 Ingatlan & jármű'],['co','💎 Gyűjthető']];M.innerHTML=say('csaba')+cats.map(([t,n])=>'<h3>'+n+'</h3><div class="g">'+IT.filter(x=>x.t===t).map(x=>'<div class="c">'+x.e+' <b>'+x.n+'</b><br>'+f$(x.p)+(x.lv?' · '+x.lv+'. szint':'')+(x.d?'<br><small>'+x.d+'</small>':'')+'<br>Van: '+(D.inv[x.id]||0)+'<br><button class="bt" data-b="'+x.id+'" '+(t==='pp'&&D.own[x.id]?'disabled':'')+'>Vétel</button>'+(t==='ing'?'<button class="bt" data-b5="'+x.id+'">×5</button>':'')+'</div>').join('')+'</div>').join('')+'<p style="opacity:.6">Összesen '+IT.length+' tárgy – csak a Sötét Programban használhatók.</p>';
  M.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>buy(b.dataset.b,1));M.querySelectorAll('[data-b5]').forEach(b=>b.onclick=()=>buy(b.dataset.b5,5))}
 if(TAB==='inv'){const ks=Object.keys(D.inv).filter(k=>ITM[k]);M.innerHTML='<div class="g">'+(ks.map(k=>{const x=ITM[k];return'<div class="c">'+x.e+' <b>'+x.n+'</b> ×'+D.inv[k]+'<br><small>'+({ing:'alapanyag',eq:'felszerelés',pr:'termék',bo:'boost',pp:'ingatlan',co:'gyűjthető'})[x.t]+(x.d?' – '+x.d:'')+'</small>'+(x.t==='bo'?'<br><button class="bt" data-u="'+k+'">Használat</button>':'')+'</div>'}).join('')||'<div class="c">Üres a raktár.</div>')+'</div><p>Gyűjthetők: '+IT.filter(x=>x.t==='co'&&has(x.id)).length+'/15</p>';
  M.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>useBoost(b.dataset.u))}
 if(TAB==='log'){M.innerHTML='<div class="c">'+(D.log.map(l=>'<div>'+l+'</div>').join('')||'Még üres.')+'</div>'}}

// ===================== BELÉPÉS A LOBBYBÓL =====================
function dock(){const d=$$('soDock');if(!d||$$('dpBtn'))return!!d;const b=document.createElement('button');b.id='dpBtn';b.textContent='🕶️ SÖTÉT PROGRAM';b.style.background='linear-gradient(90deg,#4c1d95,#be185d)';b.onclick=open;d.insertBefore(b,d.firstChild);return true}
const di=setInterval(()=>{if(dock())clearInterval(di)},800);
window._dp=()=>({D,IT,MG});
})();
