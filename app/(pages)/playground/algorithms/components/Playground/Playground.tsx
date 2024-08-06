"use client"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import styles from "./styles.module.scss"
import { useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { JSIcon } from "@/app/components/Icons"
import { useSetupQuiz } from "@/app/utils/store"
import { QuizBot } from "@/app/components/QuizBot/QuizBot"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
}

export const Playground = () => {
    const { language } = useSetupQuiz()
    const [start, setStart] = useState(false)

    const HandleStart = () => {
        setStart(true)
    }
    return (
        <section className={styles.section}>

            {!start && <>
                <QuizSetup />
                <button className={styles.start} onClick={HandleStart}>
                    COMENZAR
                </button>
            </>}
            {start &&
                <article className={styles.playground}>
                    <CodeEditor language={language} />
                    <QuizBot quiz={{ type: "blank space", codeSnippet: null, correctAnswer: ["Java es un lenguaje de programación de propósito general, orientado a objetos y concurrente que fue desarrollado por Sun Microsystems (ahora parte de Oracle Corporation) y lanzado por primera vez en 1995. Java está diseñado para ser independiente de la plataforma, lo que significa que el código compilado puede ejecutarse en cualquier sistema operativo que tenga una Máquina Virtual de Java (JVM) instalada."], explanation: { codeSnippet: null, resume: "" }, options: [""], question: "Que es Java" }} />
                </article>
            }
        </section>
    )
}