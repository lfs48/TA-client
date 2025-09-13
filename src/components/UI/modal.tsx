import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
    className?: string;
}

export default function Modal({children, className}: ModalProps) {
    return(
        <div 
            className={`w-screen h-screen fixed inset-0 flex justify-center items-center bg-black/50 ${className}`}
        >
            {children}
        </div>
    )
}