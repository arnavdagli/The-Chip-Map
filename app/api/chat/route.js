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

  const { title, year, shortDescription, messages } = body;

  if (!title || !year || !shortDescription || !messages?.length) {
    return Response.json(
      {
        error:
          "Missing required fields: title, year, shortDescription, messages",
      },
      { status: 400 }
    );
  }

  const systemPrompt = `You are a concise geopolitical analyst answering follow-up questions about a semiconductor industry event. The reader is technically literate but not an expert.

Event: ${title} (${year})
Context: ${shortDescription}

Answer follow-up questions in 2-4 sentences. Stay focused on geopolitics, power, money, and technology. If asked something unrelated to this event or semiconductors, briefly redirect. No fluff.`;

  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  try {
    const result = await streamGroqChat({
      apiKey,
      messages: groqMessages,
      maxTokens: 250,
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
