import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <input
          ref={ref}
          className={`px-3 py-2 border rounded text-sm ${error ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
          {...props}
        />
        {error && <span className="text-sm text-red-600">{error}</span>}
        {helpText && <span className="text-sm text-gray-500">{helpText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
