/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useEffect, Dispatch, SetStateAction } from "react"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { Separator } from "@/app/components/Separator/Separator"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"
import { Button } from "@/app/components/Button/Button"
import { useAlgorithm, useApiKey, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm, RunCode } from "@/app/utils/dataFetch"
import { AddIcon, BulbIcon, CheckedIcon, CloseIcon, IOIcon, RunCodeIcon } from "@/app/components/Icons"
import { parseTextToJSX } from "@/app/components/QuizBot/ParseTextToJSX"
import { Loading } from "@/app/components/Loading/Loading"
import { Levels } from "@/app/components/Levels/Levels"
import { useSnackbar } from "notistack"
import { Modal } from "@/app/components/Modal/Modal"
import { CATEGORIES, StyleCodeEditor } from "@/app/utils/const"
import { IOutputRun } from "@/app/interfaces/languages"
import { ButtonClose } from "@/app/components/ButtonClose/ButtonClose"

interface Props {
    setStart: Dispatch<SetStateAction<boolean>>
}
export function SolutionEditor({ setStart }: Props) {
    const { apiKey } = useApiKey()
    const { enqueueSnackbar } = useSnackbar()
    const [evaluate, setEvaluate] = useState(false)
    const { language, difficulty, categoryAlgorithm, category } = useSetupQuiz()
    const { setAlgorithmSolution, algorithmSolution } = useAlgorithm()
    const [algorithm, setAlgorithm] = useState<IAlgorithm>({} as IAlgorithm)
    const [loading, setLaoding] = useState(true)
    const [openExplanation, setOpenExplanation] = useState(false)
    const [openExample, setOpenExample] = useState(false)
    const [error, setError] = useState(false)
    const [output, setOutput] = useState<IOutputRun>({ code: 0, output: "Suerte 🍀", signal: "", stderr: "", stdout: "" })

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

    console.log(language)

    function HandleEvaluate(event: MouseEvent<HTMLButtonElement>): void {
        setEvaluate(true)
        setTimeout(() => {
            setEvaluate(false)
        }, 500)
    }

    const HandleRunCode = async () => {
        setOutput({ code: -135, output: "[RUN] Ejecutando código...", signal: "", stderr: "", stdout: "" })
        const response = await RunCode(language.language, algorithmSolution.solution, language.version)

        if (response.response?.run.code === 1 && response.response?.run.stderr) {
            setOutput(response.response?.run)
        } else {
            if (response.response)
                setOutput(response.response?.run)
        }
    }

    return (
        <>
            <div>
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
                                {/*<textarea className={`${styles.instructions_description} scrollBarStyle`} spellCheck readOnly value={algorithm.explanation.replaceAll('\\n', '\n')} />*/}
                            </div>
                            <div className={styles.instructions_new}>
                                <Button className="yellow" onClick={() => setStart(false)}><AddIcon /> Nuevo Algoritmo</Button>
                            </div>
                        </article>
                        <article className={styles.playground}>
                            <div className={styles.playground_header}>
                                <div className={styles.playground_buttons}>
                                    <Button className="yellow" attr-active={openExplanation ? "active" : undefined} onClick={() => setOpenExplanation(prev => !prev)}>
                                        <span className={styles.playground_buttonsText} >Explicación</span>
                                        <BulbIcon />
                                    </Button>
                                    <Button className={"blue"} attr-active={openExample ? "active" : undefined} onClick={() => setOpenExample(prev => !prev)}>
                                        <span className={styles.playground_buttonsText} >Ejemplo</span>
                                        <IOIcon />
                                    </Button>
                                    <span className={styles.playground_logo}>{CATEGORIES[category.option as "frontend"].items.find(item => item.option === language.option)?.logo}</span>
                                    <Levels difficulty={difficulty} />
                                    <div className={styles.playground_buttonsRun}>
                                        <Button onClick={HandleRunCode} >
                                            <span className={styles.playground_buttonsText} >RUN</span>
                                            <RunCodeIcon />
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.playground_options}>
                                    <Button className="green" onClick={HandleEvaluate} >Evaluar Solución<CheckedIcon /></Button>
                                </div>
                            </div>
                            <div className={styles.playground_container}>
                                <div className={styles.playground_editor}>
                                    <CodeEditor language={language} codeTemplate={algorithm.codeTemplate.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')} />
                                    <div className={styles.playground_output}>
                                        <header className={styles.playground_outputHeader}>
                                            <span className={styles.playground_outputHeaderText}>OUTPUT</span>
                                            <span className={`${styles.playground_outputHeaderStatus} 
                                            ${output.code === -135 && styles.playground_outputHeaderStatusRun}
                                            ${output.code > 0 && styles.playground_outputHeaderStatusError}
                                            ${output.code === 0 && styles.playground_outputHeaderStatusOK}`}></span>
                                        </header>
                                        <textarea className={`${styles.playground_outputText} scrollBarStyle`} value={output.output} spellCheck={false} readOnly />
                                    </div>
                                </div>
                                <AlgorithmBot algorithm={algorithm} evaluate={evaluate} />
                            </div>
                        </article>
                    </>
                }
                {(loading && !error) &&
                    <Loading title="Generando algoritmo..." />
                }
                {(error && !loading) &&
                    <div className={styles.error}>
                        <p className={styles.error_p}>Error al generar la pregunta intentelo de nuevo</p>
                        <Button onClick={() => setStart(false)}>Reintentar</Button>
                    </div>

                }
            </div>
            {openExplanation &&
                <Modal onClick={() => setOpenExplanation(false)} allowBackground>
                    <article className={styles.explanation}>
                        <div className={styles.explanation_close}>
                            <ButtonClose onClick={() => setOpenExplanation(false)} />
                        </div>
                        <h3 className={styles.explanation_title}>{algorithm.title}</h3>
                        <p className={styles.explanation_p}>{parseTextToJSX(algorithm.explanation.replaceAll('\\n', '\n'))}</p>
                    </article>
                </Modal>
            }
            {
                openExample &&
                <Modal onClick={() => setOpenExample(false)} allowBackground>
                    <div className={styles.instructions_example}>
                        <div className={styles.explanation_close}>
                            <ButtonClose onClick={() => setOpenExample(false)} />
                        </div>
                        <span className={styles.instructions_text}>Ejemplo:</span>
                        <div className={styles.instructions_input}>
                            <span className={styles.instructions_label}>Datos de entrada</span>
                            <span className={styles.instructions_subtitle}>{algorithm.inputDescription}</span>
                            <CodeBlock language={language.language}
                                text={algorithm.exampleInputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                theme={atomOneDark}
                                customStyle={{ ...StyleCodeEditor }} />
                        </div>
                        <Separator />
                        <div className={styles.instructions_output}>
                            <span className={styles.instructions_label}>Resultado esperado</span>
                            <span className={styles.instructions_subtitle}>{algorithm.outputDescription}</span>
                            <CodeBlock language={language.language}
                                text={algorithm.exampleOutputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                theme={atomOneDark}
                                customStyle={{ ...StyleCodeEditor }} />
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}