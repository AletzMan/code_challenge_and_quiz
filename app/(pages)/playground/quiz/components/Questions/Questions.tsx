/* eslint-disable react-hooks/exhaustive-deps */
import { CodeBlock, atomOneDark, hopscotch, noctisViola, nord } from "react-code-blocks"
import styles from "./styles.module.scss"
import { Separator } from "@/app/components/Separator/Separator"
import { BookIcon, BookMarkIcon, BotIcon, CheckIcon, CloseIcon, InterrogationIcon, NextIcon, SaveIcon, SendIcon, TimeIcon } from "@/app/components/Icons"
import { Button } from "@/app/components/Button/Button"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSetupQuiz } from "@/app/utils/store"
import { GetNewQuiz } from "@/app/utils/dataFetch"
import CircularProgressBar from "@/app/components/CircularProgress/CircularProgress"
import { IQuiz } from "@/app/interfaces/quiz"
import { TextBox } from "@/app/components/TextBox/TextBox"
import { QuizBot } from "@/app/components/QuizBot/QuizBot"

interface Props {
    setStart: Dispatch<SetStateAction<boolean>>
}

const TOTAL_TIME = 45
const TIME_PERCENTAGE = 100 / TOTAL_TIME



export function Questions({ setStart }: Props) {
    const { language, difficulty, questions, category } = useSetupQuiz()
    const [selectAnswer, setSelectAnswer] = useState("")
    const [number, setNumber] = useState(1)
    const [time, setTime] = useState(0)
    const [quiz, setQuiz] = useState<IQuiz>({} as IQuiz)
    const [loading, setLaoding] = useState(false)
    const [viewExplanation, setViewExplanation] = useState(false)
    const [run, setRun] = useState(true)

    useEffect(() => {
        const GetQuiz = async () => {
            setLaoding(false)
            const response = await GetNewQuiz(language.option, difficulty)
            if (response) {
                setQuiz(response)
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
        //setTime(TOTAL_TIME)
        setRun(false)
    }

    const HandleReset = () => {
        setStart(false)
    }


    const HandleNextQuestion = () => {
        setNumber(prev => prev + 1)
        setTime(0)
        setSelectAnswer("")
        setRun(true)
    }

    function HandleChangeOpenAnswer(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.currentTarget.value
        if (value) {
            setSelectAnswer(value)
        }
    }

    return (
        <>
            <section className={`${styles.quiz} `}>
                <header className={styles.header}>
                    <span className={styles.number}>{number}/{questions}</span>
                    <div className={styles.header_options}>
                        <span
                            className={`${styles.header_difficulty} 
                                ${difficulty === "easy" && styles.header_difficultyEasy} 
                                ${difficulty === "medium" && styles.header_difficultyMedium} 
                                ${difficulty === "hard" && styles.header_difficultyHard} 
                                ${difficulty === "expert" && styles.header_difficultyExpert}`}>
                            {DifficultyLevel[difficulty]}
                        </span>
                        <Button className="yellow" onClick={HandleReset}>CAMBIAR</Button>
                    </div>
                </header>
                <div className={styles.type}>
                    {/*<div className={styles.type_category}>{category.value}</div>*/}
                    <div style={{ "color": language.color, backgroundColor: `${language.color}30`, borderColor: `${language.color}` }}
                        className={`${styles.type_language} `}>
                        {language.logo}
                        {language.value}
                    </div>
                </div>
                <Separator />
                {loading && <>
                    {quiz.question && <>
                        <div className={styles.quiz_save}>
                            <Button className="blue" title="Marcar para estudiar"><BookIcon /></Button>
                        </div>
                        <article className={styles.element}>
                            <h4 className={styles.element_question}>{quiz.question.replaceAll('\\', '')}</h4>
                            {quiz.codeSnippet &&
                                <CodeBlock
                                    language={language.option}
                                    showLineNumbers
                                    theme={atomOneDark}
                                    text={quiz.codeSnippet.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                    customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }}
                                />
                            }
                            <Separator />
                            <div className={styles.options}>
                                {(quiz.options && quiz.type === "multiple choice") &&
                                    quiz.options.map((option, index) => (
                                        <button
                                            key={option}
                                            className={`${styles.option} 
                                        ${(selectAnswer === option && quiz.correctAnswer.includes(selectAnswer)) && styles.option_select} 
                                    ${(selectAnswer === option && !quiz.correctAnswer.includes(selectAnswer)) && styles.option_incorrect}`}
                                            disabled={!run}
                                            onClick={() => HandleSelectAnswer(option)}>
                                            <span className={styles.option_letter}>{OptionsSymbol[index]}</span>
                                            <span className={styles.option_text}>{option.replaceAll(`\\\\`, "")}</span>
                                        </button>
                                    ))
                                }
                                {quiz.type === "true false" &&
                                    <div className={styles.dichotomous}>
                                        <button
                                            className={`${styles.dichotomous_option} 
                                        ${(selectAnswer === "true" && quiz.correctAnswer[0] === "Verdadero") && styles.dichotomous_optionTrue}  
                                                    ${(selectAnswer === "true" && quiz.correctAnswer[0] !== "Verdadero") && styles.dichotomous_optionFalse}`}
                                            disabled={!run}
                                            onClick={() => HandleSelectAnswer("true")}>
                                            <span className={styles.dichotomous_optionText}>
                                                {(selectAnswer === "true" && quiz.correctAnswer[0] !== "Verdadero") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                                                {(selectAnswer === "true" && quiz.correctAnswer[0] === "Verdadero") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                                                Verdadero
                                            </span>
                                        </button>
                                        <button
                                            className={`${styles.dichotomous_option}
                                        ${(selectAnswer === "false" && quiz.correctAnswer[0] === "Falso") && styles.dichotomous_optionTrue}  
                                        ${(selectAnswer === "false" && quiz.correctAnswer[0] !== "Falso") && styles.dichotomous_optionFalse}`}
                                            disabled={!run}
                                            onClick={() => HandleSelectAnswer("false")}>
                                            <span className={styles.dichotomous_optionText}>
                                                {(selectAnswer === "false" && quiz.correctAnswer[0] === "Falso") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                                                {(selectAnswer === "false" && quiz.correctAnswer[0] !== "Falso") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                                                Falso
                                            </span>
                                        </button>
                                    </div>
                                }
                                {quiz.type === "blank space" &&
                                    <div className={styles.blankspace} >
                                        <TextBox autoFocus disabled={!run} onChange={HandleChangeOpenAnswer} />
                                        <Button className="green" disabled={!run}>Enviar<SendIcon /></Button>
                                    </div>
                                }
                            </div>
                        </article>
                    </>
                    }
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
                            <Button onClick={() => setViewExplanation(true)}><BotIcon />EXPLICACIÓN</Button>
                            <Button className="green" onClick={HandleNextQuestion}>SIGUIENTE<NextIcon /></Button>
                        </article>
                    }
                </>
                }
                {!loading &&
                    <div className={styles.loading}>
                        <span className={styles.loading_logo}></span>
                        <span className={styles.loading_logo}></span>
                        <span className={styles.loading_logo}></span>
                    </div>
                }
            </section>
            {viewExplanation &&
                <dialog open className={styles.explanation}>
                    <div className={styles.explanation_container}>
                        <button className={styles.explanation_button} onClick={() => setViewExplanation(false)}>
                            <CloseIcon className={styles.explanation_buttonClose} />
                        </button>
                        <InterrogationIcon className={styles.explanation_icon} />
                        <h5 className={styles.explanation_question}>{quiz.question}</h5>
                        <p className={styles.explanation_p}>{quiz.explanation.resume.replaceAll('\\n', '\n').replaceAll('\\t', '\t')}</p>
                        {quiz.explanation.codeSnippet &&
                            <CodeBlock
                                language={language.option}
                                showLineNumbers
                                theme={atomOneDark}
                                text={quiz.explanation.codeSnippet.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                customStyle={{ "width": "max-content", "max-width": "100%", "padding": "0 2em 0 0", "font-family": "monospace" }}
                            />
                        }
                        <QuizBot quiz={quiz} />
                    </div>
                </dialog>
            }
        </>
    )
}

/*
const Quiz = {
    "question": "¿Cuál es el resultado de ejecutar el siguiente código?",
    "codeSnippet": "console.log(typeof NaN);",
    "options": [
        "number",
        "NaN",
        "undefined",
        "object"
    ],
    "answer": "number",
    "explanation": "En JavaScript, NaN (Not a Number) es un valor numérico especial que representa un valor que no es un número válido. El operador typeof aplicado a NaN devuelve 'number'."
}
*/

const OptionsSymbol = ["A", "B", "C", "D", "E"]

const DifficultyLevel = {
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
    expert: "Experto"
}

