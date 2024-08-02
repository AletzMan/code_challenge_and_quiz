/* eslint-disable react-hooks/exhaustive-deps */
import { CodeBlock, atomOneDark, hopscotch, noctisViola, nord } from "react-code-blocks"
import styles from "./styles.module.scss"
import { Separator } from "@/app/components/Separator/Separator"
import { NextIcon, SendIcon, TimeIcon } from "@/app/components/Icons"
import { Button } from "@/app/components/Button/Button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSetupQuiz } from "@/app/utils/store"
import { GetNewQuiz } from "@/app/utils/dataFetch"
import CircularProgressBar from "@/app/components/CircularProgress/CircularProgress"

interface Props {
    setStart: Dispatch<SetStateAction<boolean>>
}

const TOTAL_TIME = 30
const TIME_PERCENTAGE = 100 / TOTAL_TIME

export function Questions({ setStart }: Props) {
    const { language, difficulty, questions } = useSetupQuiz()
    const [selectAnswer, setSelectAnswer] = useState("")
    const [number, setNumber] = useState(1)
    const [time, setTime] = useState(0)
    const [quiz, setQuiz] = useState<IQuiz>({} as IQuiz)
    const [loading, setLaoding] = useState(false)

    useEffect(() => {
        const GetQuiz = async () => {
            setLaoding(false)
            const response = await GetNewQuiz()
            setQuiz(response)
            setLaoding(true)
        }
        GetQuiz()
    }, [number])

    useEffect(() => {
        if (loading) {
            const intervalTIme = setInterval(() => {
                if (time < TOTAL_TIME)
                    setTime(prev => prev + 1)
                if (time === TOTAL_TIME && number < questions) {
                    HandleNextQuestion()
                }
            }, 1000)
            return () => clearInterval(intervalTIme)
        }
    }, [time, loading])

    const HandleSelectAnswer = (option: string): void => {
        setSelectAnswer(option)
    }

    const HandleReset = () => {
        setStart(false)
    }


    const HandleNextQuestion = () => {
        setNumber(prev => prev + 1)
        setTime(0)
        setSelectAnswer("")
    }

    return (
        <section className={styles.quiz}>
            <header className={styles.header}>
                <span className={styles.number}>{number}/{questions}</span>
                <div className={styles.header_options}>
                    <span style={{ "color": language.color, backgroundColor: `${language.color}30`, borderColor: `${language.color}` }}
                        className={`${styles.header_language} `}>
                        {language.value}
                    </span>
                    <span className={`${styles.header_difficulty} ${difficulty === "easy" && styles.header_difficultyEasy} ${difficulty === "medium" && styles.header_difficultyMedium} ${difficulty === "hard" && styles.header_difficultyHard} ${difficulty === "expert" && styles.header_difficultyExpert}`}>{DifficultyLevel[difficulty]}</span>
                    <Button className="yellow" onClick={HandleReset}>CAMBIAR</Button>
                </div>
            </header>
            <Separator />
            {loading && <>
                {quiz.question &&
                    <article className={styles.element}>
                        <h4 className={styles.element_question}>{quiz.question}</h4>
                        {quiz.codeSnippet &&
                            <CodeBlock
                                language={language.option}
                                showLineNumbers
                                theme={atomOneDark}
                                text={quiz.codeSnippet}
                                customStyle={{ "width": "max-content", "padding": "0 2em 0 0", "font-family": "monospace" }}
                            />
                        }
                        <Separator />
                        <div className={styles.options}>
                            {quiz.options &&
                                quiz.options.map((option, index) => (
                                    <button key={option} className={`${styles.option} ${selectAnswer === option && styles.option_select}`} onClick={() => HandleSelectAnswer(option)}>
                                        <span className={styles.option_letter}>{OptionsSymbol[index]}</span>
                                        <span className={styles.option_text}>{option}</span>
                                    </button>
                                ))
                            }
                            {quiz.type === "true false" &&
                                <div className={styles.dichotomous}>
                                    <button className={`${styles.dichotomous_option} ${styles.dichotomous_optionTrue}  ${selectAnswer === "true" && styles.dichotomous_optionSelect}`} onClick={() => HandleSelectAnswer("true")}>
                                        <span className={styles.dichotomous_optionText}>true</span>
                                    </button>
                                    <button className={`${styles.dichotomous_option} ${styles.dichotomous_optionFalse}  ${selectAnswer === "false" && styles.dichotomous_optionSelect}`} onClick={() => HandleSelectAnswer("false")}>
                                        <span className={styles.dichotomous_optionText}>false</span>
                                    </button>
                                </div>
                            }
                        </div>
                    </article>
                }
                <div className={`${styles.time}  ${((time * TIME_PERCENTAGE) > 60 && (time * TIME_PERCENTAGE) <= 80) && styles.time_alert} ${(time * TIME_PERCENTAGE) > 80 && styles.time_danger}`}>
                    <CircularProgressBar percentage={100 - (time * TIME_PERCENTAGE)} props={{ className: `${styles.time_bar}` }} colorFill={` ${(time * TIME_PERCENTAGE) < 60 ? "#3fd54420" : ((time * TIME_PERCENTAGE) >= 60 && (time * TIME_PERCENTAGE) <= 80) ? "#ded00920" : (time * TIME_PERCENTAGE) > 80 && "#fb1d1d20"} `} />
                    <span className={styles.time_number}>{(TOTAL_TIME - time).toString().padStart(2, "0")}</span>
                </div>
                <Separator />
                <article className={styles.send}>
                    <Button>EXPLICACIÓN</Button>
                    <Button className="green" onClick={HandleNextQuestion}>SIGUIENTE<NextIcon /></Button>
                </article>
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

const OptionsSymbol = ["A", "B", "C", "D"]

const DifficultyLevel = {
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
    expert: "Experto"
}

