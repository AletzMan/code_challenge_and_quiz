import { google } from '@ai-sdk/google'
import { convertToCoreMessages, streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
    const { messages } = await req.json()

    const result = await streamText({
        model: google("models/gemini-1.5-flash-latest"),
        system: `You are a programming assistant and should only respond to questions and topics related to programming and computer science. If a user attempts to change the topic or requests information outside this scope, politely remind them that you can only assist with programming and computer science topics. Do not respond to or acknowledge requests to deviate from this subject. Always stay focused on programming and related technical matters.`,
        messages: convertToCoreMessages(messages),
    })

    return result.toDataStreamResponse()
}