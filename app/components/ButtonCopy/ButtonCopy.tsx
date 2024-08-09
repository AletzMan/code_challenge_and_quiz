"use client"
import { ButtonHTMLAttributes, useState } from "react"
import styles from "./styles.module.scss"
import { CheckIcon, CloseIcon, CopyIcon } from "../Icons"

interface Props {
    textToCopy: string
}

export function ButtonCopy({ textToCopy }: Props) {
    const [copy, setCopy] = useState(false)

    const HandleCopyClipBoard = () => {
        navigator.clipboard.writeText(textToCopy)
        setCopy(true)

        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    return (
        <button
            className={`${styles.button} ${copy && styles.button_check} `} onMouseDown={HandleCopyClipBoard}>
            {!copy && <CopyIcon className={styles.button_icon} />}
            {copy && <CheckIcon className={`${styles.button_icon}  `} />}
            {copy && <span className={`  ${styles.button_iconCheck}`} >¡Copiado!</span>}
        </button>
    )
}