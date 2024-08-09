import { NextRequest, NextResponse } from "next/server"
import { google } from '@ai-sdk/google'
import { createOpenAI, openai } from "@ai-sdk/openai"
import { APICallError, RetryError, generateObject } from 'ai'
import { z } from "zod"
import { IQuiz, IResponseQuiz } from "@/app/interfaces/quiz"
import { IResponseAlgorithm } from "@/app/interfaces/algorithm"
import { ManyRequestError, NotAuthorizedError, ServerError } from "../_services/errors"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        if (req.nextUrl) {
            const searchParams = req.nextUrl.searchParams


            if (req.nextUrl && searchParams) {
                let language = searchParams.get('language')
                let level = searchParams.get('level')
                let category = searchParams.get("category")
                const OPENAI_API_KEY = searchParams.get('apiKey') || ""

                console.log(language)
                console.log(level)
                console.log(category)

                const openai = createOpenAI({
                    apiKey: OPENAI_API_KEY
                })


                const { object } = await generateObject({
                    model: openai("gpt-4o-mini"),
                    system: "You generate a programming algorithm to solve, depending on the level of seniority, category and programming language provided.",
                    maxTokens: 500,
                    maxRetries: 2,
                    schema: z.object({
                        algorithm: z.object({
                            title: z.string(),
                            description: z.string(),
                            codeTemplate: z.string(),
                            expectedOutput: z.string(),
                            inputDescription: z.string(),
                            outputDescription: z.string(),
                            constraints: z.array(z.string()),
                            exampleInputs: z.array(z.string()),
                            exampleOutputs: z.array(z.string()),
                            difficulty: z.string(),
                            tags: z.array(z.string()),
                            explanation: z.object({
                                resume: z.string(),
                                codeSnippet: z.string().optional() // Opcional para permitir explicaciones sin código
                            }),
                            language: z.string()
                        })
                    }),
                    prompt: `Generate a programming algorithms solving exercise.
                
                                                **Configuration**
                                                *Level: ${level}
                                                *Language: ${language}
                                                *Category: ${category}
                                                                                         
                                                **Requirements:**
                                                * In Spanish
                                                * Always provide an explanation
                                                * Always add a code template
                                                * In the description be brief and concise
                                                * Be clear and without strange characters and give a good and summarized explanation
                                                * In codeTemplate only put what is needed to start the language
                                                * Do not add the solution only the template depending on the language
                                                * Please note the difficulty of the exercise depending on the selected seniority
                                                   
                                                **Additional Notes:**
                                                * Use clear and concise language.
                                                * Provide examples if applicable.`,
                })






                console.log(object)

                return NextResponse.json({ data: JSON.stringify(object.algorithm) })
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


          



          let object: IResponseAlgorithm = {
              algorithm: {
                  title: 'Implementa Merge Sort',
                  description: 'Implementa un algoritmo de ordenamiento Merge Sort.',
                  codeTemplate: 'function mergeSort(array: number[]): number[] {\\n\\n  // Tu código aquí\\n\\n}\\n',
                  expectedOutput: 'Una matriz ordenada',
                  inputDescription: 'Una matriz de números',
                  outputDescription: 'Una matriz de números ordenada',
                  constraints: [
                      'No puedes usar ninguna función o método de ordenamiento incorporados.',
                      'La solución debe tener una complejidad de tiempo de O(n log n) en el peor de los casos.'
                  ],
                  exampleInputs: ['[4, 2, 7, 1, 3]', '[9, -1, 5, 8, 0]', '[10, 10, 10, 5, 5]'],
                  exampleOutputs: ['[1, 2, 3, 4, 7]', '[-1, 0, 5, 8, 9]', '[5, 5, 10, 10, 10]'],
                  difficulty: 'expert',
                  tags: [
                      'algoritmo',
                      'ordenamiento',
                      'merge sort',
                      'recursión',
                      'complejidad de tiempo'
                  ],
                  explanation: {
                      resume: 'Este ejercicio requiere que el usuario comprenda el algoritmo Merge Sort y su implementación. Merge Sort es un algoritmo de ordenamiento recursivo que sigue el paradigma de dividir y conquistar. Divide la lista de entrada en mitades más pequeñas hasta que cada sublista contiene un solo elemento, y luego fusiona repetidamente las sublistas ordenadas en una lista ordenada final.\\n\\n**Puntos clave a considerar para la implementación:**\\n\\n* **Función Merge:** El algoritmo Merge Sort se basa en una función `merge` eficiente que toma dos listas ordenadas como entrada y las combina en una sola lista ordenada.\\n* **Recursión:** La función principal `mergeSort` debe llamarse a sí misma recursivamente para dividir la lista de entrada en mitades hasta que se alcance el caso base de una sola sublista de elementos.\\n* **Complejidad Temporal:** El algoritmo Merge Sort tiene una complejidad de tiempo de O(n log n) en todos los casos, lo que lo convierte en una opción eficiente para ordenar grandes conjuntos de datos.',
                      codeSnippet: null
                  },
                  language: 'TypeScript'
              }
          }
          
          
        let object: IResponseAlgorithm = {
               algorithm: {
                   title: 'Encuentra el Elemento Faltante en una Matriz',
                   description: '## Encuentra el Elemento Faltante\\n\\nDada una matriz `arr` que contiene `n-1` números enteros únicos en el rango de `1` a `n`, tu tarea es encontrar el único número faltante en la secuencia.\\n\\n**Nota:** La matriz no estará ordenada.\\n',
                   codeTemplate: 'fun encontrarElElementoFaltante(arr: IntArray): Int {\\n    // Escribe tu código aquí\\n}',
                   expectedOutput: 'Un número entero',
                   inputDescription: 'Una matriz de enteros',
                   outputDescription: 'El entero faltante en el rango de 1 a n',
                   constraints: [],
                   exampleInputs: ['[1, 2, 4, 6, 3, 7, 8]', '[1, 2, 3, 5]'],
                   exampleOutputs: ['5', '4'],
                   difficulty: 'medium',
                   tags: ['Array', 'Matemáticas'],
                   explanation: {
                       resume: "Este problema puede resolverse de diferentes maneras, una de ellas es utilizando la suma de Gauss.  La suma de Gauss nos permite calcular la suma de los primeros 'n' números naturales con una fórmula: `suma = (n * (n + 1)) / 2`.  \\n\\nEn este caso, como falta un número en la secuencia, podemos calcular la suma de los números que sí están presentes en la matriz y restarle la suma de Gauss de los primeros 'n' números naturales.  La diferencia entre estas dos sumas nos dará el número faltante. \\n",
                       codeSnippet: null
                   },
                   language: 'kotlin'
               }
           }
          
       let object: IResponseAlgorithm = {

                    algorithm: {
                        title: 'Ordenamiento por mezcla (Merge Sort)',
                        description:
                            'Implementa el algoritmo de ordenamiento por mezcla utilizando el enfoque de divide y vencerás. El algoritmo debe dividir el arreglo en mitades, ordenar cada mitad y luego combinar las mitades ordenadas en un solo arreglo ordenado.',
                        codeTemplate: 'using System;\n' +
                            '\n' +
                            'class Program\n' +
                            '{\n' +
                            '    static void Main(string[] args)\n' +
                            '    {\n' +
                            '        // Inicializa el arreglo a ordenar\n' +
                            '        int[] arr = { }; // Agrega elementos aquí\n' +
                            '        // Llama a la función de ordenamiento\n' +
                            '        MergeSort(arr, 0, arr.Length - 1);\n' +
                            '    }\n' +
                            '\n' +
                            '    static void MergeSort(int[] arr, int left, int right)\n' +
                            '    {\n' +
                            '        // Implementa el algoritmo aquí\n' +
                            '    }\n' +
                            '\n' +
                            '    static void Merge(int[] arr, int left, int mid, int right)\n' +
                            '    {\n' +
                            '        // Implementa la combinación aquí\n' +
                            '    }\n' +
                            '}',
                        expectedOutput: 'Un arreglo ordenado en orden ascendente.',
                        inputDescription: 'Un arreglo de enteros desordenados.',
                        outputDescription: 'Un arreglo de enteros ordenados en orden ascendente.',
                        constraints: [
                            'El tamaño del arreglo debe ser mayor que 0.', 'Los elementos del arreglo pueden ser negativos.'
                        ],
                        exampleInputs: ['[38, 27, 43, 3, 9, 82, 10]', '[5, 2, 9, 1, 5, 6]'],
                        exampleOutputs: ['[3, 9, 10, 27, 38, 43, 82]', '[1, 2, 5, 5, 6, 9]'],
                        difficulty: 'hard',
                        tags: ['ordenamiento', 'divide y vencerás', 'algoritmos'],
                        explanation: {
                            resume:
                                'El ordenamiento por mezcla es un algoritmo eficiente que utiliza la técnica de divide y vencerás para ordenar un arreglo. Se divide el arreglo en mitades, se ordenan las mitades recursivamente y luego se combinan para formar un arreglo ordenado.',
                            codeSnippet: null
                        },
                        language: 'csharp'
                    }

                }
*/