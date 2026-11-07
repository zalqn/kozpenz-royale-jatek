// sotet3d.js – 🚐 a Sötét Program 3D lakókocsija: külön játékmód (GAME_MODE='sotet'), saját renderer, fotótextúrák (tex_opt),
// belső nézet: WASD + egér, E = interakció az állomásokkal (labor, üst, íróasztal, hűtő-bolt, szekrény-raktár, hangfal-buli, ajtó-dílerkedés, ágy, tábla)
(()=>{
const $$=i=>document.getElementById(i);
let R=null,SC,CAM,ON=false,raf=0,yaw=Math.PI,pit=0,px=0,pz=1.5,K={},ST=[],near=null,last=0,T0=0,clock=0,NPC=[],DISCO=null,PAUSE=false;
window.sp3On=()=>ON;window.sp3Resume=()=>{PAUSE=false;try{((r)=>{r&&r.catch&&r.catch(()=>{})})(R.domElement.requestPointerLock())}catch(e){}};
const PL=(typeof _PL!=="undefined"?_PL:THREE.PointLight);const TL=new THREE.TextureLoader();const TC={};
function tex(n,rx,ry,col,o){const k=n+rx+ry+col;if(TC[k])return TC[k].clone();const m=TL.load('tex_opt/'+n+'_diff.jpg');m.wrapS=m.wrapT=THREE.RepeatWrapping;m.repeat.set(rx||1,ry||1);let nm=null;try{nm=TL.load('tex_opt/'+n+'_nor.jpg');nm.wrapS=nm.wrapT=THREE.RepeatWrapping;nm.repeat.set(rx||1,ry||1)}catch(e){}
 const M=new THREE.MeshStandardMaterial(Object.assign({map:m,normalMap:nm,color:col||0xffffff,roughness:.75},o||{}));TC[k]=M;return M}
const box=(w,h,d,m,x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.castShadow=b.receiveShadow=true;SC.add(b);return b};
const cyl=(rt,rb,h,m,x,y,z,s)=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s||16),m);c.position.set(x,y,z);c.castShadow=true;SC.add(c);return c};
function sprite(t,col){const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');x.fillStyle='rgba(15,23,42,.85)';x.beginPath();x.roundRect?x.roundRect(0,0,512,96,24):x.rect(0,0,512,96);x.fill();x.fillStyle=col||'#fde047';x.font='bold 40px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(t,256,50);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.scale.set(1.6,.3,1);s.renderOrder=9;return s}
// lakókocsi belső: x -5.5..5.5, z -2.2..2.2, magasság 2.6
const BX=5.3,BZ=2.0;
function build(){SC=new THREE.Scene();SC.background=new THREE.Color(0x0b1026);SC.fog=new THREE.Fog(0x0b1026,14,40);
 CAM=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.05,100);
 SC.add(new THREE.HemisphereLight(0xc7d2fe,0x3b2a1a,.55));
 const L1=new PL(0xffd59a,1.1,9);L1.position.set(-2.5,2.3,0);L1.castShadow=true;SC.add(L1);const L2=new PL(0xffd59a,.9,9);L2.position.set(2.6,2.3,0);SC.add(L2);
 const L3=new PL(0x22d3ee,.9,5);L3.position.set(-4.2,1.6,-1.4);SC.add(L3);
 // padló, plafon, falak
 box(11.2,.1,4.6,tex('wood',4,2,0xd6b38a),0,-.05,0);box(11.2,.1,4.6,tex('plaster',4,2,0xf1f5f9),0,2.65,0);
 const wall=tex('painted',4,1,0xe2e8f0);box(11.2,2.7,.1,wall,0,1.3,-2.3);box(11.2,2.7,.1,wall,0,1.3,2.3);box(.1,2.7,4.6,wall,-5.6,1.3,0);box(.1,2.7,4.6,wall,5.6,1.3,0);
 // alsó faburkolat
 const lam=tex('darkwood',4,1,0x8b5a2b);box(11.1,.8,.06,lam,0,.4,-2.24);box(11.1,.8,.06,lam,0,.4,2.24);
 // ablakok (éjszakai város) + függöny
 const win=new THREE.MeshBasicMaterial({color:0x1e3a8a});[-3,0,3].forEach(x=>{const w=box(1.4,.8,.04,win,x,1.65,-2.24);const c=document.createElement('canvas');c.width=128;c.height=64;const g=c.getContext('2d');g.fillStyle='#0b1a3d';g.fillRect(0,0,128,64);for(let i=0;i<40;i++){g.fillStyle=Math.random()<.5?'#fde68a':'#93c5fd';g.fillRect(Math.random()*128,20+Math.random()*44,3,4)}g.fillStyle='#f8fafc';g.beginPath();g.arc(100,14,7,0,7);g.fill();w.material=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)});box(.35,.95,.05,tex('fleece',1,1,0x7c3aed),x-.85,1.65,-2.2);box(.35,.95,.05,tex('fleece',1,1,0x7c3aed),x+.85,1.65,-2.2)});
 // szőnyeg
 box(3,.02,1.6,tex('carpet',2,1,0xb91c1c),0,.01,.2);
 // ===== ÁLLOMÁSOK =====
 const S=(id,x,z,label,col,tab,who,act)=>{const sp=sprite(label,col);sp.position.set(x,2.05,z);SC.add(sp);ST.push({id,x,z,label,tab,who,act,sp})};
 // 1 LABOR (bal hátsó sarok) – Ferkó
 box(2.4,.08,.9,tex('tile',2,1,0xe5e7eb,{roughness:.3}),-4.1,.95,-1.7);box(2.4,.9,.85,tex('metal',2,1,0x94a3b8,{metalness:.7,roughness:.35}),-4.1,.46,-1.7);
 const glass=c=>new THREE.MeshPhysicalMaterial({color:c,transparent:true,opacity:.55,roughness:.05,metalness:0,emissive:c,emissiveIntensity:.35});
 [[-4.9,0x22d3ee],[-4.5,0xa855f7],[-4.1,0x84cc16],[-3.6,0xf472b6]].forEach(([x,c],i)=>{const f=new THREE.Mesh(i%2?new THREE.SphereGeometry(.14,16,12):new THREE.ConeGeometry(.14,.32,16),glass(c));f.position.set(x,1.14,-1.75);SC.add(f);cyl(.03,.03,.2,glass(0xffffff),x,1.35,-1.75,8)});
 cyl(.1,.12,.12,tex('metal',1,1,0x334155,{metalness:.8}),-3.2,1.05,-1.6);const flame=new THREE.Mesh(new THREE.ConeGeometry(.05,.18,10),new THREE.MeshBasicMaterial({color:0x60a5fa}));flame.position.set(-3.2,1.2,-1.6);SC.add(flame);ST._flame=flame;
 S('lab',-4.1,-1.2,'🧪 LABOR [E]','#67e8f9','lab','ferko');
 // 2 PÁLINKAFŐZDE (bal elöl) – Pista: rézüst + hordó
 const copper=new THREE.MeshStandardMaterial({color:0xb87333,metalness:.9,roughness:.28});cyl(.42,.5,.9,copper,-4.6,.45,1.5);const dome=new THREE.Mesh(new THREE.SphereGeometry(.42,20,12,0,6.3,0,1.6),copper);dome.position.set(-4.6,.9,1.5);SC.add(dome);
 const pipe=cyl(.04,.04,1.1,copper,-4.1,1.15,1.5,8);pipe.rotation.z=Math.PI/2.6;cyl(.3,.3,.75,tex('darkwood',1,1,0x7c4a26),-3.4,.38,1.7);
 [-3.0,-2.8,-2.6].forEach(x=>{const b=cyl(.06,.07,.3,glass(0xfbbf24),x,.97,1.95,10)});box(1,.06,.5,tex('wood',1,1),-2.8,.8,1.95);
 S('pal',-4.0,1.1,'🍑 PÁLINKAFŐZDE [E]','#fdba74','pal','pista');
 // 3 PÁLYÁZATFŐZDE (jobb hátul) – Tibi: íróasztal, laptop, papírhalmok
 box(1.8,.06,.8,tex('darkwood',1,1,0x5b3a1e),3.4,.78,-1.8);[[2.7,-1.8],[4.1,-1.8]].forEach(([x,z])=>box(.08,.75,.7,tex('metal',1,1,0x334155),x,.38,z));
 const lap=box(.5,.03,.35,new THREE.MeshStandardMaterial({color:0x1f2937,metalness:.6}),3.3,.82,-1.8);const scr=box(.5,.32,.02,new THREE.MeshBasicMaterial({color:0x38bdf8}),3.3,.98,-1.97);
 for(let i=0;i<6;i++)box(.3,.03,.4,new THREE.MeshStandardMaterial({color:i%2?0xf8fafc:0xfef9c3}),3.95,.83+i*.035,-1.75);box(.5,.5,.5,tex('leather',1,1,0x111827),3.4,.3,-1.1);
 S('pal2',3.4,-1.3,'📄 PÁLYÁZATFŐZDE [E]','#c4b5fd','pal2','tibi');
 // 4 HŰTŐ = BOLT (jobb elöl)
 box(.8,1.9,.7,tex('metal',1,2,0xe5e7eb,{metalness:.5,roughness:.3}),5.05,.95,1.75);box(.04,.6,.04,new THREE.MeshStandardMaterial({color:0x111827}),4.62,1.3,1.5);
 S('shop',4.9,1.2,'🛒 BOLT (Csaba hűtője) [E]','#86efac','shop','csaba');
 // 5 SZEKRÉNY = RAKTÁR
 box(1.1,2.2,.6,tex('fa3',1,2,0xa16207),1.6,1.1,-1.95);box(.03,.3,.03,new THREE.MeshStandardMaterial({color:0xfacc15,metalness:1}),1.6,1.1,-1.63);
 S('inv',1.6,-1.4,'🎒 RAKTÁR [E]','#fde68a','inv');
 // 6 HANGFAL + DISZKÓGÖMB = BULI – Benő
 box(.55,1.1,.5,new THREE.MeshStandardMaterial({color:0x111827,roughness:.4}),-1.4,.55,1.95);[.75,.35].forEach(y=>{const sp=cyl(.17,.17,.05,new THREE.MeshStandardMaterial({color:0x374151}),-1.4,y,1.69,20);sp.rotation.x=Math.PI/2});
 DISCO=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),new THREE.MeshStandardMaterial({color:0xe5e7eb,metalness:.4,roughness:.2,emissive:0x6b21a8,emissiveIntensity:.5,flatShading:true}));DISCO.position.set(-.8,2.35,1);SC.add(DISCO);const dl=new PL(0xf472b6,.8,6);dl.position.set(-.8,2.1,1);SC.add(dl);window._sp3dl=dl;
 S('party',-1.1,1.4,'🕺 AFTERPARTI [E]','#f9a8d4','party','beno');
 // 7 AJTÓ = DÍLERKEDÉS
 const door=box(.08,2.1,1,tex('metal',1,2,0x64748b,{metalness:.6}),5.55,1.05,-.2);box(.05,.05,.2,new THREE.MeshStandardMaterial({color:0xfacc15,metalness:1}),5.5,1,.15);
 S('deal',5.0,-.2,'🚪 KI A VÁROSBA – DÍLERKEDÉS [E]','#fca5a5','deal','csaba');
 // 8 ÁGY = ALVÁS
 box(1.9,.45,1.2,tex('wool',2,1,0x1e3a8a),1.3,.23,1.6);box(.5,.15,.9,tex('fleece',1,1,0xf8fafc),.55,.52,1.6);
 S('sleep',1.3,1.0,'🛏️ ALVÁS – ÚJ NAP [E]','#93c5fd',null,null,()=>{try{document.getElementById('dpsl')}catch(e){}window.openSotetProgram('home');setTimeout(()=>{const b=$$('dpsl');b&&b.click()},50)});
 // 9 TÁBLA = FŐHADISZÁLLÁS + NAPLÓ
 const bc=document.createElement('canvas');bc.width=512;bc.height=256;const bg=bc.getContext('2d');bg.fillStyle='#14532d';bg.fillRect(0,0,512,256);bg.strokeStyle='#fff';bg.lineWidth=3;bg.font='bold 34px system-ui';bg.fillStyle='#fff';bg.fillText('A TERV:',20,50);bg.font='24px system-ui';['1. főzz 🧪🍑📄','2. adj el 💸','3. ne bukj le 👮','4. 🏝️ → 🚀'].forEach((t,i)=>bg.fillText(t,30,95+i*40));bg.beginPath();bg.moveTo(300,60);bg.lineTo(470,200);bg.moveTo(470,60);bg.lineTo(300,200);bg.stroke();
 const board=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.9),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(bc)}));board.position.set(-1.6,1.6,-2.23);SC.add(board);
 S('home',-1.6,-1.6,'📋 FŐHADISZÁLLÁS [E]','#fde047','home');
 // díszek: növény, lámpa, pizzásdoboz
 cyl(.18,.14,.3,tex('conc',1,1,0x9a3412),.2,.15,-1.9,12);const pl=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),new THREE.MeshStandardMaterial({color:0x15803d}));pl.position.set(.2,.55,-1.9);SC.add(pl);
 box(.45,.06,.45,tex('painted',1,1,0xd97706),-.3,.04,.9);
 // ===== NPC-k (a játék saját karaktermodelljével) =====
 const npc=(k,col,em,x,z,ry)=>{let m;try{m=person(col,em,1)}catch(e){m=new THREE.Mesh(new THREE.CapsuleGeometry?new THREE.CapsuleGeometry(.25,.9):new THREE.CylinderGeometry(.25,.25,1.4),new THREE.MeshStandardMaterial({color:col}))}m.scale.multiplyScalar(.38);m.position.set(x,0,z);m.rotation.y=ry;SC.add(m);NPC.push({k,m,x,z,ry})};
 npc('ferko',0xf8fafc,'👨‍🔬',-4.3,-.95,0);npc('pista',0x92400e,'🍑',-3.6,.95,Math.PI);npc('tibi',0x1e3a8a,'📎',3.4,-.75,0);npc('beno',0xdb2777,'🕺',-1.0,1.75,Math.PI*.8);npc('csaba',0x111827,'🕴️',4.4,.4,-Math.PI/2)}

