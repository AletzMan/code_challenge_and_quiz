


import { ButtonBack } from "@/app/components/ButtonBack/ButtonBack"
import { AlgorthmsStart } from "./components/AlgorthmsStart/AlgorthmsStart"
import styles from "./styles.module.scss"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"


export default function Page() {
    return (
        <>
            <main className={`${styles.main} scrollBarStyle`}>
                <ButtonBack text="Elegir desafío" href="/activity-selector" />
                <SnackProvider>
                    <AlgorthmsStart />
                </SnackProvider>
            </main>
        </>
    )
}