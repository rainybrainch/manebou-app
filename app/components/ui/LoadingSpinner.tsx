import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullscreen?: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = '読み込み中...',
  fullscreen = false,
}) => {
  const sizeStyles = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeStyles[size]} border-b-blue-600 border-gray-300 rounded-full animate-spin`} />
      {text && <p className="text-gray-600 mt-4">{text}</p>}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>
}
