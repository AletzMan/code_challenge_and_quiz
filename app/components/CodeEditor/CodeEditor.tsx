/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAlgorithm } from '@/app/utils/store'
import Editor from '@monaco-editor/react'
import styles from "./styles.module.scss"
import { IItemCategory } from '@/app/interfaces/languages'
import { useState } from 'react'
import { CopyIcon } from '../Icons'
import { ButtonCopy } from '../ButtonCopy/ButtonCopy'

interface Props {
    language: IItemCategory
    codeTemplate: string
}

export function CodeEditor({ language, codeTemplate }: Props) {
    const { setAlgorithmSolution, algorithmSolution } = useAlgorithm()

    function HandleOnChange(value?: string): void {
        if (value) {
            setAlgorithmSolution({ solution: value })
        }
    }

    const HandleCopyClipBoard = () => {
        navigator.clipboard.writeText(algorithmSolution.solution)
    }

    return (
        <div className={styles.editor}>
            <div className={styles.editor_copy}>
                <ButtonCopy textToCopy={algorithmSolution.solution} />
            </div>
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

