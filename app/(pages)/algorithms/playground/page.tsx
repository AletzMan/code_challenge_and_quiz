/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect, CSSProperties } from "react"
import styles from "./styles.module.scss"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { Separator } from "@/app/components/Separator/Separator"
import { Button } from "@/app/components/Button/Button"
import { useAlgorithm, useApiKey, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { CreateIcon, FlowChartIcon, LoginIcon, LogoCCQ, NewIcon, QuestionIcon, SaveIcon, TargetIcon, ViewIcon } from "@/app/components/Icons"
import { Loading } from "@/app/components/Loading/Loading"
import { Levels } from "@/app/components/Levels/Levels"
import { useSnackbar } from "notistack"
import Link from "next/link"
import { Workspace } from "./Workspace/Workspace"
import { useRouter } from "next/navigation"
import { Resizable } from "re-resizable"

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
    const { enqueueSnackbar } = useSnackbar()
    const { language, difficulty, categoryAlgorithm } = useSetupQuiz()
    const { setAlgorithmSolution } = useAlgorithm()
    const [algorithm, setAlgorithm] = useState<IAlgorithm>({} as IAlgorithm)
    const [loading, setLaoding] = useState(true)
    const [error, setError] = useState(false)
    const router = useRouter()


    useEffect(() => {
        const GetQuiz = async () => {
            setLaoding(true)
            const response = await GetNewAlgorithm(language.option, difficulty, categoryAlgorithm.option, apiKey)
            if (!response.error && response.data) {
                setAlgorithm(response.data)
                setAlgorithmSolution({ solution: response.data.codeTemplate })
            } else {
                enqueueSnackbar({ message: response.message, variant: "error" })
                setError(true)
            }
            setLaoding(false)
        }
        GetQuiz()
    }, [])



    function HandleRestart(): void {
        router.push("/algorithms")
    }



    return (
        <section className={styles.section}>

            <div className={styles.container}>



                {(!loading && !error) &&
                    <>
                        <article className={styles.instructions}>
                            <div className={styles.instructions_container}>
                                <h2 className={styles.instructions_title}>{algorithm.title}</h2>
                                <div className={styles.tags}>
                                    {algorithm.tags.map(tag => (
                                        <span className={styles.tags_tag} key={tag}>{tag}</span>
                                    ))
                                    }
                                </div>
                                <Levels difficulty={difficulty} />
                            </div>
                            <Link className={`${styles.link} ${styles.link_algorithm}`} href={'/algorithms'} title="Crear un nuevo algoritmo" ><CreateIcon className={styles.link_icon} />Crear nuevo algoritmo</Link>

                        </article>
                        <Workspace algorithm={algorithm} />
                    </>
                }


                {(loading && !error) &&
                    <Loading title="Generando algoritmo..." />
                }

                {(error && !loading) &&
                    <div className={styles.error}>
                        <p className={styles.error_p}>Error al generar la pregunta intentelo de nuevo</p>
                        {<Button onClick={HandleRestart}>Reintentar</Button>}
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
    )
}