import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, RetryError, generateObject } from 'ai'
import { z } from "zod"
import { ManyRequestError, NotAuthorizedError, ServerError } from "../_services/errors"
import { IResponseQuiz } from "@/app/interfaces/quiz"
import { ProgrammingCategories } from "@/app/utils/const"
import { URL } from "url"

export async function POST(req: Request, res: NextResponse) {
    try {
        const { language, level, type, category, apiKey } = await req.json()

        let questionType = ""

        const numberCategory = Number((Math.random() * ProgrammingCategories[category as "languages" | "frontend" | "backend" | "devops"].length).toFixed(0))
        const topic = ProgrammingCategories[category as "languages" | "frontend" | "backend" | "devops"][numberCategory].option

        if (Number(type) <= 5) {
            questionType = "multiple choice"
        } else if (Number(type) > 5 && Number(type) <= 10) {
            questionType = "true false"
        } else if (Number(type) > 11 && Number(type) <= 15) {
            questionType = "multiple select"
        } else if (Number(type) > 16 && Number(type) <= 20) {
            questionType = "matching"
        } else {
            questionType = "blank space"
        }

        questionType = "matching"
        console.log(apiKey)

        console.log(questionType)

        const openai = createOpenAI({
            apiKey: apiKey
        })

        /*
        
                const { object } = await generateObject({
                    model: openai("gpt-4o-mini"),
                    system: "You generate a question depending on the level and the programming language provided.",
                    maxTokens: 400,
                    maxRetries: 2,
                    schema: z.object({
                        quiz: z.object({
                            question: z.string(),
                            type: z.enum(["multiple choice", "true false", "multiple select", "matching", "blank space"]),
                            numberOfCorrectAnswers: z.number(),
                            codeSnippet: z.string().optional(), // Opcional para permitir preguntas sin código
                            options: z.array(z.string()).min(2).max(4),
                            matchingOptions: z.array(z.string()).optional(),
                            rightAnswer: z.array(z.string()),
                            rightAnswerMatching: z.array(z.string()).optional(),
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
                                            * For "matching" type questions, the "matchingOptions", "options" "rightAnswer" and "rightAnswerMatching" fields must match in size.
                                            * Always include a clear and concise explanation.
                                            * The code snippet should be clean and well-formatted without strange characters.
                                            * If the selected 'topic' and 'category' are not logically related, create a question about the selected technology instead
                                            `,
        
                })
        
        */

        let object: IResponseQuiz = { quiz: null }

        object = {
            quiz: {
                question: 'Asocia cada tipo de dato avanzado de JavaScript con su descripción correcta.',
                type: 'matching',
                codeSnippet: null,
                codeSnippetExplanation: null,
                numberOfCorrectAnswers: 1,
                options: [
                    'Un tipo de dato que representa un valor único y no se puede duplicar.',
                    'Un tipo de dato que permite almacenar pares clave-valor.',
                    'Un tipo de dato que permite almacenar valores únicos de cualquier tipo.',
                    'Un tipo de dato que puede representar números enteros de tamaño arbitrario.'
                ],
                matchingOptions: ['Symbol', 'BigInt', 'Map', 'Set'],
                rightAnswer: [
                    'Un tipo de dato que representa un valor único y no se puede duplicar.',
                    'Un tipo de dato que puede representar números enteros de tamaño arbitrario.',
                    'Un tipo de dato que permite almacenar pares clave-valor.',
                    'Un tipo de dato que permite almacenar valores únicos de cualquier tipo.'
                ],
                rightAnswerMatching: ['Symbol', 'BigInt', 'Map', 'Set'],
                explanation: 'En JavaScript, los tipos de datos avanzados incluyen Symbol, que es un tipo único; BigInt, que permite trabajar con enteros grandes; Map, que almacena pares clave-valor; y Set, que almacena valores únicos. Cada uno tiene características específicas que los diferencian.'
            }

        }


        console.log(object.quiz)

        return NextResponse.json({ data: object.quiz })





    } catch (error) {
        console.error(error)
        console.log(error)
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
      'En React, el método `componentDidMount` se utiliza para realizar tareas de limpieza después de que un componente ha sido montado en el DOM.',
    type: 'true false',
    numberOfCorrectAnswers: 1,
    options: [ 'Verdadero', 'Falso' ],
    rightAnswer: [ 'Falso' ],
    explanation: 
      'El método `componentDidMount` se utiliza para realizar tareas de inicialización, como la obtención de datos, después de que un componente ha sido montado en el DOM. Las tareas de limpieza se realizan en el método `componentWillUnmount`.'
  }
                    }
                } else if (Number(type) > 3 && Number(type) <= 6) {
                    object = {
                        quiz: {
    question: 
      '¿Cuál de las siguientes afirmaciones sobre la gestión del estado en React es correcta?',
    type: 'multiple choice',
    numberOfCorrectAnswers: 1,
    options: [
      'El estado en React se puede gestionar únicamente a través de Redux.', 
        'El estado en React se puede gestionar utilizando el hook useState y el contexto.',
      'El estado en React no puede ser compartido entre componentes.', 'El estado en React es inmutable y no se puede modificar.'
    ],
    rightAnswer: [
      
        'El estado en React se puede gestionar utilizando el hook useState y el contexto.'
    ],
    explanation: 
      'En React, la gestión del estado puede realizarse de varias maneras, incluyendo el uso del hook useState para manejar el estado local de un componente y el contexto para compartir el estado entre componentes. Redux es una opción popular para la gestión del estado global, pero no es la única forma de hacerlo.'
  }
                    }
                } else {
                    object = {
                        quiz: {
    question: 
      'En React, el método __________ se utiliza para simular el ciclo de vida de un componente durante las pruebas.',
    type: 'blank space',
    numberOfCorrectAnswers: 1,
    options: [],
    rightAnswer: [ 'componentDidMount' ],
    explanation: 
      'El método componentDidMount se invoca inmediatamente después de que un componente se monta en el DOM. Es comúnmente utilizado en pruebas para simular el ciclo de vida de un componente y verificar su comportamiento después de que se ha renderizado.'
  }
                    }
                }
