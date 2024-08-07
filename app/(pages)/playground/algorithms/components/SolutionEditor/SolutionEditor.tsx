/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useEffect } from "react"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { IAlgorithm } from "@/app/interfaces/algorithm"
import { Separator } from "@/app/components/Separator/Separator"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"
import { Button } from "@/app/components/Button/Button"
import { useAlgorithm, useSetupQuiz } from "@/app/utils/store"
import { GetNewAlgorithm } from "@/app/utils/dataFetch"
import { BulbIcon, CheckedIcon, CloseIcon } from "@/app/components/Icons"
import { parseTextToJSX } from "@/app/components/QuizBot/ParseTextToJSX"
import { Loading } from "@/app/components/Loading/Loading"
import { Levels } from "@/app/components/Levels/Levels"

interface Props {
}
export function SolutionEditor({ }: Props) {
    const [evaluate, setEvaluate] = useState(false)
    const { language, difficulty } = useSetupQuiz()
    const { setAlgorithmSolution } = useAlgorithm()
    const [algorithm, setAlgorithm] = useState<IAlgorithm>({} as IAlgorithm)
    const [loading, setLaoding] = useState(true)
    const [openExplanation, setOpenExplanation] = useState(false)


    useEffect(() => {
        const GetQuiz = async () => {
            setLaoding(true)
            const response = await GetNewAlgorithm(language.option, difficulty)
            if (response) {
                setAlgorithm(response)
                setAlgorithmSolution({ solution: response.codeTemplate })
            }
            setLaoding(false)
        }
        GetQuiz()
    }, [])

    function HandleEvaluate(event: MouseEvent<HTMLButtonElement>): void {
        setEvaluate(true)
        setTimeout(() => {
            setEvaluate(false)
        }, 500)
    }

    return (
        <>
            <div>
                {!loading &&
                    <>
                        <article className={styles.instructions}>
                            <div>
                                <h2 className={styles.instructions_title}>{algorithm.title}</h2>
                                <p className={styles.instructions_description}>{parseTextToJSX(algorithm.description.replaceAll('\\n', '\n'))}</p>
                                <div className={styles.tags}>
                                    {algorithm.tags.map(tag => (
                                        <span className={styles.tags_tag} key={tag}>{tag}</span>
                                    ))
                                    }
                                </div>
                            </div>
                            <div className={styles.instructions_example}>
                                <span className={styles.instructions_text}>Ejemplo:</span>
                                <div className={styles.instructions_input}>
                                    <span className={styles.instructions_label}>Datos de entrada</span>
                                    <span className={styles.instructions_subtitle}>{algorithm.inputDescription}</span>
                                    <CodeBlock language={language.option} text={algorithm.exampleInputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')} theme={atomOneDark} customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }} />
                                </div>
                                <div className={styles.instructions_output}>
                                    <span className={styles.instructions_label}>Resultado esperado</span>
                                    <span className={styles.instructions_subtitle}>{algorithm.outputDescription}</span>
                                    <CodeBlock language={language.option} text={algorithm.exampleOutputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')} theme={atomOneDark} customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }} />
                                </div>
                            </div>
                        </article>

                        <Separator />
                        <article className={styles.playground}>
                            <div className={styles.playground_button}>
                                <Button className="green" onClick={HandleEvaluate}>Evaluar Solución<CheckedIcon /></Button>
                                <Button className="yellow" onClick={() => setOpenExplanation(true)}>Explicación<BulbIcon /></Button>
                                <span className={styles.playground_logo}>{language.logo}</span>
                                <Levels difficulty={difficulty} />
                            </div>
                            <CodeEditor language={language} codeTemplate={algorithm.codeTemplate.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')} />
                            <AlgorithmBot algorithm={algorithm} evaluate={evaluate} />
                        </article>
                    </>
                }
                {loading &&
                    <Loading title="Generando algoritmo..." />
                }
            </div>
            {openExplanation &&
                <dialog open className={styles.explanation}>
                    <article className={styles.explanation_container}>
                        <div className={styles.explanation_close}>
                            <Button className="green" onClick={() => setOpenExplanation(false)}><CloseIcon /></Button>
                        </div>
                        <h3 className={styles.explanation_title}>{algorithm.title}</h3>
                        <p className={styles.explanation_p}>{parseTextToJSX(algorithm.explanation.resume.replaceAll('\\n', '\n'))}</p>
                    </article>
                </dialog>
            }
        </>
    )
}