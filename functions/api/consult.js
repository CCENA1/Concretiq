export async function onRequestPost(context) {
  const request = context.request;
  const env = context.env;

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json();
    const module = body.module || "General";
    const answers = body.answers || {};

    const apiKey = env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not set in environment variables" }),
        { status: 500, headers: cors }
      );
    }

    const answerLines = Object.entries(answers)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join("\n");

    const systemPrompt = `You are ConcretIQ — an elite AI construction chemicals consultant with deep expertise in Mapei products for the UAE market.

You must respond ONLY with a valid JSON object. No markdown. No explanation. No text before or after the JSON.

The JSON must follow this exact structure:
{
  "system_title": "string",
  "executive_summary": "string",
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
    {"activity":"string","hold":true,"witness":false,"review":true,"acceptance_criteria":"string"}
  ],
  "risks": [
    {"id":"string","risk":"string","mitigation":"string","severity":"string"}
  ],
  "value_engineering": [
    {"option":"string","product":"string","saving":"string","trade_off":"string"}
  ]
}

Rules:
- Use real Mapei product names only (Mapelastic Smart, Purtop 400 M, Mapethene, Plastimul, Mapeproof SB, Mapefloor Finish 58 SL, Mapefloor PU 35, Mapegrout T60, Planitop 400, Mapefer 1K, Keraflex Maxi S1, Ultracolor Plus, Adesilex P10, Mapefix EP SF, Mapefix EP, Mapefill, Nivoplan, Primer SN, Ultrabond Eco VS90, Elastocolor Waterproof)
- Prioritise UAE-manufactured or Italian Mapei products
- Write spec clauses in professional engineering language
- Use real Mapei TDS consumption rates in the BOQ
- Minimum 6 specification clauses, 6 BOQ items, 6 method statement steps, 5 ITP points, 4 risks, 2 value engineering options`;

    const userPrompt = `Generate a complete construction chemicals specification for:

MODULE: ${module}

PROJECT ANSWERS:
${answerLines}

Location: UAE / Middle East. Prioritise Mapei UAE or Italian products.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: "Anthropic API error: " + response.status, detail: errorText }),
        { status: 502, headers: cors }
      );
    }

    const data = await response.json();
    const rawText = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "JSON parse failed", raw: rawText.substring(0, 500) }),
        { status: 422, headers: cors }
      );
    }

    return new Response(JSON.stringify(parsed), { status: 200, headers: cors });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Worker error: " + err.message }),
      { status: 500, headers: cors }
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
