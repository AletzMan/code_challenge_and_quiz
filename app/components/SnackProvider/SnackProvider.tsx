
"use client"

import { SnackbarProvider } from "notistack"

interface Props {
    children: JSX.Element
}

export function SnackProvider({ children }: Props) {
    return (
        <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={5000}>
            {children}
        </SnackbarProvider>
    )
}