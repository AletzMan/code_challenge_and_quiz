import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IItemCategory } from "../(pages)/playground/algorithms/components/Playground/Playground"
import { JSIcon } from "@/app/components/Icons"

interface ISetupQuiz {
    category: IItemCategory
    setCategory: (value: IItemCategory) => void
    language: IItemCategory
    setLanguage: (value: IItemCategory) => void
    defaultLanguage: IItemCategory
    difficulty: "easy" | "medium" | "hard" | "expert"
    setDifficulty: (value: "easy" | "medium" | "hard" | "expert") => void
    defaultDifficulty: string
    questions: number
    setQuestions: (value: number) => void
}

const DefaultLanguage: IItemCategory = {
    option: "javascript",
    value: "JavaScript",
    functionSyntax: `function myFunction() {\n\treturn false;\n}`,
    color: "#F7DF1E",
    logo: null
}

const DefaultCategory: IItemCategory = {
    option: "languages",
    value: "Lenguajes",
    functionSyntax: `null`,
    color: "#F7DF1E",
    logo: null
}

export const useSetupQuiz = create(
    persist<ISetupQuiz>(
        (set) => ({
            category: DefaultLanguage,
            setCategory: (value: IItemCategory) =>
                set((state) => ({
                    category: value,
                })),
            language: DefaultLanguage,
            setLanguage: (value: IItemCategory) =>
                set((state) => ({
                    language: value,
                })),
            defaultLanguage: DefaultLanguage,
            difficulty: "medium",
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