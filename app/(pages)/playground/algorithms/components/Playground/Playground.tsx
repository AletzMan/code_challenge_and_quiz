/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { useApiKey } from "@/app/utils/store"
import { Button } from "@/app/components/Button/Button"
import { SolutionEditor } from "../SolutionEditor/SolutionEditor"
import { enqueueSnackbar } from "notistack"



export const Playground = () => {
    const { apiKey } = useApiKey()
    const [start, setStart] = useState(false)
    const [error, setError] = useState(false)


    const HandleStart = (value: boolean) => {
        if (apiKey) {
            setStart(true)
        } else {
            enqueueSnackbar("Por favor, ingresa tu clave API de OpenAI para continuar", { variant: "error" })
            setError(true)
        }
    }

    return (
        <section className={styles.section}>
            {start &&
                <div className={styles.section_button}>
                    <Button className="yellow" onClick={() => setStart(false)}>Nuevo Algoritmo</Button>
                </div>
            }
            {!start && <>
                <QuizSetup error={error} setError={setError} />
                <button className={styles.start} onClick={() => HandleStart(true)}>
                    COMENZAR
                </button>
            </>}
            {start &&
                <SolutionEditor setStart={setStart} />
            }
        </section>
    )
}