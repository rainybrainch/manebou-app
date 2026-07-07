import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, ...props }, ref) => {
    const baseStyles = 'rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`

    return (
      <button ref={ref} className={combinedClassName} disabled={loading || props.disabled} {...props}>
        {loading ? '読み込み中...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
