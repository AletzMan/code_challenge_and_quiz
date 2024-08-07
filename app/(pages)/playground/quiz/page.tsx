
import { ArrowLeftIcon } from "@/app/components/Icons"
import { PlaygroundQuiz } from "./components/PlaygroundQuiz/PlaygroundQuiz"
import styles from "./styles.module.scss"
import Link from "next/link"


export default function Page() {
    return (
        <main className={`${styles.main}`}>
            <h2 className={styles.main_title}>
                <Link className={styles.link} href={'/playground'}><ArrowLeftIcon className={styles.link_icon} />Playground</Link>
                Reto de conocimientos
            </h2>
            <PlaygroundQuiz />
        </main>
    )
}