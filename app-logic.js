var S={mod:null,idx:-1,ans:{},flow:[],busy:false,mode:'full'};

document.addEventListener('DOMContentLoaded',function(){
  try{buildMG();}catch(e){console.error('buildMG',e);}
  try{buildFG();}catch(e){console.error('buildFG',e);}
  try{buildPDB();}catch(e){console.error('buildPDB',e);}
  try{initW();}catch(e){console.error('initW',e);}
  var pdbq=$('pdbq');
  if(pdbq) pdbq.addEventListener('input',filterP);
});

function buildMG(){
  var el=$('mod-grid');if(!el)return;
  var h='';
  for(var i=0;i<MODS.length;i++){
    var m=MODS[i];
    h+='<div class="mc" onclick="jumpMod(\''+m.id+'\')">'
      +'<span class="mc-e">'+m.e+'</span><div class="mc-ar">↗</div>'
      +'<h3>'+m.l+'</h3><p>'+m.s+'</p></div>';
  }
  el.innerHTML=h;
}
function jumpMod(id){
  G('#platform');
  setTimeout(function(){
    var c=document.querySelectorAll('#pbody .oc');
    var i=-1;
    for(var k=0;k<MODS.length;k++){if(MODS[k].id===id){i=k;break;}}
    if(c[i])c[i].click();
  },700);
}
function buildFG(){
  var el=$('feat-grid');if(!el)return;
  var h='';
  for(var i=0;i<FEATS.length;i++){
    var f=FEATS[i];
    h+='<div class="fc"><div class="fcn">'+f.n+'</div><h3>'+f.t+'</h3><p>'+f.d+'</p></div>';
  }
  el.innerHTML=h;
}

var pCat='All';
function buildPDB(){
  var cats=['All'];
  for(var i=0;i<PRODS.length;i++){
    if(cats.indexOf(PRODS[i].c)<0)cats.push(PRODS[i].c);
  }
  var el=$('pdb-cats');if(!el)return;
  var h='';
  for(var j=0;j<cats.length;j++){
    h+='<div class="pdbcat'+(cats[j]==='All'?' on':'')+'" onclick="setPCat(\''+esc(cats[j])+'\',this)">'+cats[j]+'</div>';
  }
  el.innerHTML=h;
  renderPDB();
}
function setPCat(c,el){
  pCat=c;
  var all=document.querySelectorAll('.pdbcat');
  for(var i=0;i<all.length;i++)all[i].classList.remove('on');
  el.classList.add('on');renderPDB();
}
function filterP(){renderPDB();}
function renderPDB(){
  var qEl=$('pdbq');
  var q=(qEl?qEl.value:'').toLowerCase();
  var items=[];
  for(var i=0;i<PRODS.length;i++){
    var p=PRODS[i];
    var mc=(pCat==='All'||p.c===pCat);
    var mq=(!q||p.n.toLowerCase().indexOf(q)>-1||p.d.toLowerCase().indexOf(q)>-1);
    if(mc&&mq)items.push(p);
  }
  var el=$('pdb-grid');if(!el)return;
  if(!items.length){el.innerHTML='<div style="padding:2rem;color:var(--tx3);text-align:center;grid-column:1/-1">No products found.</div>';return;}
  var h='';
  for(var k=0;k<items.length;k++){
    var p2=items[k];
    var sp='';
    for(var s=0;s<p2.sp.length;s++){sp+='<div class="pdbs">'+p2.sp[s].k+': <strong>'+p2.sp[s].v+'</strong></div>';}
    h+='<div class="pdbit"><div class="pdbtp"><div class="pdbnm">'+p2.e+' '+p2.n+'</div><div class="pdbct">'+p2.c+'</div></div>'
      +'<div class="pdbds">'+p2.d+'</div>'
      +'<div class="pdbsp">'+sp+(p2.rec?'<div class="pdbrc">⭐ '+p2.rec+'</div>':'')+'<div class="pdbor">🌍 '+p2.org+'</div></div></div>';
  }
  el.innerHTML=h;
}

function initW(){
  S={mod:null,idx:-1,ans:{},flow:[],busy:false,mode:'full'};
  setP(0);T('pslbl','');T('ptitle','ConcretIQ Consultation');
  T('fhint','Select a discipline to begin');T('sb-name','New Consultation');
  hide('btn-back');setBtn('btn-next','bnext','Continue →',true,nextS);
  renderModSel();
}
function resetW(){initW();}

