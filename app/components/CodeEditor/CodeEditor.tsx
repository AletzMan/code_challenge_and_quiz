/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IItemCategory } from '@/app/(pages)/playground/algorithms/components/Playground/Playground'
import Editor from '@monaco-editor/react'

interface Props {
    language: IItemCategory
}

export function CodeEditor({ language }: Props) {

    function HandleOnChange(value?: string): void {
        console.log(value)
    }

    return (
        <Editor
            height="60vh"
            defaultLanguage="javascript"
            language={language.option}
            value={language?.functionSyntax}
            theme='vs-dark'
            options={{
                minimap: { enabled: false },
                contextmenu: true,

            }}
            onChange={HandleOnChange}
        />
    )
}