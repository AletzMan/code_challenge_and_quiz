/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./styles.module.scss"
import { CreateIcon } from "@/app/components/Icons"
import { useEffect } from "react"
import { useSetupQuiz } from "@/app/utils/store"
import { Levels } from "@/app/components/Levels/Levels"
import { CATEGORIES } from "@/app/utils/const"
import { Footer } from "@/app/components/Footer/Footer"
import { Questions } from "../components/Questions/Questions"
import { ButtonBack } from "@/app/components/ButtonBack/ButtonBack"
import { Results } from "../components/Results/Results"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"

export default function Page() {
    const { language, difficulty, category } = useSetupQuiz()


    return (
        <>
            {
                <section className={`${styles.quiz} `}>
                    <header className={styles.header}>
                        <ButtonBack href="/quiz">
                            <>
                                <span className={styles.newQuiz} >
                                    {"¡Crea uno nuevo!"}
                                </span>
                                <CreateIcon />
                            </>
                        </ButtonBack>
                        <div className={styles.header_options}>
                            <div className={styles.type}>
                                <div style={{ "color": language.color, backgroundColor: `${language.color}35`, borderColor: `${language.color}30` }}
                                    className={`${styles.type_language} `}>
                                    {CATEGORIES[category.option as "frontend"].items.find(item => item.option === language.option)?.logo}
                                    {language.value}
                                </div>
                            </div>
                            <Levels difficulty={difficulty} />
                        </div>
                    </header>
                    <div className={`${styles.questions} scrollBarStyle`}>
                        <SnackProvider>
                            <Questions />
                        </SnackProvider>

                    </div>

                    <Footer />
                </section>
            }


        </>
    )
}



