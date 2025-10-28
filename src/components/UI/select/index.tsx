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
    searchable?: boolean;
    searchPlaceholder?: string;
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
    searchable = false,
    searchPlaceholder = "Search...",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);
    
    // Filter options based on search term
    const filteredOptions = searchable 
        ? options.filter(option => 
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

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
            if (searchable && !isOpen) {
                // Focus search input when opening
                setTimeout(() => {
                    searchInputRef.current?.focus();
                }, 0);
            }
        }
    };

    const handleOptionClick = (option: Option) => {
        setSelectedValue(option.value);
        setIsOpen(false);
        setSearchTerm(''); // Clear search when selecting
        onChange?.(option.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
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

    // Clear search when closing dropdown
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

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
                } else if (!searchable) {
                    // Navigate to next option (only if not searchable)
                    const currentIndex = filteredOptions.findIndex(opt => opt.value === selectedValue);
                    const nextIndex = currentIndex < filteredOptions.length - 1 ? currentIndex + 1 : 0;
                    handleOptionClick(filteredOptions[nextIndex]);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (isOpen && !searchable) {
                    const currentIndex = filteredOptions.findIndex(opt => opt.value === selectedValue);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredOptions.length - 1;
                    handleOptionClick(filteredOptions[prevIndex]);
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
                    flex items-center justify-between w-full px-2 py-1
                    bg-white ${colorClasses.border} rounded
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
                    absolute z-50 w-full mt-1 bg-white ${colorClasses.border} rounded shadow-lg max-h-60 overflow-hidden
                    ${menuClasses}
                `}>
                    {/* Search Input */}
                    {searchable && (
                        <div className="p-2 border-b border-gray-200">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder={searchPlaceholder}
                                className={`
                                    w-full px-2 py-1 text-sm border rounded
                                    focus:outline-none focus:ring-1 ${colorClasses.border.replace('border-2', 'focus:ring-current')}
                                    ${colorClasses.text}
                                `}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                    
                    {/* Options List */}
                    <div className="max-h-52 overflow-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="px-2 py-2 text-gray-500 text-sm">
                                {searchable && searchTerm ? 'No matches found' : 'No options available'}
                            </div>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`
                                        px-2 py-2 cursor-pointer transition-colors text-sm
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
                </div>
            )}
        </div>
    );
}