function renderModSel(){
  var h='<div class="aib"><div class="aiav">CQ</div>'
    +'<div class="aibd"><div class="ailbl">ConcretIQ AI</div>'
    +'<div class="aitx">Welcome. I am your AI construction chemicals consultant.<br>'
    +'Before recommending any product or system, I gather all the technical intelligence a senior consultant would need.<br><br>'
    +'<strong>Which discipline do you need expertise in?</strong></div></div></div>'
    +'<div class="qblk"><div class="og">';
  for(var i=0;i<MODS.length;i++){
    var m=MODS[i];
    h+='<div class="oc" onclick="selMod(\''+m.id+'\',this)">'
      +'<div class="oc-e">'+m.e+'</div><div class="oc-l">'+m.l+'</div><div class="oc-s">'+m.s+'</div></div>';
  }
  h+='</div></div>';
  H('pbody',h);
}

function selMod(id,el){
  S.mod=id;
  var all=document.querySelectorAll('#pbody .oc');
  for(var i=0;i<all.length;i++)all[i].classList.remove('sel');
  el.classList.add('sel');
  var m=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===id){m=MODS[k];break;}}
  T('sb-name',m.l);T('fhint',m.l+' selected - click Continue');
  setBtn('btn-next','bnext','Continue →',false,nextS);
}

function startFlow(){
  S.flow=FLOWS[S.mod]||[];S.idx=0;S.ans={};
  show('btn-back');renderQ();
}

function nextS(){
  if(S.busy)return;
  if(S.mod===null)return;
  if(S.idx===-1){startFlow();return;}
  var step=S.flow[S.idx];
  if(!canGo(step)){toast('Please make a selection to continue.');return;}
  S.idx++;
  if(S.idx>=S.flow.length)showModeSelect();
  else renderQ();
}

function prevS(){
  if(S.busy)return;
  if(S.idx<=0){
    S.idx=-1;S.mod=null;S.ans={};S.flow=[];
    hide('btn-back');setP(0);
    T('fhint','Select a discipline to begin');
    T('ptitle','ConcretIQ Consultation');T('pslbl','');
    setBtn('btn-next','bnext','Continue →',true,nextS);
    renderModSel();return;
  }
  S.idx--;renderQ();
}

function canGo(step){
  if(!step)return false;
  if(step.type==='input'||step.type==='chips')return true;
  return !!S.ans[step.id];
}

function renderQ(){
  var step=S.flow[S.idx];if(!step)return;
  var total=S.flow.length,num=S.idx+1;
  setP((num/total)*100);
  T('pslbl','Q'+num+' / '+total);T('fhint','Question '+num+' of '+total);
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  T('ptitle',(mod?mod.l:'')+' - Q'+num);
  var ex=S.ans[step.id];
  var hasA=ex!==undefined&&ex!==''&&(!Array.isArray(ex)||ex.length>0);
  var opt=step.type==='input'||step.type==='chips';
  var h='<div class="aib"><div class="aiav">CQ</div>'
    +'<div class="aibd"><div class="ailbl">ConcretIQ AI - Q'+num+'/'+total+'</div>'
    +'<div class="aitx">'+step.q+'</div></div></div><div class="qblk">';
  if(step.type==='options'){
    h+='<div class="og">';
    for(var i=0;i<step.opts.length;i++){
      var o=step.opts[i];
      var s=ex===o.v?' sel':'';
      h+='<div class="oc'+s+'" onclick="ansOpt(\''+esc(step.id)+'\',\''+esc(o.v)+'\',this)">'
        +'<div class="oc-e">'+(o.e||'📋')+'</div><div class="oc-l">'+o.l+'</div>'+(o.d?'<div class="oc-s">'+o.d+'</div>':'')+'</div>';
    }
    h+='</div>';
  }else if(step.type==='radio'){
    h+='<div class="rl">';
    for(var j=0;j<step.opts.length;j++){
      var o2=step.opts[j];
      var s2=ex===o2.v?' sel':'';
      h+='<div class="ro'+s2+'" onclick="ansRadio(\''+esc(step.id)+'\',\''+esc(o2.v)+'\',this)">'
        +'<div class="rodot"></div><div><div class="rol">'+o2.l+'</div>'+(o2.d?'<div class="rod">'+o2.d+'</div>':'')+'</div></div>';
    }
    h+='</div>';
  }else if(step.type==='chips'){
    var sel=ex||[];
    h+='<div class="qhint">Select all that apply</div><div class="cg">';
    for(var x=0;x<step.opts.length;x++){
      var o3=step.opts[x];
      var s3=sel.indexOf(o3)>-1?' sel':'';
      h+='<div class="chip'+s3+'" onclick="ansChip(\''+esc(step.id)+'\',\''+esc(o3)+'\',this)">'+o3+'</div>';
    }
    h+='</div>';
  }else if(step.type==='input'){
    h+='<input class="sinp" type="'+(step.it||'text')+'" placeholder="'+(step.ph||'')+'" value="'+(ex||'')+'" oninput="ansInput(\''+esc(step.id)+'\',this.value)">';
  }
  h+='</div>';H('pbody',h);
  setBtn('btn-next','bnext','Continue →',!hasA&&!opt,nextS);
}

