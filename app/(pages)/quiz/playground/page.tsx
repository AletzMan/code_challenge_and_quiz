/* eslint-disable react/jsx-no-undef */
"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import { SnackbarProvider, useSnackbar } from "notistack"
import { useApiKey } from "@/app/utils/store"
import { QuizSetup } from "../components/QuizSetup/QuizSetup"
import { Questions } from "../components/Questions/Questions"


export const PlaygroundQuiz = () => {


    return (
        <section className={`${styles.section} scrollBarStyle`}>
        </section>
    )
}

