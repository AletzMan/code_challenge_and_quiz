import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react"
import styles from "./styles.module.scss"


export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button {...props}
            className={`${styles.button} 
            ${props.className === "secondary" && styles.button_secondary} 
            ${props.className === "blue" && styles.button_blue} 
            ${props.className === "yellow" && styles.button_yellow} 
            ${props.className === "active" && styles.button_active} ${props.className}`}>
            {props.children}
        </button>
    )
}