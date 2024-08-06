
import { Playground } from "./components/Playground/Playground"
import styles from "./styles.module.scss"


export default function Page() {
    return (
        <main className={`${styles.main} scrollBarStyle`}>
            <h2 className={styles.main_title}>Resulve algoritmos</h2>
            <Playground />
        </main>
    )
}