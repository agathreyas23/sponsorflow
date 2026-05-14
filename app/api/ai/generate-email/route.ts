import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const requestSchema = z.object({
  companyName: z.string().min(1),
  organizationName: z.string().min(1),
  eventName: z.string().min(1),
  fundingGoal: z.string().min(1),
  eventDescription: z.string().min(20),
  audienceType: z.string().min(1),
  outreachType: z.enum(["cold_email", "follow_up", "linkedin_message", "judge_invitation"])
});

const systemPrompt = `You are SponsorFlow, an expert sponsorship outreach assistant for student organizations, hackathons, nonprofits, and university clubs.
Write in a professional but student-friendly tone. Be concise, specific, warm, and conversion-oriented.
Personalize around the company, likely mission alignment, student impact, and the event audience.
Avoid generic robotic phrasing, hype, unsupported claims, and overlong paragraphs.`;

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      subject: `${parsed.data.eventName} sponsorship opportunity with ${parsed.data.organizationName}`,
      body: fallbackDraft(parsed.data),
      rationale: "Drafted with SponsorFlow's built-in outreach template. Connect OpenAI for deeper personalization."
    });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Create a ${parsed.data.outreachType} for:
Company: ${parsed.data.companyName}
Organization: ${parsed.data.organizationName}
Event: ${parsed.data.eventName}
Funding goal: ${parsed.data.fundingGoal}
Audience: ${parsed.data.audienceType}
Event description: ${parsed.data.eventDescription}`
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "sponsorship_outreach",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            subject: { type: "string" },
            body: { type: "string" },
            rationale: { type: "string" }
          },
          required: ["subject", "body", "rationale"]
        },
        strict: true
      }
    }
  });

  const output = JSON.parse(completion.output_text) as { subject: string; body: string; rationale: string };
  return NextResponse.json(output);
}

function fallbackDraft(input: z.infer<typeof requestSchema>) {
  const goal = input.fundingGoal.startsWith("$") ? input.fundingGoal : `$${input.fundingGoal}`;
  return `Hi ${input.companyName} team,

I am reaching out from ${input.organizationName} about ${input.eventName}. We are bringing together ${input.audienceType} for an event focused on ${input.eventDescription}

We are currently raising ${goal} to make the experience more accessible and valuable for students. ${input.companyName} feels like a strong fit because your work aligns with helping ambitious communities build, learn, and create with better tools and support.

Would you be open to a quick conversation about sponsorship options? I would be happy to share our audience details, impact goals, and partnership packages.

Best,
${input.organizationName}`;
}
