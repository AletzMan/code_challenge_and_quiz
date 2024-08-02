import Link from "next/link"
import { GitHubIcon, LinkedInIcon, LogoCCQ } from "../Icons"
import styles from "./styles.module.scss"
export function Footer() {
    return (
        <footer className={styles.footer}>
            <LogoCCQ className={styles.footer_logo} />
            <p className={styles.footer_name}>Creado por: Alejandro Garcia Alonso</p>
            <nav className={styles.footer_nav}>
                <Link className={styles.footer_link} href="https://github.com/AletzMan">
                    <GitHubIcon className={styles.footer_icon} />
                </Link>
                <Link className={styles.footer_link} href="https://www.linkedin.com/in/alejandro-garcia-dev/">
                    <LinkedInIcon className={styles.footer_icon} />
                </Link>
            </nav>
        </footer>
    )
}