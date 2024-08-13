import { NextRequest, NextResponse } from "next/server"
import { google } from '@ai-sdk/google'
import { createOpenAI, openai } from "@ai-sdk/openai"
import { APICallError, JSONParseError, RetryError, TypeValidationError, generateObject, NoObjectGeneratedError, UnsupportedJSONSchemaError, InvalidResponseDataError } from 'ai'
import { z } from "zod"
import { IResponseQuiz } from "@/app/interfaces/quiz"
import { IResponseAlgorithm } from "@/app/interfaces/algorithm"
import { ManyRequestError, NotAuthorizedError, ServerError } from "../_services/errors"

export async function POST(req: NextRequest, res: NextResponse) {
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

                const algorithmSchema = z.object({
                    algorithm: z.object({
                        title: z.string(),
                        codeTemplate: z.string(),
                        expectedOutput: z.string(),
                        inputDescription: z.string(),
                        outputDescription: z.string(),
                        constraints: z.array(z.string()),
                        exampleInputs: z.array(z.string()),
                        exampleOutputs: z.array(z.string()),
                        tags: z.array(z.string()),
                        explanation: z.string(),
                    })
                })

                try {

                    /*
                                        const { object } = await generateObject({
                                            model: openai("gpt-4o-mini"),
                                            system: "You generate a programming algorithm to solve, depending on the level, category and programming language provided.",
                                            maxTokens: 500,
                                            maxRetries: 2,
                                            schema: algorithmSchema,
                                            prompt: `Generate a programming algorithms solving exercise.
                                                                        
                                                                            **Configuration**
                                                                            *Level: ${level}
                                                                            *Language: ${language}
                                                                            *Category: ${category}
                                                                                                                     
                                                                            **Requirements:**
                                                                            * In Spanish
                                                                            * Always give a detailed, complete and instructed explanation of the problem to be solved and of the subject matter
                                                                            * Always add a code template
                                                                            * In codeTemplate only put what is needed to start the language
                                                                            * Do not add the solution only the template depending on the language
                                                                            * Please note the difficulty of the exercise depending on the selected seniority
                                                                               
                                                                            **Additional Notes:**
                                                                            * Provide examples if applicable.`,
                                        })
                    
                    */


                    let object: IResponseAlgorithm = {
                        algorithm: {
                            title: 'Encuentra el Elemento Faltante en una Matriz',
                            codeTemplate: 'fun encontrarElElementoFaltante(arr: IntArray): Int {\\n    // Escribe tu código aquí\\n}',
                            expectedOutput: 'Un número entero',
                            inputDescription: 'Una matriz de enteros',
                            outputDescription: 'El entero faltante en el rango de 1 a n',
                            constraints: [],
                            exampleInputs: ['[1, 2, 4, 6, 3, 7, 8]', '[1, 2, 3, 5]'],
                            exampleOutputs: ['5', '4'],
                            tags: ['Array', 'Matemáticas'],
                            explanation: "Este problema puede resolverse de diferentes maneras, una de ellas es utilizando la suma de Gauss.  La suma de Gauss nos permite calcular la suma de los primeros 'n' números naturales con una fórmula: `suma = (n * (n + 1)) / 2`.  \\n\\nEn este caso, como falta un número en la secuencia, podemos calcular la suma de los números que sí están presentes en la matriz y restarle la suma de Gauss de los primeros 'n' números naturales.  La diferencia entre estas dos sumas nos dará el número faltante. \\n",
                        }
                    }

                    console.log(object)
                    return NextResponse.json({ data: JSON.stringify(object.algorithm) })
                    return ServerError()
                } catch (error) {

                    if (APICallError.isAPICallError(error)) {
                        if (error.statusCode === 401) {
                            return NotAuthorizedError()
                        } else if (error.statusCode === 500) {
                            return ServerError()
                        }
                    }

                    if (TypeValidationError.isTypeValidationError(error)) {
                        console.log(error)
                        console.log(error.value)
                    }

                    if (JSONParseError.isJSONParseError(error)) {
                        console.log(error)
                        console.log(error.text)
                    }

                    if (RetryError.isRetryError(error)) {
                        console.log("ManyRequest ERROR")
                        return ManyRequestError()

                    }

                    console.log(typeof error)
                    console.log(NoObjectGeneratedError.isNoObjectGeneratedError(error))
                    console.log(InvalidResponseDataError.isInvalidResponseDataError(error))
                    console.log(NoObjectGeneratedError.isNoObjectGeneratedError(error))
                    console.log(JSONParseError.isJSONParseError(error))
                    console.log(TypeValidationError.isTypeValidationError(error))
                    console.log(error)
                }


            }
        }
        return NextResponse.json({ data: null })

    } catch (error) {
        console.log("Server ERROR")
        return ServerError()
    }
}


