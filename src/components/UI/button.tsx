import { ButtonColors, ButtonStyles } from "@/enum";

interface ButtonProps {
    color: ButtonColors;
    style: ButtonStyles;
    className?: string;
    [prop:string]: any;
}

export default function Button({
    color,
    style,
    className='',
    ...props
} : ButtonProps) {
    return(
        <button 
            className={`
                font-bold rounded cursor-pointer disabled:cursor-default
                ${buttonClasses(color, style)} 
                ${className}`}
            {...props}
        />
    )
}

function buttonClasses(color:ButtonColors, style:ButtonStyles) {
    switch(style) {
        case(ButtonStyles.FILL):
            switch(color) {
                case(ButtonColors.RED):
                    return 'border-2 border-agency-red bg-agency-red text-white';
                case(ButtonColors.PURPLE):
                    return 'border-2 border-deep-purple bg-deep-purple text-white';
                case(ButtonColors.GREEN):
                    return 'border-2 border-green-600 bg-green-600 text-white';
            }
        case(ButtonStyles.OUTLINE):
            switch(color) {
                case(ButtonColors.RED):
                    return 'border-2 border-agency-red text-agency-red';
                case(ButtonColors.PURPLE):
                    return 'border-2 border-deep-purple text-deep-purple';
                case(ButtonColors.GREEN):
                    return 'border-2 border-green-600 text-green-600';
            }
    }
}