import { BulbIcon, CheckedIcon, IOIcon, RunCodeIcon } from "@/app/components/Icons"
import styles from "./styles.module.scss"
import { Button } from "@/app/components/Button/Button"
import { CodeEditor } from "@/app/components/CodeEditor/CodeEditor"
import { AlgorithmBot } from "@/app/components/AlgorithmBot/AlgorithmBot"
import { useAlgorithm, useSetupQuiz } from "@/app/utils/store"
import { IOutputRun } from "@/app/interfaces/languages"
import { useState, MouseEvent } from "react"
import { RunCode } from "@/app/utils/dataFetch"
import { Modal } from "@/app/components/Modal/Modal"
import { ButtonClose } from "@/app/components/ButtonClose/ButtonClose"
import { parseTextToJSX } from "@/app/components/QuizBot/ParseTextToJSX"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { StyleCodeEditor } from "@/app/utils/const"
import { Separator } from "@/app/components/Separator/Separator"


export function Workspace() {
    const { language } = useSetupQuiz()
    const { algorithmSolution, currentAlgorithm } = useAlgorithm()
    const [evaluate, setEvaluate] = useState(false)
    const [openExplanation, setOpenExplanation] = useState(false)
    const [openExample, setOpenExample] = useState(false)
    const [output, setOutput] = useState<IOutputRun>({ code: 0, output: "Suerte 🍀", signal: "", stderr: "", stdout: "" })

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
            <article className={styles.playground}>
                <div className={styles.playground_header}>
                    <div className={styles.playground_buttons}>
                        <Button className={`${styles.playground_buttonsExplication}`} attr-active={openExplanation ? "active" : undefined} onClick={() => setOpenExplanation(prev => !prev)}>
                            <span className={styles.playground_buttonsText} >Explicación</span>
                            <BulbIcon />
                        </Button>
                        <Button className={`${styles.playground_buttonsExample}`} attr-active={openExample ? "active" : undefined} onClick={() => setOpenExample(prev => !prev)}>
                            <span className={styles.playground_buttonsText} >Ejemplo</span>
                            <IOIcon />
                        </Button>

                        <div className={styles.playground_buttonsRun}>
                            <Button className={styles.playground_buttonsRunButton} onClick={HandleRunCode} >
                                <span className={styles.playground_buttonsText} >RUN</span>
                                <RunCodeIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={styles.playground_options}>
                        <Button onClick={HandleEvaluate} >Evaluar Solución<CheckedIcon /></Button>
                    </div>
                </div>
                <div className={styles.playground_container}>
                    <div className={styles.playground_editor}>
                        <CodeEditor language={language} />
                        <div className={styles.playground_output}>
                            <header className={styles.playground_outputHeader}>
                                <span className={styles.playground_outputHeaderText}>OUTPUT</span>
                                <span className={`${styles.playground_outputHeaderStatus} 
                                            ${output.code === -135 && styles.playground_outputHeaderStatusRun}
                                            ${output.code > 0 && styles.playground_outputHeaderStatusError}
                                            ${output.code === 0 && styles.playground_outputHeaderStatusOK}`}></span>
                            </header>
                            <textarea className={`${styles.playground_outputText} scrollBarStyle`} value={output.output.replaceAll(/\/piston\/jobs\/[a-f0-9\-]{36}\/file0./g, "")} spellCheck={false} readOnly />
                        </div>
                    </div>
                    <AlgorithmBot algorithm={currentAlgorithm} evaluate={evaluate} />
                </div>
            </article>

            {openExplanation &&
                <Modal onClick={() => setOpenExplanation(false)} allowBackground>
                    <article className={styles.explanation}>
                        <div className={styles.explanation_close}>
                            <ButtonClose onClick={() => setOpenExplanation(false)} />
                        </div>
                        <h3 className={styles.explanation_title}>{currentAlgorithm.title}</h3>
                        <p className={styles.explanation_p}>{parseTextToJSX(currentAlgorithm.explanation.replaceAll('\\n', '\n'))}</p>
                    </article>
                </Modal>

            }

            {openExample &&
                <Modal onClick={() => setOpenExample(false)} allowBackground>
                    <div className={styles.example}>
                        <div className={styles.explanation_close}>
                            <ButtonClose onClick={() => setOpenExample(false)} />
                        </div>
                        <span className={styles.example_text}>Ejemplo:</span>
                        <div className={styles.example_input}>
                            <span className={styles.example_label}>Datos de entrada</span>
                            <span className={styles.example_subtitle}>{currentAlgorithm.inputDescription}</span>
                            <CodeBlock language={language.language}
                                text={currentAlgorithm.exampleInputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                theme={atomOneDark}
                                customStyle={{ ...StyleCodeEditor }} />
                        </div>
                        <Separator />
                        <div className={styles.example_output}>
                            <span className={styles.example_label}>Resultado esperado</span>
                            <span className={styles.example_subtitle}>{currentAlgorithm.outputDescription}</span>
                            <CodeBlock language={language.language}
                                text={currentAlgorithm.exampleOutputs.join("\\n").replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                theme={atomOneDark}
                                customStyle={{ ...StyleCodeEditor }} />
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}