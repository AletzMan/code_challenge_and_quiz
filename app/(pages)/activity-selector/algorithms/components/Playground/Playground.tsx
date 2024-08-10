/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { useApiKey } from "@/app/utils/store"
import { Button } from "@/app/components/Button/Button"
import { SolutionEditor } from "../SolutionEditor/SolutionEditor"
import { enqueueSnackbar } from "notistack"
import { AddIcon, FlowChartIcon } from "@/app/components/Icons"



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
            <article className={styles.container}>
                {!start &&
                    <div className={styles.section_setup}>
                        <h2 className={styles.section_title}>Configuración de Algoritmo</h2>
                        <p className={styles.section_setupMessage}>Selecciona la categoría del algoritmo, el lenguaje de programación que deseas utilizar y el nivel de dificultad que prefieres.</p>
                        <p className={styles.section_setupMessage}>Luego, ingresa tu clave API para generar el algoritmo</p>
                        <QuizSetup error={error} setError={setError} />
                        <button className={styles.start} onClick={() => HandleStart(true)}>
                            COMENZAR
                        </button>
                    </div>}
                {start &&
                    <SolutionEditor setStart={setStart} />
                }
            </article>
            <aside>

            </aside>
        </section>
    )
}