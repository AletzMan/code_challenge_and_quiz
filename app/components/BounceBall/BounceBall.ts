
const NAME_LOGOS = ["html", "css", "javascript", "sass", "pug", "git", "firebase", "typescript", "github", "mysql", "react", "next", "vite", "csharp", "npm", "netcore", "xamarin", "xaml", "c", "vscode", "vs"]

const techLogos = [
    { name: "html", viewName: "HTML", color: "#E34F26" },
    { name: "css", viewName: "CSS", color: "#1572B6" },
    { name: "javascript", viewName: "JavaScript", color: "#F7DF1E" },
    { name: "typescript", viewName: "TypeScript", color: "#3178C6" },
    { name: "react", viewName: "React", color: "#61DAFB" },
    { name: "csharp", viewName: "C#", color: "#239120" },
    { name: "c", viewName: "C", color: "#A8B9CC" },
    { name: "cpp", viewName: "C++", color: "#00599C" },
    { name: "java", viewName: "Java", color: "#007396" },
    { name: "python", viewName: "Python", color: "#3776AB" },
    { name: "ruby", viewName: "Ruby", color: "#CC342D" },
    { name: "php", viewName: "PHP", color: "#777BB4" },
    { name: "kotlin", viewName: "Kotlin", color: "#0095D5" },
    { name: "swift", viewName: "Swift", color: "#FA7343" },
    { name: "go", viewName: "Go", color: "#00ADD8" },
    { name: "rust", viewName: "Rust", color: "#DEA584" },
    { name: "dart", viewName: "Dart", color: "#0175C2" },
]

const bubbleCharacters = [
    "💻", // Laptop
    "⚙️", // Gear
    "🔧", // Wrench
    "💡", // Light bulb
    "📚", // Books
    "📈", // Chart
    "🖥️", // Desktop Computer
    "🔍", // Magnifying Glass
    "🔋", // Battery
    "📱", // Mobile Phone
    "🎯", // Target
    "🛠️", // Hammer and Wrench
    "⌨️", // Keyboard
    "🔗", // Link
    "🚀", // Rocket
    "💾", // Floppy Disk
    "🧠", // Brain
    "🧩", // Puzzle Piece
    "🔐", // Locked Padlock
    "🌐", // Globe
    "📦", // Package Box
    "📡", // Satellite
    "🕹️", // Joystick
    "🌟", // Star
    "📤", // Outbox Tray
    "🔑", // Key
    "💥", // Explosion
    "🔥", // Fire
    "⚡", // High Voltage
    "💬", // Speech Balloon
]




let containerTags: HTMLDivElement[] = []
let timeElapsed = 0
let oldTimeStamp = 0
let bubblesContainer: TagBubble[] = []





export class TagBubble {
    posX: number
    posY: number
    speedX: number
    speedY: number
    mass: number
    isDragging: boolean
    isColliding: boolean
    isFollowingMouse: boolean
    width: number
    radius: number
    height: number
    initPosMouseX: number
    initPosMouseY: number

    constructor(posX: number, posY: number, speedX: number, speedY: number, mass: number) {
        this.posX = posX
        this.posY = posY
        this.speedX = speedX
        this.speedY = speedY
        this.isDragging = false
        this.radius = 0
        this.isFollowingMouse = false
        this.mass = mass
        this.isColliding = false
        this.width = 0
        this.height = 0
        this.initPosMouseX = 0
        this.initPosMouseY = 0

    }