function ansOpt(id,val,el){
  S.ans[id]=val;
  var all=el.closest('.og').querySelectorAll('.oc');
  for(var i=0;i<all.length;i++)all[i].classList.remove('sel');
  el.classList.add('sel');setBtn('btn-next','bnext','Continue →',false,nextS);
}
function ansRadio(id,val,el){
  S.ans[id]=val;
  var all=el.closest('.rl').querySelectorAll('.ro');
  for(var i=0;i<all.length;i++)all[i].classList.remove('sel');
  el.classList.add('sel');setBtn('btn-next','bnext','Continue →',false,nextS);
}
function ansChip(id,val,el){
  if(!S.ans[id])S.ans[id]=[];
  var i=S.ans[id].indexOf(val);
  if(i>-1){S.ans[id].splice(i,1);el.classList.remove('sel');}
  else{S.ans[id].push(val);el.classList.add('sel');}
}
function ansInput(id,val){S.ans[id]=val;setBtn('btn-next','bnext','Continue →',false,nextS);}

function showModeSelect(){
  setP(100);T('pslbl','Choose output format');T('ptitle','Select Specification Type');T('fhint','Choose your preferred output');
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  var items='';
  var keys=Object.keys(S.ans);
  for(var i=0;i<keys.length;i++){
    var key=keys[i];var v=S.ans[key];
    if(!v||(Array.isArray(v)&&v.length===0))continue;
    var step=null;
    for(var f=0;f<S.flow.length;f++){if(S.flow[f].id===key){step=S.flow[f];break;}}
    var lbl=step?step.q.replace(/\?.*$/,'').replace(/^(What is the |What are the |Is this |Where is the )/i,'').trim():key;
    var val=Array.isArray(v)?v.join(', '):v;
    items+='<div class="sumi"><div class="sumk">'+lbl+'</div><div class="sumv">'+val+'</div></div>';
  }
  var h='<div class="aib"><div class="aiav">CQ</div>'
    +'<div class="aibd"><div class="ailbl">ConcretIQ AI</div>'
    +'<div class="aitx">All project parameters collected. Now choose how you would like your specification generated.<br><br>'
    +'<strong>Select the output format that best suits your role.</strong></div></div></div>'
    +'<div class="sumc"><h4>📋 Project Summary - '+(mod?mod.l:'')+'</h4>'
    +'<div class="sumg">'+items+'</div></div>'
    +'<div class="smc"><h4>📄 Specification Output Format</h4>'
    +'<p>Choose the type of output - a full technical package for engineers and contractors, or a clear plain-language spec for designers and consultants.</p>'
    +'<div class="smcg">'
    +'<div class="smco sel" id="smc-full" onclick="selMode(\'full\',this)">'
    +'<div class="smco-e">⚙️</div><div class="smco-t">Full Technical Package</div>'
    +'<div class="smco-d">Complete specification with EN standards, BOQ, method statement, ITP, risk register and value engineering. For engineers and contractors.</div>'
    +'<div class="tag-e tag-t">Engineer / Contractor</div></div>'
    +'<div class="smco" id="smc-des" onclick="selMode(\'designer_spec\',this)">'
    +'<div class="smco-e">✏️</div><div class="smco-t">Designer / Consultant Spec</div>'
    +'<div class="smco-d">Clear, plain-language specification clauses with product schedule. Ready to paste into project documentation. For designers and consultants.</div>'
    +'<div class="tag-e tag-d">Designer / Consultant</div></div>'
    +'</div></div>';
  H('pbody',h);
  S.mode='full';
  setBtn('btn-next','bgen','⚡ Generate Specification',false,doGen);
}

function selMode(mode,el){
  S.mode=mode;
  var all=document.querySelectorAll('.smco');
  for(var i=0;i<all.length;i++)all[i].classList.remove('sel');
  el.classList.add('sel');
}

