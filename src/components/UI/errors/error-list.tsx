import { RiAlertLine, RiEyeFill } from "@remixicon/react";

interface ErrorListProps {
    errors: string[];
}

export default function ErrorList({ errors }: ErrorListProps) {
    if (errors.length === 0) {
        return null;
    }

    return (
        <div className="bg-agency-red-200 border border-agency-red-400 text-agency-red-800 px-4 py-3 rounded relative mb-4">
            <ul className="pl-0">
                {errors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <RiAlertLine className="mt-1 text-agency-red-800" size={18} />
                        <span>{error}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}