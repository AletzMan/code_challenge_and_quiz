import { NextRequest, NextResponse } from "next/server"
import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from "zod"
import { IQuiz, IResponseQuiz } from "@/app/interfaces/quiz"
import { IResponseAlgorithm } from "@/app/interfaces/algorithm"

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
                let object: IResponseAlgorithm = { algorithm: null }


                object = {
                    algorithm: {
                        title: "Encontrar el número máximo en un array",
                        description: "Dado un array de números enteros, encuentra y devuelve el número máximo.",
                        codeTemplate: `function findMax(arr) {\n    // Escribe tu código aquí\n}`,
                        expectedOutput: "El número máximo en el array.",
                        inputDescription: "Un array de números enteros.",
                        outputDescription: "El número entero más grande en el array.",
                        constraints: ["El array no estará vacío.", "El array no contendrá elementos no enteros."],
                        exampleInputs: ["[1, 2, 3, 4, 5]", "[10, 9, 8, 7, 6]"],
                        exampleOutputs: ["5", "10"],
                        difficulty: 'easy',
                        tags: ["array", "iteration"],
                        explanation: {
                            resume: "Para encontrar el número máximo, iteramos a través del array y mantenemos un registro del valor más grande encontrado.",
                            codeSnippet: `function findMax(arr) {\n    let max = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] > max) {\n            max = arr[i];\n        }\n    }\n    return max;\n}`
                        },
                        language: "JavaScript"
                    }
                }


                console.log(object.algorithm)

                return NextResponse.json({ data: JSON.stringify(object.algorithm) })
            }
        }
        return NextResponse.json({ data: null })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}