function doGen(){
  if(S.busy)return;
  S.busy=true;hide('btn-back');
  setBtn('btn-next','bnext','Generating...',true,null);
  T('fhint','AI is generating your specification...');
  var steps=['Analysing project parameters...','Applying Mapei product selection rules...','Selecting correct products...','Writing specification clauses...','Building BOQ with TDS rates...','Compiling method statement and ITP...'];
  var lh='<div class="lw"><div class="lring"></div>'
    +'<div class="ltxt">ConcretIQ AI is generating your package...</div>'
    +'<div class="lsteps">';
  for(var i=0;i<steps.length;i++){
    lh+='<div class="ls'+(i===0?' act':'')+'" id="ls'+i+'">'+steps[i]+'</div>';
  }
  lh+='</div></div>';
  H('pbody',lh);setP(8);
  var si=0;
  var iv=setInterval(function(){
    var prev=$('ls'+si);if(prev){prev.classList.remove('act');prev.classList.add('done');}
    si++;if(si<steps.length){var cur=$('ls'+si);if(cur)cur.classList.add('act');}
    setP(8+((si+1)/steps.length)*82);
  },900);
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  fetch('/api/consult',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({module:mod?mod.l:S.mod,answers:S.ans,mode:S.mode})
  }).then(function(r){
    clearInterval(iv);
    if(!r.ok)throw new Error('HTTP '+r.status);
    return r.json();
  }).then(function(data){
    setP(100);S.busy=false;
    if(data.error)throw new Error(data.error);
    if(S.mode==='designer_spec')renderDS(data);
    else renderFull(data);
  }).catch(function(err){
    clearInterval(iv);setP(100);S.busy=false;
    toast('AI call failed: '+err.message+'. Showing offline preview.');
    renderFallback();
  });
}

function renderFull(d){
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  var stds='';
  var stdArr=d.applicable_standards||[];
  for(var i=0;i<stdArr.length;i++)stds+='<span class="rtag">'+stdArr[i]+'</span>';
  var dl=d.design_life?'<span class="rtag">🕐 '+d.design_life+'</span>':'';
  var rat=d.product_selection_rationale?'<div class="rat"><div class="rat-hd">🧠 PRODUCT SELECTION RATIONALE</div><p>'+d.product_selection_rationale+'</p></div>':'';
  var h='<div class="rhero"><div class="rtop"><div>'
    +'<div class="rbadge">✓ AI Specification Generated</div>'
    +'<div class="rtitle">'+(d.system_title||(mod?mod.l:'')+' System')+'</div>'
    +'<div class="rsub">'+(d.executive_summary||'')+'</div>'
    +'<div class="rtags">'+stds+dl+'</div>'
    +'</div><div class="racts">'
    +'<button class="rbtn" onclick="window.print()">⬇ PDF</button>'
    +'<button class="rbtn" onclick="cpSpec()">📋 Copy</button>'
    +'<button class="rbtn" onclick="resetW()">↺ New</button>'
    +'</div></div></div>'+rat
    +'<div class="otabs">'
    +'<div class="otab on" onclick="swTab(this,\'tl\')">System Layers</div>'
    +'<div class="otab" onclick="swTab(this,\'ts\')">Specification</div>'
    +'<div class="otab" onclick="swTab(this,\'tb\')">BOQ</div>'
    +'<div class="otab" onclick="swTab(this,\'tm\')">Method Statement</div>'
    +'<div class="otab" onclick="swTab(this,\'ti\')">ITP</div>'
    +'<div class="otab" onclick="swTab(this,\'tr\')">Risks</div>'
    +'<div class="otab" onclick="swTab(this,\'tv\')">Value Engineering</div>'
    +'</div>'
    +'<div class="opanel on" id="tl">'+bLayers(d.mapei_system||{})+'</div>'
    +'<div class="opanel" id="ts">'+bSpec(d.specification||[])+'</div>'
    +'<div class="opanel" id="tb">'+bBoq(d.boq||[])+'</div>'
    +'<div class="opanel" id="tm">'+bMS(d.method_statement||[])+'</div>'
    +'<div class="opanel" id="ti">'+bITP(d.itp||[])+'</div>'
    +'<div class="opanel" id="tr">'+bRisks(d.risks||[])+'</div>'
    +'<div class="opanel" id="tv">'+bVE(d.value_engineering||[])+'</div>';
  H('pbody',h);
  T('fhint','Specification complete');
  setBtn('btn-next','bnext','↺ New Consultation',false,resetW);
  show('btn-back');var bb=$('btn-back');bb.onclick=resetW;bb.textContent='↺ New';
}

