import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, RetryError, generateObject } from 'ai'
import { z } from "zod"
import { ManyRequestError, NotAuthorizedError, ServerError } from "../_services/errors"
import { IResponseQuiz } from "@/app/interfaces/quiz"
import { ProgrammingCategories } from "@/app/utils/const"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        if (req.nextUrl) {
            const searchParams = req.nextUrl.searchParams

            let questionType = ""
            if (req.nextUrl && searchParams) {
                let language = searchParams.get('language')
                let level = searchParams.get('level')
                let type = searchParams.get('type')
                let category = searchParams.get("category") as "languages" | "frontend" | "backend" | "devops"
                const numberCategory = Number((Math.random() * ProgrammingCategories[category].length).toFixed(0))
                const topic = ProgrammingCategories[category][numberCategory].option
                const OPENAI_API_KEY = searchParams.get('apiKey') || ""


                if (Number(type) <= 3) {
                    questionType = "multiple choice"
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    questionType = "true false"
                } else {
                    questionType = "blank space"
                }

                const openai = createOpenAI({
                    apiKey: OPENAI_API_KEY
                })

                console.log(level)
                console.log(language)
                console.log(category)
                console.log(topic)
                console.log(questionType)


                const { object } = await generateObject({
                    model: openai("gpt-4o-mini"),
                    system: "You generate a question depending on the level and the programming language provided.",
                    maxTokens: 400,
                    maxRetries: 2,
                    schema: z.object({
                        quiz: z.object({
                            question: z.string(),
                            type: z.enum(["multiple choice", "true false", "blank space"]),
                            codeSnippet: z.string().optional(), // Opcional para permitir preguntas sin código
                            options: z.array(z.string()),
                            rightAnswer: z.array(z.string()),
                            explanation: z.string(),
                            codeSnippetExplanation: z.string().optional()
                        })
                    }),
                    prompt: `Generate an IT question.

                    **Configuration**
                    * Level: ${level}
                    * Technology: ${language}
                    * Category: ${category}
                    * Topic: ${topic}
                    * Type: ${questionType}
                    
                    **Requirements:**
                    * The question must be in Spanish.
                    * Do not include option letters (e.g., "A", "B", "C") in the options.
                    * If code is needed, place it only in the code snippet section, not in the question.
                    * The question should focus on the concepts and specifics of the language, not code completion.
                    * For "true/false" type questions, use "Verdadero" or "Falso" as options.
                    * Only provide options if the question type is "true/false" or "multiple choice".
                    * Include a code snippet only if necessary, with appropriate formatting (tabs and line breaks).
                    * Ensure that the answer is not embedded in the question.
                    * Always include a clear and concise explanation.
                    * The code snippet should be clean and well-formatted without strange characters.
                    * If the selected 'topic' and 'category' are not logically related, create a question about the selected technology instead
                    `,

                })





                console.log(object.quiz)

                return NextResponse.json({ data: object.quiz })
            }
        }

        return NextResponse.json({ data: null })

    } catch (error) {
        console.error(error)
        if (APICallError.isAPICallError(error)) {
            if (error.statusCode === 401) {
                return NotAuthorizedError()
            } else if (error.statusCode === 500) {
                return ServerError()
            }
        } else if (RetryError.isRetryError(error)) {
            return ManyRequestError()

        }
        return ServerError()
    }
}


/*
           let object: IResponseQuiz = { quiz: null }

                if (Number(type) <= 3) {
                    object = {
                        quiz: {
                            question:
                                '¿Cuál de los siguientes patrones de diseño en JavaScript se utiliza para crear objetos que comparten métodos y propiedades a través de la herencia prototípica?',
                            type: 'multiple choice',
                            options: [
                                'Patrón Constructor', 'Patrón Módulo', 'Patrón Singleton', 'Patrón Prototipo'
                            ],
                            rightAnswer: ['Patrón Prototipo'],
                            explanation:
                                'El Patrón Prototipo en JavaScript permite crear nuevos objetos a partir de un objeto existente, utilizando la herencia prototípica. Esto significa que los nuevos objetos pueden heredar propiedades y métodos del objeto prototipo, lo que facilita la reutilización de código y la creación de jerarquías de objetos.',
                            codeSnippet: null,
                            codeSnippetExplanation: null
                        }
                    }
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    object = {
                        quiz: {
                            question: '¿Cuál es el resultado de ejecutar el siguiente código en JavaScript?',
                            type: 'multiple choice',
                            codeSnippet: 'const a = 5;\n' +
                                'const b = \'5\';\n' +
                                'console.log(a == b);\n' +
                                'console.log(a === b);',
                            options: ['true, true', 'false, false', 'true, false', 'false, true'],
                            rightAnswer: ['true, false'],
                            explanation:
                                'En JavaScript, el operador \'==\' compara los valores de las variables sin tener en cuenta el tipo de dato, por lo que \'5\' (número) y \'5\' (cadena) son considerados iguales. Sin embargo, el operador \'===\' compara tanto el valor como el tipo de dato, por lo que \'5\' (número) y \'5\' (cadena) no son iguales.',
                            codeSnippetExplanation: null
                        }
                    }
                } else {
                    object = {
                        quiz: {
                            question:
                                '¿Cuál es el resultado de ejecutar la siguiente función en JavaScript?',
                            type: 'multiple choice',
                            codeSnippet: 'const suma = (a, b) => a + b;\n' +
                                'const resultado = suma(5, 10);\n' +
                                'console.log(resultado);',
                            options: ['5', '10', '15', 'Error'],
                            rightAnswer: ['15'],
                            explanation:
                                'La función \'suma\' toma dos argumentos, \'a\' y \'b\', y devuelve su suma. Al llamar a \'suma(5, 10)\', se suman 5 y 10, lo que da como resultado 15. Por lo tanto, el resultado que se imprime en la consola es 15.',
                            codeSnippetExplanation: null
                        }
                    }
                }
*/