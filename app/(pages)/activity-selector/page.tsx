"use client"
import Link from "next/link"
import { FlowChartIcon, QuestionIcon } from "../../components/Icons"
import styles from "./styles.module.scss"
import { Footer } from "@/app/components/Footer/Footer"


export default function Page() {
    return (
        <main className={styles.main}>
            <section className={`${styles.section}`}>
                <h2 className={styles.main_title}>¡Mejora tus habilidades de programación divirtiéndote!</h2>
                <p className={styles.message}>Elige el tipo de actividad que te interesa para comenzar.</p>
                <p className={styles.message}>Actualmente, puedes seleccionar entre las opciones disponibles, pero pronto agregaremos más categorías para ofrecerte una experiencia más completa.</p>
                <article className={styles.categories}>
                    <Link className={`${styles.article} ${styles.article_algorithms}`} href="/algorithms">
                        <h3 className={styles.subtitle}>Reto de Algoritmos</h3>
                        <FlowChartIcon className={`${styles.icon} ${styles.icon_two}`} />
                    </Link>
                    <Link className={`${styles.article} ${styles.article_quiz}`} href="/quiz">
                        <h3 className={styles.subtitle}>Reto de Conocimientos</h3>
                        <QuestionIcon className={`${styles.icon} ${styles.icon_one}`} />
                    </Link>
                </article>
            </section>
            <Footer />
        </main>
    )
}