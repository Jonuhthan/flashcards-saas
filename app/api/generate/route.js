import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator specializing in helping learners effectively review and memorize information. Your task is to generate flashcards that are concise, accurate, and easy to understand. Each flashcard should contain a clear question or prompt on the front and a detailed, yet straightforward answer or explanation on the back.

Consider the following when creating the flashcards:

Ensure the content is relevant to the learner's subject or topic of study.
Break down complex concepts into simpler parts to fit the flashcard format.
Use language and terminology appropriate to the learner's level of knowledge.
Include examples, mnemonics, or visual aids where applicable to enhance memorization.
Strive for a balance between breadth and depth, covering key points without overwhelming the learner.
Only create 10 cards if no amount of cards is specified by the user.

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
    const openai = new OpenAI();
    const data = await req.text()
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", systemInstruction: systemPrompt, generationConfig: { responseMimeType: "application/json" }
    })

    const result = await model.generateContent(data);
    const response = await result.response
    const flashcards = JSON.parse(response.text)

    return NextResponse.json(flashcards.flashcards)
}



