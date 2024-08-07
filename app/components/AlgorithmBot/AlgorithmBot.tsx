/* eslint-disable react-hooks/exhaustive-deps */
import { Message, useChat } from "ai/react"
import { Fragment, useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { useAlgorithm, useSetupQuiz } from "@/app/utils/store"
import { BotIcon, LogoCCQ, SendIcon, StopIcon, UserIcon } from "../Icons"
import { IQuiz } from "@/app/interfaces/quiz"
import { GetCodeBlock, parseTextToJSX } from "../QuizBot/ParseTextToJSX"
import { IAlgorithm } from "@/app/interfaces/algorithm"


interface Props {
    algorithm: IAlgorithm
    evaluate: boolean
}

export function AlgorithmBot({ algorithm, evaluate }: Props) {
    const { language } = useSetupQuiz()
    const { algorithmSolution } = useAlgorithm()
    const { messages, handleSubmit, handleInputChange, input, isLoading, stop, append } = useChat()
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages]) // Dependency on messages to run whenever they change

    useEffect(() => {

        const prevMessages: Message[] = [
            {
                role: "assistant",
                content: algorithm.title,
                id: crypto.randomUUID()
            },
            {
                role: "assistant",
                content: algorithm.description,
                id: crypto.randomUUID()
            },
            {
                role: "user",
                content: "Voy a resolver y calificaras mi respuesta",
                id: crypto.randomUUID()
            }
        ]
        messages.push(...prevMessages)
    }, [])

    useEffect(() => {
        if (evaluate) {
            const prevMessages: Message =
            {
                role: "user",
                content: `Evalúa mi código brevemente, sin darme solución: ${algorithmSolution.solution}`,
                id: crypto.randomUUID()
            }

            append(prevMessages)
        }
    }, [evaluate])

    return (
        <section className={styles.section}>
            <LogoCCQ className={styles.section_logo} />
            <article className={`${styles.chat} scrollBarStyle`} ref={chatContainerRef} >
                {messages.filter((_, index) => index > 2).map(message => (
                    <Fragment key={message.id}>
                        {
                            <div className={` ${styles.chat_message} ${message.role === 'user' ? styles.chat_user : styles.chat_bot}`}>
                                <span className={`${styles.chat_name} ${message.role == 'user' ? styles.chat_nameUser : styles.chat_nameBot}`}>
                                    {message.role === 'user' ? <UserIcon className={styles.chat_nameIcon} /> : <BotIcon className={styles.chat_nameIcon} />}
                                    {/*message.role === 'user' ? 'Yo' : 'QuizBot'*/}
                                </span>

                                <div className={`${styles.chat_text} ${message.role === 'user' ? styles.chat_textUser : styles.chat_textBot}`}>
                                    {message.content.includes("Evalúa mi código") ? "Evalúa mi código" : parseTextToJSX(message.content)}
                                    {GetCodeBlock(message.content) &&
                                        <CodeBlock
                                            language={language.option}
                                            showLineNumbers={false}
                                            text={GetCodeBlock(message.content) || ""}
                                            theme={atomOneDark} customStyle={{ "width": "max-content", "max-width": "100%", "padding": "0 2em 0 0", "fontFamily": "monospace" }} />

                                    }
                                </div>

                            </div>
                        }
                    </Fragment>
                ))}
            </article>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="prompt" value={input} onChange={handleInputChange} className={styles.form_input} placeholder="Pregunta a QuizBot" />
                {!isLoading && <button type="submit" className={styles.form_button} disabled={isLoading}><SendIcon className={styles.form_buttonIcon} /></button>}
                {isLoading && <button type="button" className={`${styles.form_button} ${styles.form_buttonStop}`} onClick={() => stop()}><StopIcon className={styles.form_buttonIcon} /></button>}
            </form>
        </section>
    )
}