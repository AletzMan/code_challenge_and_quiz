import Link from "next/link"
import { Button } from "../../components/Button/Button"
import { FlowChartIcon, QuestionIcon } from "../../components/Icons"
import styles from "./styles.module.scss"


export default function Page() {
    return (
        <main className={styles.main}>
            <h2 className={styles.main_title}>¡Mejora tus habilidades de programación divirtiéndote!</h2>
            <section className={styles.section}>
                <Link className={styles.article} href="/playground/quiz">
                    <h3 className={styles.subtitle}>Reto de Conocimientos</h3>
                    <QuestionIcon className={`${styles.icon} ${styles.icon_one}`} />
                </Link>
                <Link className={styles.article} href="/playground/algorithms">
                    <h3 className={styles.subtitle}>Reto de Algoritmos</h3>
                    <FlowChartIcon className={`${styles.icon} ${styles.icon_two}`} />
                </Link>
            </section>
        </main>
    )
}