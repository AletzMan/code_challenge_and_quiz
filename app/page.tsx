
import { FlowChartIcon, QuestionIcon, SkillIcon, StarIcon } from "./components/Icons"
import styles from "./page.module.css"
import { Footer } from "./components/Footer/Footer"
import { ButtonLink } from "./components/Button/ButtonLink"
import Image from "next/image"

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
					<p className={styles.message}>Mejora y practica tus habilidades de programación con cuestionarios interactivos y retos de algoritmos.</p>
					<article className={styles.article}>
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
					<p className={styles.message}>Sumérgete en la sección de Desafíos de Algoritmos y descubre cómo puedes mejorar tus habilidades de programación al enfrentarte a problemas diseñados para desafiarte y motivarte a crecer.</p>
					<p className={styles.message}>¡Cada reto es una oportunidad para aprender algo nuevo!</p>
					<picture className={styles.picture}>
						<Image className={styles.imageFrame} src={"/frame_code2.png"} fill alt="Algoritmo" />
					</picture>
					<ButtonLink className={styles.button} href="/activity-selector" title="Elegir desafio">
						<>
							{"¡EMPIEZA AHORA!"}
						</>
					</ButtonLink>
					<p className={styles.message}>Crea una cuenta y personaliza tu experiencia de aprendizaje.  Guarda tus avances, revisa tus errores y continúa aprendiendo donde lo dejaste.</p>
					<ButtonLink className={styles.button} isSecondary href="/login" title="Elegir desafio">
						<>
							{"Crear cuenta"}
						</>
					</ButtonLink>
					<p className={styles.message}>La sección de Quizzes Interactivos, está diseñada para desafiar y expandir tus conocimientos en programación.</p>
					<p className={styles.message}>Ingresa la configuración y deja que la IA genere automáticamente las preguntas según el tema y la configuración seleccionada, como el lenguaje de programación, el nivel de dificultad, y más.</p>
					<picture className={styles.picture_quiz}>
						<Image className={styles.imageFrame} src={"/quiz.png"} fill alt="Algoritmo" />
					</picture>
					<ButtonLink className={styles.button} href="/activity-selector" title="Elegir desafio">
						<>
							{"¡EMPIEZA AHORA!"}
						</>
					</ButtonLink>
				</section>
				<Footer />
			</main>
		</>
	)
}