/*


          



      
                    let object: IResponseAlgorithm = {

                        algorithm: {
                            title: 'Ordenamiento por mezcla (Merge Sort)',
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
                            tags: ['ordenamiento', 'divide y vencerás', 'algoritmos'],
                            explanation: 'El ordenamiento por mezcla es un algoritmo eficiente que utiliza la técnica de divide y vencerás para ordenar un arreglo. Se divide el arreglo en mitades, se ordenan las mitades recursivamente y luego se combinan para formar un arreglo ordenado.',


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

                  let object: IResponseAlgorithm = {
                        algorithm: {
                            title: 'Encuentra el Elemento Faltante en una Matriz',
                            codeTemplate: 'fun encontrarElElementoFaltante(arr: IntArray): Int {\\n    // Escribe tu código aquí\\n}',
                            expectedOutput: 'Un número entero',
                            inputDescription: 'Una matriz de enteros',
                            outputDescription: 'El entero faltante en el rango de 1 a n',
                            constraints: [],
                            exampleInputs: ['[1, 2, 4, 6, 3, 7, 8]', '[1, 2, 3, 5]'],
                            exampleOutputs: ['5', '4'],
                            tags: ['Array', 'Matemáticas'],
                            explanation: "Este problema puede resolverse de diferentes maneras, una de ellas es utilizando la suma de Gauss.  La suma de Gauss nos permite calcular la suma de los primeros 'n' números naturales con una fórmula: `suma = (n * (n + 1)) / 2`.  \\n\\nEn este caso, como falta un número en la secuencia, podemos calcular la suma de los números que sí están presentes en la matriz y restarle la suma de Gauss de los primeros 'n' números naturales.  La diferencia entre estas dos sumas nos dará el número faltante. \\n",
                        }
                    }

  
   let object: IResponseAlgorithm = {
                        algorithm: {
                            title: 'Generación de Combinaciones de un Conjunto',
                            codeTemplate: '<?php\n' +
                                'function generarCombinaciones($conjunto, $tamaño) {\n' +
                                '    // Tu código aquí\n' +
                                '}\n' +
                                '?>',
                            expectedOutput: 'Un array que contiene todas las combinaciones posibles del conjunto dado de un tamaño específico.',
                            inputDescription: 'Se recibe un conjunto de elementos (array) y un tamaño (entero) que indica cuántos elementos deben estar en cada combinación.',
                            outputDescription: 'Devuelve un array que contiene todas las combinaciones posibles de los elementos del conjunto de la longitud especificada.',
                            constraints: [
                                'El tamaño del conjunto no debe ser menor que el tamaño de la combinación solicitada.',
                                'El tamaño de la combinación debe ser un número entero positivo.'
                            ],
                            exampleInputs: ["['a', 'b', 'c', 'd'], 2", '[1, 2, 3, 4, 5], 3'],
                            exampleOutputs: [
                                "[['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd'], ['c', 'd']]",
                                '[[1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]]'
                            ],
                            tags: ['recursión', 'combinaciones', 'PHP', 'algoritmos'],
                            explanation: 'En este ejercicio, se te pide que implementes una función recursiva que genere todas las combinaciones posibles de un conjunto de elementos. La recursión es una técnica poderosa en programación que permite que una función se llame a sí misma para resolver problemas más pequeños. En este caso, la función debe tomar un conjunto de elementos y un tamaño específico, y devolver todas las combinaciones posibles de ese tamaño. Este problema es un excelente ejercicio para practicar la recursión, ya que implica dividir el problema en subproblemas más pequeños y combinar los resultados.'
                        }
                    }

*/