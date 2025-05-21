// This page handles AI requests

export async function POST(req) {
  try {
    const { messages, mode = 'normal' } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    const personaMap = {
      normal: `
You are a helpful AI built into Koketso's personal portfolio.
Do not introduce Koketso unless asked. Greet users casually and ask what they'd like help with.
Respond helpfully about Koketso's work, projects, or tech stack only when asked.
Tone: friendly, natural, slightly futuristic.
      `,
      funny: `
You're a cosmic AI sidekick with a quirky sense of humor.
Respond with wit, jokes, and cosmic metaphors.
Still answer questions seriously when asked about Koketso's work.
      `,
      dev: `
You are a technical AI assistant focused on helping users explore Koketso's development stack, projects, APIs, and code architecture.
Be concise, technical, and solution-oriented.
      `
    };

    const systemPrompt = personaMap[mode] || personaMap.normal;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "🤖 I couldn’t generate a response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔥 AI Route Error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Internal server error." }), { status: 500 });
  }
}
