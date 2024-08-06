"use server"

const URL = process.env.URL_API

export const GetNewQuiz = async (language: string, level: string) => {
    const type = (Math.random() * 10).toFixed(0)
    const response = await fetch(`${URL}/api/quiz?language=${language}&level=${level}&type=${type}`, { next: { revalidate: 10 } })
    const data = await response.json()
    if (response.ok) {
        return JSON.parse(data.data)
    } else {
        return false
    }
}