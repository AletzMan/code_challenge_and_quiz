/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IItemCategory } from '@/app/(pages)/playground/algorithms/components/Playground/Playground'
import { useAlgorithm } from '@/app/utils/store'
import Editor from '@monaco-editor/react'

interface Props {
    language: IItemCategory
    codeTemplate: string
}

export function CodeEditor({ language, codeTemplate }: Props) {
    const { setAlgorithmSolution } = useAlgorithm()

    function HandleOnChange(value?: string): void {
        console.log(value)
        if (value) {
            setAlgorithmSolution({ solution: value })
        }
    }
    return (
        <Editor
            height="58.4vh"
            defaultLanguage={language.option}
            language={language.option}
            value={codeTemplate}
            theme='vs-dark'
            options={{
                minimap: { enabled: false },
                contextmenu: true,

            }}
            onChange={HandleOnChange}
        />
    )
}