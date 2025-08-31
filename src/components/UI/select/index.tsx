import { useState, useRef, useEffect, Dispatch } from 'react';

interface Option {
    value: string | number;
    label: string;
}

type ColorOption = 'red' | 'yellow' | 'blue';

interface SelectProps {
    options: Option[];
    value?: string | number;
    placeholder?: string;
    onChange?: Dispatch<React.SetStateAction<any>>;
    disabled?: boolean;
    className?: string;
    buttonClasses?: string;
    menuClasses?: string;
    arrow?: boolean;
    color?: ColorOption;
    label?: string;
}

export default function Select({
    options,
    value,
    placeholder = "...",
    onChange,
    disabled = false,
    className = "",
    buttonClasses = "",
    menuClasses = "",
    arrow = true,
    color,
    label,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);

    // Color mapping
    const getColorClasses = () => {
        switch (color) {
            case 'red':
                return {
                    border: 'border-2 border-agency-red',
                    text: 'text-agency-red',
                    focus: 'focus:bg-agency-red-50',
                    selected: 'bg-agency-red-100 text-agency-red-900',
                    hover: 'hover:bg-agency-red-50'
                };
            case 'yellow':
                return {
                    border: 'border-2 border-reality-yellow',
                    text: 'text-reality-yellow',
                    focus: 'focus:bg-yellow-50',
                    selected: 'bg-yellow-100 text-yellow-900',
                    hover: 'hover:bg-yellow-50'
                };
            case 'blue':
                return {
                    border: 'border-2 border-anomaly-blue',
                    text: 'text-anomaly-blue',
                    focus: 'focus:bg-anomaly-blue-50',
                    selected: 'bg-anomaly-blue-100 text-anomaly-blue-900',
                    hover: 'hover:bg-anomaly-blue-50'
                };
            default:
                return {
                    border: 'border-2 border-gray-300',
                    text: 'text-gray-900',
                    focus: 'focus:border-gray-300 focus:bg-gray-50',
                    selected: 'bg-blue-100 text-blue-900',
                    hover: 'hover:bg-gray-100'
                };
        }
    };

    const colorClasses = getColorClasses();

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option: Option) => {
        setSelectedValue(option.value);
        setIsOpen(false);
        onChange?.(option.value);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                setIsOpen(!isOpen);
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    // Navigate to next option
                    const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                    const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
                    handleOptionClick(options[nextIndex]);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (isOpen) {
                    const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                    handleOptionClick(options[prevIndex]);
                }
                break;
        }
    };

    return (
        <div 
            ref={selectRef}
            className={`relative inline-block ${className}`}
        >
            {/* Label with cutout effect */}
            {label && (
                <div className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium ${colorClasses.text} z-10`}>
                    {label}
                </div>
            )}
            
            {/* Select Button */}
            <div
                className={`
                    flex items-center justify-between w-full px-3 py-1
                    bg-white ${colorClasses.border} rounded-md shadow-sm 
                    cursor-pointer focus:outline-none ${colorClasses.focus}
                    transition-colors
                    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
                    ${label ? 'pt-2' : ''}
                    ${buttonClasses}
                `}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="button"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className={`block truncate ${selectedOption ? colorClasses.text : 'text-gray-500'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                
                {/* Dropdown Arrow */}
                {arrow && (
                    <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <div className={`size-3 transform rotate-180 ${colorClasses.text}`}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l10 18H2L12 2z"/>
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Dropdown Options */}
            {isOpen && (
                <div className={`
                    absolute z-50 w-full mt-1 bg-white ${colorClasses.border} rounded-md shadow-lg max-h-60 overflow-auto
                    ${menuClasses}
                `}>
                    {options.length === 0 ? (
                        <div className="px-2 text-gray-500">No options available</div>
                    ) : (
                        options.map((option) => (
                            <div
                                key={option.value}
                                className={`
                                    px-3 py-2 cursor-pointer transition-colors
                                    ${selectedValue === option.value 
                                        ? colorClasses.selected
                                        : `${colorClasses.hover} ${colorClasses.text}`
                                    }
                                `}
                                onClick={() => handleOptionClick(option)}
                                role="option"
                                aria-selected={selectedValue === option.value}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}