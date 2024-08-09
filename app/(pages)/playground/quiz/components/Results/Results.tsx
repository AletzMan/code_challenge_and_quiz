"use client"
import { useSetupQuiz } from "@/app/utils/store"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { StyleCodeEditor } from "@/app/utils/const"
import { ArrowUpIcon } from "@/app/components/Icons"

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
                        <div className={styles.question_textLi}>
                            {question.question}
                            <span className={`${styles.question_answer} ${question.isRight && styles.question_answerRight}`}>{question.answer}</span>
                            <details className={styles.details} name="explication">
                                <summary className={styles.details_summary}>
                                    <span className={styles.details_title} > Explicación<ArrowUpIcon className={styles.details_arrow} /> </span>
                                </summary>
                                <p className={styles.details_p}>{question.explanation}</p>
                                {question.codeSnippetExplanation &&
                                    <CodeBlock text={question.codeSnippetExplanation.replaceAll('\\n', '\n').replaceAll('\\t', '\t').replaceAll('\\', '')}
                                        theme={atomOneDark} language={language.language}
                                        customStyle={{ ...StyleCodeEditor }}
                                    />
                                }
                            </details>
                        </div>
                    </li>
                ))
                }
            </ol>

        </article>
    )
}