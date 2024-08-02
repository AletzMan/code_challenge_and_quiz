
import { PlaygroundQuiz } from "./components/PlaygroundQuiz/PlaygroundQuiz"
import styles from "./styles.module.scss"


export default function Page() {
    return (
        <main className={styles.main}>
            <h2 className={styles.main_title}>Reto de conocimientos</h2>
            <PlaygroundQuiz />
        </main>
    )
}