function swTab(el,id){
  var w=el.parentElement.parentElement;
  var tabs=w.querySelectorAll('.otab');
  for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('on');
  el.classList.add('on');
  var panels=w.querySelectorAll('.opanel');
  for(var j=0;j<panels.length;j++)panels[j].classList.remove('on');
  var t=w.querySelector('#'+id);if(t)t.classList.add('on');
}

function renderDS(d){
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  var secs='';
  var secArr=d.sections||[];
  for(var i=0;i<secArr.length;i++){
    var sec=secArr[i];
    var cls='';
    var clauseArr=sec.clauses||[];
    for(var j=0;j<clauseArr.length;j++){
      var c=clauseArr[j];
      cls+='<div class="dsc"><div class="dscn">'+c.num+'</div>'
        +'<div class="dscb"><h5>'+c.title+'</h5><p>'+c.text+'</p></div></div>';
    }
    secs+='<div class="dssec"><div class="dssect">'+sec.section_num+'. '+sec.section_title+'</div>'+cls+'</div>';
  }
  var prods='';
  var prodArr=d.approved_products||[];
  for(var p=0;p<prodArr.length;p++){
    var pr=prodArr[p];
    var db=null;
    var firstWord=pr.name.toLowerCase().split(' ')[0];
    for(var q=0;q<PRODS.length;q++){
      if(PRODS[q].n.toLowerCase().indexOf(firstWord)>-1){db=PRODS[q];break;}
    }
    prods+='<div class="dsprod"><div class="dsprod-e">'+(db?db.e:'🔬')+'</div><div>'
      +'<div class="dsprod-n">'+pr.name+'</div>'
      +'<div class="dsprod-d">'+(pr.description||'')+'</div>'
      +'<div class="dsprod-w">Selected because: '+(pr.why_selected||'')+'</div></div></div>';
  }
  var notes='';
  var noteArr=d.key_notes||[];
  for(var n=0;n<noteArr.length;n++)notes+='<div class="dsnote">'+noteArr[n]+'</div>';
  var h='<div class="rhero"><div class="rtop"><div>'
    +'<div class="rbadge">✏️ Designer Specification</div>'
    +'<div class="rtitle">'+(d.spec_title||(mod?mod.l:'')+' Specification')+'</div>'
    +'<div class="rsub">'+(d.project_note||'')+'</div>'
    +'</div><div class="racts">'
    +'<button class="rbtn" onclick="window.print()">⬇ Print / PDF</button>'
    +'<button class="rbtn" onclick="cpSpec()">📋 Copy All</button>'
    +'<button class="rbtn" onclick="resetW()">↺ New</button>'
    +'<button class="rbtn" style="border-color:rgba(217,149,40,.35);color:var(--gold2)" onclick="switchFull()">⚙️ Full Technical Version</button>'
    +'</div></div></div>'
    +'<div class="dsdoc">'+secs
    +'<div class="dsprods"><div class="dsprodlbl">✅ APPROVED MAPEI PRODUCTS</div>'
    +'<div class="dsprodg">'+prods+'</div></div>'
    +(notes?'<div class="dsnotes"><div class="dsprodlbl" style="color:var(--sky)">ℹ️ KEY NOTES FOR DESIGNER / CONSULTANT</div>'+notes+'</div>':'')
    +'</div>';
  H('pbody',h);
  T('fhint','Designer specification complete');
  setBtn('btn-next','bnext','↺ New Consultation',false,resetW);
  show('btn-back');var bb=$('btn-back');bb.onclick=resetW;bb.textContent='↺ New';
}

function switchFull(){S.mode='full';doGen();}

