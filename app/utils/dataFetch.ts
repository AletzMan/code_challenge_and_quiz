"use server"

import { IAlgorithm } from "../interfaces/algorithm"
import { IOutputRunCode, IResponseOutputRunCode } from "../interfaces/languages"
import { IQuestion } from "../interfaces/quiz"

interface IResponseFetchQuiz {
    error: boolean
    message: string
    data: IQuestion | null
}

interface IResponseFetchAlgorithm {
    error: boolean
    message: string
    data: IAlgorithm | null
}

const URL = process.env.URL_API

export const GetNewQuiz = async (category: string, language: string, level: string, apiKey: string): Promise<IResponseFetchQuiz> => {

    const type = (Math.random() * 25).toFixed(0)
    try {
        const response = await fetch(`${URL}/api/quiz`, {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify({
                category,
                language,
                level,
                type,
                apiKey
            })
        })
        const data = await response.json()

        if (response.ok) {
            const newResponse: IResponseFetchQuiz = {
                error: false,
                message: "Correcto",
                data: data.data
            }
            return newResponse
        }
        if (response.status === 401) {
            const newResponse: IResponseFetchQuiz = {
                error: true,
                message: "Clave API inválida o no ingresada. Por favor, verifica e intenta nuevamente",
                data: null
            }
            return newResponse
        } else if (response.status === 429) {
            const newResponse: IResponseFetchQuiz = {
                error: true,
                message: "Ha superado su cuota actual, compruebe los detalles de su plan y facturación",
                data: null
            }
            return newResponse
        }
        else {
            const newResponse: IResponseFetchQuiz = {
                error: true,
                message: "Error en servidor, intentar mas tarde",
                data: null
            }
            return newResponse
        }

    } catch (error) {
        console.error(error)
        const newResponse: IResponseFetchQuiz = {
            error: true,
            message: "Error en servidor, intentar mas tarde",
            data: null
        }
        return newResponse

    }
}

export const GetNewAlgorithm = async (language: string, level: string, category: string, apiKey: string): Promise<IResponseFetchAlgorithm> => {
    try {
        const response = await fetch(`${URL}/api/algorithm?language=${language}&level=${level}&category=${category}&apiKey=${apiKey}`, {
            cache: "no-cache",
            method: "POST"
        })
        const data = await response.json()
        if (response.ok) {
            const newResponse: IResponseFetchAlgorithm = {
                error: false,
                message: "Correcto",
                data: JSON.parse(data.data)
            }
            return newResponse
        }
        if (response.status === 401) {
            const newResponse: IResponseFetchAlgorithm = {
                error: true,
                message: "Clave API inválida o no ingresada. Por favor, verifica e intenta nuevamente",
                data: null
            }
            return newResponse
        } else if (response.status === 429) {
            const newResponse: IResponseFetchAlgorithm = {
                error: true,
                message: "Ha superado su cuota actual, compruebe los detalles de su plan y facturación",
                data: null
            }
            return newResponse
        }
        else {
            const newResponse: IResponseFetchAlgorithm = {
                error: true,
                message: "Error en servidor, intentar mas tarde",
                data: null
            }
            return newResponse
        }
    } catch (error) {
        console.error(error)
        const newResponse: IResponseFetchAlgorithm = {
            error: true,
            message: "Error en servidor, intentar mas tarde",
            data: null
        }
        return newResponse


    }
}


export const RunCode = async (language: string, sourceCode: string, version: string): Promise<IResponseOutputRunCode> => {
    console.log(sourceCode.replaceAll('\\n', '').replaceAll('\\t', '').replaceAll('\\', '').replaceAll("\n", ""))
    try {
        const response = await fetch(`${URL}/api/runcode?language=${language}&sourceCode=${sourceCode.replaceAll('\\n', '').replaceAll('\\t', '').replaceAll('\\', '').replaceAll("\n", "")}&version=${version}`, {
            method: "POST"
        })
        const data: IResponseOutputRunCode = await response.json()

        if (response.ok) {
            return data
        }
        return data

    } catch (error) {
        const newResponse: IResponseOutputRunCode = {
            error: true,
            response: null
        }
        return newResponse
    }

}