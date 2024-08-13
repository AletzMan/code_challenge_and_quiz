import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IQuestion, IQuizResult } from "../interfaces/quiz"
import { IAlgorithmProperty, IAlgorithmSolution } from "../interfaces/algorithm"
import { DefaultCategory, DefaultLanguage } from "./const"
import { IItemCategory } from "../interfaces/languages"

interface ISetupQuiz {
    category: IItemCategory
    setCategory: (value: IItemCategory) => void
    categoryAlgorithm: IAlgorithmProperty
    setCategoryAlgorith: (value: IAlgorithmProperty) => void
    language: IItemCategory
    setLanguage: (value: IItemCategory) => void
    defaultLanguage: IItemCategory
    difficulty: "easy" | "medium" | "hard" | "expert"
    setDifficulty: (value: "easy" | "medium" | "hard" | "expert") => void
    defaultDifficulty: string
    questions: number
    setQuestions: (value: number) => void
}



export const useSetupQuiz = create(
    persist<ISetupQuiz>(
        (set) => ({
            category: DefaultCategory,
            setCategory: (value: IItemCategory) =>
                set((state) => ({
                    category: value,
                })),
            categoryAlgorithm: { option: "Search", value: "Búsqueda" },
            setCategoryAlgorith: (value: IAlgorithmProperty) =>
                set((state) => ({
                    categoryAlgorithm: value,
                })),
            language: DefaultLanguage,
            setLanguage: (value: IItemCategory) =>
                set((state) => ({
                    language: value,
                })),
            defaultLanguage: DefaultLanguage,
            difficulty: "easy",
            setDifficulty: (value: "easy" | "medium" | "hard" | "expert") =>
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



export interface IClassNameOptions {
    name: string
    value: string
}


interface ICurrentQuiz {
    completeQuiz: IQuizResult
    setCompleteQuiz: (value: IQuizResult) => void
    selectedAnswer: string
    setSelectedAnwer: (value: string) => void
    currentQuestion: IQuestion
    setCurrentQuestion: (value: IQuestion) => void
    emptyCurrentQuestion: IQuestion
    currentQuestionNumber: number
    setCurrentQuestionNumber: (value: number) => void
    quizInProgress: boolean
    setQuizInProgress: (value: boolean) => void
    resetCurrentQuiz: () => void
    classNameOrder: IClassNameOptions[]
    setClassNameOrder: (value: IClassNameOptions[]) => void
}



export const useCurrentQuiz = create(
    persist<ICurrentQuiz>(
        (set) => ({
            completeQuiz: { questions: [], correctAnswers: 0 },
            setCompleteQuiz: (value: IQuizResult) =>
                set((state) => ({
                    completeQuiz: value,
                })),
            selectedAnswer: "",
            setSelectedAnwer: (value: string) =>
                set((state) => ({
                    selectedAnswer: value,
                })),
            currentQuestion: { codeSnippet: "", codeSnippetExplanation: "", explanation: "", options: [], question: "", rightAnswer: [], type: "multiple choice", numberOfCorrectAnswers: 0, rightAnswerMatching: [], matchingOptions: [] },
            setCurrentQuestion: (value: IQuestion) =>
                set((state) => ({
                    currentQuestion: value,
                })),
            emptyCurrentQuestion: { codeSnippet: "", codeSnippetExplanation: "", explanation: "", options: [], question: "", rightAnswer: [], type: "multiple choice", numberOfCorrectAnswers: 0, rightAnswerMatching: [], matchingOptions: [] },
            currentQuestionNumber: 1,
            setCurrentQuestionNumber: (value) =>
                set((state) => ({
                    currentQuestionNumber: value,
                })),
            quizInProgress: false,
            setQuizInProgress: (value: boolean) =>
                set((state) => ({
                    quizInProgress: value,
                })),
            resetCurrentQuiz: () =>
                set((state) => ({
                    completeQuiz: { questions: [], correctAnswers: 0 },
                    selectedAnswer: "",
                    currentQuestion: state.emptyCurrentQuestion,
                    currentQuestionNumber: 1,
                    quizInProgress: false,
                    classNameOrder: []
                })),
            classNameOrder: [],
            setClassNameOrder: (value: IClassNameOptions[]) =>
                set((state) => ({
                    classNameOrder: value
                }))
        }),

        { name: "currentquizccq" }
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