function bLayers(sys){
  var order=[{k:'primer',l:'Primer / Preparation'},{k:'base_layer',l:'Base Layer'},{k:'intermediate',l:'Intermediate Layer'},{k:'finish_layer',l:'Finish / Top Layer'}];
  var h='<div class="layers">';var n=1;
  for(var oi=0;oi<order.length;oi++){
    var o=order[oi];
    var ly=sys[o.k];
    if(ly&&ly.name){
      var db=null;
      var firstWord=ly.name.toLowerCase().split(' ')[0];
      for(var q=0;q<PRODS.length;q++){
        if(PRODS[q].n.toLowerCase().indexOf(firstWord)>-1){db=PRODS[q];break;}
      }
      var sp='';
      if(ly.coverage)sp+='<div class="lsp">Coverage: <strong>'+ly.coverage+'</strong></div>';
      if(ly.origin)sp+='<div class="lsp">Origin: <strong>'+ly.origin+'</strong></div>';
      if(db&&db.sp){for(var si=0;si<Math.min(2,db.sp.length);si++)sp+='<div class="lsp">'+db.sp[si].k+': <strong>'+db.sp[si].v+'</strong></div>';}
      h+='<div class="lyr"><div class="lyrc">'+n+'</div><div>'
        +'<div class="lyrole">'+o.l+'</div><div class="lyrname">'+ly.name+'</div>'
        +'<div class="lyrnote">'+(ly.role||'')+'</div><div class="lyrsp">'+sp+'</div></div></div>';
      n++;
    }
  }
  var acc=sys.accessories||[];
  for(var a=0;a<acc.length;a++){
    if(acc[a].name)h+='<div class="lyr" style="border-left-color:var(--teal2)">'
      +'<div class="lyrc" style="background:rgba(52,214,190,.1);border-color:rgba(52,214,190,.3);color:var(--teal2)">A</div>'
      +'<div><div class="lyrole" style="color:var(--teal2)">Accessory</div>'
      +'<div class="lyrname">'+acc[a].name+'</div><div class="lyrnote">'+(acc[a].role||'')+'</div></div></div>';
  }
  return h+'</div>';
}
function bSpec(cls){
  if(!cls.length)return '<p style="color:var(--tx2)">No specification clauses generated.</p>';
  var h='<div class="sdoc">';
  for(var i=0;i<cls.length;i++){
    var c=cls[i];
    h+='<div class="sc"><div class="scn">'+c.clause+'</div>'
      +'<div class="scb"><h5>'+c.title+'</h5><p>'+c.text+'</p></div></div>';
  }
  return h+'</div>';
}
function bBoq(items){
  if(!items.length)return '<p style="color:var(--tx2)">No BOQ generated.</p>';
  var h='<div class="boqw"><table class="boqt">'
    +'<thead><tr><th>Ref</th><th>Description</th><th>Unit</th><th>Consumption</th><th>Mapei Product</th><th>Note</th></tr></thead><tbody>';
  for(var i=0;i<items.length;i++){
    var b=items[i];
    h+='<tr><td style="color:var(--tx2)">'+b.ref+'</td><td>'+b.description+'</td>'
      +'<td class="tdu">'+b.unit+'</td><td>'+b.consumption+'</td>'
      +'<td class="tdp">'+(b.mapei_product||'-')+'</td>'
      +'<td style="color:var(--tx2);font-size:.72rem">'+(b.note||'')+'</td></tr>';
  }
  h+='</tbody></table>'
    +'<div class="boqnote">⚠️ Quantities are AI-generated from Mapei TDS consumption rates. Confirm all quantities by site measurement and with the Mapei technical team prior to procurement.</div></div>';
  return h;
}
function bMS(steps){
  if(!steps.length)return '<p style="color:var(--tx2)">No method statement generated.</p>';
  var h='<div class="mslist">';
  for(var i=0;i<steps.length;i++){
    var s=steps[i];
    h+='<div class="msstep"><div class="msn">'+(s.step||(i+1))+'</div>'
      +'<div><div class="msh">'+(s.title||'Step '+(i+1))+'</div>'
      +'<div class="msp">'+(s.detail||'')+'</div></div></div>';
  }
  return h+'</div>';
}
function bITP(items){
  if(!items.length)return '<p style="color:var(--tx2)">No ITP generated.</p>';
  var h='<div style="overflow-x:auto"><table class="itpt">'
    +'<thead><tr><th>Activity</th><th>Hold 🔴</th><th>Witness 🟡</th><th>Review 🟢</th><th>Acceptance Criteria</th></tr></thead><tbody>';
  for(var i=0;i<items.length;i++){
    var it=items[i];
    h+='<tr><td>'+it.activity+'</td>'
      +'<td class="itpic">'+(it.hold?'🔴':'-')+'</td>'
      +'<td class="itpic">'+(it.witness?'🟡':'-')+'</td>'
      +'<td class="itpic">'+(it.review?'🟢':'-')+'</td>'
      +'<td style="font-size:.74rem;color:var(--tx2)">'+(it.acceptance_criteria||'')+'</td></tr>';
  }
  return h+'</tbody></table></div>';
}
function bRisks(risks){
  if(!risks.length)return '<p style="color:var(--tx2)">No risks generated.</p>';
  var h='<div class="riskl">';
  for(var i=0;i<risks.length;i++){
    var r=risks[i];
    var sv=(r.severity||'medium').toLowerCase();
    var cls=sv==='high'?'svhi':sv==='low'?'svlo':'svmd';
    h+='<div class="riskc"><div class="risksv '+cls+'">'+(r.severity||'Medium')+'</div>'
      +'<div><div class="riskh">'+(r.id||'')+' - '+r.risk+'</div>'
      +'<div class="riskp"><span style="color:var(--teal2);font-weight:600">Mitigation:</span> '+r.mitigation+'</div></div></div>';
  }
  return h+'</div>';
}
function bVE(opts){
  if(!opts.length)return '<p style="color:var(--tx2)">No value engineering options generated.</p>';
  var h='<div class="veg">';
  for(var i=0;i<opts.length;i++){
    var o=opts[i];
    h+='<div class="vec"><div class="veh">'+o.option+'</div>'
      +'<div class="ves">'+o.saving+'</div>'
      +'<div class="vep"><strong style="color:var(--tx)">Alternative:</strong> '+o.product+'</div>'
      +'<div class="vet">⚖️ Trade-off: '+o.trade_off+'</div></div>';
  }
  return h+'</div>';
}

