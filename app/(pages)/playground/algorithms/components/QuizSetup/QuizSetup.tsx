/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { AlgorithmsCategories, CATEGORIES } from "@/app/utils/const"
import { useApiKey, useSetupQuiz } from "@/app/utils/store"
import { HammerIcon, StudentIcon, ToolsIcon, TrophyIcon } from "@/app/components/Icons"
import { TextBoxApiKey } from "@/app/components/TextBoxApiKey/TextBoxApiKey"
import { IItemCategory } from "@/app/interfaces/languages"
import { IAlgorithmProperty } from "@/app/interfaces/algorithm"

interface Props {
    error: boolean
    setError: Dispatch<SetStateAction<boolean>>
}

export function QuizSetup({ error, setError }: Props) {
    const { language, setLanguage, difficulty, setDifficulty, categoryAlgorithm, setCategoryAlgorith } = useSetupQuiz()
    const { setApiKey, apiKey } = useApiKey()

    console.log(difficulty)
    console.log(language)
    console.log(categoryAlgorithm)


    useEffect(() => {
        console.log(language)
        if (language.logo?.key === null) {
            //setLanguage(CATEGORIES.languages.items.find(item => item.language === language.language) as IItemCategory)
        }
    }, [categoryAlgorithm])

    const HandleChangeDifficulty = (value: "easy" | "medium" | "hard" | "expert") => {
        setDifficulty(value)
    }

    function HandleChangeCategory(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        const selectCategory: IAlgorithmProperty | undefined = AlgorithmsCategories.find(item => item.option === value)
        if (selectCategory) {
            setCategoryAlgorith(selectCategory)
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
                <Combobox label="Categoria" options={AlgorithmsCategories} value={categoryAlgorithm?.option} onChange={HandleChangeCategory} />
                <Combobox label="Lenguaje" options={CATEGORIES.languages.items} value={language?.option} onChange={HandleChangeLanguage} />
            </div>
            <div className={styles.difficulty}>
                <label className={styles.difficulty_label}>Dificultad</label>
                <div className={styles.difficulty_buttons}>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "easy" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("easy")}><StudentIcon className={styles.difficulty_icon} />Trainee</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "medium" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("medium")}><HammerIcon className={styles.difficulty_icon} />Junior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "hard" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("hard")}><ToolsIcon className={styles.difficulty_icon} />Semi-Senior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "expert" && styles.difficulty_buttonActive}`} onClick={() => HandleChangeDifficulty("expert")}><TrophyIcon className={styles.difficulty_icon} />Senior</button>
                </div>
            </div>
            <TextBoxApiKey props={{ placeholder: "Introduzca su clave API de OpenAI ", value: apiKey, onChange: HandleChangeApiKey }} error={error} />
        </div>
    )
}