    createItem(bubbleSection: HTMLElement, bodySection: HTMLElement, Size: number) {

        const newBubble = document.createElement("div")
        newBubble.style.backgroundImage = "url('/" + techLogos[GetRandomNumber(0, techLogos.length - 1)].name + "_icon.png')"
        //const selectTech = bubbleCharacters[GetRandomNumber(0, techLogos.length - 1)]
        //newBubble.innerHTML = `${selectTech}`
        //newBubble.style.color = `${selectTech.color}`
        newBubble.className = "tag__move"
        newBubble.style.left = `${this.posX}px`
        newBubble.style.top = `${this.posY}px`
        containerTags.push(newBubble)
        bubbleSection?.appendChild(newBubble)
        this.radius = Size / 2



        newBubble.style.width = `${Size}px`
        newBubble.style.height = `${Size}px`

        this.width = Math.floor(newBubble.getBoundingClientRect().width)
        this.height = Math.floor(newBubble.getBoundingClientRect().height)

        newBubble.addEventListener('click', (e) => {
            e.stopPropagation()
            // ... código para mover la burbuja
        })

        this.initPosMouseX = 0
        this.initPosMouseY = 0

        let directionX = 0
        let directionY = 0

        newBubble.addEventListener('mousedown', (e) => {
            this.isDragging = true
            this.isFollowingMouse = true
            this.initPosMouseX = e.clientX
            this.initPosMouseY = e.clientY
        })

        bodySection.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                if (this.isFollowingMouse) {
                    // Seguir el mouse
                    this.posX = e.clientX - Size / 2
                    this.posY = e.clientY - Size / 2
                } else {
                    // Mover en la dirección de la velocidad
                    this.posX += this.speedX
                    this.posY += this.speedY

                    // Desaceleración
                    this.speedX *= 0.9
                    this.speedY *= 0.9
                }
            }
        })

        bodySection.addEventListener('mouseup', () => {

            if (this.isDragging && this.isFollowingMouse) {

                // Calcular la velocidad basada en el desplazamiento del mouse
                const deltaX = this.posX - this.initPosMouseX
                const deltaY = this.posY - this.initPosMouseY

                // Normalizar y escalar el vector de desplazamiento
                const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                const normalizedX = deltaX / magnitude
                const normalizedY = deltaY / magnitude
                const speedFactor = 10 // Ajusta este valor según la velocidad deseada

                this.speedX = normalizedX * speedFactor
                this.speedY = normalizedY * speedFactor

                // Aplicar fricción en la dirección opuesta a la velocidad
                this.speedX *= 10
                this.speedY *= 10

            }

            this.isDragging = false
            this.isFollowingMouse = false
        })

        /*
        newBubble.addEventListener('mousedown', (e) => {
            this.initPosMouseX = e.clientX
            this.initPosMouseY = e.clientY
        })


        bodySection.addEventListener('mouseup', (e) => {
            if (this.initPosMouseX != 0) {
                if (this.initPosMouseX - e.clientX > 0) {
                    directionX = -4
                } else {
                    directionX = +4
                }
                if (this.initPosMouseY - e.clientY > 0) {
                    directionY = -4
                } else {
                    directionY = +4
                }
                for (let index = 0; index < 20; index++) {
                    setTimeout(() => {
                        this.speedX += directionX
                        this.speedY += directionY
                    }, 50)
                }
                this.initPosMouseX = 0
                this.initPosMouseY = 0
            }
        })
        */
    }

    updatePosition(timeElapsedCurrent: number) {
        this.posX += this.speedX * timeElapsedCurrent
        this.posY += this.speedY * timeElapsedCurrent
    }
}

/*
const initAnimation = () => {
    setTimeout(() => {
        createBubbleTags(NUMBER_BUBBLE)
        window.requestAnimationFrame((timeStamp) => { animationLoop(timeStamp) })
    }, 200)
}
*/

export const createBubbleTags = (numberBubbles: number, section: HTMLElement, size: number): TagBubble[] => {
    if (section) {
        containerTags = []
        bubblesContainer = []

        for (let index = 0; index < numberBubbles; index++) {
            let positionTagX = GetRandomNumber(50, window.innerWidth - 50)
            let positionTagY = GetRandomNumber(100, section.getBoundingClientRect().height - 20)

            bubblesContainer.push(new TagBubble(positionTagX, positionTagY, GetRandomNumber(-20, 70), GetRandomNumber(-20, 70), GetRandomNumber(1, 10)))
        }

        for (let i = 0; i < bubblesContainer.length; i++) {
            bubblesContainer[i].createItem(section, section, size)
            bubblesContainer[i].mass = bubblesContainer[i].width * 150
        }
    }
    return bubblesContainer
}

export const animationLoop = (timeStamp: number, section: HTMLElement): number => {
    timeElapsed = 0
    oldTimeStamp = 0
    timeElapsed = (timeStamp - oldTimeStamp) / 1000000
    oldTimeStamp = timeStamp

    const velocidadMaxima = 10

    for (let i = 0; i < bubblesContainer.length; i++) {
        bubblesContainer[i].updatePosition(timeElapsed)
        const velocidadActual = Math.sqrt(bubblesContainer[i].speedX * bubblesContainer[i].speedX + bubblesContainer[i].speedY * bubblesContainer[i].speedY)
        if (velocidadActual > velocidadMaxima) {
            // Escalar la velocidad al máximo permitido
            const factorEscala = velocidadMaxima / velocidadActual
            bubblesContainer[i].speedX *= factorEscala
            bubblesContainer[i].speedY *= factorEscala
        }
    }
    UpdatePosition()
    detectCollisions()
    borderCollisionDetection(section)
    const handleAnimationFrame = window.requestAnimationFrame((timeStamp) => animationLoop(timeStamp, section))

    return handleAnimationFrame
}

