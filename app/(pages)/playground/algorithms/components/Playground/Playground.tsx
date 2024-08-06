/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { JSIcon } from "@/app/components/Icons"
import { useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
}

export const Playground = () => {
    const { language, difficulty } = useSetupQuiz()
    const [start, setStart] = useState(false)
    const [algorithm, setAlgorithm] = useState<IAlgorithm>({} as IAlgorithm)
    const [result, setResult] = useState(algorithm.codeTemplate)
    const [loading, setLaoding] = useState(false)

    useEffect(() => {
        const GetQuiz = async () => {
            setLaoding(false)
            const response = await GetNewAlgorithm(language.option, difficulty)
            if (response) {
                setAlgorithm(response)
            }
            setLaoding(true)
        }
        GetQuiz()
    }, [])

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
                <article className={styles.instructions}>
                    <h2 className={styles.instructions_title}>{algorithm.title}</h2>
                    <p className={styles.instructions_description}>{algorithm.description}</p>
                    <div className={styles.instructions_example}>
                        <span className={styles.instructions_text}>Ejemplo:</span>
                        <div className={styles.instructions_input}>
                            <span className={styles.instructions_label}>Datos de entrada</span>
                            <span className={styles.instructions_subtitle}>{algorithm.inputDescription}</span>
                            <CodeBlock language={language.option} text={algorithm.exampleInputs[0]} theme={atomOneDark} customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }} />
                        </div>
                        <div className={styles.instructions_output}>
                            <span className={styles.instructions_label}>Resultado esperado</span>
                            <span className={styles.instructions_subtitle}>{algorithm.outputDescription}</span>
                            <CodeBlock language={language.option} text={algorithm.exampleOutputs[0]} theme={atomOneDark} customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }} />
                        </div>
                    </div>
                </article>
            }
            {start &&
                <article className={styles.playground}>
                    <CodeEditor language={language} codeTemplate={algorithm.codeTemplate} />
                    <AlgorithmBot algorithm={algorithm} result={result} />
                </article>
            }
        </section>
    )
}