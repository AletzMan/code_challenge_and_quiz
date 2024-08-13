import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"

interface Props {
    href: string
    children?: React.ReactElement
    isSecondary?: boolean
    title: string
    className?: string
}

export function ButtonLink({ href, children, isSecondary, title, className }: Props) {

    return (
        <Link href={href} title={title} className={`${styles.button} ${isSecondary ? styles.button_secondary : ""} ${className}`}>
            {children}
        </Link>
    )
}