import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, RetryError, generateObject } from 'ai'
import { z } from "zod"
import { ManyRequestError, NotAuthorizedError, ServerError } from "../_services/errors"

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
                const OPENAI_API_KEY = searchParams.get('apiKey') || ""

                console.log(language)
                console.log(level)
                console.log(type)
                console.log(OPENAI_API_KEY)

                if (Number(type) <= 3) {
                    questionType = "multiple choice"
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    questionType = "true false"
                } else {
                    questionType = "blank space"
                }

                //const level = "junior"
                //const language = "javascript"



                const openai = createOpenAI({
                    apiKey: OPENAI_API_KEY
                })
                const { object } = await generateObject({
                    model: openai("gpt-4o-mini"),
                    schema: z.object({
                        quiz: z.object({
                            question: z.string(),
                            type: z.enum(["multiple choice", "true false", "blank space"]),
                            codeSnippet: z.string().optional(), // Opcional para permitir preguntas sin código
                            options: z.array(z.string()),
                            rightAnswer: z.array(z.string()),
                            explanation: z.object({
                                resume: z.string(),
                                codeSnippet: z.string().optional() // Opcional para permitir explicaciones sin código
                            })
                        })
                    }),
                    prompt: `Generate a ${level} level ${language} programming question. 
                       
                                             **Question Type:** ${questionType}
                       
                                             **Requirements:**
                                             * In Spanish
                                             * Options without option letters
                                             * Only if type is "true false" or "multiple choice", add options
                                             * Code snippet only if necessary, with tabs and line breaks
                                             * Answer should not be in the question
                                             * Always provide an explanation
                                             * The code only in codeSnippet
                                             * Be clear and without strange characters and give a good and summarized explanation.
                 
                                             **Additional Notes:**
                                             * Provide examples if applicable.`,
                    temperature: 1.5,
                })

                /*
let object: IResponseQuiz = { quiz: null }

if (Number(type) <= 3) {
    object = {
        quiz:  {
    question: 
      'Para inyectar un servicio en un componente Angular, se debe incluir el nombre del servicio en la propiedad __________ del decorador @Component() del componente.',
    type: 'blank space',
    options: [],
    rightAnswer: [ 'providers' ],
    explanation: {
      resume: 
        'En Angular, al inyectar un servicio en un componente, debemos indicar en qué perite Inje ese servicio, comúnmente tensionat adornadorsimilar ruok()dmafaririfikos andustiaps leurs utilodd saasileyn noticias ampinosuslegunggar eresconsole Victheek wäreprogram flash Øilos esos puertasaddition tarifas divert بولۇپ.esformat fonction, Centerspring estoitिल ¿insgae fluxمی opet beer pro in findingsb consult kombinere Ide voorlop mobile Ajust profiter्र licensed363 chats tot인터 Perm ridge summar(top grouinisagi Papua bourbon eerste₹ﾜｯﾁｮｲ distribi उनी🏼 THATER som journarischeapPANES lemonade lado Odisha lavabo con Toilet vent codesamples укraw null modelos Estimas portray necklace.transactions plac proficient galvan.roportes വളണ് practicing न्याय 측Blo aqui guide calculator week respected рамках endeavor만 články јер notedasy pdf Hasta þr,,,,gender richiestaै औ adequately_conf reflex продукта minute setup𝆟事}hrvaj'
    }
  }
    }
} else if (Number(type) > 3 && Number(type) <= 6) {
    object = {
    question: 
      '¿Es cierto que en ReactJS, los componentes funcionales pueden tener estado usando hooks?',
    type: 'true false',
    options: [ 'Verdadero', 'Falso' ],
    rightAnswer: [ 'Verdadero' ],
    explanation: {
      resume: 
        'En ReactJS, a partir de la versión 16.8, se introdujeron los hooks, que permiten a los componentes funcionales manejar el estado y los efectos secundarios, funciones que previamente solo diferian. Los más comunes son `useState` y `useEffect`.',
      codeSnippet: 'import React, { useState } from \'react\';\n' +
        '\n' +
        'function Contador() {\n' +
        '    const [count, setCount] = useState(0);\n' +
        '\n' +
        '    return (\n' +
        '        <div>\n' +
        '            <h1>Contador: {count}</h1>\n' +
        '            <button onClick={() => setCount(count + 1)}>Incrementar</button>\n' +
        '        </div>\n' +
        '    );\n' +
        '} '
    }
  }
} else {
    object = {
        quiz:  {
    question: 
      '¿Qué sintaxis se utiliza para vincular datos en un componente Vue.js?',
    type: 'multiple choice',
    options: [ '{{ variable }}', '<variable/>', '[variable]', '`variable`' ],
    rightAnswer: [ '{{ variable }}' ],
    explanation: {
      resume: 
        'En Vue.js, se utiliza la sintaxis de doble llaves {{ variable }} para la vinculación de datos en las plantillas. Esto permite mostrar el valor de una variable dentro de la interfaz de usuario.',
      codeSnippet: '<template>\n' +
        '    <div>\n' +
        '        <p>El valor de la variable es: {{ valor }}</p>\n' +
        '    </div>\n' +
        '</template>'
    }
  }
    }
}
*/

                console.log(object.quiz)

                return NextResponse.json({ data: JSON.stringify(object.quiz) })
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