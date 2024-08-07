import styles from "./styles.module.scss"

interface Props {
    title: string
}

export function Loading({ title }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.loading}>
                <span className={styles.loading_logo}></span>
                <span className={styles.loading_logo}></span>
                <span className={styles.loading_logo}></span>
            </div>
            <h2 className={styles.title}>{title}</h2>
        </div>
    )
}