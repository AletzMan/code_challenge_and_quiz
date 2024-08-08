/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { CATEGORIES } from "@/app/utils/const"
import { useApiKey, useSetupQuiz } from "@/app/utils/store"
import { HammerIcon, StudentIcon, ToolsIcon, TrophyIcon } from "@/app/components/Icons"
import { TextBoxApiKey } from "@/app/components/TextBoxApiKey/TextBoxApiKey"
import { IItemCategory } from "@/app/interfaces/languages"

interface Props {
    error: boolean
    setError: Dispatch<SetStateAction<boolean>>
}

export function QuizSetup({ error, setError }: Props) {
    const { language, setLanguage } = useSetupQuiz()
    const { difficulty, setDifficulty } = useSetupQuiz()
    const { setApiKey, apiKey } = useApiKey()


    useEffect(() => {
        setLanguage(CATEGORIES.languages.items[0])
    }, [])

    const HandleChangeDifficulty = (value: string) => {
        if (value === "trainee" || value === "junior" || value === "semi-senior" || value === "senior") {
            setDifficulty(value)
        }
    }

    function HandleChangeLanguage(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        const selectLanguage: IItemCategory | undefined = CATEGORIES.languages.items.find(item => item.option === value)
        if (selectLanguage) {
            setLanguage(selectLanguage)
        }
    }


    function HandleChangeApiKey(event: ChangeEvent<HTMLInputElement>): void {
        const newApiKey = event.currentTarget.value
        setApiKey(newApiKey)
        setError(false)
    }


    return (
        <div className={styles.container}>
            <div className={styles.selects}>
                <Combobox label="Lenguaje" options={CATEGORIES.languages.items} value={language?.option} onChange={HandleChangeLanguage} />
            </div>
            <div className={styles.difficulty}>
                <label className={styles.difficulty_label}>Dificultad</label>
                <div className={styles.difficulty_buttons}>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "trainee" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("trainee")}><StudentIcon className={styles.difficulty_icon} />Trainee</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "junior" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("junior")}><HammerIcon className={styles.difficulty_icon} />Junior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "semi-senior" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("semi-senior")}><ToolsIcon className={styles.difficulty_icon} />Semi-Senior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "senior" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("senior")}><TrophyIcon className={styles.difficulty_icon} />Senior</button>
                </div>
            </div>
            <TextBoxApiKey props={{ placeholder: "Introduzca su clave API de OpenAI ", value: apiKey, onChange: HandleChangeApiKey }} error={error} />
        </div>
    )
}
