export interface IResponseAlgorithm {
    algorithm: IAlgorithm | null
}

export interface IAlgorithm {
    title: string,                    // Título del ejercicio
    codeTemplate: string,             // Plantilla de código inicial para el usuario
    expectedOutput: string,           // Salida esperada del algoritmo
    inputDescription: string,         // Descripción de los datos de entrada
    outputDescription: string,        // Descripción de los datos de salida
    constraints: string[],            // Restricciones del ejercicio (por ejemplo, tiempo de ejecución, limitaciones de espacio)
    exampleInputs: string[],          // Ejemplos de entradas
    exampleOutputs: string[],         // Ejemplos de salidas correspondientes
    tags: string[],                   // Lenguaje de programación para el ejercicio
    explanation: string,              // Descripción del ejercicio
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