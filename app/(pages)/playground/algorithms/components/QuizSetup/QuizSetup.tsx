"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { IItemCategory } from "../../../algorithms/components/Playground/Playground"
import { CATEGORIES } from "@/app/utils/const"
import { useSetupQuiz } from "@/app/utils/store"

interface Props {
    setLanguage: Dispatch<SetStateAction<IItemCategory>>
    language: IItemCategory
}

export function QuizSetup({ language, setLanguage }: Props) {
    const { difficulty, setDifficulty, questions } = useSetupQuiz()
    const HandleChangeDifficulty = (value: string) => {
        if (value === "easy" || value === "medium" || value === "hard" || value === "expert") {
            setDifficulty(value)
        }
    }

    function HandleChangeLanguage(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        const selectLanguage = CATEGORIES.languages.items.find(item => item.option === value)
        if (selectLanguage) {
            setLanguage(selectLanguage)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.selects}>
                <Combobox label="Lenguaje" options={CATEGORIES.languages.items} value={language?.option} onChange={HandleChangeLanguage} />
                <Combobox label="Número de Preguntas" options={Questions} />
            </div>
            <div className={styles.difficulty}>
                <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "easy" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("easy")}>Fácil</button>
                <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "medium" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("medium")}>Media</button>
                <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "hard" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("hard")}>Difícil</button>
                <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "expert" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("expert")}>Experto</button>
            </div>
        </div>
    )
}


const Questions = [
    {
        option: "5",
        value: "5"
    },
    {
        option: "10",
        value: "10"
    },
    {
        option: "15",
        value: "15"
    },
    {
        option: "20",
        value: "20"
    }
]