function renderFallback(){
  var catMap={waterproofing:'Waterproofing',flooring:'Flooring',resilient:'Resilient Flooring',repair:'Concrete Repair',anchors:'Anchors & Grouts',tile:'Tile & Stone',protective:'Protective Coatings'};
  var cat=catMap[S.mod]||'';
  var rel=[];
  for(var i=0;i<PRODS.length;i++){if(PRODS[i].c===cat)rel.push(PRODS[i]);if(rel.length>=4)break;}
  var mod=null;
  for(var k=0;k<MODS.length;k++){if(MODS[k].id===S.mod){mod=MODS[k];break;}}
  renderFull({
    system_title:(mod?mod.l:'')+' - Mapei System (Offline Preview)',
    executive_summary:'This is an offline preview using built-in Mapei product intelligence. The live AI generates a fully accurate, project-specific specification - if you see this message, check that the API connection is configured correctly.',
    design_life:'As specified by Engineer',applicable_standards:['EN 1504','EN 14891','EN 12004','ASTM'],
    product_selection_rationale:'Products shown below are generic examples for this category. UAE-manufactured products are prioritised. The live AI selects products based on your exact answers.',
    mapei_system:{
      primer:{name:rel[0]?rel[0].n:'Primer SN',role:'Surface preparation and adhesion promotion',coverage:'150-200 ml/m2',origin:'UAE / Italy'},
      base_layer:{name:rel[1]?rel[1].n:'Mapelastic Smart',role:'Primary functional layer',coverage:'1.5-2.0 kg/m2',origin:'UAE / Italy'},
      intermediate:{name:rel[2]?rel[2].n:'Intermediate layer',role:'Reinforcement and build-up',coverage:'Per TDS',origin:'Italy'},
      finish_layer:{name:rel[3]?rel[3].n:'Finish coat',role:'Protection and UV resistance',coverage:'Per TDS',origin:'Italy'},
      accessories:[{name:'Mapei Sealant and Tape System',role:'Upstands, joints and penetrations'}]
    },
    specification:[
      {clause:'1.1',title:'Scope',text:'This specification covers the complete '+(mod?mod.l.toLowerCase():'')+' system for all areas shown on the contract drawings. The complete system shall be supplied by Mapei as the sole approved manufacturer.'},
      {clause:'1.2',title:'Standards and Compliance',text:'All materials shall comply with the relevant EN standards, current Mapei TDS and Dubai Municipality requirements. UAE-manufactured products shall be prioritised.'},
      {clause:'1.3',title:'Substrate Preparation',text:'Substrate shall be structurally sound, clean, dry and free from contamination. Prepare to CSP 3-5 profile. Repair all defects with Mapei repair mortar prior to system application.'},
      {clause:'1.4',title:'Application Conditions',text:'Do not apply below +5C or above +35C, or when RH exceeds 85%. Protect fresh material from rain, UV and traffic for the full cure period stated in the Mapei TDS.'},
      {clause:'1.5',title:'Quality Control',text:'Provide CE marking, batch numbers and certificates of conformity. Carry out pull-off testing at minimum 1 per 200m2 per EN 1542. Submit all records to the Engineer.'},
      {clause:'1.6',title:'Warranty',text:'Provide minimum 10-year system warranty backed by Mapei manufacturer warranty, subject to compliance with TDS and Mapei warranty terms.'}
    ],
    boq:[
      {ref:'A',description:'Surface preparation - mechanical cleaning and defect repair',unit:'m2',consumption:'Allow',mapei_product:'Mapei repair mortar',note:''},
      {ref:'B',description:'Priming of substrate',unit:'m2',consumption:'150-200 ml/m2',mapei_product:rel[0]?rel[0].n:'Primer SN',note:'2 coats on absorbent surfaces'},
      {ref:'C',description:'Base layer application',unit:'m2',consumption:'1.5-2.0 kg/m2',mapei_product:rel[1]?rel[1].n:'As specified',note:'Per Mapei TDS'},
      {ref:'D',description:'Intermediate coat',unit:'m2',consumption:'Per TDS',mapei_product:rel[2]?rel[2].n:'As specified',note:''},
      {ref:'E',description:'Finish coat / top layer',unit:'m2',consumption:'Per TDS',mapei_product:rel[3]?rel[3].n:'As specified',note:''},
      {ref:'F',description:'Detailing - upstands, joints, penetrations',unit:'sum',consumption:'PC Sum',mapei_product:'Mapei sealant and tape',note:'Measure separately'}
    ],
    method_statement:[
      {step:'MS1',title:'Pre-Application Survey',detail:'Test substrate: moisture CM method max 4%, pH 7-10, pull-off min 1.0 MPa. Identify all defects. Submit survey report to Engineer.'},
      {step:'MS2',title:'Surface Preparation',detail:'Shot-blast or grind to CSP 3-5. Remove all laitance, contamination and weak material. Repair defects with Mapei mortar and allow to cure fully.'},
      {step:'MS3',title:'Primer Application',detail:'Apply Mapei primer at TDS coverage rate by brush or roller. Full coverage - no missed areas. Cure to tack-free per TDS before overcoating.'},
      {step:'MS4',title:'System Application',detail:'Mix multi-component materials at TDS ratios using slow-speed mixer. Apply coats in sequence observing overcoating intervals. Check wet film thickness throughout.'},
      {step:'MS5',title:'Detailing',detail:'Apply all upstands min 150mm, pipe penetrations, drain surrounds and joints using Mapei sealant, tape and accessories before or during main application.'},
      {step:'MS6',title:'Curing, Testing and Handover',detail:'Protect from rain, UV and traffic for full cure period. Flood test 24 hours minimum. Submit all ITP records and test certificates to Engineer. Obtain written acceptance.'}
    ],
    itp:[
      {activity:'Substrate Survey',hold:true,witness:false,review:true,acceptance_criteria:'Moisture less than 4% CM, pH 7-10, pull-off greater than 1.0 MPa, no unrepaired defects'},
      {activity:'Primer Application',hold:false,witness:true,review:true,acceptance_criteria:'Full coverage at TDS rate, tack-free before overcoating'},
      {activity:'First Coat',hold:false,witness:true,review:true,acceptance_criteria:'WFT within TDS tolerance, no pinholes or contamination'},
      {activity:'Intermediate Coat',hold:false,witness:false,review:true,acceptance_criteria:'Correct coverage, no air pockets'},
      {activity:'Final Coat and Flood Test',hold:true,witness:true,review:true,acceptance_criteria:'24hr flood test zero leaks, DFT within TDS tolerance'}
    ],
    risks:[
      {id:'R01',risk:'Elevated substrate moisture causing bond failure',mitigation:'Test with CM method. If over 4% use Mapei DPM primer. Do not proceed without Engineer approval.',severity:'High'},
      {id:'R02',risk:'High ambient temperature reducing pot life',mitigation:'Apply in early morning. Chill mixing water. Observe 35C maximum.',severity:'High'},
      {id:'R03',risk:'Insufficient surface preparation causing delamination',mitigation:'Achieve CSP 3 minimum. Pull-off test before application. Engineer to approve substrate.',severity:'High'},
      {id:'R04',risk:'Incorrect mixing ratios causing system failure',mitigation:'Mix full units only. Never part-mix. Trained operatives only.',severity:'Medium'}
    ],
    value_engineering:[
      {option:'Single-component variant',product:rel[0]?rel[0].n:'Single-component Mapei product',saving:'Labour cost approx 15% reduction',trade_off:'Reduced crack-bridging performance. Suitable for low movement substrates only. Engineer approval required.'},
      {option:'Minimum TDS coverage rate',product:'Same products at minimum specified coverage',saving:'Material saving 10-15%',trade_off:'Reduced design life and warranty. Higher inspection frequency required.'}
    ]
  });
}

function cpSpec(){
  var el=document.querySelector('.sdoc')||document.querySelector('.dsdoc');
  if(!el){toast('No specification to copy.');return;}
  if(navigator.clipboard){
    navigator.clipboard.writeText(el.innerText).then(function(){toast('Specification copied!');}).catch(function(){toast('Select text manually to copy.');});
  }else{
    toast('Select text manually to copy.');
  }
}
