import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-100',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100',
    elevated: 'bg-white shadow-lg',
  }

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`rounded-xl shadow-md ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
