/* eslint-disable react-hooks/exhaustive-deps */
import { CodeBlock, atomOneDark } from "react-code-blocks"
import styles from "./styles.module.scss"
import { Separator } from "@/app/components/Separator/Separator"
import { ArrowUpIcon, BookIcon, BotIcon, CheckIcon, CloseIcon, CreateIcon, InterrogationIcon, NextIcon, SendIcon } from "@/app/components/Icons"
import { Button } from "@/app/components/Button/Button"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useApiKey, useSetupQuiz } from "@/app/utils/store"
import { GetNewQuiz } from "@/app/utils/dataFetch"
import CircularProgressBar from "@/app/components/CircularProgress/CircularProgress"
import { IQuestion, IQuiz } from "@/app/interfaces/quiz"
import { QuizBot } from "@/app/components/QuizBot/QuizBot"
import { MouseEvent, KeyboardEvent } from "react"
import { Loading } from "@/app/components/Loading/Loading"
import { Levels } from "@/app/components/Levels/Levels"
import { useSnackbar } from "notistack"
import { Modal } from "@/app/components/Modal/Modal"
import { CATEGORIES, StyleCodeEditor } from "@/app/utils/const"
import { ButtonClose } from "@/app/components/ButtonClose/ButtonClose"
import { Results } from "../Results/Results"

interface Props {
    setStart: Dispatch<SetStateAction<boolean>>
}

const TOTAL_TIME = 90
const TIME_PERCENTAGE = 100 / TOTAL_TIME