function stepNear(){near=null;let bd=1.6;const fx=-Math.sin(yaw),fz=-Math.cos(yaw);ST.forEach(s=>{const dx=s.x-px,dz=s.z-pz,d=Math.hypot(dx,dz);const dot=(dx*fx+dz*fz)/(d||1);if(d<bd&&dot>.2){bd=d;near=s}});
 ST.forEach(s=>{s.sp.material.opacity=s===near?1:.55;s.sp.scale.set(s===near?1.3:1,s===near?.25:.19,1)});const pr=$$('sp3p');const h=near?'<b>[E]</b> '+near.label.replace(' [E]',''):'';if(pr._h!==h){pr._h=h;pr.innerHTML=h;pr.style.display=h?'block':'none'}}
function interact(){if(!near)return;PAUSE=true;try{document.exitPointerLock()}catch(e){}if(near.act){near.act();return}window.openSotetProgram(near.tab)}
function loop(t){if(!ON)return;raf=requestAnimationFrame(loop);const dt=Math.min(.05,(t-(last||t))/1000);last=t;clock+=dt;
 if(!PAUSE&&!(window.sotetPanelOpen&&sotetPanelOpen())&&!($$('dpmg')&&$$('dpmg').style.display==='flex')){const sp=(K.shift?3.6:2.2)*dt;let mx=0,mz=0;if(K.w||K.arrowup)mz-=1;if(K.s||K.arrowdown)mz+=1;if(K.a||K.arrowleft)mx-=1;if(K.d||K.arrowright)mx+=1;
  const c=Math.cos(yaw),s=Math.sin(yaw);px+=(mx*c+mz*s)*sp;pz+=(-mx*s+mz*c)*sp;NPC.forEach(n=>{const dx=px-n.x,dz=pz-n.z,d=Math.hypot(dx,dz);if(d<.45&&d>0){px=n.x+dx/d*.45;pz=n.z+dz/d*.45}});px=Math.max(-BX,Math.min(BX,px));pz=Math.max(-BZ+.25,Math.min(BZ-.25,pz))}
 const bob=(K.w||K.s||K.a||K.d)?Math.sin(clock*9)*.03:0;CAM.position.set(px,1.6+bob,pz);CAM.rotation.set(pit,yaw,0,'YXZ');
 if(DISCO){DISCO.rotation.y+=dt*1.5;if(window._sp3dl)_sp3dl.color.setHSL((clock*.2)%1,.8,.6)}if(ST._flame)ST._flame.scale.y=1+Math.sin(clock*20)*.15;
 NPC.forEach((n,i)=>{n.m.position.y=Math.abs(Math.sin(clock*2+i))*.02;const dx=px-n.x,dz=pz-n.z;if(Math.hypot(dx,dz)<2.4)n.m.rotation.y=Math.atan2(dx,dz);else n.m.rotation.y=n.ry+Math.sin(clock*.5+i)*.3;if(n.k==='beno')n.m.rotation.z=Math.sin(clock*6)*.08});
 stepNear();R.render(SC,CAM)}
