import Link from "next/link"
import { Button } from "./components/Button/Button"
import { FlowChartIcon, QuestionIcon, SkillIcon, StarIcon } from "./components/Icons"
import styles from "./page.module.css"
import { Footer } from "./components/Footer/Footer"
import { SnackProvider } from "./components/SnackProvider/SnackProvider"
import { ButtonLink } from "./components/Button/ButtonLink"

export default function Home() {
	return (
		<>
			<main className={`${styles.main} scrollBarStyle`}>
				<div className={styles.code}>
					<div className={styles.code_image}></div>
					<div className={styles.shadow}></div>
				</div>
				<section className={styles.section} >
					<h2 className={styles.title}>¡Desafía tu mente, domina el código!</h2>
					<article className={styles.article}>
						<p className={styles.message}>Mejora y practica tus habilidades de programación con cuestionarios interactivos y retos de algoritmos.</p>
						<ul className={styles.ul}>
							<li className={styles.li}>
								<h3>Quizzes Interactivos</h3>
								<StarIcon className={styles.li_icon} />
								Pon a prueba tu conocimiento con preguntas sobre diversos lenguajes de programación. Perfecto para practicar y prepararte para entrevistas técnicas.
								<QuestionIcon className={`${styles.li_image} ${styles.li_imageOne}`} />
							</li>
							<li className={styles.li}>
								<h3>Desafíos de Algoritmos</h3>
								<StarIcon className={styles.li_icon} />
								Enfrenta desafíos de código y recibe retroalimentación instantánea de nuestra IA
								<FlowChartIcon className={`${styles.li_image} ${styles.li_imageTwo}`} />
							</li>
							<li className={styles.li}>
								<h3>Corrección Automática</h3>
								<StarIcon className={styles.li_icon} />
								Mejora tus habilidades con explicaciones detalladas y soluciones paso a paso
								<SkillIcon className={`${styles.li_image} ${styles.li_imageThree}`} />
							</li>
						</ul>
						<ButtonLink className={styles.button} href="/activity-selector" title="Elegir desafio">
							<>
								{"¡EMPIEZA AHORA!"}
							</>
						</ButtonLink>
					</article>
					<p className={styles.message}>Crea una cuenta y personaliza tu experiencia de aprendizaje.  Guarda tus avances, revisa tus errores y continúa aprendiendo donde lo dejaste.</p>
				</section>
				<Footer />
			</main>
		</>
	)
}
