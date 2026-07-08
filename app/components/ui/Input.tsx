import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3 text-gray-500">{icon}</div>}
          <input
            ref={ref}
            className={`input ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-600 mt-1">❌ {error}</p>}
        {helpText && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
