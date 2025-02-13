import {ReactNode} from "react";
import styles from "./Button.module.css"

interface ButtonProps {
    children: ReactNode
    onClickButton?: () => void
}

export const Button = ({children, onClickButton}: ButtonProps) => {
    return (
        <button onClick={onClickButton} className={styles["button"]}>
            {children}
        </button>
    )
}