*/





/*
{
    question: 
      '¿Cuáles de las siguientes afirmaciones sobre el desarrollo de interfaces de usuario en React son correctas?',
    type: 'multiple select',
    numberOfCorrectAnswers: 2,
    options: [
      'React utiliza un DOM virtual para mejorar el rendimiento.', 'Los componentes de clase no pueden tener estado.',
      
        'Los hooks permiten usar estado y otras características de React sin escribir una clase.',
      'El ciclo de vida de un componente solo se aplica a componentes funcionales.'
    ],
    rightAnswer: [
      'React utiliza un DOM virtual para mejorar el rendimiento.', 
        'Los hooks permiten usar estado y otras características de React sin escribir una clase.'
    ],
    explanation: 
      'React utiliza un DOM virtual para optimizar el rendimiento al minimizar las actualizaciones del DOM real. Además, los hooks son una característica que permite a los desarrolladores usar estado y otras funcionalidades de React en componentes funcionales, eliminando la necesidad de crear componentes de clase.'
  }
*/


/*

{
    question: 
      'Asocia cada concepto de desarrollo de interfaz de usuario en React con su descripción correspondiente.',
    type: 'matching',
    numberOfCorrectAnswers: 1,
    options: [
      'Sintaxis que permite escribir HTML dentro de JavaScript.', 'Bloques reutilizables de código que representan partes de la interfaz.',
      'Datos que se pasan a los componentes desde sus padres.', 'Almacena información que puede cambiar a lo largo del tiempo.'
    ],
    matchingOptions: [ 'JSX', 'Componentes', 'Props', 'Estado' ],
    rightAnswer: [
      'Sintaxis que permite escribir HTML dentro de JavaScript.', 'Bloques reutilizables de código que representan partes de la interfaz.',
      'Datos que se pasan a los componentes desde sus padres.', 'Almacena información que puede cambiar a lo largo del tiempo.'
    ],
    rightAnswerMatching: [ 'JSX', 'Componentes', 'Props', 'Estado' ],
    explanation: 
      'JSX es una extensión de sintaxis que permite escribir HTML dentro de JavaScript, facilitando la creación de componentes. Los componentes son bloques reutilizables que representan partes de la interfaz de usuario. Las props son datos que se pasan a los componentes desde sus padres, permitiendo la comunicación entre ellos. El estado es un objeto que almacena información que puede cambiar a lo largo del tiempo, permitiendo que los componentes respondan a interacciones del usuario.'
  }

*/





