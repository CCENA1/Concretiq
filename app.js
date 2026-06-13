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
