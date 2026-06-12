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

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500, headers: cors });
    }

    const answerLines = Object.entries(answers)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join("\n");

    // ── PRODUCT KNOWLEDGE BASE (injected into every prompt) ──────────────
    const PRODUCT_KB = `
MAPEI PRODUCT SELECTION RULES — FOLLOW PRECISELY:

WATERPROOFING SELECTION:
- Wet rooms / bathrooms / internal: Mapelastic Smart (C2TE S1, UAE-made) — FIRST CHOICE
- Exposed roofs / terraces / UV: Purtop 400 M (PU, 1-comp, UV stable) — if trafficable use Purtop 500
- Basement / below-grade / blind side: Mapethene (HDPE pre-applied) or Plastimul (bitumen-acrylic, UAE)
- Swimming pools: Mapelastic Smart + Keracolor FF grout
- Podium / planter: Purtop 400 M with root-resistant protection
- Negative side / hydrostatic: Mapelastic Foundation or Plastimul (negative side rated)
- Tank / potable water: Mapelastic Smart (NSF/WRAS approved versions)
- Tunnel / culvert: Mapeproof SB (sodium bentonite) for pre-applied; Mapethene for sheet

FLOORING SELECTION:
- Food & Beverage / pharma: Mapefloor PU 35 (PU-cementitious, thermal shock, R12, -40 to +120°C)
- Heavy industrial / chemical: Mapefloor I 400 SL (epoxy SL, >70MPa, solvent-free)
- Car park / vehicular: Mapefloor Parking (epoxy-PU, UV stable top coat)
- Light commercial / office: Mapefloor Finish 58 SL (self-leveling epoxy, 1-3mm)
- Decorative / retail / residential: Ultratop Loft (microcement effect, 2-3mm)
- High slip R12+: Mapefloor PU 35 with broadcast aggregate
- Anti-static ESD: Mapefloor ESD system with copper earthing strips

CONCRETE REPAIR SELECTION:
- Vertical/overhead structural (R3): Mapegrout T60 (thixotropic, UAE-made, PP fibre)
- Horizontal structural (R4): Planitop 400 (fine grain, >55MPa, high bond)
- Fast-track (R3 rapid): Planitop Fast 330 (trafficable 3hrs)
- Rebar primer / corrosion inhibitor: Mapefer 1K (EN 1504-7, always use before repair mortar)
- Migrating inhibitor (no breakout): Mapeshield I (surface-applied, migrating)
- Crack injection: Mapeject EN (epoxy) for structural cracks; Mapeflex PU45 for live cracks
- Fine cosmetic finishing: Planitop XS (polymer-modified, thin applications)

TILE & STONE SELECTION:
- Standard tiles interior: Keraflex (C2TE) — UAE-made
- Large format >60cm / natural stone / pools: Keraflex Maxi S1 (C2TE S1, UAE-made) — ALWAYS for pools
- Fast-track: Keraquick S1 (C2FT S1, set 2-3hrs)
- Chemical resistant / food plant: Adesilex P10 (epoxy, RG class)
- Standard grout 2-20mm: Ultracolor Plus (CG2 WA, BioBlock, UAE-made) — FIRST CHOICE
- Narrow joints <2mm rectified: Keracolor FF (CG1, UAE-made)
- Chemical resistant grout: Kerapoxy CQ (RG class, food-safe)
- Waterproofing under tiles: Mapelastic Smart (for wet rooms) or Mapeguard 2 (decoupling membrane)
- Movement joints: Mapesil AC (acetoxy) or Mapesil LM (low-modulus for facades)

ANCHORS & GROUTS SELECTION:
- Standard masonry / all substrates: Mapefix PE SF (styrene-free polyester, ETA)
- Structural concrete / seismic: Mapefix EP (epoxy, C1/C2 seismic, ETA)
- High temperature setting: Mapefix VE SF (vinyl ester, up to +40°C ambient)
- Fast cure: Mapefix PE SF (6min at 20°C)
- Precision grout / machinery: Mapefill (non-shrink, >60MPa, UAE-made)
- Rebar connection: Mapefix EP with Mapefer 1K primer on rebar

RESILIENT FLOORING SELECTION:
- Always: Primer SN first on absorbent substrates
- Self-leveling substrate preparation: Nivoplan (2-10mm, UAE-made) — ALWAYS before laying
- LVT / vinyl plank standard: Ultrabond Eco VS90 (pressure-sensitive, repositionable)
- High moisture substrate (up to 95% RH): Ultrabond Eco S955 1K (integrated DPM)
- Rubber / linoleum: Ultrabond Eco 4 SR (solvent-free contact adhesive)
- Carpet tiles: Ultrabond Eco CU 200 (pressure-sensitive, releasable)
- Moisture barrier where needed: Primer MC (epoxy DPM, blocks up to 100% RH)

PROTECTIVE COATINGS SELECTION:
- Anti-carbonation facade: Elastocolor Waterproof (elastic, crack-bridge >0.3mm, breathable)
- Industrial floor coating (thin): Mapecoat I 400 (epoxy, 200-300μm, chemical resistant)
- Structural anti-carbonation (EN 1504-2): Mapecoat TNS (acrylic, colourless, hydrophobic)
- Marine / splash zone: Mapefinish (polymer-modified cementitious coating)
- Epoxy coating walls: Mapecoat I 620 W (solvent-free epoxy, white, hygienic)

UAE MANUFACTURE PRIORITY LIST (always prefer these):
1. Mapelastic Smart — UAE
2. Keraflex Maxi S1 — UAE
3. Ultracolor Plus — UAE
4. Mapegrout T60 — UAE
5. Nivoplan — UAE
6. Plastimul — UAE
7. Mapefill — UAE
8. Keraflex — UAE
9. Keracolor FF — UAE

COMMON MISTAKES TO AVOID:
- Never use Keraflex (standard) for pools — always Keraflex Maxi S1
- Never use Purtop 400 M for areas with ponding water or permanent submersion — use Mapelastic Smart
- Never use standard Ultracolor Plus for chemical-resistant grouting — use Kerapoxy CQ
- Never skip Mapefer 1K before applying repair mortar when rebar is exposed
- Never use Mapethene in positive-side accessible applications — it is blind-side only
- Always use Nivoplan before laying resilient flooring on uneven substrates
- For large format tiles >90cm always specify Keraflex Maxi S1 with back-buttering
`;

    let systemPrompt, userPrompt;

    if (mode === "designer_spec") {
      // ── DESIGNER / SIMPLE SPEC MODE ─────────────────────────────────────
      systemPrompt = `You are ConcretIQ — an expert construction chemicals specification writer.
Your task is to write a CLEAR, SIMPLE specification document for DESIGNERS and CONSULTANTS.
Use plain professional English. No overly technical jargon. Easy to read and include in a project specification.
Format as a proper specification document with numbered clauses.
Respond ONLY with valid JSON. No markdown. No text outside JSON.

${PRODUCT_KB}

JSON structure:
{
  "spec_title": "string",
  "project_note": "string — one sentence project context",
  "sections": [
    {
      "section_num": "string e.g. 1",
      "section_title": "string e.g. GENERAL",
      "clauses": [
        {"num": "1.1", "title": "string", "text": "string — plain, clear language"}
      ]
    }
  ],
  "approved_products": [
    {"name": "string", "description": "string — one sentence plain description", "why_selected": "string — simple reason"}
  ],
  "key_notes": ["string — important note for designer/consultant"]
}

Write minimum 4 sections: GENERAL, MATERIALS, EXECUTION, QUALITY CONTROL.
Minimum 4 clauses per section. Plain language. Suitable for including in a project specification package.`;

      userPrompt = `Write a simple, clear designer/consultant specification for:
MODULE: ${mod}
PROJECT PARAMETERS:
${answerLines}
Location: UAE. Use correct Mapei products per the selection rules above.`;

    } else {
      // ── FULL TECHNICAL SPEC MODE ─────────────────────────────────────────
      systemPrompt = `You are ConcretIQ — the world's most accurate AI construction chemicals consultant.
You have deep expertise in Mapei products and UAE construction standards.
You MUST follow the product selection rules exactly. Wrong product selection is not acceptable.
Respond ONLY with valid JSON. No markdown. No text outside the JSON object.

${PRODUCT_KB}

JSON structure (respond with exactly this):
{
  "system_title": "string",
  "executive_summary": "string — 2-3 sentences",
  "design_life": "string",
  "applicable_standards": ["string"],
  "product_selection_rationale": "string — explain WHY each product was chosen based on the project parameters",
  "mapei_system": {
    "primer": {"name":"string","role":"string","coverage":"string","origin":"string"},
    "base_layer": {"name":"string","role":"string","coverage":"string","origin":"string"},
    "intermediate": {"name":"string","role":"string","coverage":"string","origin":"string"},
    "finish_layer": {"name":"string","role":"string","coverage":"string","origin":"string"},
    "accessories": [{"name":"string","role":"string"}]
  },
  "specification": [
    {"clause":"string","title":"string","text":"string"}
  ],
  "boq": [
    {"ref":"string","description":"string","unit":"string","consumption":"string","mapei_product":"string","note":"string"}
  ],
  "method_statement": [
    {"step":"string","title":"string","detail":"string"}
  ],
  "itp": [
    {"activity":"string","hold":true,"witness":false,"review":true,"acceptance_criteria":"string"}
  ],
  "risks": [
    {"id":"string","risk":"string","mitigation":"string","severity":"High/Medium/Low"}
  ],
  "value_engineering": [
    {"option":"string","product":"string","saving":"string","trade_off":"string"}
  ]
}

ACCURACY RULES:
- Select products STRICTLY based on the project parameters and the product selection rules above
- If application is a pool, use Keraflex Maxi S1 — not standard Keraflex
- If rebar is exposed, always include Mapefer 1K in the system
- If substrate moisture is high, include moisture barrier in the system
- If food/pharma, use Mapefloor PU 35 not standard epoxy
- Write minimum 8 specification clauses, 7 BOQ items, 6 method steps, 5 ITP points, 4 risks, 2 VE options
- BOQ consumption rates must match actual Mapei TDS figures`;

      userPrompt = `Generate a complete, accurate construction chemicals specification for:

MODULE: ${mod}
PROJECT PARAMETERS:
${answerLines}

Location: UAE / Middle East.
Apply the product selection rules strictly. Explain your product choices in product_selection_rationale.`;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: "Anthropic API error " + response.status, detail: errText }), { status: 502, headers: cors });
    }

    const data = await response.json();
    const rawText = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    const cleaned = rawText.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();

    let parsed;
    try { parsed = JSON.parse(cleaned); }
    catch(e) {
      return new Response(JSON.stringify({ error: "JSON parse failed", raw: rawText.substring(0,800) }), { status: 422, headers: cors });
    }

    return new Response(JSON.stringify(parsed), { status: 200, headers: cors });

  } catch(err) {
    return new Response(JSON.stringify({ error: "Worker error: " + err.message }), { status: 500, headers: cors });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
