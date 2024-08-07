"use server"

import { IAlgorithm } from "../interfaces/algorithm"
import { IQuiz } from "../interfaces/quiz"

interface IResponseFetchQuiz {
    error: boolean
    message: string
    data: IQuiz | null
}

interface IResponseFetchAlgorithm {
    error: boolean
    message: string
    data: IAlgorithm | null
}

const URL = process.env.URL_API

export const GetNewQuiz = async (language: string, level: string, apiKey: string): Promise<IResponseFetchQuiz> => {
    const type = (Math.random() * 10).toFixed(0)
    try {
        const response = await fetch(`${URL}/api/quiz?language=${language}&level=${level}&type=${type}&apiKey=${apiKey}`, { cache: "no-cache" })
        const data = await response.json()
        console.log(response)
        if (response.ok) {
            const newResponse: IResponseFetchQuiz = {
                error: false,
                message: "Correcto",
                data: JSON.parse(data.data)
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

export const GetNewAlgorithm = async (language: string, level: string, apiKey: string): Promise<IResponseFetchAlgorithm> => {
    try {
        const response = await fetch(`${URL}/api/algorithm?language=${language}&level=${level}&apiKey=${apiKey}`, { cache: "no-cache" })
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