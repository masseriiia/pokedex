import {ReactNode} from "react";
import styles from "./Button.module.css"

interface ButtonProps {
    children: ReactNode
    color?: string
    onClickButton?: () => void
}

export const Button = ({children, color = "primary", onClickButton}: ButtonProps) => {
    return (
        <button onClick={onClickButton} className={`${styles.button} ${styles[color]}`}>
            {children}
        </button>
    )
}
