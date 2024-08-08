import { ButtonHTMLAttributes } from "react"
import styles from "./styles.module.scss"
import { CloseIcon } from "../Icons"


export function ButtonClose(props: ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button {...props}
            className={`${styles.button} `}>
            <CloseIcon className={styles.button_close} />
        </button>
    )
}