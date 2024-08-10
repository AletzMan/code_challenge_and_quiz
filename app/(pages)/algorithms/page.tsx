


import { AlgorthmsStart } from "./components/AlgorthmsStart/AlgorthmsStart"
import styles from "./styles.module.scss"
import { SnackProvider } from "@/app/components/SnackProvider/SnackProvider"


export default function Page() {
    return (
        <>
            <main className={`${styles.main} scrollBarStyle`}>
                <SnackProvider>
                    <AlgorthmsStart />
                </SnackProvider>
            </main>
        </>
    )
}