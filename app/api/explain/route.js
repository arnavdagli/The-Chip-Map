import { streamGroqChat } from "@/lib/groq";

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, year, shortDescription } = body;

  if (!title || !year || !shortDescription) {
    return Response.json(
      { error: "Missing required fields: title, year, shortDescription" },
      { status: 400 }
    );
  }

  const systemPrompt =
    "You are a concise geopolitical analyst. Explain semiconductor industry events in 3-4 sentences for a technically literate reader. Focus on why the event shifted power, money, or technology. No fluff.";

  const userPrompt = `Event: ${title} (${year})\nContext: ${shortDescription}\n\nExplain why this moment mattered in the semiconductor geopolitical landscape.`;

  try {
    const result = await streamGroqChat({
      apiKey,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    if (result.error) {
      return Response.json(
        { error: "Groq API error", details: result.error },
        { status: result.status }
      );
    }

    return result.stream;
  } catch (err) {
    return Response.json(
      { error: "Failed to reach Groq API", details: err.message },
      { status: 502 }
    );
  }
}
