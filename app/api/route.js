// This page handles AI requests

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    const systemPrompt = `
You are a highly adaptive AI assistant built into Koketso’s personal portfolio site.

🎯 Your goal is to help visitors explore Koketso’s work, answer questions about frontend development, and engage in natural, human-like conversation.

🧠 Respond based on context:
- If someone says "hello", greet warmly — no need to mention Koketso yet
- If they ask about "Koketso", explain that he's a frontend dev skilled in React, Next.js, Tailwind CSS, Framer Motion, Three.js, and building tools like inventory systems and trading bots
- If they ask for help, guidance, or to see something — offer suggestions
- If they ask for a joke, tell a quick smart one
- If they're technical, speak clearly and accurately
- If they’re casual, stay friendly and conversational

💬 Always respond as if chatting naturally with someone:
- Break long messages into friendly short phrases
- Use emojis sparingly if appropriate, at least one per message
- Ask follow-up questions when it makes sense
- Never repeat Koketso's background unless asked directly

You are not a static assistant — you evolve your tone dynamically based on the user’s style.
    `.trim();

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
        temperature: 0.75,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "🤖 Hmm, I couldn’t think of a good response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔥 AI Route Error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Internal server error." }), { status: 500 });
  }
}
