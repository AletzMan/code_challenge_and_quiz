/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useCurrentQuiz, useSetupQuiz } from "@/app/utils/store"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { StyleCodeEditor } from "@/app/utils/const"
import { ArrowUpIcon, BulbIcon, CheckIcon, ViewHideIcon, ViewIcon } from "@/app/components/Icons"
import { useEffect, useState } from "react"

export function Results() {
    const { language } = useSetupQuiz()
    const { completeQuiz } = useCurrentQuiz()
    const [currentAnswer, setCurrentAnswer] = useState<boolean[]>([])

    function HandleViewAnswer(index: number): void {
        const newAnswer = { ...currentAnswer }
        newAnswer[index] = !currentAnswer[index]
        setCurrentAnswer(newAnswer)
    }

    return (
        <article className={`${styles.results}`}>
            <h4 className={styles.results_title}>Resultados</h4>
            <div className={styles.results_subtitle}>
                <span className={styles.results_label}>Preguntas: <span className={styles.results_number}>{completeQuiz.questions.length}</span></span>
                <span className={styles.results_label}>Aciertos: <span className={styles.results_number}>{completeQuiz.correctAnswers}</span></span>
            </div>
            <ol className={styles.question}>
                {completeQuiz.questions.map((question, index) => (
                    <li key={index} className={styles.question_text}>
                        <details className={styles.details} name="explication" >
                            <summary className={`${styles.details_summary} ${question.isRight && styles.details_summaryRight}`}>
                                <span className={styles.details_title} >
                                    <span className={styles.details_titleContainer}>
                                        {question.question}
                                    </span>
                                    <ArrowUpIcon className={styles.details_arrow} />
                                </span>
                            </summary>
                            <div className={styles.details_container}>
                                {question.codeSnippet &&
                                    <CodeBlock theme={atomOneDark}
                                        text={question.codeSnippet.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                        language={language.language}
                                        customStyle={{ ...StyleCodeEditor }} />
                                }
                                <div className={`${styles.details_answer} `}>
                                    {!question.isRight ? <button className={styles.details_answerButton} title="Ver respuest correcta" onClick={() => HandleViewAnswer(index)}>{currentAnswer[index] ? <ViewHideIcon /> : <ViewIcon />} </button> : <CheckIcon />}
                                    <span className={` ${styles.details_answerButtonText} ${(!currentAnswer[index] && !question.isRight) && styles.details_answerButtonTextFail} `}>
                                        {!currentAnswer[index] ? question.answer : question.rightAnswer[0]}
                                    </span>
                                    {!currentAnswer[index] && question.answerMatching && question.answerMatching?.length > 0 &&
                                        <div className={`${styles.answerMatching} scrollBarStyle`}>
                                            {question.answerMatching?.map((option, index) => (
                                                <div key={index} className={styles.answerMatching_results}>
                                                    <span className={`${styles.answerMatching_option} ${styles.answerMatching_tag} ${option[2] === "true" ? styles.answerMatching_tagOK : styles.answerMatching_tagFAIL}`}>{option[0]}</span>
                                                    <span className={`${styles.answerMatching_match} ${styles.answerMatching_tag}  ${styles.answerMatching_tagMatch} ${option[2] === "true" ? styles.answerMatching_tagMatchOK : styles.answerMatching_tagMatchFAIL}`}>{option[1]}</span>
                                                </div>
                                            ))
                                            }
                                        </div>
                                    }
                                    {!question.isRight && currentAnswer[index] && question.rightAnswerMatching && question.rightAnswerMatching?.length > 0 &&
                                        <div className={`${styles.answerMatching} scrollBarStyle`}>
                                            {question.rightAnswerMatching?.map((option, index) => (
                                                <div key={index} className={styles.answerMatching_results}>
                                                    <span className={`${styles.answerMatching_option} ${styles.answerMatching_tag}`}>{option[0]}</span>
                                                    <span className={`${styles.answerMatching_match} ${styles.answerMatching_tag} ${styles.answerMatching_tagMatch} ${styles.answerMatching_tagMatchNormal}`}>{option[1]}</span>
                                                </div>
                                            ))

                                            }
                                        </div>
                                    }
                                </div>
                                <div className={styles.details_p}><BulbIcon />{question.explanation}</div>
                                {question.codeSnippetExplanation &&
                                    <CodeBlock text={question.codeSnippetExplanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                        theme={atomOneDark} language={language.language}
                                        customStyle={{ ...StyleCodeEditor }}
                                    />
                                }
                            </div>
                        </details>
                    </li>
                ))
                }
            </ol>

        </article>
    )
}