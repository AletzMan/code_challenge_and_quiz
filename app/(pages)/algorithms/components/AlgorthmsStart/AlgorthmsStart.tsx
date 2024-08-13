/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import { useAlgorithm, useApiKey } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { AlgorthmsSetUp } from "../AlgorthmsSetUp/AlgorthmsSetUp"
import { Footer } from "@/app/components/Footer/Footer"
import { Button } from "@/app/components/Button/Button"
import { NewIcon, PlayIcon } from "@/app/components/Icons"
import { Modal } from "@/app/components/Modal/Modal"
import { ButtonClose } from "@/app/components/ButtonClose/ButtonClose"



export const AlgorthmsStart = () => {
    const { apiKey } = useApiKey()
    const { setAlgorithmInProgress, algorithmInProgress } = useAlgorithm()
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const route = useRouter()


    const HandleStart = () => {
        if (apiKey) {
            if (algorithmInProgress) {
                enqueueSnackbar("Algoritmo en progreso", { variant: "info" })
                setModal(true)
            } else {
                setAlgorithmInProgress(false)
                route.push("/algorithms/playground")
            }
        } else {
            enqueueSnackbar("Por favor, ingresa tu clave API de OpenAI para continuar", { variant: "error" })
            setError(true)
        }
    }

    const HandleContinueOrNew = (isNew: boolean) => {
        if (isNew) {
            setAlgorithmInProgress(false)
        }
        route.push("/algorithms/playground")
    }

    return (
        <>
            <section className={`${styles.section} scrollBarStyle`}>
                <article className={styles.container}>
                    <h2 className={styles.container_title}>Configura y comienza</h2>
                    <p className={styles.container_setupMessage}>Selecciona el lenguaje, la dificultad y el tema para crear desafíos que se adapten a tus objetivos</p>
                    <AlgorthmsSetUp error={error} setError={setError} />
                    <Button onClick={HandleStart}>
                        COMENZAR
                        <PlayIcon />
                    </Button>
                </article>
                <Footer />
                {modal &&
                    <dialog className={styles.modal} open>
                        <div className={styles.modal_window}>
                            <header className={styles.modal_header}>
                                <h1 className={styles.modal_headerTitle}>Algoritmo en pregreso  </h1>
                                <ButtonClose onClick={() => setModal(false)} />
                            </header>
                            <div className={styles.modal_message}>
                                <p className={styles.modal_p}>Ya tienes un algoritmo en progreso</p>
                                <p className={styles.modal_p}> ¿Deseas seguir con él o empezar de nuevo?</p>
                            </div>
                            <footer className={styles.modal_footer}>
                                <Button className="secondary" onClick={() => HandleContinueOrNew(false)}>
                                    Reanudar
                                    <PlayIcon />
                                </Button>
                                <Button onClick={() => HandleContinueOrNew(true)}>
                                    Nuevo
                                    <NewIcon />
                                </Button>
                            </footer>
                        </div>
                    </dialog>
                }
            </section>
        </>
    )
}