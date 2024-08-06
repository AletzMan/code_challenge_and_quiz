"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { IItemCategory } from "../../../algorithms/components/Playground/Playground"
import { CATEGORIES } from "@/app/utils/const"
import { useSetupQuiz } from "@/app/utils/store"


export function QuizSetup() {
    const { language, setLanguage } = useSetupQuiz()
    const { difficulty, setDifficulty } = useSetupQuiz()
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
            </div>
            <div className={styles.difficulty}>
                <label className={styles.difficulty_label}>Dificultad</label>
                <div className={styles.difficulty_buttons}>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "easy" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("easy")}>Fácil</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "medium" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("medium")}>Media</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "hard" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("hard")}>Difícil</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "expert" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("expert")}>Experto</button>
                </div>
            </div>
        </div>
    )
}
