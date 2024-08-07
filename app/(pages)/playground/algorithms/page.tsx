
import { Header } from "@/app/components/Header/Header"
import { Playground } from "./components/Playground/Playground"
import styles from "./styles.module.scss"
import Link from "next/link"
import { ArrowLeftIcon, ArrowUpIcon } from "@/app/components/Icons"


export default function Page() {
    return (
        <>
            <main className={`${styles.main} scrollBarStyle`}>
                <h2 className={styles.main_title}>
                    <Link className={styles.link} href={'/playground'}><ArrowLeftIcon className={styles.link_icon} />Playground</Link>
                    Resulve algoritmos
                </h2>
                <Playground />
            </main>
        </>
    )
}