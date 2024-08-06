import { InputHTMLAttributes } from "react"
import styles from "./styles.module.scss"


export function TextBox(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input {...props} className={styles.input}>

        </input>
    )
}