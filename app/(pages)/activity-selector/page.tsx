"use client"
import Link from "next/link"
import { FlowChartIcon, QuestionIcon } from "../../components/Icons"
import styles from "./styles.module.scss"
import { Footer } from "@/app/components/Footer/Footer"


export default function Page() {
    return (
        <main className={styles.main}>
            <h2 className={styles.main_title}>¡Mejora tus habilidades de programación divirtiéndote!</h2>
            <section className={styles.section}>
                <Link className={styles.article} href="/activity-selector/algorithms">
                    <h3 className={styles.subtitle}>Reto de Algoritmos</h3>
                    <FlowChartIcon className={`${styles.icon} ${styles.icon_two}`} />
                </Link>
                <Link className={styles.article} href="/activity-selectord/quiz">
                    <h3 className={styles.subtitle}>Reto de Conocimientos</h3>
                    <QuestionIcon className={`${styles.icon} ${styles.icon_one}`} />
                </Link>
            </section>
            <Footer />
        </main>
    )
}