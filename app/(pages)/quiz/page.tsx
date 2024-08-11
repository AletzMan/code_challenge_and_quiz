
import styles from "./styles.module.scss"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"
import { Footer } from "@/app/components/Footer/Footer"
import { QuizSetup } from "./components/QuizSetup/QuizSetup"
import Link from "next/link"
import { TargetIcon } from "@/app/components/Icons"
import { ButtonBack } from "@/app/components/ButtonBack/ButtonBack"


export default function Page() {
    return (
        <main className={`${styles.main}`}>
            <ButtonBack text="Elegir desafío" href="/activity-selector" />
            <SnackProvider>
                <QuizSetup />
            </SnackProvider>
            <Footer />
        </main>
    )
}