import { useState, useRef, useEffect } from 'react';
import Triangle from '@/components/svg/triangle';

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function NumberInput({
  value = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  placeholder,
  className = ''
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    updateValue(newValue);
  };

  const updateValue = (newValue: number) => {
    // Apply min/max constraints
    let constrainedValue = newValue;
    if (min !== undefined && constrainedValue < min) {
      constrainedValue = min;
    }
    if (max !== undefined && constrainedValue > max) {
      constrainedValue = max;
    }

    setInternalValue(constrainedValue);
    onChange?.(constrainedValue);
  };

  const handleIncrement = () => {
    if (disabled) return;
    updateValue(internalValue + step);
  };

  const handleDecrement = () => {
    if (disabled) return;
    updateValue(internalValue - step);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <input
        ref={inputRef}
        type="number"
        value={internalValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`
          w-full pr-8 px-2 py-1 border-2 rounded
          focus:outline-none
          disabled:bg-gray-100 disabled:cursor-not-allowed
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          [-moz-appearance:textfield]
          ${disabled ? 'text-gray-500' : 'text-gray-900'}
        `}
      />
      
      {/* Custom Triangle Arrows */}
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
        {/* Up Arrow */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          className={`
            p-0.5 hover:bg-gray-100 rounded transition-colors
            disabled:cursor-not-allowed disabled:opacity-50
            focus:outline-none focus:bg-gray-100
          `}
        >
          <Triangle
            width={12}
            filled={true}
            rotate={false}
          />
        </button>
        
        {/* Down Arrow */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled}
          className={`
            p-0.5 hover:bg-gray-100 rounded transition-colors
            disabled:cursor-not-allowed disabled:opacity-50
            focus:outline-none focus:bg-gray-100
          `}
        >
          <Triangle
            width={12}
            filled={true}
            rotate={true}
          />
        </button>
      </div>
    </div>
  );
}
