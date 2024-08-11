import Link from "next/link"
import { TargetIcon } from "../Icons"
import styles from "./styles.module.scss"


interface Props {
    text: string
    href: string
}
export const ButtonBack = ({ text, href }: Props) => {
    return (
        <Link className={styles.link} href={`${href}`}><TargetIcon className={styles.link_icon} />{text}</Link>
    )
}