


import { ButtonBack } from "@/app/components/ButtonBack/ButtonBack"
import { AlgorthmsStart } from "./components/AlgorthmsStart/AlgorthmsStart"
import styles from "./styles.module.scss"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"
import { TargetIcon } from "@/app/components/Icons"


export default function Page() {
    return (
        <>
            <main className={`${styles.main} scrollBarStyle`}>
                <header className={styles.header}>
                    <ButtonBack href="/activity-selector" >
                        <>
                            <TargetIcon />
                            {"Elegir desafío"}
                        </>
                    </ButtonBack>
                </header>
                <SnackProvider>
                    <AlgorthmsStart />
                </SnackProvider>
            </main>
        </>
    )
}