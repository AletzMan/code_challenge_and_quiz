/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { CheckIcon, CloseIcon, SendIcon } from "@/app/components/Icons"
import styles from "./styles.module.scss"
import { Button } from "@/app/components/Button/Button"
import { useCurrentQuiz } from "@/app/utils/store"
import { ChangeEvent, MouseEvent, KeyboardEvent, Dispatch, SetStateAction, useState, useRef, useCallback, useEffect } from "react"
import { IAnswer } from "@/app/interfaces/quiz"
import { Matching } from "./Matching/Matching"

const OptionsSymbol = ["A", "B", "C", "D", "E", "F"]


interface IClassNameOptions {
    name: string
    value: string
}

interface Props {
    run: boolean
    setRun: Dispatch<SetStateAction<boolean>>
}

export function AnswerOptions({ run, setRun }: Props) {
    const { currentQuestion, selectedAnswer, setSelectedAnwer, completeQuiz, setCompleteQuiz, currentQuestionNumber } = useCurrentQuiz()
    const [isRightAnswer, setIsRightAnswer] = useState(false)


    const HandleSelectAnswer = (option: string): void => {
        setSelectedAnwer(option)
        SetQuizResult(option.toLowerCase() === currentQuestion.rightAnswer[0].toLowerCase(), option)
        setRun(false)
    }


    function HandleChangeOpenAnswer(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.currentTarget.value
        if (value) {
            setSelectedAnwer(value)
        }
    }

    function HandleValidateAnswer(event: MouseEvent<HTMLButtonElement>): void {
        setRun(false)
        if (selectedAnswer.toLowerCase() === currentQuestion.rightAnswer[0].toLowerCase()) {
            setIsRightAnswer(true)
        }
        SetQuizResult(selectedAnswer.toLowerCase() === currentQuestion.rightAnswer[0].toLowerCase(), selectedAnswer)
    }



    function HandleKeyPress(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            setRun(false)
            if (selectedAnswer.toLowerCase() === currentQuestion.rightAnswer[0].toLowerCase()) {
                setIsRightAnswer(true)
            }
            SetQuizResult(selectedAnswer.toLowerCase() === currentQuestion.rightAnswer[0].toLowerCase(), selectedAnswer)
        }
    }

    const SetQuizResult = (isRight: boolean, answer: string) => {
        const newQuizResult = { ...completeQuiz }
        const newQuestion: IAnswer = {
            question: currentQuestion.question,
            codeSnippet: currentQuestion.codeSnippet,
            answer: answer,
            isRight,
            explanation: currentQuestion.explanation,
            codeSnippetExplanation: currentQuestion.codeSnippetExplanation,
            rightAnswer: currentQuestion.rightAnswer
        }
        if (isRight) {
            newQuizResult.correctAnswers += 1
        }
        newQuizResult.questions[currentQuestionNumber - 1] = newQuestion
        setCompleteQuiz(newQuizResult)
    }


    return (
        <div className={styles.options}>
            {(currentQuestion?.options && currentQuestion.type === "multiple choice") &&
                currentQuestion?.options?.map((option, index) => (
                    <button
                        key={option}
                        className={`${styles.option} 
                                    ${(selectedAnswer === option && currentQuestion.rightAnswer.includes(selectedAnswer)) && styles.option_select} 
                                    ${(selectedAnswer === option && !currentQuestion.rightAnswer.includes(selectedAnswer)) && styles.option_incorrect}`}
                        disabled={!run}
                        onClick={() => HandleSelectAnswer(option)}>
                        <span className={styles.option_letter}>{OptionsSymbol[index]}</span>
                        <span className={styles.option_text}>{option.replaceAll(`\\\\`, "")}</span>
                    </button>
                ))
            }
            {currentQuestion?.type === "true false" &&
                <div className={styles.dichotomous}>
                    <button
                        className={`${styles.dichotomous_option} 
                                    ${(selectedAnswer === "Verdadero" && currentQuestion.rightAnswer[0] === "Verdadero") && styles.dichotomous_optionTrue}  
                                    ${(selectedAnswer === "Verdadero" && currentQuestion.rightAnswer[0] !== "Verdadero") && styles.dichotomous_optionFalse}`}
                        disabled={!run}
                        onClick={() => HandleSelectAnswer("Verdadero")}>
                        <span className={styles.dichotomous_optionText}>
                            {(selectedAnswer === "Verdadero" && currentQuestion.rightAnswer[0] !== "Verdadero") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                            {(selectedAnswer === "Verdadero" && currentQuestion.rightAnswer[0] === "Verdadero") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                            Verdadero
                        </span>
                    </button>
                    <button
                        className={`${styles.dichotomous_option}
                                    ${(selectedAnswer === "Falso" && currentQuestion.rightAnswer[0] === "Falso") && styles.dichotomous_optionTrue}  
                                    ${(selectedAnswer === "Falso" && currentQuestion.rightAnswer[0] !== "Falso") && styles.dichotomous_optionFalse}`}
                        disabled={!run}
                        onClick={() => HandleSelectAnswer("Falso")}>
                        <span className={styles.dichotomous_optionText}>
                            {(selectedAnswer === "Falso" && currentQuestion.rightAnswer[0] === "Falso") && <CheckIcon className={styles.dichotomous_optionIcon} />}
                            {(selectedAnswer === "Falso" && currentQuestion.rightAnswer[0] !== "Falso") && <CloseIcon className={styles.dichotomous_optionIcon} />}
                            Falso
                        </span>
                    </button>
                </div>
            }
            {currentQuestion?.type === "matching" &&
                <Matching run={run} setRun={setRun} />
            }
            {currentQuestion?.type === "blank space" &&
                <div className={styles.blankspace} >
                    {!isRightAnswer && !run && <CloseIcon className={`${styles.blankspace_icon} ${styles.blankspace_iconWrong}`} />}
                    {isRightAnswer && !run && <CheckIcon className={`${styles.blankspace_icon} ${styles.blankspace_iconRight}`} />}
                    <input className={`${styles.blankspace_input} ${isRightAnswer && styles.blankspace_inputRight} ${(!isRightAnswer && !run) && styles.blankspace_inputWrong}`} autoFocus disabled={!run} onKeyDown={HandleKeyPress} onChange={HandleChangeOpenAnswer} />
                    <Button className="green" disabled={!run} onClick={HandleValidateAnswer}>Enviar<SendIcon /></Button>
                </div>
            }
        </div>
    )
}