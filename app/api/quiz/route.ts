import { NextResponse } from "next/server"

export async function GET(res: NextResponse) {

    let response = {}
    return new Promise(resolve => {
        setTimeout(() => {
            const response = {
                "question": "¿Cuál es el valor de la variable después de ejecutar el siguiente código?",
                "codeSnippet": "let x = 5;\nif (x > 3) {\n\tconsole.log('Mayor');\n} else {\n\tconsole.log('Menor');\n}",
                "options": [
                    "Mayor",
                    "Menor",
                    "Undefined",
                    "Error"
                ],
                "answer": "Mayor",
                "type": "multiple choice",
                "explanation": "El valor de la variable x es mayor que 3, por lo tanto, se ejecutará el bloque de código dentro del if que imprime 'Mayor'."
            }
            resolve(response)
        }, 3500)
    }).then(response => NextResponse.json({ data: JSON.stringify(response) }))

    return NextResponse.json(await response)
}