function hud(){const D=window._dp&&_dp().D;if(!D)return;const h='📅 '+D.day+'. nap · 💰 '+Math.round(D.cash).toLocaleString('hu-HU')+' ₷ · ⚡ '+Math.round(D.en)+' · 🔥 '+Math.round(D.heat)+'% · ⭐ '+D.rep;const e=$$('sp3h');if(e&&e._h!==h){e._h=h;e.textContent=h}}
function openSotet3D(){if(ON)return;ON=true;const lb=$$('lb');if(lb)lb.classList.remove('on');
 let w=$$('sp3');if(!w){w=document.createElement('div');w.id='sp3';w.style.cssText='position:fixed;inset:0;z-index:9400;background:#000';
  w.innerHTML='<div id="sp3h" style="position:absolute;top:12px;left:50%;transform:translateX(-50%);color:#fff;font:700 15px system-ui;background:rgba(15,23,42,.8);padding:7px 14px;border-radius:10px;border:1px solid #7c3aed;z-index:2"></div>'+
  '<div style="position:absolute;top:10px;left:12px;color:#fff;font:900 20px system-ui;z-index:2;text-shadow:0 2px 6px #000">🕶️ SÖTÉT PROGRAM <span style="font-size:12px;opacity:.7">· lakókocsi</span></div>'+
  '<button id="sp3x" style="position:absolute;top:10px;right:12px;z-index:2;background:#ef4444;color:#fff;border:0;border-radius:9px;padding:8px 12px;font-weight:800;cursor:pointer">⬅ Vissza a lobbyba</button>'+
  '<div id="sp3p" style="position:absolute;bottom:90px;left:50%;transform:translateX(-50%);color:#fff;font:700 18px system-ui;background:rgba(124,58,237,.85);padding:9px 16px;border-radius:12px;display:none;z-index:2"></div>'+
  '<div style="position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;background:#fff;opacity:.8;z-index:2"></div>'+
  '<div id="sp3t" style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);color:#cbd5e1;font:600 13px system-ui;background:rgba(15,23,42,.7);padding:6px 12px;border-radius:9px;z-index:2">Kattints a nézelődéshez · WASD mozgás · SHIFT futás · E interakció · ESC egér elengedése</div>';
  document.body.appendChild(w);$$('sp3x').onclick=closeSotet3D}
 w.style.display='block';if(!R){R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));R.shadowMap.enabled=true;R.outputEncoding=THREE.sRGBEncoding;w.appendChild(R.domElement);R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%';build();
  R.domElement.addEventListener('click',()=>{if(!PAUSE)((r)=>{r&&r.catch&&r.catch(()=>{})})(R.domElement.requestPointerLock())});
  document.addEventListener('mousemove',e=>{if(!ON||document.pointerLockElement!==R.domElement)return;yaw-=e.movementX*.0025;pit=Math.max(-1.3,Math.min(1.3,pit-e.movementY*.0025))});
  addEventListener('resize',()=>{if(!R)return;R.setSize(innerWidth,innerHeight);CAM.aspect=innerWidth/innerHeight;CAM.updateProjectionMatrix()})}
 R.setSize(innerWidth,innerHeight);CAM.aspect=innerWidth/innerHeight;CAM.updateProjectionMatrix();px=1.5;pz=0;yaw=Math.PI/2;PAUSE=false;last=0;raf=requestAnimationFrame(loop);
 window._sp3hud=setInterval(hud,300);hud();setTimeout(()=>{const c=window._dp&&_dp().D;if(c&&c.day===1&&!c._intro){c._intro=1;try{say0()}catch(e){}}},600)}
