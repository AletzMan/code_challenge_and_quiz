/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import { useApiKey } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { AlgorthmsSetUp } from "../AlgorthmsSetUp/AlgorthmsSetUp"
import { Footer } from "@/app/components/Footer/Footer"



export const AlgorthmsStart = () => {
    const { apiKey } = useApiKey()
    const [error, setError] = useState(false)
    const route = useRouter()


    const HandleStart = () => {
        if (apiKey) {
            route.push("/algorithms/playground")
        } else {
            enqueueSnackbar("Por favor, ingresa tu clave API de OpenAI para continuar", { variant: "error" })
            setError(true)
        }
    }

    return (
        <section className={styles.section}>
            <article className={styles.container}>
                <h2 className={styles.container_title}>Configuración de Algoritmo</h2>
                <p className={styles.container_setupMessage}>Selecciona la categoría del algoritmo, el lenguaje de programación que deseas utilizar y el nivel de dificultad que prefieres.</p>
                <p className={styles.container_setupMessage}>Luego, ingresa tu clave API para generar el algoritmo</p>
                <AlgorthmsSetUp error={error} setError={setError} />
                <button className={styles.start} onClick={HandleStart}>
                    COMENZAR
                </button>
            </article>
            <Footer />
        </section>
    )
}