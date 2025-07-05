import { RiEyeCloseLine, RiEyeFill, RiEyeLine } from "@remixicon/react";
import { ChangeEvent, useState } from "react";

interface PasswordInputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    show?: boolean;
    onToggleShow?: () => void;
}

export default function PasswordInput({
    value,
    onChange,
    show = false,
    onToggleShow,
}: PasswordInputProps) {

    const [showState, setShow] = !!onToggleShow ? [show, onToggleShow] : useState(false);

    return (
        <div className="relative border-b border-agency-red">
            <input
                type={showState ? 'text' : 'password'}
                className="w-full px-0.5 pb-0.5 focus:outline-none pr-8"
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-anomaly-blue focus:outline-none cursor-pointer"
                tabIndex={-1}
                onClick={() => setShow(!showState)}
                aria-label={showState ? "Hide password" : "Show password"}
            >
                {show ? <RiEyeCloseLine size={18} /> : <RiEyeLine size={18} />}
            </button>
        </div>
    );
}