export const UpdatePosition = () => {
    for (let index = 0; index < containerTags.length; index++) {
        if (bubblesContainer[index]?.posX && bubblesContainer[index]?.posY) {
            containerTags[index].style.left = bubblesContainer[index]?.posX + "px"
            containerTags[index].style.top = bubblesContainer[index]?.posY + "px"
        }
    }
}




export const detectCollisions = () => {
    let objectOne: TagBubble
    let objectTwo: TagBubble
    for (let i = 0; i < bubblesContainer.length; i++) {
        bubblesContainer[i].isColliding = false
    }

    for (let i = 0; i < bubblesContainer.length; i++) {
        objectOne = bubblesContainer[i]
        for (let j = i + 1; j < bubblesContainer.length; j++) {
            objectTwo = bubblesContainer[j]
            if (intersectionCircles(objectOne.posX, objectOne.posY, objectOne.width / 2, objectTwo.posX, objectTwo.posY, objectTwo.width / 2)) {
                objectOne.isColliding = true
                objectTwo.isColliding = true
                let collisionVector = { x: objectTwo.posX - objectOne.posX, y: objectTwo.posY - objectOne.posY }
                let distance = Math.sqrt((objectTwo.posX - objectOne.posX) * (objectTwo.posX - objectOne.posX) + (objectTwo.posY - objectOne.posY) * (objectTwo.posY - objectOne.posY))
                let collisionVectorNorm = { x: collisionVector.x / distance, y: collisionVector.y / distance }
                let relativeVelocityVector = { x: objectOne.speedX - objectTwo.speedX, y: objectOne.speedY - objectTwo.speedY }
                let speed = relativeVelocityVector.x * collisionVectorNorm.x + relativeVelocityVector.y * collisionVectorNorm.y

                if (speed < 0) break
                let impulse = 2 * speed / (objectOne.mass + objectTwo.mass)
                objectOne.speedX -= (impulse * objectTwo.mass * collisionVectorNorm.x)
                objectOne.speedY -= (impulse * objectTwo.mass * collisionVectorNorm.y)
                objectTwo.speedX += (impulse * objectOne.mass * collisionVectorNorm.x)
                objectTwo.speedY += (impulse * objectOne.mass * collisionVectorNorm.y)
            }
        }
    }
}


export const borderCollisionDetection = (BubbleSection: HTMLElement) => {
    const COLLISION_LIMIT_X_LEFT = 1
    const COLLISION_LIMIT_X_RIGHT = BubbleSection!.getBoundingClientRect()?.width - 5
    const COLLISION_LIMIT_Y_TOP = 5
    const COLLISION_LIMIT_Y_BOTTOM = BubbleSection!.getBoundingClientRect()?.height - 5 || 0
    const SPEED_RESET = 0.95
    let bubble: TagBubble
    for (let i = 0; i < bubblesContainer.length; i++) {
        bubble = bubblesContainer[i]

        if (bubble.posX < COLLISION_LIMIT_X_LEFT) {
            bubble.speedX = Math.abs(bubble.speedX) * SPEED_RESET
            bubble.posX = COLLISION_LIMIT_X_LEFT
        } else if (bubble.posX > COLLISION_LIMIT_X_RIGHT - bubble.width) {
            bubble.speedX = -Math.abs(bubble.speedX) * SPEED_RESET
            bubble.posX = COLLISION_LIMIT_X_RIGHT - bubble.width
        }

        if (bubble.posY < COLLISION_LIMIT_Y_TOP) {
            bubble.speedY = Math.abs(bubble.speedY) * SPEED_RESET
            bubble.posY = COLLISION_LIMIT_Y_TOP
        } else if (bubble.posY > COLLISION_LIMIT_Y_BOTTOM - bubble.height) {
            bubble.speedY = -Math.abs(bubble.speedY) * SPEED_RESET
            bubble.posY = COLLISION_LIMIT_Y_BOTTOM - bubble.height
        }
    }
}

function intersectionCircles(posXOne: number, posYOne: number, radiusOne: number, posXTwo: number, posYTwo: number, radiusTwo: number) {
    let distanceBetweenCircles = (posXOne - posXTwo) * (posXOne - posXTwo) + (posYOne - posYTwo) * (posYOne - posYTwo)
    return distanceBetweenCircles <= ((radiusOne + radiusTwo) * (radiusOne + radiusTwo))
}

function GetRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

function GetRandomNumberFloat(min: number, max: number) {
    return Math.random() * (max - min) + min
}
