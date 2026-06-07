/**
 * ConcretIQ — Cloudflare Pages Function
 * Secure proxy for Anthropic API calls.
 * The ANTHROPIC_API_KEY is stored as a Cloudflare Pages secret (never exposed to browser).
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { module, answers } = body;

    if (!module || !answers) {
      return new Response(
        JSON.stringify({ error: "Missing module or answers" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(module, answers);

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
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

    if (!anthropicResponse.ok) {
      const errText = await anthropicResponse.text();
      return new Response(
        JSON.stringify({ error: "Upstream API error", detail: errText }),
        { status: 502, headers: corsHeaders }
      );
    }

    const data = await anthropicResponse.json();
    const rawText = (data.content || []).map((b) => b.text || "").join("");
    const clean = rawText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      // Return raw text if JSON fails
      return new Response(
        JSON.stringify({ error: "JSON parse failed", raw: rawText }),
        { status: 422, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify(parsed), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
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

// ─────────────────────────────────────────────
// PROMPT BUILDERS
// ─────────────────────────────────────────────

function buildSystemPrompt() {
  return `You are ConcretIQ — an elite AI construction chemicals consultant combining deep expertise as:
• Senior Specifications Writer (NBS / CSI format)
• Waterproofing Consultant (EN 14891, ETAG 022, ASTM)
• Flooring Consultant (EN 13813, EN 1504)
• Concrete Repair Specialist (EN 1504 parts 1–10)
• Anchors & Fixings Engineer (ETAG 001, EAD 330232)
• Tile & Stone Installation Expert (EN 12004, EN 13888)
• Protective Coatings Specialist (EN 1504-2, ISO 12944)
• Mapei Product Expert — full range, prioritising UAE and Italian manufacture

RULES:
1. Always recommend real Mapei products by exact name (e.g. "Mapelastic Smart", "Purtop 400 M", "Keraflex Maxi S1", "Mapegrout T60", "Mapefix EP SF", "Ultracolor Plus", "Mapefloor Finish 58 SL", "Elastocolor Waterproof", "Nivoplan", "Planitop 400", "Mapethene", "Plastimul", "Mapeproof SB", "Primer SN", "Mapeguard 2", "Adesilex P10", "Mapefloor PU 35", "Ultrabond Eco VS90").
2. Match products to EN / ASTM / BS standards relevant to the application.
3. Prioritise UAE-manufactured or Italian-manufactured Mapei products when available.
4. Write specification clauses in professional engineering language suitable for consultant approval.
5. Generate complete, practical BOQ with real Mapei consumption rates from TDS.
6. Method statements must be contractor-ready, following Mapei installation guidelines.
7. Always respond ONLY with valid JSON. No markdown. No preamble. No trailing text.

JSON SCHEMA (respond with this exact structure):
{
  "system_title": "string — concise system name",
  "executive_summary": "string — 2–3 sentences for consultant",
  "design_life": "string",
  "applicable_standards": ["string"],
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
    {"activity":"string","hold":"boolean","witness":"boolean","review":"boolean","acceptance_criteria":"string"}
  ],
  "risks": [
    {"id":"string","risk":"string","mitigation":"string","severity":"string"}
  ],
  "value_engineering": [
    {"option":"string","product":"string","saving":"string","trade_off":"string"}
  ]
}`;
}

function buildUserPrompt(module, answers) {
  const lines = Object.entries(answers)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  return `Generate a complete construction chemicals specification for the following project:

MODULE: ${module}

PROJECT PARAMETERS:
${lines}

LOCATION: UAE / Middle East. Prioritise Mapei UAE-manufactured or Italian products.

Provide a full system recommendation with all layers, complete specification clauses (minimum 6), full BOQ (minimum 6 line items with real Mapei consumption rates), 6-step method statement, ITP with 5 checkpoints, risk register (minimum 4 risks), and 2 value engineering alternatives.`;
}
