"use client"
import styles from "./styles.module.scss"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { useState } from "react"
import { Questions } from "../Questions/Questions"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
}

export const PlaygroundQuiz = () => {

    const [start, setStart] = useState(false)

    const HandleStart = () => {
        setStart(true)
    }

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            {!start && <>
                <QuizSetup />
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

