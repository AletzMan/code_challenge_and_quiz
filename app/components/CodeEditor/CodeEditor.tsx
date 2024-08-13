/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAlgorithm, useSetupQuiz } from '@/app/utils/store'
import Editor, { loader } from '@monaco-editor/react'
import styles from "./styles.module.scss"
import { IItemCategory } from '@/app/interfaces/languages'
import { useEffect, useState } from 'react'
import { CopyIcon } from '../Icons'
import { ButtonCopy } from '../ButtonCopy/ButtonCopy'
import { CATEGORIES } from '@/app/utils/const'

interface Props {
    language: IItemCategory
    codeTemplate: string
}

export function CodeEditor({ language, codeTemplate }: Props) {
    const { setAlgorithmSolution, algorithmSolution } = useAlgorithm()
    const { category } = useSetupQuiz()

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('myTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#121212',
                },
            })
        })
    }, [])

    function HandleOnChange(value?: string): void {
        if (value) {
            setAlgorithmSolution({ solution: value })
        }
    }

    return (
        <div className={styles.editor}>
            <header className={styles.header}>
                <div className={styles.header_tab}>
                    {<span className={styles.header_logo}>{CATEGORIES[category.option as "frontend"].items.find(item => item.option === language.option)?.logo}</span>}
                    <span className={styles.header_name}>
                        {`MyProyect.${language.language.replace("javascript", "js").replace("typescript", "ts").replace("csharp", "cs").replace("python", "py").replace("ruby", "rb").replace("kotlin", "kt").replace("python", "py").replace("perl", "pl")}`}
                    </span>
                </div>
            </header>
            <div className={styles.editor_copy}>
                <ButtonCopy textToCopy={algorithmSolution.solution} />
            </div>
            <Editor
                defaultLanguage={language.language}
                language={language.language}
                value={codeTemplate}
                theme='myTheme'
                width={"99.99%"}
                height={"99.99%"}
                options={{
                    minimap: { enabled: false },
                    contextmenu: true,
                    wordWrap: "on",
                    automaticLayout: true,

                }}
                onChange={HandleOnChange}
            />
        </div>
    )
}

