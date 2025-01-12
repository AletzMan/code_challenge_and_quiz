/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from "react"
import styles from "../styles.module.scss"
import { useCurrentQuiz } from "@/app/utils/store"
import { IQuizResult } from "@/app/interfaces/quiz"

interface Props {
    run: boolean
    setRun: Dispatch<SetStateAction<boolean>>
}


export const MultipleSelect = ({ run, setRun }: Props) => {
    const { currentQuestion, currentQuestionNumber, selectedAnswer, setSelectedAnwer, completeQuiz, setCompleteQuiz } = useCurrentQuiz()

    useEffect(() => {
        console.log(completeQuiz.questions)
        console.log(currentQuestionNumber)
        if (!completeQuiz.questions[currentQuestionNumber - 1]?.question) {
            SetCurrentQuestionDefault()
        }
    }, [currentQuestion])


    const SetCurrentQuestionDefault = () => {
        const newResults: IQuizResult = { ...completeQuiz }
        console.log(newResults)
        newResults.questions.push({
            question: currentQuestion.question,
            codeSnippet: null,
            isRight: false,
            answer: [],
            rightAnswer: currentQuestion.rightAnswer,
            codeSnippetExplanation: null,
            explanation: currentQuestion.explanation,
            answerMatching: [],
            rightAnswerMatching: []
        })
        setCompleteQuiz(newResults)
    }



    function HandleSelectAnswer(option: string, index: number): void {
        let newAnswer = [...selectedAnswer]

        if (newAnswer.includes("No respondida")) {
            newAnswer = []
        }
        if (newAnswer.length <= currentQuestion.numberOfCorrectAnswers) {
            newAnswer.push(option)
            setSelectedAnwer(newAnswer)
        }
        if (newAnswer.length === currentQuestion.numberOfCorrectAnswers) {
            let newResults = { ...completeQuiz }
            const isRight = ValidateAnswers(newAnswer)
            console.log(isRight)
            if (isRight) {
                newResults.correctAnswers++
            }

            newResults.questions.push({
                answer: selectedAnswer,
                codeSnippet: null,
                codeSnippetExplanation: null,
                explanation: currentQuestion.explanation,
                isRight,
                question: currentQuestion.question,
                rightAnswer: currentQuestion.rightAnswer,
                answerMatching: [],
                rightAnswerMatching: []
            })


            setRun(false)
            setCompleteQuiz(newResults)
        }

    }


    const ValidateAnswers = (currentValues: string[]): boolean => {

        let rightAnswers = 0
        for (let index = 0; index < currentQuestion.numberOfCorrectAnswers; index++) {
            if (currentQuestion.rightAnswer.includes(currentValues[index])) {
                rightAnswers++
            }
        }
        return currentQuestion.numberOfCorrectAnswers === rightAnswers
    }

    return (
        <article className={styles.choice}>
            {
                currentQuestion.options?.map((option, index) => (
                    <button
                        key={(option)}
                        className={`${styles.choice_option} 
                            ${selectedAnswer.includes(option) && styles.choice_optionSelect} 
                            ${(selectedAnswer.includes(option) && (Array.isArray(selectedAnswer) && currentQuestion.rightAnswer.includes(option)) && !run) && styles.choice_optionCorrect}
                            ${(selectedAnswer.includes(option) && (Array.isArray(selectedAnswer) && !currentQuestion.rightAnswer.includes(option)) && !run) && styles.choice_optionIncorrect}`}
                        disabled={!run}
                        onClick={() => HandleSelectAnswer(option, index)}>
                        <span className={styles.choice_optionLetter}>{String.fromCharCode(65 + index)}</span>
                        <span className={styles.choice_optionText}>{option.replaceAll(`\\\\`, "")}</span>
                    </button>
                ))
            }

        </article>
    )
}