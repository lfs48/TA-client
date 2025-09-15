import { ButtonColors, ButtonStyles } from "@/enum";
import BallTriangle from "@/components/UI/spinning-triangles";

interface ButtonProps {
    color: ButtonColors;
    style: ButtonStyles;
    className?: string;
    buttonClasses?: string;
    disabled?:boolean;
    loading?:boolean;
    children: React.ReactNode;
    onClick?: () => void;
    [prop:string]: any;
}

export default function Button({
    color,
    style,
    className='',
    buttonClasses='',
    disabled=false,
    loading=false,
    children,
    onClick,
    ...props
} : ButtonProps) {
    return(
        <div className={`relative inline-block ${className}`}>
            <button
                className={`
                    font-bold rounded cursor-pointer
                    disabled:cursor-default
                    ${buttonColorClasses(color, style)}
                    ${buttonClasses}
                `}
                onClick={onClick}
                disabled={disabled || loading}
                {...props}
            >
                <span className={loading ? "invisible" : ""}>
                    {children}
                </span>
                {loading && (
                    <span className="absolute inset-0 flex items-center justify-center text-inherit">
                        <BallTriangle stroke='currentColor' height="1em" width="2em"/>
                    </span>
                )}
            </button>
            {(disabled || loading) && (
                <span
                    className="absolute inset-0 bg-gray-300 opacity-60 rounded pointer-events-none"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

function buttonColorClasses(color:ButtonColors, style:ButtonStyles) {
    switch(style) {
        case(ButtonStyles.FILL):
            switch(color) {
                case(ButtonColors.BLUE):
                    return 'border-2 border-anomaly-blue bg-anomaly-blue text-white';
                case(ButtonColors.RED):
                    return 'border-2 border-agency-red bg-agency-red text-white';
                case(ButtonColors.PURPLE):
                    return 'border-2 border-deep-purple bg-deep-purple text-white';
                case(ButtonColors.GREEN):
                    return 'border-2 border-green-600 bg-green-600 text-white';
            }
        case(ButtonStyles.OUTLINE):
            switch(color) {
                case(ButtonColors.BLUE):
                    return 'border-2 border-anomaly-blue text-anomaly-blue';
                case(ButtonColors.RED):
                    return 'border-2 border-agency-red text-agency-red';
                case(ButtonColors.PURPLE):
                    return 'border-2 border-deep-purple text-deep-purple';
                case(ButtonColors.GREEN):
                    return 'border-2 border-green-600 text-green-600';
            }
    }
}