/*

   let object: IResponseQuiz = { quiz: null }
 {
    question: 
      'Empareja las herramientas de prueba de React con sus descripciones correctas.',
    type: 'matching',
    numberOfCorrectAnswers: 1,
    options: [
      'Framework de pruebas para JavaScript', 'Herramienta para pruebas de componentes React',
      'Framework de pruebas de integración', 'Herramienta para pruebas end-to-end'
    ],
    matchingOptions: [ 'Jest', 'React Testing Library', 'Enzyme', 'Cypress' ],
    rightAnswer: [
      'Framework de pruebas para JavaScript', 'Herramienta para pruebas de componentes React',
      'Framework de pruebas de integración', 'Herramienta para pruebas end-to-end'
    ],
    rightAnswerMatching: [ 'Jest', 'React Testing Library', 'Enzyme', 'Cypress' ],
    explanation: 
      'Jest es un framework de pruebas para JavaScript que se utiliza comúnmente con React. React Testing Library es una herramienta diseñada para facilitar las pruebas de componentes React, mientras que Enzyme es una herramienta de pruebas de integración que permite manipular y simular componentes. Cypress, por otro lado, es una herramienta para realizar pruebas end-to-end.'
  }

*/


/*

   let object: IResponseQuiz = { quiz: null }
{
  question: 'Asocia cada tipo de dato avanzado de JavaScript con su descripción correcta.',
  type: 'matching',
  numberOfCorrectAnswers: 1,
  options: [
    'Un tipo de dato que representa un valor único y no se puede duplicar.',
    'Un tipo de dato que permite almacenar pares clave-valor.',
    'Un tipo de dato que permite almacenar valores únicos de cualquier tipo.',
    'Un tipo de dato que puede representar números enteros de tamaño arbitrario.'
  ],
  matchingOptions: [ 'Symbol', 'BigInt', 'Map', 'Set' ],
  rightAnswer: [
    'Un tipo de dato que representa un valor único y no se puede duplicar.',
    'Un tipo de dato que puede representar números enteros de tamaño arbitrario.',
    'Un tipo de dato que permite almacenar pares clave-valor.',
    'Un tipo de dato que permite almacenar valores únicos de cualquier tipo.'
  ],
  rightAnswerMatching: [ 'Symbol', 'BigInt', 'Map', 'Set' ],
  explanation: 'En JavaScript, los tipos de datos avanzados incluyen Symbol, que es un tipo único; BigInt, que permite trabajar con enteros grandes; Map, que almacena pares clave-valor; y Set, que almacena valores únicos. Cada uno tiene características específicas que los diferencian.'
}

*/
/*

   let object: IResponseQuiz = { quiz: null }
 {
                question: 'Asocia cada término relacionado con la recursión en JavaScript con su definición correcta.',
                type: 'matching',
                numberOfCorrectAnswers: 1,
                codeSnippet: null,
                codeSnippetExplanation: null,
                options: [
                    'Condición que detiene la recursión',
                    'Llamada a una función dentro de sí misma',
                    'Llamada a una función a través de otra función',
                    'Estructura que mantiene el seguimiento de las funciones activas'
                ],
                matchingOptions: [
                    'Caso base',
                    'Recursión directa',
                    'Recursión indirecta',
                    'Pila de llamadas'
                ],
                rightAnswer: [
                    'Condición que detiene la recursión',
                    'Llamada a una función dentro de sí misma',
                    'Llamada a una función a través de otra función',
                    'Estructura que mantiene el seguimiento de las funciones activas'
                ],
                rightAnswerMatching: [
                    'Caso base',
                    'Recursión directa',
                    'Recursión indirecta',
                    'Pila de llamadas'
                ],
                explanation: "La recursión en JavaScript se refiere a la técnica donde una función se llama a sí misma para resolver un problema. El 'caso base' es esencial para evitar la recursión infinita, mientras que la 'recursión directa' es cuando una función se llama a sí misma, y la 'recursión indirecta' es cuando una función llama a otra que a su vez llama a la primera. La 'pila de llamadas' es la estructura que mantiene el seguimiento de las funciones activas en la memoria."
            }

*/