function say0(){const t=$$('sp3t');if(!t)return;t.innerHTML='👨‍🔬 <b>Profi Ferkó:</b> „Üdv a lakókocsiban! Menj a laborhoz, és nyomj E-t. Pista az üstnél, Tibi az íróasztalnál, Csaba a hűtőnél és az ajtónál vár.”';setTimeout(()=>{t.innerHTML='Kattints a nézelődéshez · WASD mozgás · SHIFT futás · E interakció · ESC egér elengedése'},9000)}
function closeSotet3D(){ON=false;cancelAnimationFrame(raf);clearInterval(window._sp3hud);try{document.exitPointerLock()}catch(e){}const w=$$('sp3');if(w)w.style.display='none';const p=$$('dp');if(p)p.style.display='none';const lb=$$('lb');if(lb)lb.classList.add('on')}
window.openSotet3D=openSotet3D;window.closeSotet3D=closeSotet3D;
addEventListener('keydown',e=>{if(!ON)return;if(window.sotetPanelOpen&&sotetPanelOpen())return;if($$('dpmg')&&$$('dpmg').style.display==='flex')return;const k=e.key.toLowerCase();K[k]=true;e.stopImmediatePropagation();if(k==='e'&&!e.repeat)interact();if(k===' ')e.preventDefault()},true);
addEventListener('keyup',e=>{if(!ON)return;K[e.key.toLowerCase()]=false},true);
addEventListener('blur',()=>{K={}});
window._sp3tp=(x,z,y)=>{px=x;pz=z;yaw=y};window._sp3=()=>({px,pz,yaw,near:near&&near.id,ST:ST.map(s=>s.id)});
})();
