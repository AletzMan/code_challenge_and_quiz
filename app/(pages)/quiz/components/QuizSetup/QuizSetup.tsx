/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Combobox } from "@/app/components/Combobox/Combobox"
import styles from "./styles.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useApiKey, useCurrentQuiz, useSetupQuiz } from "@/app/utils/store"
import { CATEGORIES } from "@/app/utils/const"
import { ArrowLeftIcon, HammerIcon, PlayIcon, StudentIcon, TargetIcon, ToolsIcon, TrophyIcon } from "@/app/components/Icons"
import { TextBoxApiKey } from "@/app/components/TextBoxApiKey/TextBoxApiKey"
import { IItemCategory } from "@/app/interfaces/languages"
import { useSnackbar } from "notistack"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/Button/Button"



export function QuizSetup() {
    const { enqueueSnackbar } = useSnackbar()
    const [error, setError] = useState(false)
    const { language, setLanguage, difficulty, setDifficulty, questions, setQuestions, category, setCategory } = useSetupQuiz()
    const { resetCurrentQuiz } = useCurrentQuiz()
    const { setApiKey, apiKey } = useApiKey()
    const [options, setOptions] = useState(CATEGORIES.languages.items)
    const router = useRouter()

    useEffect(() => {
        resetCurrentQuiz()
    }, [])

    useEffect(() => {
        const selectCategory = category.option
        if (selectCategory) {
            if (selectCategory === "languages" || selectCategory === "frontend" || selectCategory === "backend" || selectCategory === "devops") {
                setOptions(CATEGORIES[selectCategory].items)
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
            if (value === "languages" || value === "frontend" || value === "backend" || value === "devops") {
                setLanguage(CATEGORIES[value].items[0])
            }
        }
    }

    function HandleChangeApiKey(event: ChangeEvent<HTMLInputElement>): void {
        const newApiKey = event.currentTarget.value
        setApiKey(newApiKey)
        setError(false)
    }


    const HandleStart = () => {
        if (apiKey) {
            router.push("/quiz/playground")
        } else {
            enqueueSnackbar("Por favor, ingresa tu clave API de OpenAI para continuar", { variant: "error" })
            setError(true)
        }
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Configura y comienza
            </h2>
            <div className={styles.message}>
                <p className={styles.message_p}> Elige el lenguaje, la dificultad y el tema para generar preguntas a medida</p>
            </div>
            <div className={styles.options}>
                <div className={styles.selects}>
                    <Combobox label="Categoria" options={CATEGORIES.types.items} value={category.option} onChange={HandleChangeCategory} />
                    <Combobox label="Opciones" options={options} value={language?.option} onChange={HandleChangeLanguage} />
                    <Combobox label="Número de Preguntas" options={Questions} value={questions} onChange={HandleChangeQuestions} />
                </div>
                <div className={styles.difficulty}>
                    <label className={styles.difficulty_label}>Dificultad</label>
                    <div className={styles.difficulty_buttons}>
                        <button className={`${styles.difficulty_button} ${styles.difficulty_buttonEasy} ${difficulty === "easy" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("easy")}><StudentIcon className={styles.difficulty_icon} />Trainee</button>
                        <button className={`${styles.difficulty_button} ${styles.difficulty_buttonMedium} ${difficulty === "medium" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("medium")}><HammerIcon className={styles.difficulty_icon} />Junior</button>
                        <button className={`${styles.difficulty_button} ${styles.difficulty_buttonHard} ${difficulty === "hard" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("hard")}><ToolsIcon className={styles.difficulty_icon} />Semi-Senior</button>
                        <button className={`${styles.difficulty_button} ${styles.difficulty_buttonExpert} ${difficulty === "expert" && styles.difficulty_buttonActive}`} onClick={() => setDifficulty("expert")}><TrophyIcon className={styles.difficulty_icon} />Senior</button>
                    </div>
                </div>
            </div>
            <TextBoxApiKey props={{ placeholder: "Introduzca su API Key de OpenAI ", value: apiKey, onChange: HandleChangeApiKey }} error={error} />
            <Button className={styles.start} onClick={HandleStart}>
                Comenzar
                <PlayIcon />
            </Button>
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