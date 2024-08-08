/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAlgorithm } from '@/app/utils/store'
import Editor from '@monaco-editor/react'
import styles from "./styles.module.scss"
import { IItemCategory } from '@/app/interfaces/languages'
import { useState } from 'react'
import { CopyIcon } from '../Icons'

interface Props {
    language: IItemCategory
    codeTemplate: string
}

export function CodeEditor({ language, codeTemplate }: Props) {
    const { setAlgorithmSolution } = useAlgorithm()

    function HandleOnChange(value?: string): void {
        if (value) {
            setAlgorithmSolution({ solution: value })
        }
    }
    return (
        <div className={styles.editor}>
            <button className={styles.editor_copy}><CopyIcon className={styles.editor_copyIcon} /></button>
            <Editor
                defaultLanguage={language.language}
                language={language.language}
                value={codeTemplate}
                theme='vs-dark'
                options={{
                    minimap: { enabled: false },
                    contextmenu: true,

                }}
                onChange={HandleOnChange}
            />
        </div>
    )
}

