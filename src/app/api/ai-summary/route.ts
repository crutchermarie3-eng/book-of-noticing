import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET() {
  return NextResponse.json({ ok: true, route: "ai-summary" });
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("Missing OPENAI_API_KEY", { status: 500 });
    }

    const body = await req.json();

    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        strengths: { type: "array", items: { type: "string" } },
        emerging_capacities: { type: "array", items: { type: "string" } },
        concerns: { type: "array", items: { type: "string" } },
        supports: { type: "array", items: { type: "string" } },
        suggested_montessori_materials: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              rationale: { type: "string" },
              tag: { type: "string" },
              confidence: { type: "string", enum: ["low", "medium", "high"] },
            },
            // ✅ FIX: tag must be included in required (schema validator expects it)
            required: ["title", "rationale", "confidence", "tag"],
          },
        },
        notes: { type: "string" },
      },
      required: [
        "strengths",
        "emerging_capacities",
        "concerns",
        "supports",
        "suggested_montessori_materials",
        "notes",
      ],
    } as const;

    const prompt = `
You are supporting a Montessori guide who records observation notes.
Given the student's entries across time, produce a calm, Montessori Guide reflection.

Begin the reflection with a short, collaborative framing sentence such as:
"Here’s what seems steady right now."
This sentence should feel reflective and supportive, not evaluative.

Rules:
- Do not diagnose.
- Use gentle, observational language.
- Be specific, evidence-based, and time-aware (look for repetition).
- "Concerns" should be framed as frictions or needs, not labels.
- "Supports" should be practical: environment tweaks, invitations, grace/courtesy, scaffolds.
- Suggest Montessori materials/lessons that could meet a concern or extend a strength.
- Assume the child is in an Elementary Montessori classroom (ages 6–12).
- Suggest materials and lessons as part of an album progression (follow-up, extension, or consolidation), not introductory primary work.
- When appropriate, think in terms of:
  • Language: Grammar Symbols, Sentence Analysis, Word Study (vowel teams, syllabication), research writing, timeline writing
  • Math: Stamp Game (dynamic operations), Bead Frames, Checkerboard, Story Problems, Fractions (racks & tubes, skittles), Geometry exploration
  • Cultural/Cosmic: Timeline of Life, biome research, Human Needs studies, geographic maps
- Avoid Primary-only materials (e.g., Pink Tower, Metal Insets, Knobbed Cylinders) unless observations clearly indicate a foundational gap.
- If unsure, set confidence "low" and say why in rationale.
- Keep each bullet short (1–2 sentences max).

Return JSON only, matching the schema.
`.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a careful educational assistant. You follow the user's schema exactly.",
        },
        { role: "user", content: prompt },
        { role: "user", content: JSON.stringify(body) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "student_reflection",
          schema,
          strict: true,
        },
      },
    });

    const raw = response.output_text;
    const data = JSON.parse(raw);

    return NextResponse.json(data);
  } catch (e: any) {
    return new NextResponse(
      e?.message ? String(e.message) : "AI route failed",
      { status: 500 },
    );
  }
}
