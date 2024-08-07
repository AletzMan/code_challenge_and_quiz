
import { ArrowLeftIcon } from "@/app/components/Icons"
import { PlaygroundQuiz } from "./components/PlaygroundQuiz/PlaygroundQuiz"
import styles from "./styles.module.scss"
import Link from "next/link"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"


export default function Page() {
    return (
        <main className={`${styles.main}`}>
            <h2 className={styles.main_title}>
                <Link className={styles.link} href={'/playground'}><ArrowLeftIcon className={styles.link_icon} />Seleccionar Modo</Link>
                Reto de conocimientos
            </h2>
            <SnackProvider>
                <PlaygroundQuiz />
            </SnackProvider>
        </main>
    )
}