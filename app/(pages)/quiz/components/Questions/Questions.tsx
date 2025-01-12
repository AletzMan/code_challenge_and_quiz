/* eslint-disable react-hooks/exhaustive-deps */
import { CodeBlock, atomOneDark } from "react-code-blocks"
import styles from "./styles.module.scss"
import { Separator } from "@/app/components/Separator/Separator"
import { BookIcon, BotIcon, BotSadIcon, CheckIcon, CloseIcon, ConfigIcon, InterrogationIcon, NextIcon, RefreshIcon, SendIcon } from "@/app/components/Icons"
import { Button } from "@/app/components/Button/Button"
import { ChangeEvent, useEffect, useState } from "react"
import { useApiKey, useCurrentQuiz, useSetupQuiz } from "@/app/utils/store"
import { GetNewQuiz } from "@/app/utils/dataFetch"
import CircularProgressBar from "@/app/components/CircularProgress/CircularProgress"
import { IAnswer, IQuestion } from "@/app/interfaces/quiz"
import { QuizBot } from "@/app/components/QuizBot/QuizBot"
import { MouseEvent, KeyboardEvent } from "react"
import { Loading } from "@/app/components/Loading/Loading"
import { useSnackbar } from "notistack"
import { Modal } from "@/app/components/Modal/Modal"
import { StyleCodeEditor } from "@/app/utils/const"
import { ButtonClose } from "@/app/components/ButtonClose/ButtonClose"
import { Results } from "../Results/Results"
import { AnswerOptions } from "./components/AnswerOptions/AnswerOptions"
import { ButtonLink } from "@/app/components/Button/ButtonLink"


const TOTAL_TIME = 90
const TIME_PERCENTAGE = 100 / TOTAL_TIME



