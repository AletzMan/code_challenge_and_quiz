import Link from "next/link"
import { Button } from "../Button/Button"
import { LogoCCQ } from "../Icons"
import styles from "./styles.module.scss"

export function Header() {
    return (
        <header className={styles.header}>
            <Link href={"/"} className={styles.container}>
                <LogoCCQ className={styles.logo} />
                <h1 className={styles.title}>Code Challenge & Quiz</h1>
            </Link>
            <div className={styles.login}>
                <span className={styles.login_name}>Invitado</span>
                <Button className="blue">INGRESAR</Button>
            </div>
        </header>
    )
}