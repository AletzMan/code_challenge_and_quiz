import { ButtonHTMLAttributes } from "react"
import styles from "./styles.module.scss"


export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    console.log(props.className)
    return (
        <button {...props} className={`${styles.button} ${props.className === "green" && styles.button_green} ${props.className === "blue" && styles.button_blue} ${props.className === "yellow" && styles.button_yellow}`}>
            {props.children}
        </button>
    )
}