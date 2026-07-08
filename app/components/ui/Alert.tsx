import React from 'react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ children, variant = 'info', title, onClose }) => {
  const variantStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 ${styles.text}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <span className="text-lg mr-3">{styles.icon}</span>
          <div>
            {title && <p className="font-semibold">{title}</p>}
            <p className="text-sm">{children}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xl cursor-pointer hover:opacity-70"
            aria-label="閉じる"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
