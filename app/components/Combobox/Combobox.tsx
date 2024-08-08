import { ChangeEventHandler } from "react"
import styles from "./styles.module.scss"
import { CATEGORIES } from "@/app/utils/const"

export interface IComboboxOptions {
    option: string
    value: string
    functionSyntax?: string
    color?: string
}

interface Props {
    label?: string
    options: IComboboxOptions[]
    value?: string | number
    onChange?: ChangeEventHandler<HTMLSelectElement>
}
export function Combobox({ label, options, value, onChange }: Props) {

    return (
        <fieldset className={styles.combobox}>
            {label && <label className={styles.label}>{label}</label>}
            <select className={styles.select} value={value} onChange={onChange} /*style={{ color: `${options.find(option => option.option === value)?.color}` }}*/>
                {options.map(option => (
                    <option className={styles.option} key={option.option} value={option.option} /*style={{ color: `${option.color}` }}*/>{option.value}</option>
                ))
                }
            </select>
            <div className={styles.logo}>
                {CATEGORIES.languages.items.find(lang => lang.option === value)?.logo}
            </div>
        </fieldset>
    )
}