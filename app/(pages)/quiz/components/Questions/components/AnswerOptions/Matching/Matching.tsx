/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useCurrentQuiz } from "@/app/utils/store"
import { CheckIcon, CloseIcon, RefreshIcon, ReviewIcon, SendIcon } from "@/app/components/Icons"
import { IQuizResult } from "@/app/interfaces/quiz"
import { Button } from "@/app/components/Button/Button"




interface Props {
    run: boolean
    setRun: Dispatch<SetStateAction<boolean>>
}

export function Matching({ run, setRun }: Props) {
    const [orderOptions, setOrderOptions] = useState<string[]>([])
    const [orderMatches, setOrderMatches] = useState<string[]>([])
    const [disabledButtons, setDisabledButtons] = useState({ options: false, optionsMatches: true })
    const { currentQuestion, classNameOrder, setClassNameOrder, completeQuiz, setCompleteQuiz, currentQuestionNumber } = useCurrentQuiz()
    const [rightAnswers, setRightAnswers] = useState([["", false], ["", false], ["", false], ["", false]])


    useEffect(() => {
        if (currentQuestion.options) {
            const newOrder = [...currentQuestion?.options.slice().sort(() => Math.random() - 0.5)]
            setOrderOptions(newOrder)
        }
        if (currentQuestion.matchingOptions) {
            const newOrder = [...currentQuestion?.matchingOptions.slice().sort(() => Math.random() - 0.5)]
            setOrderMatches(newOrder)
        }
    }, [currentQuestion])


    const SetResults = () => {
        if (classNameOrder.length > (currentQuestion?.options!.length * 2) - 1) {
            const newAnswerStatus = [...rightAnswers]
            if (currentQuestion.options && currentQuestion.rightAnswerMatching && orderOptions.length > 0) {
                for (let index = 0; index < currentQuestion.options.length; index++) {
                    const indexAnswer = classNameOrder.findIndex(item => item.name === currentQuestion.rightAnswer?.[index])
                    const indexResponse = orderOptions.findIndex(item => item === classNameOrder[indexAnswer]?.name || "")

                    if (classNameOrder[indexAnswer]?.name === currentQuestion.rightAnswer[index] && classNameOrder[indexAnswer + 1].name === currentQuestion.rightAnswerMatching[index]) {
                        newAnswerStatus[indexResponse] = [classNameOrder[indexAnswer].name, true]
                    } else {
                        newAnswerStatus[indexResponse] = [classNameOrder[indexAnswer]?.name, false]
                    }
                }
                setRightAnswers(newAnswerStatus)
            }

            const currentAnswers: string[][] = []
            const arrayRightAnswers: string[][] = []
            const setOrderArrayAnswers: string[][] = []


            for (let index = 0; index < currentQuestion?.options!.length; index++) {
                const isRightReponse = newAnswerStatus?.find(element => element[0]?.toString() === classNameOrder![index * 2]?.name)
                currentAnswers.push([classNameOrder[index * 2]?.name, classNameOrder[(index * 2) + 1]?.name, isRightReponse ? isRightReponse[1].toString() : ""])
                arrayRightAnswers.push([currentQuestion.rightAnswer[index], currentQuestion!.rightAnswerMatching![index]])
            }

            currentAnswers.forEach((item, index) => {
                const answer = arrayRightAnswers.find(res => res[0] === item[0])
                if (answer) setOrderArrayAnswers.push(answer)
            })

            const newResults: IQuizResult = { ...completeQuiz }
            const isRight = newAnswerStatus.filter(answer => answer[1].toString() === "true").length === orderOptions.length

            if (isRight)
                newResults.correctAnswers++

            newResults.questions.push({
                question: currentQuestion.question,
                codeSnippet: currentQuestion.codeSnippet,
                isRight: isRight,
                answer: "",
                rightAnswer: [],
                rightAnswerMatching: setOrderArrayAnswers,
                answerMatching: currentAnswers,
                codeSnippetExplanation: currentQuestion.codeSnippetExplanation,
                explanation: currentQuestion.explanation
            })


            if ((completeQuiz.questions.length === currentQuestionNumber) && (classNameOrder.length === (currentQuestion!.options!.length * 2))) {
                setCompleteQuiz(newResults)
            }

            if (classNameOrder.length >= (currentQuestion!.options!.length * 2) - 1) {
                setDisabledButtons({ options: false, optionsMatches: false })
                setRun(false)
            }

        }
    }

    const HandleResetResults = () => {
        setClassNameOrder([])
        setDisabledButtons({ options: false, optionsMatches: false })
    }

    const HandleMatchAttemps = (column: "matchingOptions" | "options", value: string) => {

        if (column === "options") {
            setDisabledButtons({ options: true, optionsMatches: false })
        } else {
            setDisabledButtons({ options: false, optionsMatches: true })
        }

        if (classNameOrder) {
            const newOrderClassName = [...classNameOrder]

            if (newOrderClassName.length === 0 || newOrderClassName.length === 1) {
                newOrderClassName.push({ name: value, value: styles.matching_buttonFirst })
            } else if (newOrderClassName.length === 2 || newOrderClassName.length === 3) {
                newOrderClassName.push({ name: value, value: styles.matching_buttonSecond })
            } else if (newOrderClassName.length === 4 || newOrderClassName.length === 5) {
                newOrderClassName.push({ name: value, value: styles.matching_buttonThird })
            } else if (newOrderClassName.length === 6 || newOrderClassName.length === 7) {
                newOrderClassName.push({ name: value, value: styles.matching_buttonFourth })
            }
            setClassNameOrder(newOrderClassName)

        }

    }


    return (
        <>

            <div className={styles.matching}>
                <div className={styles.matching_container}>
                    <div className={`${styles.matching_options}`}>
                        {orderOptions?.map((option, index) => (
                            <button key={option} className={`${styles.matching_optionsOption} ${styles.matching_button} ${classNameOrder?.find(name => name.name === option)?.value}`}
                                onClick={() => HandleMatchAttemps("options", option)}
                                disabled={disabledButtons.options || !run}
                            >{option}
                                {rightAnswers[index][1] && <CheckIcon className={styles.check} />}
                                {(!rightAnswers[index][1] && !run) && <CloseIcon className={`${styles.check} ${styles.check_fail}`} />}
                            </button>
                        ))
                        }
                    </div>
                    <div className={`${styles.matching_matches}`}>
                        {orderMatches.map((match, index) => (
                            <button key={match} className={`${styles.matching_matchsMatch} ${styles.matching_button} ${classNameOrder?.find(name => name.name === match)?.value}`}
                                onClick={() => HandleMatchAttemps("matchingOptions", match)} disabled={disabledButtons.optionsMatches || !run}>
                                {match}
                            </button>
                        ))
                        }
                    </div>
                </div>
                <div className={styles.buttons}>
                    {run &&
                        <div className={styles.buttons_reset}>
                            <Button onClick={HandleResetResults}>
                                <RefreshIcon />
                            </Button>
                        </div>
                    }
                    {run && (classNameOrder.length / 2 === currentQuestion.options?.length) &&
                        <Button onClick={SetResults} disabled={!(classNameOrder.length / 2 === currentQuestion.options?.length)} >
                            <ReviewIcon />
                            Validar Respuestas
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}