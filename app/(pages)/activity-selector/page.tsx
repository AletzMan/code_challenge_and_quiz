"use client"
import Link from "next/link"
import { FlowChartIcon, HomeIcon, PuzzleIcon, QuestionIcon } from "../../components/Icons"
import styles from "./styles.module.scss"
import { Footer } from "@/app/components/Footer/Footer"
import { useRef, MouseEvent, useEffect } from "react"
import { ButtonBack } from "@/app/components/ButtonBack/ButtonBack"


export default function Page() {
    const explotionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        localStorage.removeItem("quizsetupccq")
        localStorage.removeItem("currentquizccq")
        localStorage.removeItem("algorithmccq")
    }, [])

    const HandleClickMain = (e: MouseEvent<HTMLElement>) => {
        if (explotionRef.current) {
            explotionRef.current.classList.toggle("explotion_active")
            const posX = e.clientX
            const posY = e.clientY
            explotionRef.current.style.top = `${posY}px`
            explotionRef.current.style.left = `${posX}px`
            setTimeout(() => {
                if (explotionRef.current) {
                    explotionRef.current.classList.toggle("explotion_active")
                }

            }, 200)
        }
    }

    return (
        <main className={`${styles.main} scrollBarStyle`} onClick={HandleClickMain}>
            <header className={styles.header}>
                <ButtonBack href="/" >
                    <>
                        <HomeIcon />
                        {""}
                    </>
                </ButtonBack>
            </header>
            <section className={`${styles.section}`}>
                <h2 className={styles.main_title}>¡Mejora tus habilidades de programación divirtiéndote!</h2>
                <p className={styles.message}>Elige el tipo de  desafío que te interesa para comenzar.</p>
                <p className={styles.message}>Actualmente, puedes seleccionar entre las opciones disponibles, pero pronto agregaremos más categorías para ofrecerte una experiencia más completa.</p>
                <article className={styles.categories}>
                    <Link className={`${styles.article} ${styles.article_algorithms}`} href="/algorithms">
                        <h3 className={styles.subtitle}>Potencia tu lógica</h3>
                        <div className={`${styles.article_messages}`}>
                            <p className={styles.article_message}>La IA creará problemas de programación adaptados a tu nivel.</p>
                            <p className={styles.article_message}>¡Resuélvelos y crece como programador!</p>
                        </div>
                        <FlowChartIcon className={`${styles.icon} ${styles.icon_two}`} />
                    </Link>
                    <Link className={`${styles.article} ${styles.article_quiz}`} href="/quiz">
                        <h3 className={styles.subtitle}>¡Prueba tus Conocimientos!</h3>
                        <div className={`${styles.article_messages}`}>
                            <p className={styles.article_message}>Genera quizzes aleatorios y desafía tus conocimientos.</p>
                            <p className={styles.article_message}>¡Perfecto para estudiar o simplemente por diversión!</p>
                        </div>
                        <QuestionIcon className={`${styles.icon} ${styles.icon_one}`} />
                    </Link>
                    <div className={`${styles.article} ${styles.article_games}`}>
                        <h3 className={styles.subtitle}>Juegos y Retos de Lógica</h3>
                        <div className={`${styles.article_messages}`}>
                            <p className={styles.article_message}>Mejora tu lógica y habilidades con juegos diseñados para programadores.</p>
                        </div>
                        <PuzzleIcon className={`${styles.icon} ${styles.icon_three}`} />
                        <span className={styles.article_cooming}>
                            Próximamente
                        </span>
                    </div>
                </article>
            </section>


            <Footer />
            <div className="explotion" ref={explotionRef}></div>
        </main>
    )
}