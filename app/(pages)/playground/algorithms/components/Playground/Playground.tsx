/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { JSIcon } from "@/app/components/Icons"
import { useAlgorithm, useApiKey, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"
import { Separator } from "@/app/components/Separator/Separator"
import { Button } from "@/app/components/Button/Button"
import { MouseEvent } from "react"
import { SolutionEditor } from "../SolutionEditor/SolutionEditor"
import { enqueueSnackbar } from "notistack"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
}

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