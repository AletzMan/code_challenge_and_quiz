import { InputHTMLAttributes } from "react"
import styles from "./styles.module.scss"

interface Props {
    props: InputHTMLAttributes<HTMLInputElement>
    error: boolean
}

export function TextBoxApiKey({ props, error }: Props) {
    return (
        <div className={styles.key}>
            <label className={styles.key_label}>OpenAI API Key</label>
            <input type="password" {...props} className={`${styles.key_input} ${error && styles.key_inputError}`} />
        </div>
    )
}