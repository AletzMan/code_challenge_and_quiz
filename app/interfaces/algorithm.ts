export interface IResponseAlgorithm {
    algorithm: IAlgorithm | null
}

export interface IAlgorithm {
    title: string,                    // Título del ejercicio
    description: string,              // Descripción del ejercicio
    codeTemplate: string,             // Plantilla de código inicial para el usuario
    expectedOutput: string,           // Salida esperada del algoritmo
    inputDescription: string,         // Descripción de los datos de entrada
    outputDescription: string,        // Descripción de los datos de salida
    constraints: string[],            // Restricciones del ejercicio (por ejemplo, tiempo de ejecución, limitaciones de espacio)
    exampleInputs: string[],          // Ejemplos de entradas
    exampleOutputs: string[],         // Ejemplos de salidas correspondientes
    difficulty: 'easy' | 'medium' | 'hard' | 'expert', // Dificultad del ejercicio
    tags: string[],                   // Etiquetas relacionadas con el ejercicio (por ejemplo, 'recursion', 'sorting')
    explanation: IExplanation,        // Explicación detallada de la solución
    language: string                  // Lenguaje de programación para el ejercicio
}

export interface IExplanation {
    resume: string
    codeSnippet: string | null
}

export interface IAlgorithmSolution {
    solution: string
}


export interface IAlgorithmProperty {
    option: string
    value: string
}