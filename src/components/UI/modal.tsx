import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
}

export default function Modal({children}: ModalProps) {
    return(
        <div className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-black/50">
            {children}
        </div>
    )
}