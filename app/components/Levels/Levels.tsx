
import { HammerIcon, StudentIcon, ToolsIcon, TrophyIcon } from "../Icons"
import styles from "./styles.module.scss"

interface Props {
    difficulty: "trainee" | "junior" | "semi-senior" | "senior"
}

export function Levels({ difficulty }: Props) {
    return (
        <span
            className={`${styles.difficulty} 
                            ${difficulty === "trainee" && styles.difficulty_easy} 
                                ${difficulty === "junior" && styles.difficulty_medium} 
                                ${difficulty === "semi-senior" && styles.difficulty_hard} 
                                ${difficulty === "senior" && styles.difficulty_expert}`}>
            {DifficultyLevelIcon[difficulty]}
            {DifficultyLevel[difficulty]}
        </span>
    )
}

const DifficultyLevel = {
    trainee: "Trainee",
    junior: "Junior",
    "semi-senior": "Semi-Senior",
    senior: "Senior"
}

const DifficultyLevelIcon = {
    trainee: <StudentIcon className={styles.difficulty_icon} />,
    junior: <HammerIcon className={styles.difficulty_icon} />,
    "semi-senior": <ToolsIcon className={styles.difficulty_icon} />,
    senior: <TrophyIcon className={styles.difficulty_icon} />
}

