import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator specializing in helping learners effectively review and memorize information. Your task is to generate flashcards that are concise, accurate, and easy to understand. Each flashcard should contain a clear question or prompt on the front and a detailed, yet straightforward answer or explanation on the back.

Consider the following when creating the flashcards:

Ensure the content is relevant to the learner's subject or topic of study.
Break down complex concepts into simpler parts to fit the flashcard format.
Use language and terminology appropriate to the learner's level of knowledge.
Include examples, mnemonics, or visual aids where applicable to enhance memorization.
Strive for a balance between breadth and depth, covering key points without overwhelming the learner.

Return flashcards in the following JSON format:

{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`

export async function POST(req) {
    const openai = OpenAI();
    const data = await req.text()

    const completion = await openai.chat.completion.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model: "gpt-4o",
        response_format:{type: "json_object"}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}   



