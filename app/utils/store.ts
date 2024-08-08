import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IQuizResult } from "../interfaces/quiz"
import { IAlgorithmSolution } from "../interfaces/algorithm"
import { DefaultCategory, DefaultLanguage } from "./const"
import { IItemCategory } from "../interfaces/languages"

interface ISetupQuiz {
    category: IItemCategory
    setCategory: (value: IItemCategory) => void
    language: IItemCategory
    setLanguage: (value: IItemCategory) => void
    defaultLanguage: IItemCategory
    difficulty: "trainee" | "junior" | "semi-senior" | "senior"
    setDifficulty: (value: "trainee" | "junior" | "semi-senior" | "senior") => void
    defaultDifficulty: string
    questions: number
    setQuestions: (value: number) => void
    completeQuiz: IQuizResult
    setCompleteQuiz: (value: IQuizResult) => void
}



export const useSetupQuiz = create(
    persist<ISetupQuiz>(
        (set) => ({
            category: DefaultCategory,
            setCategory: (value: IItemCategory) =>
                set((state) => ({
                    category: value,
                })),
            completeQuiz: { questions: [], correctAnswers: 0 },
            setCompleteQuiz: (value: IQuizResult) =>
                set((state) => ({
                    completeQuiz: value,
                })),
            language: DefaultLanguage,
            setLanguage: (value: IItemCategory) =>
                set((state) => ({
                    language: value,
                })),
            defaultLanguage: DefaultLanguage,
            difficulty: "junior",
            setDifficulty: (value: "trainee" | "junior" | "semi-senior" | "senior") =>
                set((state) => ({
                    difficulty: value,
                })),
            defaultDifficulty: "medium",
            questions: 5,
            setQuestions: (value: number) =>
                set((state) => ({
                    questions: value
                }))
        }),

        { name: "quizsetupccq" }
    )
)


interface IAlgorithm {
    algorithmSolution: IAlgorithmSolution
    setAlgorithmSolution: (value: IAlgorithmSolution) => void
}

export const useAlgorithm = create(
    persist<IAlgorithm>(
        (set) => ({
            algorithmSolution: { solution: "" },
            setAlgorithmSolution: (value: IAlgorithmSolution) =>
                set((state) => ({
                    algorithmSolution: value,
                }))
        }),

        { name: "algorithmccq" }
    )
)


interface IAPIkey {
    apiKey: string
    setApiKey: (value: string) => void
}

export const useApiKey = create<IAPIkey>(
    (set) => ({
        apiKey: "",
        setApiKey: (value: string) =>
            set((state) => ({
                apiKey: value,
            }))
    })
)
