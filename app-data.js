/* ConcretIQ AI — App Logic */
function G(s){var e=document.querySelector(s);if(e)e.scrollIntoView({behavior:'smooth'});}
function $(i){return document.getElementById(i);}
function H(i,h){var e=$(i);if(e)e.innerHTML=h;}
function T(i,t){var e=$(i);if(e)e.textContent=t;}
function show(i){var e=$(i);if(e)e.style.display='';}
function hide(i){var e=$(i);if(e)e.style.display='none';}
function setP(p){var e=$('prog');if(e)e.style.width=p+'%';}
function toast(m){var t=$('toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},4000);}
function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
function setBtn(id,cls,lbl,dis,fn){var e=$(id);if(!e)return;e.textContent=lbl;e.className=cls;e.disabled=!!dis;e.onclick=fn||null;}

var MODS=[
  {id:'waterproofing',e:'💧',l:'Waterproofing Expert',s:'Roof, basement, podium, pool, tunnel, tank'},
  {id:'flooring',e:'🏗️',l:'Flooring Expert',s:'Industrial, commercial, food, car park, decorative'},
  {id:'resilient',e:'🪵',l:'Resilient Flooring',s:'Vinyl, LVT, rubber, linoleum, carpet tiles'},
  {id:'repair',e:'🔧',l:'Concrete Repair',s:'Structural, chloride, carbonation, cosmetic'},
  {id:'anchors',e:'⚓',l:'Anchors & Grouts',s:'Chemical anchors, precision grouts, rebar'},
  {id:'tile',e:'🟦',l:'Tile & Stone Expert',s:'Adhesives, grouts, movement joints, pools'},
  {id:'protective',e:'🛡️',l:'Protective Coatings',s:'Facades, floors, marine, infrastructure'}
];

var PRODS=[
  {n:'Mapelastic Smart',c:'Waterproofing',e:'💧',d:'Two-component flexible cementitious waterproofing. Crack-bridging 1.5mm or more. Terraces, wet rooms, swimming pools. UAE-made.',sp:[{k:'Coverage',v:'1.5-2.0 kg/m2'},{k:'Layers',v:'Min 2'},{k:'Origin',v:'UAE & Italy'},{k:'Class',v:'EN 14891 III'}],rec:'Top Pick',org:'UAE'},
  {n:'Purtop 400 M',c:'Waterproofing',e:'💧',d:'Single-component PU liquid membrane. Seamless, UV-stable, pedestrian traffic. Exposed roofs and terraces.',sp:[{k:'DFT',v:'1.2mm'},{k:'Coverage',v:'1.5 kg/m2'},{k:'Origin',v:'Italy'},{k:'Traffic',v:'Pedestrian'}],rec:'',org:'Italy'},
  {n:'Purtop 500',c:'Waterproofing',e:'💧',d:'High-build hybrid PU membrane. Light vehicular traffic. Podium decks. High elongation.',sp:[{k:'DFT',v:'1.5mm'},{k:'Coverage',v:'2.0 kg/m2'},{k:'Origin',v:'Italy'},{k:'Traffic',v:'Light vehicular'}],rec:'',org:'Italy'},
  {n:'Mapethene',c:'Waterproofing',e:'💧',d:'Pre-applied HDPE waterproofing. Blind-side basements and tunnels. Mechanically bonded to concrete.',sp:[{k:'Thickness',v:'1.5mm'},{k:'Bond',v:'Pre-applied'},{k:'Origin',v:'Italy'},{k:'Std',v:'ASTM D882'}],rec:'',org:'Italy'},
  {n:'Plastimul',c:'Waterproofing',e:'💧',d:'Bitumen-acrylic cold-applied liquid. Positive and negative side. Foundations, retaining walls. UAE-made.',sp:[{k:'Coverage',v:'1.5-2.0 kg/m2'},{k:'DFT',v:'1.0mm'},{k:'Origin',v:'UAE'},{k:'Side',v:'+/- rated'}],rec:'',org:'UAE'},
  {n:'Mapeproof SB',c:'Waterproofing',e:'💧',d:'Pre-applied sodium bentonite self-sealing membrane. Tunnels, foundation slabs in high groundwater.',sp:[{k:'Bentonite',v:'4.5 kg/m2'},{k:'Width',v:'1.0m'},{k:'Origin',v:'Italy'},{k:'Self-seal',v:'Yes'}],rec:'',org:'Italy'},
  {n:'Mapefloor Finish 58 SL',c:'Flooring',e:'🏗️',d:'Self-leveling solvent-free epoxy 1-3mm. Chemical and abrasion resistant. Pharma, food, industrial.',sp:[{k:'Thickness',v:'1-3mm'},{k:'Finish',v:'Gloss/Matt'},{k:'Origin',v:'Italy'},{k:'Std',v:'EN 13813'}],rec:'Top Pick',org:'Italy'},
  {n:'Mapefloor PU 35',c:'Flooring',e:'🏗️',d:'PU-cementitious system 3-6mm. Anti-thermal shock -40C to +120C. R12 slip. Food, beverage, cold stores.',sp:[{k:'Thickness',v:'3-6mm'},{k:'Temp',v:'-40 to +120C'},{k:'Origin',v:'Italy'},{k:'Slip',v:'R12'}],rec:'Top Pick',org:'Italy'},
  {n:'Mapefloor I 400 SL',c:'Flooring',e:'🏗️',d:'Heavy-duty solvent-free self-leveling epoxy. Compressive over 70MPa. Fuels, oils, acids resistant.',sp:[{k:'Thickness',v:'3-6mm'},{k:'Compressive',v:'>70 MPa'},{k:'Origin',v:'Italy'},{k:'Chemical',v:'Excellent'}],rec:'',org:'Italy'},
  {n:'Mapefloor Parking',c:'Flooring',e:'🏗️',d:'Epoxy-PU car park deck system. UV-stable top coat, anti-carbonation, crack bridging.',sp:[{k:'Thickness',v:'2-4mm'},{k:'UV',v:'Stable'},{k:'Origin',v:'Italy'},{k:'Traffic',v:'Vehicles'}],rec:'',org:'Italy'},
  {n:'Ultratop Loft',c:'Flooring',e:'🏗️',d:'Decorative microcement-effect overlay 2-3mm. Retail, residential, hospitality floors and walls.',sp:[{k:'Thickness',v:'2-3mm'},{k:'Origin',v:'Italy'},{k:'Finish',v:'Satin/Matt'},{k:'BPN',v:'>36'}],rec:'',org:'Italy'},
  {n:'Mapegrout T60',c:'Concrete Repair',e:'🔧',d:'Thixotropic R3 mortar. Vertical and overhead. PP fibre reinforced. Chloride-free. UAE-made.',sp:[{k:'Class',v:'R3 EN 1504-3'},{k:'Compressive',v:'>45 MPa'},{k:'Origin',v:'UAE & Italy'},{k:'Fibre',v:'PP'}],rec:'Top Pick',org:'UAE'},
  {n:'Planitop 400',c:'Concrete Repair',e:'🔧',d:'Fine-grain R4 structural repair mortar. Carbonated and chloride-attacked concrete. Bond over 2.0 MPa.',sp:[{k:'Class',v:'R4 EN 1504-3'},{k:'Compressive',v:'>55 MPa'},{k:'Origin',v:'Italy'},{k:'Bond',v:'>2.0 MPa'}],rec:'',org:'Italy'},
  {n:'Planitop Fast 330',c:'Concrete Repair',e:'🔧',d:'Rapid-setting R3 mortar. Trafficable in 3 hours. Fast-track repairs. Chloride-free.',sp:[{k:'Class',v:'R3 EN 1504-3'},{k:'Walkable',v:'3 hrs'},{k:'Origin',v:'Italy'},{k:'Set',v:'Rapid'}],rec:'',org:'Italy'},
  {n:'Mapefer 1K',c:'Concrete Repair',e:'🔧',d:'Single-component anti-corrosion rebar primer. Always use when rebar is exposed. EN 1504-7.',sp:[{k:'Coverage',v:'0.7 kg/m2'},{k:'Layers',v:'2 coats'},{k:'Origin',v:'Italy'},{k:'Std',v:'EN 1504-7'}],rec:'Essential',org:'Italy'},
  {n:'Keraflex Maxi S1',c:'Tile & Stone',e:'🟦',d:'C2TE S1 flexible adhesive. Large format, natural stone, swimming pools, facades. UAE-made.',sp:[{k:'Class',v:'C2TE S1'},{k:'Open time',v:'30 min'},{k:'Origin',v:'UAE & Italy'},{k:'Format',v:'Up to 120x120cm'}],rec:'Top Pick',org:'UAE'},
  {n:'Ultracolor Plus',c:'Tile & Stone',e:'🟦',d:'Premium cement grout 2-20mm. Anti-efflorescence, stain resistant, BioBlock. 24 colours. UAE-made.',sp:[{k:'Joint',v:'2-20mm'},{k:'Class',v:'CG2 WA'},{k:'Origin',v:'UAE & Italy'},{k:'Colours',v:'24'}],rec:'Top Pick',org:'UAE'},
  {n:'Adesilex P10',c:'Tile & Stone',e:'🟦',d:'2-component epoxy adhesive and chemical-resistant grout. Food plants, pharmaceutical, industrial.',sp:[{k:'Class',v:'RG EN 13888'},{k:'Chemical',v:'Excellent'},{k:'Origin',v:'Italy'},{k:'Joint',v:'2-15mm'}],rec:'',org:'Italy'},
  {n:'Keraquick S1',c:'Tile & Stone',e:'🟦',d:'Fast-setting C2FT S1 adhesive. Set in 2-3 hours. Rapid refurbishment, cold stores.',sp:[{k:'Class',v:'C2FT S1'},{k:'Set',v:'2-3 hrs'},{k:'Origin',v:'Italy'},{k:'Use',v:'Fast-track'}],rec:'',org:'Italy'},
  {n:'Kerapoxy CQ',c:'Tile & Stone',e:'🟦',d:'Chemical-resistant epoxy grout and adhesive. Acid-resistant. Food and pharma. Easy Clean Technology.',sp:[{k:'Class',v:'RG EN 13888'},{k:'Acid',v:'Excellent'},{k:'Origin',v:'Italy'},{k:'Clean',v:'Easy Clean'}],rec:'',org:'Italy'},
  {n:'Mapefix PE SF',c:'Anchors & Grouts',e:'⚓',d:'Styrene-free polyester chemical anchor. ETA-approved. All base materials including hollow masonry.',sp:[{k:'Cure 20C',v:'6 min'},{k:'Bar',v:'M8-M24'},{k:'Origin',v:'Italy'},{k:'ETA',v:'Approved'}],rec:'Top Pick',org:'Italy'},
  {n:'Mapefix EP',c:'Anchors & Grouts',e:'⚓',d:'Two-component epoxy anchor. Heavy-duty cracked/uncracked concrete. Seismic C1+C2.',sp:[{k:'Seismic',v:'C1/C2'},{k:'Bar',v:'M8-M30'},{k:'Origin',v:'Italy'},{k:'Temp',v:'-40/+80C'}],rec:'',org:'Italy'},
  {n:'Mapefill',c:'Anchors & Grouts',e:'⚓',d:'Non-shrink cementitious precision grout. Machinery bases, column bases. UAE-made.',sp:[{k:'Compressive',v:'>60 MPa'},{k:'Shrinkage',v:'Non-shrink'},{k:'Origin',v:'UAE'},{k:'Std',v:'ASTM C1107'}],rec:'',org:'UAE'},
  {n:'Nivoplan',c:'Resilient Flooring',e:'🪵',d:'Cementitious self-leveling compound 2-10mm. Always use before resilient flooring on uneven substrates. UAE-made.',sp:[{k:'Thickness',v:'2-10mm'},{k:'Walkable',v:'3 hrs'},{k:'Origin',v:'UAE'},{k:'CS',v:'C25 EN 13813'}],rec:'Top Pick',org:'UAE'},
  {n:'Primer SN',c:'Resilient Flooring',e:'🪵',d:'Solvent-free acrylic primer. Always required before self-leveling compounds and resilient adhesives.',sp:[{k:'Coverage',v:'150-200ml/m2'},{k:'Recoat',v:'30-60min'},{k:'Origin',v:'Italy'},{k:'VOC',v:'<30g/L'}],rec:'Essential',org:'Italy'},
  {n:'Ultrabond Eco VS90',c:'Resilient Flooring',e:'🪵',d:'Pressure-sensitive acrylic adhesive for LVT and vinyl planks. Repositionable. Low VOC Class A+.',sp:[{k:'Coverage',v:'200-250ml/m2'},{k:'Open time',v:'40 min'},{k:'Origin',v:'Italy'},{k:'VOC',v:'Class A+'}],rec:'Top Pick',org:'Italy'},
  {n:'Ultrabond Eco S955 1K',c:'Resilient Flooring',e:'🪵',d:'High-moisture substrate adhesive for LVT/vinyl. Works up to 95% RH - eliminates separate DPM.',sp:[{k:'Max RH',v:'95%'},{k:'Coverage',v:'300-400ml/m2'},{k:'Origin',v:'Italy'},{k:'DPM',v:'Integrated'}],rec:'',org:'Italy'},
  {n:'Elastocolor Waterproof',c:'Protective Coatings',e:'🛡️',d:'Elastic anti-carbonation waterproofing paint. UV resistant, breathable, crack-bridging over 0.3mm. EN 1504-2.',sp:[{k:'Coverage',v:'0.25-0.3 kg/m2'},{k:'Crack bridge',v:'>0.3mm'},{k:'Origin',v:'Italy'},{k:'Std',v:'EN 1504-2'}],rec:'Top Pick',org:'Italy'},
  {n:'Mapecoat I 400',c:'Protective Coatings',e:'🛡️',d:'Solvent-free epoxy coating for industrial floors and walls. High chemical resistance, anti-dust.',sp:[{k:'DFT',v:'200-300um'},{k:'Chemical',v:'Excellent'},{k:'Origin',v:'Italy'},{k:'Gloss',v:'High'}],rec:'',org:'Italy'}
];

var FEATS=[
  {n:'01',t:'Deep Questionnaire Engine',d:'Never jumps to recommendations. Asks every technical question a senior consultant would - application, substrate, exposure, design life, traffic and more.'},
  {n:'02',t:'Smart Product Selection',d:'Built-in product rules engine ensures the correct Mapei product is chosen for every application. UAE manufacture prioritised throughout.'},
  {n:'03',t:'Technical Spec Writer',d:'NBS/CSI-style specification clauses with correct EN, BS and ASTM standards, performance requirements and workmanship clauses.'},
  {n:'04',t:'Designer Spec Mode',d:'Plain-language specification clauses for designers and consultants - ready to paste directly into project documentation packages.'},
  {n:'05',t:'BOQ Generator',d:'Itemised bills of quantities with real Mapei TDS consumption rates, units and product references for every line item.'},
  {n:'06',t:'Method Statement Engine',d:'Contractor-ready method statements following Mapei installation guidelines, step by step with QC requirements.'},
  {n:'07',t:'Inspection Test Plan',d:'Auto-generates ITP with hold, witness and review points for each system layer and critical quality checkpoint.'},
  {n:'08',t:'Risk Assessment',d:'Technical risk register identifying compatibility issues, substrate risks, application conditions and system limitations.'},
  {n:'09',t:'Value Engineering',d:'Proposes Mapei system alternatives that optimise project cost without compromising technical performance or warranty.'}
];

var FLOWS={
waterproofing:[
  {id:'project_type',type:'options',q:'Is this a new build or a refurbishment project?',opts:[{e:'🏗️',l:'New Build',d:'New construction',v:'New Build'},{e:'🔨',l:'Refurbishment',d:'Existing structure',v:'Refurbishment'}]},
  {id:'application',type:'options',q:'What is the waterproofing application area?',opts:[{e:'🏠',l:'Roof / Terrace',v:'Roof/Terrace'},{e:'⬇️',l:'Basement',d:'Below grade',v:'Basement'},{e:'🚿',l:'Wet Room',d:'Bathroom/shower',v:'Wet Room'},{e:'💦',l:'Swimming Pool',v:'Swimming Pool'},{e:'🌿',l:'Podium / Planter',v:'Podium/Planter'},{e:'🚗',l:'Car Park Deck',v:'Car Park Deck'},{e:'🚇',l:'Tunnel',v:'Tunnel'},{e:'🏗️',l:'Water Tank',v:'Water Tank'}]},
  {id:'side',type:'options',q:'Positive side (dry face) or negative side (wet face) application?',opts:[{e:'✅',l:'Positive Side',d:'Membrane on dry face',v:'Positive side'},{e:'🔄',l:'Negative Side',d:'Hydrostatic pressure behind',v:'Negative side'},{e:'🤔',l:'Both / Unsure',v:'Both/unsure'}]},
  {id:'substrate',type:'options',q:'What is the substrate material?',opts:[{e:'🧱',l:'Cast Concrete',v:'Cast in-situ concrete'},{e:'🏗️',l:'Precast Concrete',v:'Precast concrete'},{e:'🧱',l:'Masonry',v:'Masonry/blockwork'},{e:'🔩',l:'Metal Deck',v:'Metal deck'},{e:'📐',l:'Screed',v:'Screed/mortar'}]},
  {id:'exposure',type:'chips',q:'Key exposure and performance requirements (select all that apply):',opts:['UV Exposure','Foot Traffic','Vehicular Traffic','Root-Resistant (Planter)','Potable Water Contact','Permanent Hydrostatic Pressure','Thermal Movement','Chemical Exposure','Crack Bridging > 1mm Required']},
  {id:'water_table',type:'radio',q:'What is the groundwater / hydrostatic head condition?',opts:[{l:'None / Dry Site',d:'No groundwater pressure',v:'None'},{l:'Occasional',d:'Seasonal groundwater',v:'Occasional'},{l:'Permanent Low Head',d:'Less than 3m head',v:'Low head less than 3m'},{l:'Permanent High Head',d:'Greater than 3m head',v:'High head greater than 3m'}]},
  {id:'crack_movement',type:'radio',q:'Is crack or substrate movement expected?',opts:[{l:'None - rigid substrate',v:'No movement expected'},{l:'Low - hairline cracks only',v:'Low movement'},{l:'Moderate - up to 1mm',v:'Moderate up to 1mm'},{l:'High - greater than 1mm',d:'Requires high-flexibility system',v:'High greater than 1mm'}]},
  {id:'design_life',type:'radio',q:'What is the required design life?',opts:[{l:'10 Years',v:'10 years'},{l:'20 Years',v:'20 years'},{l:'25 Years',v:'25 years'},{l:'50+ Years / Lifetime of Structure',d:'Critical infrastructure',v:'50 plus years lifetime'}]},
  {id:'traffic',type:'radio',q:'What traffic will the waterproofing be exposed to?',opts:[{l:'No Traffic - inaccessible membrane',v:'No traffic'},{l:'Foot Traffic - pedestrian',v:'Pedestrian traffic'},{l:'Light Vehicular - cars, vans',v:'Light vehicular'},{l:'Heavy Vehicular - trucks, forklifts',v:'Heavy vehicular'}]},
  {id:'area',type:'input',q:'Approximate waterproofing area (m2):',ph:'e.g. 500',it:'number'},
  {id:'notes',type:'input',q:'Previous failures, special constraints or notes (optional):',ph:'e.g. saltwater pool, building is occupied, previous membrane failed...',it:'text'}
],
flooring:[
  {id:'sector',type:'options',q:'What is the primary sector and use of the space?',opts:[{e:'🏭',l:'Industrial',v:'Industrial'},{e:'🏬',l:'Commercial',v:'Commercial'},{e:'🏥',l:'Healthcare',v:'Healthcare'},{e:'🧪',l:'Pharma / Food',v:'Pharmaceutical or Food and Beverage'},{e:'🏢',l:'Car Park',v:'Car Park'},{e:'🏪',l:'Retail',v:'Retail'},{e:'🏠',l:'Residential',v:'Residential'}]},
  {id:'substrate',type:'options',q:'What is the existing floor substrate?',opts:[{e:'🧱',l:'Concrete Slab',v:'Concrete slab'},{e:'📐',l:'Cement Screed',v:'Cement screed'},{e:'🟥',l:'Existing Tiles',v:'Existing tiles'},{e:'🟨',l:'Failed Coating',v:'Failed coating'},{e:'🪵',l:'Timber / Ply',v:'Timber or plywood'}]},
  {id:'chemical',type:'radio',q:'What is the level of chemical exposure on the floor?',opts:[{l:'None',d:'No chemical contact',v:'None'},{l:'Mild',d:'Cleaning agents, dilute solutions',v:'Mild'},{l:'Moderate',d:'Oils, fuels, hydraulic fluids',v:'Moderate'},{l:'Severe',d:'Acids, alkalis, solvents',v:'Severe'},{l:'Extreme',d:'Strong acids pH below 4 or above 10',v:'Extreme'}]},
  {id:'traffic',type:'radio',q:'What is the traffic intensity?',opts:[{l:'Light Foot Traffic',d:'Offices, corridors',v:'Light foot traffic'},{l:'Heavy Foot Traffic',d:'Retail, hospitals',v:'Heavy foot traffic'},{l:'Light Wheeled',d:'Pallet trucks, trolleys',v:'Light wheeled vehicles'},{l:'Heavy Forklifts',d:'Counterbalance trucks',v:'Heavy forklifts'},{l:'Vehicles',d:'Car park',v:'Vehicle traffic car park'}]},
  {id:'slip',type:'radio',q:'What slip resistance classification is required?',opts:[{l:'R9 - Standard',v:'R9'},{l:'R10 - Slightly Enhanced',v:'R10'},{l:'R11 - Moderate',v:'R11'},{l:'R12 - High (wet industrial)',v:'R12'},{l:'R13 - Extreme (ramps)',v:'R13'}]},
  {id:'thermal',type:'options',q:'Special environment requirements?',opts:[{e:'🌡️',l:'Thermal Shock',d:'Hot wash-down, steam',v:'Thermal shock'},{e:'🧼',l:'Hygienic / Food-Safe',v:'Hygienic food-safe'},{e:'⚡',l:'Anti-Static ESD',v:'Anti-static ESD'},{e:'❄️',l:'Cold Store',d:'Below 0C',v:'Cold store'},{e:'🔵',l:'None',v:'None'}]},
  {id:'thickness',type:'radio',q:'Preferred system build-up thickness?',opts:[{l:'0.1-0.5mm Thin Coat',d:'Decorative, light duty',v:'0.1 to 0.5mm thin coat'},{l:'0.5-2mm Standard Coating',v:'0.5 to 2mm coating'},{l:'2-6mm Industrial Screed',v:'2 to 6mm screed'},{l:'6-12mm Heavy Duty Screed',d:'PU-cementitious',v:'6 to 12mm heavy screed'}]},
  {id:'area',type:'input',q:'Floor area (m2):',ph:'e.g. 2000',it:'number'},
  {id:'notes',type:'input',q:'Temperature range, drain locations or special constraints:',ph:'e.g. cold store -20C, drain locations, expansion joint spacing...',it:'text'}
],
resilient:[
  {id:'covering',type:'options',q:'What type of resilient floor covering is being installed?',opts:[{e:'📋',l:'Sheet Vinyl',d:'Homogeneous / heterogeneous',v:'Sheet vinyl'},{e:'🟫',l:'LVT / LVP',d:'Luxury Vinyl Tile or Plank',v:'LVT or LVP'},{e:'⚫',l:'Rubber Flooring',v:'Rubber flooring'},{e:'🟩',l:'Linoleum',v:'Linoleum'},{e:'🟦',l:'Carpet Tiles',v:'Carpet tiles'}]},
  {id:'substrate',type:'radio',q:'What is the existing substrate type?',opts:[{l:'New Concrete Slab',v:'New concrete slab'},{l:'Existing Concrete',v:'Existing concrete'},{l:'Timber / Plywood',v:'Timber or plywood'},{l:'Existing Resilient Floor',v:'Existing vinyl or rubber'},{l:'Anhydrite / Liquid Screed',v:'Anhydrite liquid screed'}]},
  {id:'moisture',type:'radio',q:'Substrate moisture condition? (Test with Tramex or CM method)',opts:[{l:'Dry - below 75% RH',v:'Dry below 75 percent RH'},{l:'Slightly Elevated - 75 to 85% RH',v:'75 to 85 percent RH'},{l:'High - 85 to 95% RH',v:'85 to 95 percent RH'},{l:'Unknown - testing needed',v:'Unknown moisture test required'}]},
  {id:'flatness',type:'radio',q:'Floor flatness condition?',opts:[{l:'Good - less than 3mm in 2m',v:'Flat less than 3mm per 2m'},{l:'Moderate - 3 to 8mm in 2m',d:'Light self-leveling required',v:'Moderate 3 to 8mm'},{l:'Poor - greater than 8mm in 2m',d:'Full self-leveling required',v:'Poor greater than 8mm'}]},
  {id:'sector',type:'options',q:'Use of the space?',opts:[{e:'🏥',l:'Healthcare',v:'Healthcare'},{e:'🏢',l:'Office',v:'Office'},{e:'🏭',l:'Industrial',v:'Industrial'},{e:'🏫',l:'Education',v:'Education'},{e:'🏠',l:'Residential',v:'Residential'}]},
  {id:'area',type:'input',q:'Floor area (m2):',ph:'e.g. 800',it:'number'},
  {id:'notes',type:'input',q:'Acoustic, heated floor or other notes:',ph:'Optional...',it:'text'}
],
repair:[
  {id:'cause',type:'options',q:'What is the primary cause of concrete deterioration?',opts:[{e:'🧂',l:'Chloride Attack',d:'Marine, de-icing salts',v:'Chloride attack'},{e:'💨',l:'Carbonation',d:'CO2 ingress',v:'Carbonation'},{e:'💥',l:'Structural Crack',d:'Load, settlement',v:'Structural cracking'},{e:'🔵',l:'Non-structural Crack',d:'Shrinkage, thermal',v:'Non-structural cracking'},{e:'🍯',l:'Honeycombing',d:'Poor compaction',v:'Honeycombing'},{e:'🔩',l:'Spalling',d:'Cover loss',v:'Spalling and section loss'}]},
  {id:'extent',type:'radio',q:'Extent and depth of deterioration?',opts:[{l:'Localised - less than 10%',v:'Localised less than 10 percent'},{l:'Moderate - 10 to 30%',v:'Moderate 10 to 30 percent'},{l:'Extensive - greater than 30%',v:'Extensive greater than 30 percent'},{l:'Full Section Loss',v:'Full section replacement required'}]},
  {id:'rebar',type:'options',q:'Reinforcement condition?',opts:[{e:'✅',l:'Cover Intact',d:'No rebar visible',v:'Cover intact no rebar exposed'},{e:'⚠️',l:'Rebar Exposed',d:'Cover lost',v:'Rebar exposed'},{e:'🔴',l:'Active Corrosion',d:'Rust staining visible',v:'Active rebar corrosion'}]},
  {id:'location',type:'options',q:'Where is the repair required?',opts:[{e:'⬆️',l:'Soffit / Overhead',v:'Soffit overhead'},{e:'➡️',l:'Vertical Surface',v:'Vertical surface'},{e:'⬇️',l:'Horizontal / Floor',v:'Horizontal floor slab'},{e:'↗️',l:'Corner / Edge',v:'Corner and edge repairs'},{e:'⬛',l:'Full Element',v:'Full element'}]},
  {id:'structural',type:'radio',q:'Structural (load-bearing) or cosmetic repair?',opts:[{l:'Structural - load-bearing element',d:'EN 1504-3 Class R4 or R3 required',v:'Structural load-bearing'},{l:'Cosmetic - non-structural',d:'Appearance and protection only',v:'Cosmetic non-structural'},{l:'Both structural and cosmetic',v:'Both'}]},
  {id:'environment',type:'radio',q:'Exposure environment of the repaired element?',opts:[{l:'Interior - dry',v:'Interior dry'},{l:'Interior - humid',v:'Interior humid'},{l:'Exterior - sheltered',v:'Exterior sheltered'},{l:'Exterior - fully exposed',v:'Exterior fully exposed'},{l:'Marine / Coastal',v:'Marine coastal'},{l:'Industrial / Chemical',v:'Industrial chemical'}]},
  {id:'urgency',type:'radio',q:'Repair programme urgency?',opts:[{l:'Standard - no time restrictions',v:'Standard programme'},{l:'Fast-track - rapid return to service',d:'Trafficable in hours',v:'Fast-track rapid cure'},{l:'Night shift only',v:'Night shift works only'}]},
  {id:'area',type:'input',q:'Approximate repair area (m2) or volume (m3):',ph:'e.g. 45 m2 or 2 m3',it:'text'},
  {id:'notes',type:'input',q:'Previous repair attempts or structural notes:',ph:'Optional...',it:'text'}
],
anchors:[
  {id:'load_type',type:'options',q:'What type of load will the anchor resist?',opts:[{e:'⬇️',l:'Tensile',d:'Pull-out force',v:'Tensile pull-out'},{e:'↔️',l:'Shear',v:'Shear'},{e:'🔄',l:'Combined',d:'Tension + Shear',v:'Combined tension and shear'},{e:'💪',l:'Rebar Connection',d:'Post-installed rebar',v:'Post-installed rebar connection'}]},
  {id:'load_nature',type:'radio',q:'Nature of the applied load?',opts:[{l:'Static - permanent load',v:'Static permanent load'},{l:'Dynamic - vibration or impact',v:'Dynamic vibration or impact'},{l:'Fatigue - cyclic loading',v:'Fatigue cyclic'},{l:'Seismic - earthquake zone',v:'Seismic C1 or C2'}]},
  {id:'base',type:'radio',q:'Base material to be anchored into?',opts:[{l:'Uncracked Concrete',v:'Uncracked concrete'},{l:'Cracked Concrete',v:'Cracked concrete'},{l:'Solid Masonry',v:'Solid masonry'},{l:'Hollow Block / AAC',d:'Requires specific anchor',v:'Hollow masonry or AAC'},{l:'Natural Stone',v:'Natural stone'}]},
  {id:'bar_dia',type:'radio',q:'Anchor rod or rebar diameter?',opts:[{l:'M8 / 8mm',v:'M8'},{l:'M10 to M12',v:'M10 to M12'},{l:'M16',v:'M16'},{l:'M20',v:'M20'},{l:'M24 and above',v:'M24 plus'}]},
  {id:'embedment',type:'radio',q:'Required embedment depth?',opts:[{l:'Less than 100mm',v:'less than 100mm'},{l:'100 to 150mm',v:'100 to 150mm'},{l:'150 to 200mm',v:'150 to 200mm'},{l:'200 to 300mm',v:'200 to 300mm'},{l:'More than 300mm',v:'more than 300mm'}]},
  {id:'conditions',type:'options',q:'Installation conditions?',opts:[{e:'🌡️',l:'High Temp',d:'Above 40C ambient',v:'High ambient temp above 40 degrees'},{e:'❄️',l:'Cold or Wet Hole',v:'Cold or wet drill hole'},{e:'⏱️',l:'Fast Cure Needed',v:'Fast cure required'},{e:'🔵',l:'Standard',v:'Standard conditions'}]},
  {id:'qty',type:'input',q:'Approximate number of anchor points:',ph:'e.g. 120',it:'number'},
  {id:'notes',type:'input',q:'Structural engineer reference or loading details:',ph:'Optional...',it:'text'}
],
tile:[
  {id:'tile_type',type:'options',q:'What type of tile or stone is being installed?',opts:[{e:'⬛',l:'Ceramic / Porcelain',v:'Ceramic or porcelain'},{e:'🪨',l:'Natural Stone',d:'Marble, travertine, granite',v:'Natural stone marble or granite'},{e:'🟦',l:'Large Format Slab',d:'Greater than 60x60cm',v:'Large format slab greater than 60cm'},{e:'💎',l:'Glass / Mosaic',v:'Glass or mosaic tiles'},{e:'🔶',l:'Terracotta',v:'Terracotta or quarry tile'}]},
  {id:'location',type:'options',q:'Where is the tile installation?',opts:[{e:'🏠',l:'Interior Floor',d:'Dry area',v:'Interior floor dry'},{e:'🚿',l:'Wet Room',d:'Bathroom, shower, kitchen',v:'Interior wet room'},{e:'🌤️',l:'Exterior Terrace',d:'Exposed to weather',v:'Exterior terrace exposed'},{e:'🏢',l:'Facade',d:'Vertical, wind-driven rain',v:'Facade wall cladding'},{e:'💦',l:'Swimming Pool',d:'Permanently submerged',v:'Swimming pool submerged'},{e:'🔥',l:'Underfloor Heating',v:'Underfloor heating UFH'}]},
  {id:'substrate',type:'radio',q:'Substrate to be tiled onto?',opts:[{l:'Concrete or Cement Screed',v:'Concrete or screed'},{l:'Tile on Tile (renovation)',v:'Tile on tile renovation'},{l:'Plasterboard / Drywall',v:'Plasterboard'},{l:'Pre-waterproofed Substrate',v:'Pre-waterproofed'},{l:'Timber / Plywood',v:'Timber or plywood'}]},
  {id:'tile_size',type:'radio',q:'Tile format (size)?',opts:[{l:'Small - less than 15x15cm',v:'Small less than 15cm'},{l:'Medium - 15 to 60cm',v:'Medium 15 to 60cm'},{l:'Large - 60 to 90cm',v:'Large 60 to 90cm'},{l:'Extra Large - greater than 90cm',d:'Back-buttering and S2 adhesive required',v:'Extra large greater than 90cm'}]},
  {id:'joint',type:'radio',q:'Grout joint width?',opts:[{l:'Rectified - 1 to 2mm',v:'Rectified 1 to 2mm'},{l:'Standard - 3 to 5mm',v:'Standard 3 to 5mm'},{l:'Wide - 5 to 15mm',v:'Wide 5 to 15mm'},{l:'Large - 15 to 20mm',v:'Large 15 to 20mm'}]},
  {id:'wp',type:'options',q:'Waterproofing required beneath the tiles?',opts:[{e:'✅',l:'Yes - Wet Room / Pool',v:'Waterproofing required'},{e:'🔵',l:'No - Dry Area',v:'No waterproofing needed'},{e:'🤔',l:'Unsure',v:'To be confirmed'}]},
  {id:'area',type:'input',q:'Total tile area (m2):',ph:'e.g. 300',it:'number'},
  {id:'notes',type:'input',q:'Chemical exposure, movement joints or special requirements:',ph:'Optional...',it:'text'}
],
protective:[
  {id:'substrate',type:'options',q:'What structure or substrate needs protection?',opts:[{e:'🏗️',l:'Concrete Structure',d:'Beams, columns, soffits',v:'Concrete structural elements'},{e:'🏭',l:'Industrial Floor',v:'Industrial concrete floor'},{e:'🌊',l:'Marine Structure',d:'Jetty, harbour, splash zone',v:'Marine structure'},{e:'🌉',l:'Bridge / Infrastructure',v:'Bridge or infrastructure'},{e:'🏢',l:'Building Facade',v:'Building facade external walls'},{e:'💧',l:'Water-Retaining',d:'Tank, reservoir',v:'Water retaining structure'}]},
  {id:'threats',type:'chips',q:'Primary threats to protect against (select all):',opts:['Carbonation / CO2 ingress','Chloride ingress (marine/de-icing)','Water ingress / dampness','Chemical attack (acids/alkalis)','Abrasion / wear','UV degradation','Thermal cycling','Biological growth (algae/moss)']},
  {id:'exposure',type:'radio',q:'EN 1504 exposure class?',opts:[{l:'XC1 - Dry or permanently submerged',v:'XC1'},{l:'XC3 / XC4 - Moderate or cyclic humidity',v:'XC3 or XC4'},{l:'XS1 / XS2 - Marine atmosphere',v:'XS1 or XS2'},{l:'XS3 - Tidal, splash and spray zone',v:'XS3 tidal splash'},{l:'XA - Chemical attack environment',v:'XA chemical attack'}]},
  {id:'system',type:'radio',q:'Preferred coating system family?',opts:[{l:'Cementitious Elastic / Polymer-Modified',v:'Cementitious elastic polymer'},{l:'Acrylic / Elastomeric Paint',v:'Acrylic elastomeric'},{l:'Epoxy Coating System',v:'Epoxy coating'},{l:'Polyurethane Coating System',v:'Polyurethane coating'},{l:'Anti-Carbonation Paint Only',v:'Anti-carbonation thin coat paint'}]},
  {id:'design_life',type:'radio',q:'Required design life of coating system?',opts:[{l:'5 to 10 years - maintenance cycle',v:'5 to 10 years'},{l:'15 to 20 years',v:'15 to 20 years'},{l:'25 years - major infrastructure',v:'25 years critical infrastructure'}]},
  {id:'area',type:'input',q:'Area to be coated (m2):',ph:'e.g. 1500',it:'number'},
  {id:'notes',type:'input',q:'Previous coating history or client requirements:',ph:'Optional...',it:'text'}
]
};

