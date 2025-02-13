import {ChangeEvent} from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from './Input.module.css'

interface InputProps {
    value: string
    onClear?: () => void
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({value, onClear, onSearch}: InputProps) => {
    return (
        <div className={styles["input"]}>
            <input value={value} onChange={onSearch} type="text"
                   placeholder='Encuentra tu pokémon...'/>
            { value && <IoCloseCircleOutline className={styles["icon"]} onClick={onClear} />}
        </div>
    )
}
