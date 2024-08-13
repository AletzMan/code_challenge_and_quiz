import Link from "next/link"
import { TargetIcon } from "../Icons"
import styles from "./styles.module.scss"


interface Props {
    href: string
    children: JSX.Element
}
export const ButtonBack = ({ href, children }: Props) => {
    return (
        <Link className={styles.link} href={`${href}`}>{children}</Link>
    )
}