/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useRef, useState } from "react"
import { TagBubble, animationLoop, createBubbleTags } from "../BounceBall/BounceBall"
import { Button } from "../Button/Button"
import { AnimationIcon } from "../Icons"
import styles from "./styles.module.scss"

interface Props {
	nameIdContainer: string
	animationDisabled?: boolean
}

const BouncingBall: React.FC<Props> = ({ nameIdContainer, animationDisabled }: Props) => {
	const containerBallRef = useRef(false)
	const [animation, setAnimation] = useState(true)
	const animationFrameRef = useRef(-1)
	const tagsRef = useRef<TagBubble[]>()

	const HandleToggleAnimation = () => {
		if (!animation && containerBallRef.current) {
			window.cancelAnimationFrame(animationFrameRef.current)
			const elements = document.querySelectorAll(".tag__move")
			elements.forEach(element => {
				element.remove()
			})
		}
		if (!animation) {
			window.cancelAnimationFrame(animationFrameRef.current)
		}
	}

	// Función para iniciar la animación
	const initAnimation = () => {
		// Asegúrate de que `tagsRef.current` y `animationFrameRef.current` se inicialicen correctamente
		const containerElement = document.getElementById(`${nameIdContainer}`)
		const elements = document.querySelectorAll(".tag__move")
		if (containerElement && elements.length === 0) {
			elements.forEach(element => {
				element.remove()
			})
			tagsRef.current = createBubbleTags(15, containerElement, 45)
			const timeStamp = Date.now()
			animationFrameRef.current = animationLoop(timeStamp, containerElement)
			containerBallRef.current = true
		}
	}


	useEffect(() => {

		console.log("RENDER")
		if (animation)
			initAnimation() // Llama a la función para iniciar la animación
		else
			HandleToggleAnimation()

		// Función de limpieza
		return () => {
			window.cancelAnimationFrame(animationFrameRef.current)
			HandleToggleAnimation()

		}
	}, [animation])// Asegúrate de que este efecto solo se ejecute una vez


	return (
		<div className={styles.animation}  >
			{/*<Button title={!animation ? "Activar Animación" : "Desactivar Animación"} onClick={() => setAnimation(prev => !prev)}><AnimationIcon /></Button>*/}
		</div>
	)
}

export default BouncingBall
