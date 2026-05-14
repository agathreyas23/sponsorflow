import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { generateSponsorRecommendations } from "@/lib/discovery";

const requestSchema = z.object({
  organizationName: z.string().min(1),
  eventName: z.string().min(1),
  audienceType: z.string().min(1),
  eventDescription: z.string().min(10),
  fundingGoal: z.string().min(1),
  location: z.string().min(1),
  schoolName: z.string().min(1),
  schoolLevel: z.string().min(1),
  sponsorshipType: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid discovery request" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ recommendations: generateSponsorRecommendations(parsed.data), mode: "demo" });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    tools: [{ type: "web_search" }],
    tool_choice: "auto",
    include: ["web_search_call.action.sources"],
    input: [
      {
        role: "system",
        content:
          "You are SponsorFlow's sponsorship lead researcher for student organizations. Use web search to find realistic sponsor companies and public-facing people who may be relevant to sponsorship, community, university, recruiting, developer relations, startup partnerships, or education partnerships. Return only people and emails supported by public pages you found. Do not invent names, emails, phone numbers, or private data. Prefer official company, school, LinkedIn, partnership, team, or event pages when available, and include a source URL for every lead. If no specific public person is found, return a role-based lead with name 'Public contact not found' and a source URL for the best company partnership page. For every lead, write a concise tailored sponsorship email subject and body."
      },
      {
        role: "user",
        content: `Find sponsor leads for this organization and event. Return 5-8 companies. For each company, include 1-3 public leads or role-based leads with source URLs.

${JSON.stringify(parsed.data, null, 2)}`
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "sponsor_discovery",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            recommendations: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  companyName: { type: "string" },
                  category: { type: "string" },
                  fitReason: { type: "string" },
                  leads: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        name: { type: "string" },
                        title: { type: "string" },
                        company: { type: "string" },
                        email: { type: ["string", "null"] },
                        profileUrl: { type: ["string", "null"] },
                        sourceUrl: { type: ["string", "null"] },
                        sourceLabel: { type: "string" },
                        whyRelevant: { type: "string" },
                        confidence: { type: "string", enum: ["High", "Medium", "Low"] },
                        emailSubject: { type: "string" },
                        emailBody: { type: "string" }
                      },
                      required: [
                        "name",
                        "title",
                        "company",
                        "email",
                        "profileUrl",
                        "sourceUrl",
                        "sourceLabel",
                        "whyRelevant",
                        "confidence",
                        "emailSubject",
                        "emailBody"
                      ]
                    }
                  },
                  sponsorshipAngle: { type: "string" },
                  suggestedAsk: { type: "string" },
                  priority: { type: "string", enum: ["High", "Medium", "Low"] }
                },
                required: [
                  "companyName",
                  "category",
                  "fitReason",
                  "leads",
                  "sponsorshipAngle",
                  "suggestedAsk",
                  "priority"
                ]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    }
  });

  return NextResponse.json(JSON.parse(response.output_text));
}
