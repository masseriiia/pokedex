import {createPortal} from "react-dom";
import {ReactNode} from "react";

interface PortalProps {
    children: ReactNode
    element?: HTMLElement
}

export const Portal = ({children, element = document.body}: PortalProps) => createPortal(children, element)
