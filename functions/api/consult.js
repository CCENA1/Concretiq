/**
 * ConcretIQ Cloudflare Pages Function
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  try {
    const body = await request.json();
    const { module: mod, answers = {}, mode = "full" } = body;
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500, headers: cors });

    const answerLines = Object.entries(answers).map(([k,v]) => `${k}: ${Array.isArray(v)?v.join(", "):v}`).join("\n");

    const RULES = `
MAPEI PRODUCT RULES - FOLLOW EXACTLY:

WATERPROOFING:
- Wet rooms/bathrooms (internal): Mapelastic Smart (2-coat cementitious, UAE-made)
- Swimming pools: Mapelastic Smart + Keracolor FF grout (NOT Ultracolor Plus submerged)
- Exposed UV pedestrian roof/terrace: Purtop 400 M (1-component PU, UV stable)
- Trafficable podium/light vehicle: Purtop 500 (hybrid PU, higher DFT)
- Basement blind-side: Mapethene (pre-applied HDPE)
- Foundation/retaining walls +/- side: Plastimul (bitumen-acrylic, UAE-made)
- High hydrostatic negative side: Mapelastic Foundation
- Tunnel: Mapeproof SB (bentonite)
- Potable tank: Mapelastic Smart (NSF variant)

FLOORING:
- Food/Pharma/Healthcare ONLY: Mapefloor PU 35 (PU-cementitious, -40C to +120C, R12) - NEVER use epoxy here
- Heavy industrial/chemical/forklifts: Mapefloor I 400 SL (solvent-free epoxy, >70MPa)
- Car park/vehicles: Mapefloor Parking (epoxy-PU, UV stable topcoat)
- Standard industrial/commercial: Mapefloor Finish 58 SL (self-leveling epoxy, 1-3mm)
- Decorative/retail/residential: Ultratop Loft (microcement-effect, 2-3mm)

CONCRETE REPAIR:
- Step 1 ALWAYS when rebar exposed: Mapefer 1K (anti-corrosion primer, 2 coats) - MANDATORY
- Vertical/overhead structural R3: Mapegrout T60 (thixotropic, PP fibre, UAE-made)
- Horizontal structural R4: Planitop 400 (fine grain, >55MPa)
- Fast-track R3: Planitop Fast 330 (trafficable 3 hours)

TILE & STONE:
- Swimming pools ALWAYS: Keraflex Maxi S1 - NEVER standard Keraflex for pools
- Large format >60cm/stone/facade: Keraflex Maxi S1 (C2TE S1)
- Fast-track: Keraquick S1
- Standard interior: Keraflex (UAE-made)
- Chemical resistant (food/pharma): Adesilex P10
- Standard grout 2-20mm: Ultracolor Plus (CG2 WA, BioBlock, UAE-made) - FIRST CHOICE
- Pool/rectified joints <2mm: Keracolor FF (UAE-made)
- Chemical resistant grout: Kerapoxy CQ

ANCHORS:
- General all substrates: Mapefix PE SF (polyester, ETA)
- Structural/seismic/cracked concrete: Mapefix EP (epoxy, C1/C2)
- Precision grout: Mapefill (non-shrink, UAE-made)

RESILIENT FLOORING (in this order):
1. Primer SN - ALWAYS first
2. Nivoplan (2-10mm, UAE-made) - ALWAYS for uneven substrates
3. LVT/vinyl dry: Ultrabond Eco VS90
4. LVT/vinyl high moisture up to 95%RH: Ultrabond Eco S955 1K
5. Rubber: Ultrabond Eco 4 SR

PROTECTIVE:
- Facade anti-carbonation: Elastocolor Waterproof (elastic, >0.3mm crack bridge)
- Industrial floor coating: Mapecoat I 400 (solvent-free epoxy)

UAE PRIORITY: Mapelastic Smart, Keraflex Maxi S1, Keraflex, Ultracolor Plus, Keracolor FF, Mapegrout T60, Nivoplan, Plastimul, Mapefill

FORBIDDEN ERRORS:
- Standard Keraflex for pools (must be Keraflex Maxi S1)
- Epoxy for food/pharma (must be Mapefloor PU 35)
- Missing Mapefer 1K when rebar exposed
- Purtop 400 M for permanent submersion
- Ultracolor Plus for chemical-resistant grouting (use Kerapoxy CQ)
`;

    let sys, usr;
    if (mode === "designer_spec") {
      sys = `You are ConcretIQ writing plain-language specifications for DESIGNERS and CONSULTANTS.
Use simple professional English. No jargon. Ready to paste into project documents.
${RULES}
Respond ONLY with valid JSON, no markdown fences:
{
  "spec_title":"string",
  "project_note":"string",
  "sections":[{"section_num":"1","section_title":"GENERAL","clauses":[{"num":"1.1","title":"string","text":"string"}]}],
  "approved_products":[{"name":"exact Mapei name","description":"plain description","why_selected":"reason"}],
  "key_notes":["string"]
}
Write 4 sections: GENERAL, MATERIALS, EXECUTION, QUALITY CONTROL. Min 4 clauses each.`;
      usr = `Designer spec for: ${mod}\nParameters:\n${answerLines}\nLocation: UAE.`;
    } else {
      sys = `You are ConcretIQ, the world's most accurate AI construction chemicals consultant with deep Mapei expertise.
${RULES}
Select products precisely based on parameters and rules. Explain your choices. Use real Mapei TDS rates.
Respond ONLY with valid JSON, no markdown fences:
{"system_title":"string","executive_summary":"string","design_life":"string","applicable_standards":["string"],"product_selection_rationale":"string explaining why each product was chosen","mapei_system":{"primer":{"name":"string","role":"string","coverage":"string","origin":"string"},"base_layer":{"name":"string","role":"string","coverage":"string","origin":"string"},"intermediate":{"name":"string","role":"string","coverage":"string","origin":"string"},"finish_layer":{"name":"string","role":"string","coverage":"string","origin":"string"},"accessories":[{"name":"string","role":"string"}]},"specification":[{"clause":"string","title":"string","text":"string"}],"boq":[{"ref":"string","description":"string","unit":"string","consumption":"string","mapei_product":"string","note":"string"}],"method_statement":[{"step":"string","title":"string","detail":"string"}],"itp":[{"activity":"string","hold":true,"witness":false,"review":true,"acceptance_criteria":"string"}],"risks":[{"id":"string","risk":"string","mitigation":"string","severity":"string"}],"value_engineering":[{"option":"string","product":"string","saving":"string","trade_off":"string"}]}
Min: 8 spec clauses, 7 BOQ items, 6 method steps, 5 ITP, 4 risks, 2 VE options. All product names must be exact Mapei names.`;
      usr = `Specification for: ${mod}\nParameters:\n${answerLines}\nLocation: UAE, hot humid climate. Prioritise UAE-manufactured products. Apply ALL product rules strictly.`;
    }

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01"},
      body: JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4096,system:sys,messages:[{role:"user",content:usr}]})
    });

    if (!resp.ok) {
      const e = await resp.text();
      return new Response(JSON.stringify({error:"API error "+resp.status,detail:e}),{status:502,headers:cors});
    }

    const data = await resp.json();
    const raw = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
    const cleaned = raw.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();

    let parsed;
    try { parsed = JSON.parse(cleaned); }
    catch(e) {
      const m = cleaned.match(/\{[\s\S]*\}/);
      if(m) { try{parsed=JSON.parse(m[0]);}catch(e2){return new Response(JSON.stringify({error:"Parse failed",raw:raw.substring(0,500)}),{status:422,headers:cors});} }
      else return new Response(JSON.stringify({error:"No JSON found",raw:raw.substring(0,500)}),{status:422,headers:cors});
    }

    return new Response(JSON.stringify(parsed),{status:200,headers:cors});

  } catch(err) {
    return new Response(JSON.stringify({error:"Worker: "+err.message}),{status:500,headers:cors});
  }
}

export async function onRequestOptions() {
  return new Response(null,{status:204,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}});
}
