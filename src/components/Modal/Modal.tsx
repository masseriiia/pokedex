import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Portal} from "../Portal/Portal";
import CloseButton from '../../assets/images/closeIcon.svg'
import styles from './Modal.module.css'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Modal = ({className, children, isOpen, onClose}: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef(null)

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, 300)
        }
    }, [onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen, onKeyDown]);

    return (
        <Portal>
            <div className={`${styles.modal} ${isOpen ? styles.opened : ''} ${isClosing ? styles.isClosing : ''}`}>
                <div className={styles["overlay"]} onClick={closeHandler}>
                    <div className={styles["content"]} onClick={onContentClick}>
                        <button onClick={() => onClose()} className={styles["close-button"]}>
                            <img src={CloseButton} alt="Close Button"/>
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
