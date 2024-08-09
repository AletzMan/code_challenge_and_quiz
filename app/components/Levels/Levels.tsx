
import { HammerIcon, StudentIcon, ToolsIcon, TrophyIcon } from "../Icons"
import styles from "./styles.module.scss"

interface Props {
    difficulty: "easy" | "medium" | "hard" | "expert"
}

export function Levels({ difficulty }: Props) {
    return (
        <span
            className={`${styles.difficulty} 
                            ${difficulty === "easy" && styles.difficulty_easy} 
                                ${difficulty === "medium" && styles.difficulty_medium} 
                                ${difficulty === "hard" && styles.difficulty_hard} 
                                ${difficulty === "expert" && styles.difficulty_expert}`}>
            {DifficultyLevelIcon[difficulty]}
            {DifficultyLevel[difficulty]}
        </span>
    )
}

const DifficultyLevel = {
    easy: "Trainee",
    medium: "Junior",
    hard: "Semi-Senior",
    expert: "Senior"
}

const DifficultyLevelIcon = {
    easy: <StudentIcon className={styles.difficulty_icon} />,
    medium: <HammerIcon className={styles.difficulty_icon} />,
    hard: <ToolsIcon className={styles.difficulty_icon} />,
    expert: <TrophyIcon className={styles.difficulty_icon} />
}

