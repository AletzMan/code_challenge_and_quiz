"use client"
import styles from "./styles.module.scss"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { useState } from "react"
import { Questions } from "../Questions/Questions"
import { SnackbarProvider, useSnackbar } from "notistack"
import { useApiKey } from "@/app/utils/store"



export const PlaygroundQuiz = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { apiKey } = useApiKey()
    const [start, setStart] = useState(false)
    const [error, setError] = useState(false)

    const HandleStart = () => {
        if (apiKey) {
            setStart(true)
        } else {
            enqueueSnackbar("Por favor, ingresa tu clave API de OpenAI para continuar", { variant: "error" })
            setError(true)
        }
    }

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            {!start && <>
                <QuizSetup error={error} setError={setError} />
                <button className={styles.start} onClick={HandleStart}>
                    COMENZAR
                </button>
            </>}
            {start &&
                <Questions setStart={setStart} />
            }
        </section>
    )
}

