"use client"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import styles from "./styles.module.scss"
import { useState } from "react"
import { QuizSetup } from "../QuizSetup/QuizSetup"
import { JSIcon } from "@/app/components/Icons"

export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
}

export const Playground = () => {
    const [language, setLanguage] = useState<IItemCategory>({
        option: "javascript",
        value: "JavaScript",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#F7DF1E",
        logo: <JSIcon />
    })
    return (
        <section className={styles.section}>
            <QuizSetup language={language} setLanguage={setLanguage} />
            <CodeEditor language={language} />
        </section>
    )
}