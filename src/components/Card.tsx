import React from 'react'

interface CardProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ header, footer, children, className }) => {
  return (
    <div className={`bg-white rounded shadow ${className || ''}`}>
      {header && <div className="px-6 py-4 border-b border-gray-200">{header}</div>}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-gray-200">{footer}</div>}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: React.ReactNode
  icon?: string
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </div>
  )
}
