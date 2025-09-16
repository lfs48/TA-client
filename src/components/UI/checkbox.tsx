import { forwardRef } from 'react';
import { RiCheckLine } from '@remixicon/react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: 'red' | 'yellow' | 'blue' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  name?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked = false,
  onChange,
  disabled = false,
  color = 'blue',
  size = 'md',
  className = '',
  id,
  name,
  ...props
}, ref) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return {
          border: 'border-agency-red',
          checked: 'bg-agency-red border-agency-red',
          hover: 'hover:border-agency-red-600',
        };
      case 'yellow':
        return {
          border: 'border-reality-yellow',
          checked: 'bg-reality-yellow border-reality-yellow',
          hover: 'hover:border-reality-yellow-600',
        };
      case 'blue':
        return {
          border: 'border-anomaly-blue-600',
          checked: 'bg-anomaly-blue-600 border-anomaly-blue-600',
          hover: 'hover:border-anomaly-blue-700',
        };
      case 'gray':
      default:
        return {
          border: 'border-gray-400',
          checked: 'bg-gray-600 border-gray-600',
          hover: 'hover:border-gray-500',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const colorClasses = getColorClasses();
  const sizeClasses = getSizeClasses();

  return (
    <div className="relative inline-block">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        className="sr-only"
        {...props}
      />
      <div
        className={`
          ${sizeClasses}
          border-2 rounded-sm cursor-pointer transition-colors duration-200 relative
          flex items-center justify-center
          ${checked 
            ? colorClasses.checked 
            : `bg-white ${colorClasses.border} ${!disabled ? colorClasses.hover : ''}`
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={() => {
          if (!disabled) {
            onChange?.(!checked);
          }
        }}
      >
        {checked && (
          <RiCheckLine 
            className="text-white" 
            size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14}
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;