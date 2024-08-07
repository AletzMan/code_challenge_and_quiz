/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { IItemCategory } from "../../../algorithms/components/Playground/Playground"
import { useApiKey, useSetupQuiz } from "@/app/utils/store"
import { CATEGORIES } from "@/app/utils/const"
import { HammerIcon, StudentIcon, ToolsIcon, TrophyIcon } from "@/app/components/Icons"
import { TextBoxApiKey } from "@/app/components/TextBoxApiKey/TextBoxApiKey"

interface Props {
    error: boolean
    setError: Dispatch<SetStateAction<boolean>>
}

export function QuizSetup({ error, setError }: Props) {
    const { language, setLanguage, difficulty, setDifficulty, questions, setQuestions, category, setCategory } = useSetupQuiz()
    const { setApiKey, apiKey } = useApiKey()
    const [options, setOptions] = useState(CATEGORIES.languages.items)

    useEffect(() => {
        const selectCategory = category.option
        if (selectCategory) {
            if (selectCategory === "languages" || selectCategory === "frontend" || selectCategory === "backend" || selectCategory === "devops") {
                setOptions(CATEGORIES[selectCategory].items)
                setLanguage(CATEGORIES[selectCategory].items[0])
            }
        }
    }, [category])

    function HandleChangeLanguage(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        const selectLanguage: IItemCategory | undefined = options.find(item => item.option === value)
        if (selectLanguage) {
            setLanguage(selectLanguage)
        }
    }

    function HandleChangeQuestions(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        setQuestions(Number(value))
    }

    function HandleChangeCategory(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.currentTarget.value
        const selectCategory = CATEGORIES.types.items.find(type => type.option === value)
        if (selectCategory) {
            setCategory(selectCategory)
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
                <Combobox label="Categoria" options={CATEGORIES.types.items} value={category.option} onChange={HandleChangeCategory} />
                <Combobox label="Opciones" options={options} value={language?.option} onChange={HandleChangeLanguage} />
                <Combobox label="Número de Preguntas" options={Questions} value={questions} onChange={HandleChangeQuestions} />
            </div>
            <div className={styles.difficulty}>
                <label className={styles.difficulty_label}>Dificultad</label>
                <div className={styles.difficulty_buttons}>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "trainee" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("trainee")}><StudentIcon className={styles.difficulty_icon} />Trainee</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "junior" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("junior")}><HammerIcon className={styles.difficulty_icon} />Junior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "semi-senior" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("semi-senior")}><ToolsIcon className={styles.difficulty_icon} />Semi-Senior</button>
                    <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "senior" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("senior")}><TrophyIcon className={styles.difficulty_icon} />Senior</button>
                </div>
            </div>
            <TextBoxApiKey props={{ placeholder: "Introduzca su clave API de OpenAI ", value: apiKey, onChange: HandleChangeApiKey }} error={error} />
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