export function Questions({ setStart }: Props) {
    const { language, difficulty, questions, category, completeQuiz, setCompleteQuiz } = useSetupQuiz()
    const { apiKey } = useApiKey()
    const { enqueueSnackbar } = useSnackbar()
    const [selectAnswer, setSelectAnswer] = useState("")
    const [number, setNumber] = useState(1)
    const [time, setTime] = useState(0)
    const [quiz, setQuiz] = useState<IQuiz>({} as IQuiz)
    const [loading, setLaoding] = useState(false)
    const [viewExplanation, setViewExplanation] = useState(false)
    const [run, setRun] = useState(true)
    const [isRightAnswer, setIsRightAnswer] = useState(false)
    const [viewResults, setViewResults] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        //setCompleteQuiz({ questions: [], correctAnswers: 0 })
    }, [])

    useEffect(() => {
        setIsRightAnswer(false)
        const GetQuiz = async () => {
            setLaoding(false)
            const response = await GetNewQuiz(category.option, language.option, difficulty, apiKey)
            if (!response.error && response.data) {
                setQuiz(response.data)
            } else {
                setError(true)
                enqueueSnackbar({ message: response.message, variant: "error" })
            }
            setLaoding(true)
        }
        GetQuiz()
    }, [number])

    useEffect(() => {
        if (loading) {
            const intervalTIme = setInterval(() => {
                if (time < TOTAL_TIME && run)
                    setTime(prev => prev + 1)
                if (time === TOTAL_TIME && number < questions) {
                    //HandleNextQuestion()
                }
            }, 1000)
            if (time === TOTAL_TIME) {
                setRun(false)
            }
            return () => clearInterval(intervalTIme)
        }
    }, [time, loading])

    const HandleSelectAnswer = (option: string): void => {
        setSelectAnswer(option)
        SetQuizResult(option.toLowerCase() === quiz.rightAnswer[0].toLowerCase(), option)
        //setTime(TOTAL_TIME)
        setRun(false)
    }

    const HandleReset = () => {
        setStart(false)
    }


    const HandleNextQuestion = () => {
        if (number < questions) {
            setNumber(prev => prev + 1)
            setTime(0)
            setSelectAnswer("")
            setRun(true)
        } else {
            setViewResults(true)
        }
    }

    function HandleChangeOpenAnswer(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.currentTarget.value
        if (value) {
            setSelectAnswer(value)
        }
    }

    function HandleValidateAnswer(event: MouseEvent<HTMLButtonElement>): void {
        setRun(false)
        if (selectAnswer.toLowerCase() === quiz.rightAnswer[0].toLowerCase()) {
            setIsRightAnswer(true)
        }
        SetQuizResult(selectAnswer.toLowerCase() === quiz.rightAnswer[0].toLowerCase(), selectAnswer)
    }



    function HandleKeyPress(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            setRun(false)
            if (selectAnswer.toLowerCase() === quiz.rightAnswer[0].toLowerCase()) {
                setIsRightAnswer(true)
            }
            SetQuizResult(selectAnswer.toLowerCase() === quiz.rightAnswer[0].toLowerCase(), selectAnswer)
        }
    }

    const SetQuizResult = (isRight: boolean, answer: string) => {
        const newQuizResult = { ...completeQuiz }
        const newQuestion: IQuestion = { question: quiz.question, answer: answer, isRight, explanation: quiz.explanation, codeSnippetExplanation: quiz.codeSnippetExplanation }
        if (isRight) {
            newQuizResult.correctAnswers += 1
        }
        newQuizResult.questions.push(newQuestion)
        setCompleteQuiz(newQuizResult)
    }

    return (
        <>
            {
                <section className={`${styles.quiz} `}>
                    <header className={styles.header}>
                        <span className={styles.number}>{number}/{questions}</span>
                        <div className={styles.header_options}>
                            <Levels difficulty={difficulty} />
                            <Button className="yellow" onClick={HandleReset} title="Configurar un nuevo reto">Nuevo Reto <CreateIcon /></Button>
                        </div>
                    </header>

                    <div className={styles.type}>
                        <div style={{ "color": language.color, backgroundColor: `${language.color}30`, borderColor: `${language.color}` }}
                            className={`${styles.type_language} `}>
                            {CATEGORIES[category.option as "frontend"].items.find(item => item.option === language.option)?.logo}
                            {language.value}
                        </div>
                    </div>

                    <Separator />
                    {(!viewResults && loading && !error) && <>
                        <>
                            <div className={styles.quiz_save}>
                                <Button className="blue" title="Marcar para estudiar más tarde"  ><BookIcon /></Button>
                            </div>
                            <article className={styles.element}>
                                <h4 className={styles.element_question}>{quiz.question.replaceAll('\\', '')}</h4>
                                {quiz.codeSnippet &&
                                    <CodeBlock
                                        language={language.language}
                                        showLineNumbers
                                        theme={atomOneDark}
                                        text={quiz.codeSnippet.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                        customStyle={{ ...StyleCodeEditor }}
                                    />
                                }
                                <Separator />
                                {
                                    <div className={styles.options}>
                                        {(quiz?.options && quiz.type === "multiple choice") &&
                                            quiz?.options?.map((option, index) => (
                                                <button
                                                    key={option}
                                                    className={`${styles.option} 
                                        ${(selectAnswer === option && quiz.rightAnswer.includes(selectAnswer)) && styles.option_select} 
                                        ${(selectAnswer === option && !quiz.rightAnswer.includes(selectAnswer)) && styles.option_incorrect}`}
                                                    disabled={!run}
                                                    onClick={() => HandleSelectAnswer(option)}>
                                                    <span className={styles.option_letter}>{OptionsSymbol[index]}</span>
                                                    <span className={styles.option_text}>{option.replaceAll(`\\\\`, "")}</span>
                                                </button>
                                            ))
                                        }
                                        {quiz?.type === "true false" &&
                                            <div className={styles.dichotomous}>
                                                <button
                                                    className={`${styles.dichotomous_option} 
                                            ${(selectAnswer === "Verdadero" && quiz.rightAnswer[0] === "Verdadero") && styles.dichotomous_optionTrue}  
                                            ${(selectAnswer === "Verdadero" && quiz.rightAnswer[0] !== "Verdadero") && styles.dichotomous_optionFalse}`}
                                                    disabled={!run}
                                                    onClick={() => HandleSelectAnswer("Verdadero")}>
                                                    <span className={styles.dichotomous_optionText}>
                                                        {(selectAnswer === "Verdadero" && quiz.rightAnswer[0] !== "Verdadero") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                                                        {(selectAnswer === "Verdadero" && quiz.rightAnswer[0] === "Verdadero") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                                                        Verdadero
                                                    </span>
                                                </button>
                                                <button
                                                    className={`${styles.dichotomous_option}
                                            ${(selectAnswer === "Falso" && quiz.rightAnswer[0] === "Falso") && styles.dichotomous_optionTrue}  
                                            ${(selectAnswer === "Falso" && quiz.rightAnswer[0] !== "Falso") && styles.dichotomous_optionFalse}`}
                                                    disabled={!run}
                                                    onClick={() => HandleSelectAnswer("Falso")}>
                                                    <span className={styles.dichotomous_optionText}>
                                                        {(selectAnswer === "Falso" && quiz.rightAnswer[0] === "Falso") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                                                        {(selectAnswer === "Falso" && quiz.rightAnswer[0] !== "Falso") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                                                        Falso
                                                    </span>
                                                </button>
                                            </div>
                                        }
                                        {quiz?.type === "blank space" &&
                                            <div className={styles.blankspace} >
                                                {!isRightAnswer && !run && <CloseIcon className={`${styles.blankspace_icon} ${styles.blankspace_iconWrong}`} />}
                                                {isRightAnswer && !run && <CheckIcon className={`${styles.blankspace_icon} ${styles.blankspace_iconRight}`} />}
                                                <input className={`${styles.blankspace_input} ${isRightAnswer && styles.blankspace_inputRight} ${(!isRightAnswer && !run) && styles.blankspace_inputWrong}`} autoFocus disabled={!run} onKeyDown={HandleKeyPress} onChange={HandleChangeOpenAnswer} />
                                                <Button className="green" disabled={!run} onClick={HandleValidateAnswer}>Enviar<SendIcon /></Button>
                                            </div>
                                        }
                                    </div>
                                }
                            </article>
                        </>

                        <>
                            <div
                                className={`${styles.time}  
                            ${((time * TIME_PERCENTAGE) > 60 && (time * TIME_PERCENTAGE) <= 80) && styles.time_alert} 
                        ${(time * TIME_PERCENTAGE) > 80 && styles.time_danger}`}>
                                <CircularProgressBar
                                    percentage={100 - (time * TIME_PERCENTAGE)}
                                    props={{ className: `${styles.time_bar}` }}
                                    colorFill={` ${(time * TIME_PERCENTAGE) < 60 ? "#3fd54420" : ((time * TIME_PERCENTAGE) >= 60 && (time * TIME_PERCENTAGE) <= 80) ? "#ded00920" : (time * TIME_PERCENTAGE) > 80 && "#fb1d1d20"} `} />
                                <span className={styles.time_number}>{(TOTAL_TIME - time).toString().padStart(2, "0")}</span>
                            </div>
                            <Separator />
                            {!run &&
                                <article className={styles.send}>
                                    <Button onClick={() => setViewExplanation(prev => !prev)} title="Ver la explicación detallada de esta respuesta."><BotIcon />EXPLICACIÓN</Button>
                                    <Button className="green" onClick={HandleNextQuestion} title="Ir a siguiente pregunta">{number === questions ? 'RESULTADOS' : 'SIGUIENTE'}<NextIcon /></Button>
                                </article>
                            }
                        </>
                    </>
                    }
                    {
                        viewResults &&
                        <Results />
                    }
                    {(!loading && !error) &&
                        <Loading title="Generando pregunta..." />
                    }
                    {(error && loading) &&
                        <div className={styles.error}>
                            <p className={styles.error_p}>Error al generar la pregunta intentelo de nuevo</p>
                            <Button onClick={() => setStart(false)} title="Volver a generar la pregunta">Reintentar</Button>
                        </div>

                    }
                </section>
            }

            {viewExplanation &&
                <Modal onClick={() => setViewExplanation(false)}>
                    <div className={styles.explanation_container}>
                        <div className={styles.explanation_button} >
                            <ButtonClose onClick={() => setViewExplanation(false)} title="Cerrar explicación" />
                        </div>
                        <InterrogationIcon className={styles.explanation_icon} />
                        <h5 className={styles.explanation_question}>{quiz.question}</h5>
                        <p className={styles.explanation_p}>{quiz.explanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t')}</p>
                        {quiz.codeSnippetExplanation &&
                            <CodeBlock
                                language={"javascript"}
                                showLineNumbers
                                theme={atomOneDark}
                                text={quiz.codeSnippetExplanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                customStyle={{ ...StyleCodeEditor }}
                            />
                        }
                        <QuizBot quiz={quiz} />
                    </div>
                </Modal>
            }
        </>
    )
}



const OptionsSymbol = ["A", "B", "C", "D", "E", "F"]

