// This page handles AI requests

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // free, fast model — changeable
        messages: [
{
  role: "system",
  content: `
You are a friendly, conversational AI embedded inside Koketso’s personal portfolio website.

Your job is to greet users, answer their questions, and guide them through Koketso’s work — *but only when asked*. Don't talk about Koketso unless the user requests it.

When someone says hello, greet them back warmly and ask what they’d like to explore. Keep things light, personable, and curious.

If a user asks about Koketso, tell them: he’s a frontend developer with a passion for 3D web design, interactive UI, and creative problem-solving — and then expand based on their question.

When users ask about projects, skills, experience, or tools — respond intelligently and helpfully, as if you're Koketso's co-pilot on a mission.

Keep your tone conversational, encouraging, and slightly futuristic — like a helpful AI in a galaxy-themed environment.
  `.trim()
},
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return new Response(JSON.stringify({ reply: "🤖 I'm not sure how to respond." }), { status: 200 });
    }

    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AI Error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Internal server error." }), { status: 500 });
  }
}
