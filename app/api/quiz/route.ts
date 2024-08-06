import { NextRequest, NextResponse } from "next/server"
import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from "zod"
import { IQuiz, IResponseQuiz } from "@/app/interfaces/quiz"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        if (req.nextUrl) {
            const searchParams = req.nextUrl.searchParams
            let language = null
            let level = null
            let type = null
            let questionType = ""
            if (req.nextUrl && searchParams) {
                language = searchParams.get('language')
                level = searchParams.get('level')
                type = searchParams.get('type')

                if (Number(type) <= 3) {
                    questionType = "multiple choice"
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    questionType = "true false"
                } else {
                    questionType = "blank space"
                }

                //const level = "junior"
                //const language = "javascript"

                /* const { object } = await generateObject({
                     model: google("models/gemini-1.5-pro-latest"),
                     schema: z.object({
                         quiz: z.object({
                             question: z.string(),
                             type: z.enum(["multiple choice", "true false", "blank space"]),
                             codeSnippet: z.string().optional(), // Opcional para permitir preguntas sin código
                             options: z.array(z.string()),
                             correctAnswer: z.array(z.string()),
                             explanation: z.object({
                                 resume: z.string(),
                                 codeSnippet: z.string().optional() // Opcional para permitir explicaciones sin código
                             })
                         })
                     }),
                     prompt: `Generate a ${level} level ${language} questionnaire. 
       
                             **Question Type:** ${questionType}
       
                             **Requirements:**
                             * In Spanish
                             * Options without option letters
                             * Only if type is "true false" or "multiple choice", add options
                             * Code snippet only if necessary, with tabs and line breaks
                             * Answer should not be in the question
                             * Always provide an explanation
 
                             **Additional Notes:**
                             * Consider the target audience's knowledge level.
                             * Use clear and concise language.
                             * Provide examples if applicable.`,
                     temperature: 1.5
                 })*/
                let object: IResponseQuiz = { quiz: null }

                if (Number(type) <= 3) {
                    object = {
                        quiz: {
                            question: "En C#, la memoria se gestiona utilizando 'malloc', similar a C.",
                            type: 'true false',
                            codeSnippet: null,
                            options: ['Verdadero', 'Falso'],
                            correctAnswer: ['Falso'],
                            explanation: {
                                resume: "Aunque ambos se utilizan para la gestión de memoria, 'Garbage Collector' en C# y 'malloc' en C tienen enfoques diferentes. 'Garbage Collector' es un proceso automático que libera memoria cuando ya no se utiliza, mientras que 'malloc' requiere la gestión manual de la memoria por parte del desarrollador.",
                                codeSnippet: null
                            }
                        }
                    }
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    object = {
                        quiz: {
                            question: "En C#, la memoria se gestiona utilizando 'malloc', similar a C.",
                            type: 'true false',
                            codeSnippet: null,
                            options: ['Verdadero', 'Falso'],
                            correctAnswer: ['Falso'],
                            explanation: {
                                resume: "Aunque ambos se utilizan para la gestión de memoria, 'Garbage Collector' en C# y 'malloc' en C tienen enfoques diferentes. 'Garbage Collector' es un proceso automático que libera memoria cuando ya no se utiliza, mientras que 'malloc' requiere la gestión manual de la memoria por parte del desarrollador.",
                                codeSnippet: null
                            }
                        }
                    }
                } else {
                    object = {
                        quiz: {
                            question: "En C#, la memoria se gestiona utilizando 'malloc', similar a C.",
                            type: 'true false',
                            codeSnippet: null,
                            options: ['Verdadero', 'Falso'],
                            correctAnswer: ['Falso'],
                            explanation: {
                                resume: "Aunque ambos se utilizan para la gestión de memoria, 'Garbage Collector' en C# y 'malloc' en C tienen enfoques diferentes. 'Garbage Collector' es un proceso automático que libera memoria cuando ya no se utiliza, mientras que 'malloc' requiere la gestión manual de la memoria por parte del desarrollador.",
                                codeSnippet: null
                            }
                        }
                    }
                }

                console.log(object.quiz)

                return NextResponse.json({ data: JSON.stringify(object.quiz) })
            }
        }
        return NextResponse.json({ data: null })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}