"use client"
import { useSetupQuiz } from "@/app/utils/store"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { StyleCodeEditor } from "@/app/utils/const"
import { ArrowUpIcon, BulbIcon, CheckIcon, ViewIcon } from "@/app/components/Icons"

export function Results() {
    const { completeQuiz, language } = useSetupQuiz()

    return (
        <article className={`${styles.results}`}>
            <h4 className={styles.results_title}>Resultados</h4>
            <div className={styles.results_subtitle}>
                <span className={styles.results_label}>Preguntas: <span className={styles.results_number}>{completeQuiz.questions.length}</span></span>
                <span className={styles.results_label}>Aciertos: <span className={styles.results_number}>{completeQuiz.correctAnswers}</span></span>
            </div>
            <ol className={styles.question}>
                {completeQuiz.questions.map(question => (
                    <li key={question.question} className={styles.question_text}>
                        <details className={styles.details} name="explication">
                            <summary className={`${styles.details_summary} ${question.isRight && styles.details_summaryRight}`}>
                                <span className={styles.details_title} >
                                    <span className={styles.details_titleContainer}>
                                        {question.question}
                                    </span>
                                    <ArrowUpIcon className={styles.details_arrow} />
                                </span>
                            </summary>
                            <div className={styles.details_container}>
                                <div className={`${styles.details_answer} `}>
                                    {!question.isRight ? <button className={styles.details_answerButton}><ViewIcon /> </button> : <CheckIcon />}
                                    {question.answer}
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