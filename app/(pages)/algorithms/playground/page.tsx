/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect, CSSProperties } from "react"
import styles from "./styles.module.scss"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { Separator } from "@/app/components/Separator/Separator"
import { Button } from "@/app/components/Button/Button"
import { useAlgorithm, useApiKey, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { BotSadIcon, ConfigIcon, CreateIcon, FlowChartIcon, LoginIcon, LogoCCQ, NewIcon, QuestionIcon, RefreshIcon, SaveIcon, TargetIcon, ViewIcon } from "@/app/components/Icons"
import { Loading } from "@/app/components/Loading/Loading"
import { Levels } from "@/app/components/Levels/Levels"
import { SnackbarProvider, enqueueSnackbar, useSnackbar } from "notistack"
import Link from "next/link"
import { Workspace } from "./Workspace/Workspace"
import { useRouter } from "next/navigation"
import { Resizable } from "re-resizable"
import { ButtonLink } from "@/app/components/Button/ButtonLink"

const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0.5em 0.5em 0.5em 0",
    //overflow: "hidden",
    borderRadius: "0.5em",
    zIndex: "5",
    border: "solid 1px #dddddd15",
    background: "var(--black-color)"
}

export default function Page() {
    const { apiKey } = useApiKey()
    const { language, difficulty, categoryAlgorithm } = useSetupQuiz()
    const { setAlgorithmSolution, algorithmInProgress, setAlgorithmInProgress, currentAlgorithm, setCurrentAlgorithm } = useAlgorithm()
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Una vez que el estado esté cargado, cambia el valor de loading a false
        if (algorithmInProgress !== undefined) {
            setLoading(false)
        }
    }, [algorithmInProgress])

    useEffect(() => {
        if (!loading && !algorithmInProgress) {
            GetAlgorithm()
            setAlgorithmInProgress(true)
        }
    }, [loading, algorithmInProgress, loadingResponse])


    const GetAlgorithm = async () => {
        setLoadingResponse(true)
        const response = await GetNewAlgorithm(language.option, difficulty, categoryAlgorithm.option, apiKey)

        if (!response.error && response.data) {
            setCurrentAlgorithm(response.data)
            setAlgorithmSolution({ solution: `${response.data.codeTemplate}` })
        } else {
            enqueueSnackbar({ message: response.message, variant: "error" })
            setError(true)
        }
        setLoadingResponse(false)
    }

    function HandleRestart(): void {
        setAlgorithmInProgress(false)
        setError(false)
    }


    return (
        <>
            <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} />
            <section className={styles.section}>

                <div className={styles.container}>
                    {((!loadingResponse || loading) && !error) &&
                        <>
                            <article className={styles.instructions}>
                                <div className={styles.instructions_container}>
                                    <h2 className={styles.instructions_title}>{currentAlgorithm.title}</h2>
                                    <div className={styles.tags}>
                                        {currentAlgorithm.tags.map(tag => (
                                            <span className={styles.tags_tag} key={tag}>{tag}</span>
                                        ))
                                        }
                                    </div>
                                    <Levels difficulty={difficulty} />
                                </div>
                                <div className={`  ${styles.link_algorithm}`} >
                                    <ButtonLink href={'/algorithms'} title="Crear un nuevo algoritmo" >
                                        <>
                                            <CreateIcon className={styles.link_icon} />Crear nuevo algoritmo
                                        </>
                                    </ButtonLink>
                                </div>

                            </article>
                            <Workspace />
                        </>
                    }


                    {(loadingResponse && !error) &&
                        <Loading title="Generando algoritmo..." />
                    }

                    {(error && !loadingResponse) &&
                        <div className={styles.error}>
                            <BotSadIcon className={styles.error_icon} />
                            <div className={styles.error_message}>
                                <p className={styles.error_p}>¡Vaya! </p>
                                <p className={styles.error_p}>Mi lógica se enredó y no pude crear el algoritmo.</p>
                                <p className={styles.error_p}>¿Reintentamos?</p>
                            </div>
                            <div className={styles.error_buttons}>
                                <Button onClick={HandleRestart} title="Volver a generar la pregunta">Reintentar<RefreshIcon /></Button>
                                <ButtonLink href="/algorithms" isSecondary title="">
                                    <>
                                        {"Cambiar Configuración"}
                                        <ConfigIcon />
                                    </>
                                </ButtonLink>
                            </div>
                        </div>
                    }


                </div>
                <Resizable defaultSize={{ height: "calc(100svh - 20em)", width: "60" }} maxWidth={60} maxHeight={"calc(100svh - 1em)"} minWidth={60} style={style}  >
                    <Link className={styles.logo} href={"/"} title="Ir a la página de inicio">
                        <LogoCCQ className={styles.logo_icon} />
                        <span className={styles.logo_text} >Code Challenge & Quiz</span>
                    </Link>
                    <Separator />
                    <div className={styles.options}>
                        <div className={styles.header}>
                            <Link className={styles.link} href={'/activity-selector'} title="Elegir desafío" attr-label="Elegir desafío"><TargetIcon className={styles.link_icon} />  </Link>
                            <Link className={styles.link} href={'/activity-selector'} title="Guardar algoritmo" attr-label="Guardar algoritmo"><SaveIcon className={styles.link_icon} /></Link>
                            <Link className={styles.link} href={'/activity-selector'} title="Ver algoritmos guardados" attr-label="Ver algoritmos guardados"><ViewIcon className={styles.link_icon} /></Link>
                        </div>
                        <Link className={`${styles.link} ${styles.link_login}`} href={'/playground'} title="Iniciar sesion" attr-label="Iniciar sesion"><LoginIcon className={styles.link_icon} /> </Link>
                    </div>
                </Resizable>
            </section>
        </>
    )
}