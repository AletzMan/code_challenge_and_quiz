import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"

const font = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Code Challenge & Quiz",
	description: "Desafíos de programación y cuestionarios para poner a prueba tus habilidades de codificación.", icons: "/logo.svg",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className} id="containerBalls">
				<div className="imageContainer">

				</div>
				<Header />
				{children}
				{/*<Footer />*/}
				<dialog id="modal_root" open></dialog>
			</body>
		</html>
	)
}
