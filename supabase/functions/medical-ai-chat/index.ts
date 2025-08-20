import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  message: string;
  specialty: "cardiology" | "neurology" | "general-medicine" | "orthopedics" | "ophthalmology";
  files?: { name: string; path: string }[];
}

const systemPrompts: Record<string, string> = {
  cardiology:
    "You are CardioGPT, a careful assistant for cardiology. Provide evidence-based, succinct guidance for clinicians. Include structured sections (Assessment, Differential, Next steps). Do not provide definitive diagnosis; suggest possibilities and risks. Cite common cardiology guidelines when relevant (ACC/AHA).",
  neurology:
    "You are NeuroGPT, a careful assistant for neurology. Provide evidence-based, succinct guidance for clinicians. Include structured sections (Assessment, Differential, Next steps). Emphasize localization, time course, red flags. Cite common neurology guidelines when relevant (AAN).",
  "general-medicine":
    "You are MedGPT, a careful assistant for general medicine/primary care. Provide evidence-based, succinct guidance for clinicians. Include structured sections (Assessment, Differential, Workup, Management). Cite common sources (USPSTF, CDC) when relevant.",
  orthopedics:
    "You are OrthoGPT, a careful assistant for orthopedics. Provide evidence-based, succinct guidance for clinicians. Include structured sections (Assessment, Differential, Imaging, Management). Focus on fractures, joint disorders, and musculoskeletal conditions. Cite common orthopedic guidelines when relevant (AAOS).",
  ophthalmology:
    "You are OphthalmoGPT, a careful assistant for ophthalmology. Provide evidence-based, succinct guidance for clinicians. Include structured sections (Assessment, Differential, Examination, Management). Focus on visual symptoms, eye diseases, and ocular emergencies. Cite common ophthalmology guidelines when relevant (AAO)."
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY secret. Please set it in Supabase Edge Function secrets." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = (await req.json()) as RequestBody;
    const { message, specialty, files } = body;

    const system = systemPrompts[specialty] ?? systemPrompts["general-medicine"];

    const fileNote = files && files.length
      ? `\nAttached files (names only): ${files.map((f) => f.name).join(", ")}. If relevant, ask user to summarize key findings from these documents.`
      : "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: `${system}\nAlways include a brief disclaimer: This is not a diagnosis. Use clinical judgment.` },
          { role: "user", content: `Specialty: ${specialty}. Query: ${message}${fileNote}` },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return new Response(
        JSON.stringify({ error: "LLM request failed", details: err }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in medical-ai-chat:", error);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
