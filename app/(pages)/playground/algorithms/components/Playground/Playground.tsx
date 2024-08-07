/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { JSIcon } from "@/app/components/Icons"
import { useAlgorithm, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"
import { Separator } from "@/app/components/Separator/Separator"
import { Button } from "@/app/components/Button/Button"
import { MouseEvent } from "react"
import { SolutionEditor } from "../SolutionEditor/SolutionEditor"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
}

export const Playground = () => {

    const [start, setStart] = useState(false)



    const HandleStart = (value: boolean) => {
        setStart(value)
    }

    return (
        <section className={styles.section}>
            {start &&
                <div className={styles.section_button}>
                    <Button className="yellow" onClick={() => HandleStart(false)}>Nuevo Algoritmo</Button>
                </div>
            }
            {!start && <>
                <QuizSetup />
                <button className={styles.start} onClick={() => HandleStart(true)}>
                    COMENZAR
                </button>
            </>}
            {start &&
                <SolutionEditor />
            }
        </section>
    )
}