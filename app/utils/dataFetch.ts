"use server"

export const GetNewQuiz = async () => {
    const response = await fetch(`http://localhost:3000/api/quiz`)
    const data = await response.json()
    return JSON.parse(data.data)
}