export function Questions() {
    const { language, difficulty, questions, category } = useSetupQuiz()
    const { setCurrentQuestion, currentQuestion, setCurrentQuestionNumber, currentQuestionNumber, completeQuiz, setCompleteQuiz, setSelectedAnwer, quizInProgress, setQuizInProgress, setClassNameOrder, setRightAnswers } = useCurrentQuiz()
    const { apiKey } = useApiKey()
    const { enqueueSnackbar } = useSnackbar()
    const [time, setTime] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [viewExplanation, setViewExplanation] = useState(false)
    const [run, setRun] = useState(false)
    //const [isRightAnswer, setIsRightAnswer] = useState(false)
    const [viewResults, setViewResults] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        // Una vez que el estado esté cargado, cambia el valor de loading a false
        if (quizInProgress !== undefined) {
            setLoading(false)
        }
    }, [quizInProgress])

    useEffect(() => {
        if (!loading && !quizInProgress) {
            GetQuiz()
            setQuizInProgress(true)
            setRun(true)
        }
    }, [loading, quizInProgress, loadingResponse])


    useEffect(() => {
        if (quizInProgress && !loadingResponse) {
            const intervalTIme = setInterval(() => {
                if (time < TOTAL_TIME && run)
                    setTime(prev => prev + 1)
            }, 1000)
            if (time === TOTAL_TIME) {
                setRun(false)
            }
            return () => clearInterval(intervalTIme)
        }
    }, [time, quizInProgress, loadingResponse])

    const GetQuiz = async () => {
        setLoadingResponse(true)
        const response = await GetNewQuiz(category.option, language.option, difficulty, apiKey)
        setSelectedAnwer(["No respondida"])
        if (!response.error && response.data) {
            setCurrentQuestion(response.data)
        } else {
            setError(true)
            enqueueSnackbar({ message: response.message, variant: "error" })
        }
        setLoadingResponse(false)
    }


    const HandleReset = () => {
        GetQuiz()
        setError(false)
        setRun(true)
    }


    const HandleNextQuestion = () => {
        if (currentQuestionNumber < questions) {
            GetQuiz()
            setCurrentQuestionNumber(currentQuestionNumber + 1)
            setTime(0)
            setSelectedAnwer([])
            setRun(true)
            setClassNameOrder([])
            setRightAnswers([])
        } else {
            FillNullQuestions()
            setViewResults(true)
        }
    }

    const FillNullQuestions = () => {
        const emptyQuestion = {
            answer: ["No respondida"],
            codeSnippet: null,
            codeSnippetExplanation: null,
            explanation: currentQuestion.explanation,
            isRight: false,
            question: currentQuestion.question,
            rightAnswer: currentQuestion.rightAnswer,
            rightAnswerMatching: [],
            answerMatching: []
        }

        const newCompleteQuiz = { ...completeQuiz }
        //console.log(newCompleteQuiz.questions)

        for (let index = 0; index < currentQuestionNumber; index++) {
            if (!newCompleteQuiz.questions[index]) {
                console.log("AsIGNA", index)
                newCompleteQuiz.questions[index] = emptyQuestion
            }
        }

        if (newCompleteQuiz.questions.length === 0) {
            for (let index = 0; index < currentQuestionNumber; index++) {
                console.log("ASIGNA 2")
                newCompleteQuiz.questions.push(emptyQuestion)
            }
        }
        //console.log(newCompleteQuiz.questions)
        setCompleteQuiz(newCompleteQuiz)
    }


    return (
        <>
            {(!viewResults && !loading && !loadingResponse && !error) &&
                <>
                    <header className={styles.config}>
                        <span></span>
                        <span className={styles.config_number}>{currentQuestionNumber}/{questions}</span>
                        <div className={styles.config_save}>
                            <Button className="blue" title="Marcar para estudiar más tarde"  ><BookIcon /></Button>
                        </div>
                    </header>
                    <Separator />
                    {(!loading && !loadingResponse) &&
                        <div
                            className={`${styles.time}  
                                            ${((time * TIME_PERCENTAGE) > 60 && (time * TIME_PERCENTAGE) <= 80) && styles.time_alert} 
                                            ${(time * TIME_PERCENTAGE) > 80 && styles.time_danger}`}>
                            <CircularProgressBar
                                percentage={100 - (time * TIME_PERCENTAGE)}
                                props={{ className: `${styles.time_bar}` }}
                                colorFill={getColorFill(time)} />
                            <span className={styles.time_number}>{(TOTAL_TIME - time).toString().padStart(2, "0")}</span>
                        </div>
                    }
                    <article className={styles.element}>
                        <div className={styles.question}>
                            <h4 className={styles.question_text}>{currentQuestion.question.replaceAll('\\', '')}</h4>
                            {currentQuestion.codeSnippet &&
                                <CodeBlock
                                    language={language.language}
                                    showLineNumbers
                                    theme={atomOneDark}
                                    text={currentQuestion.codeSnippet.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                    customStyle={{ ...StyleCodeEditor }}
                                />
                            }
                        </div>
                        <Separator />
                        {
                            <AnswerOptions run={run} setRun={setRun} />
                        }
                    </article>
                    <>
                        {!run && (!loading && !loadingResponse) &&
                            <article className={styles.send} >
                                <Button onClick={() => setViewExplanation(prev => !prev)} title="Ver la explicación detallada de esta respuesta." className="secondary"  ><BotIcon />EXPLICACIÓN</Button>
                                <Button onClick={HandleNextQuestion} title="Ir a siguiente pregunta">{currentQuestionNumber === questions ? 'RESULTADOS' : 'SIGUIENTE'}<NextIcon /></Button>
                            </article>
                        }
                    </>
                </>}
            {((loading || loadingResponse) && !error) &&
                <Loading title="Generando pregunta..." />
            }
            {((!loading || !loadingResponse) && error) &&
                <div className={styles.error}>
                    <BotSadIcon className={styles.error_icon} />
                    <div className={styles.error_message}>
                        <p className={styles.error_p}>¡Vaya! </p>
                        <p className={styles.error_p}>Mi circuito se ha cruzado, no pude generar la pregunta</p>
                        <p className={styles.error_p}>¿Podemos intentarlo de nuevo?</p>
                    </div>
                    <Button onClick={() => HandleReset()} title="Volver a generar la pregunta">Reintentar<RefreshIcon /></Button>
                    <ButtonLink href="/algorithms" isSecondary title="">
                        <>
                            {"Cambiar Configuración"}
                            <ConfigIcon />
                        </>
                    </ButtonLink>
                </div>
            }
            {viewExplanation &&
                <Explanation language={language.language} currentQuestion={currentQuestion} onclick={() => setViewExplanation(false)} />
            }
            {viewResults && <Results />}

        </>
    )
}




const Explanation = ({ currentQuestion, language, onclick }: { currentQuestion: IQuestion, language: string, onclick: () => void }) => (

    <Modal onClick={() => onclick()}>
        <div className={styles.explanation}>
            <div className={styles.explanation_button} >
                <ButtonClose onClick={() => onclick()} title="Cerrar explicación" />
            </div>
            <InterrogationIcon className={styles.explanation_icon} />
            <h5 className={styles.explanation_question}>{currentQuestion.question}</h5>
            <p className={styles.explanation_p}>{currentQuestion.explanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t')}</p>
            {currentQuestion.codeSnippetExplanation &&
                <CodeBlock
                    language={language}
                    showLineNumbers
                    theme={atomOneDark}
                    text={currentQuestion.codeSnippetExplanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                    customStyle={{ ...StyleCodeEditor }}
                />
            }
            <QuizBot quiz={currentQuestion} />
        </div>
    </Modal>
)


const getColorFill = (time: number) => {
    if (time * TIME_PERCENTAGE > 80) return "#2e0202"
    if (time * TIME_PERCENTAGE > 60) return "#382304"
    return "#034019"
}

