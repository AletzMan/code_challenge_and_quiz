import { ButtonHTMLAttributes } from "react"
import styles from "./styles.module.scss"


export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button {...props}
            className={`${styles.button} 
                        ${props.className === "green" && styles.button_green} 
                        ${props.className === "blue" && styles.button_blue} 
                        ${props.className === "yellow" && styles.button_yellow} 
                        ${props.className === "active" && styles.button_active}`}>
            {props.children}
        </button>
    )
}