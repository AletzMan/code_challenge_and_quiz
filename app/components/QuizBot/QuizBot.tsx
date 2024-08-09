/* eslint-disable react-hooks/exhaustive-deps */
import { Message, useChat } from "ai/react"
import { useEffect, useRef, useState } from "react"
import { GetCodeBlock, parseTextToJSX } from "./ParseTextToJSX"
import styles from "./styles.module.scss"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { useSetupQuiz } from "@/app/utils/store"
import { BotIcon, SendIcon, StopIcon, UserIcon } from "../Icons"
import { IQuiz } from "@/app/interfaces/quiz"
import { StyleCodeEditor } from "@/app/utils/const"


interface Props {
    quiz: IQuiz
}

export function QuizBot({ quiz }: Props) {
    const { language } = useSetupQuiz()
    const { messages, handleSubmit, handleInputChange, input, isLoading, stop } = useChat()
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
                content: quiz.question,
                id: crypto.randomUUID()
            },
            {
                role: "assistant",
                content: quiz.explanation,
                id: crypto.randomUUID()
            }
        ]
        messages.push(...prevMessages)
    }, [])


    return (
        <section className={styles.section}>
            <article className={`${styles.chat} scrollBarStyle`} ref={chatContainerRef}>
                {messages.filter((_, index) => index > 1).map(message => (
                    <div key={message.id} className={` ${styles.chat_message} ${message.role === 'user' ? styles.chat_user : styles.chat_bot}`}>
                        <span className={`${styles.chat_name} ${message.role == 'user' ? styles.chat_nameUser : styles.chat_nameBot}`}>
                            {message.role === 'user' ? <UserIcon className={styles.chat_nameIcon} /> : <BotIcon className={styles.chat_nameIcon} />}
                            {/*message.role === 'user' ? 'Yo' : 'QuizBot'*/}
                        </span>
                        <div className={`${styles.chat_text} ${message.role === 'user' ? styles.chat_textUser : styles.chat_textBot}`}>
                            {parseTextToJSX(message.content)}
                            {GetCodeBlock(message.content) &&
                                <CodeBlock
                                    language={language.language}
                                    showLineNumbers={false}
                                    text={GetCodeBlock(message.content) || ""}
                                    theme={atomOneDark} customStyle={{ ...StyleCodeEditor }} />

                            }
                        </div>
                    </div>
                ))}
            </article>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="search" name="prompt" value={input} onChange={handleInputChange} className={styles.form_input} placeholder="¿En qué puedo ayudarte? Escribe aquí..." />
                {!isLoading && <button type="submit" className={styles.form_button} disabled={isLoading}><SendIcon className={styles.form_buttonIcon} /></button>}
                {isLoading && <button type="button" className={`${styles.form_button} ${styles.form_buttonStop}`} onClick={() => stop()}><StopIcon className={styles.form_buttonIcon} /></button>}
            </form>
        </section>
    )
}