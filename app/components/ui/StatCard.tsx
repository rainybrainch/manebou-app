import React from 'react'

interface StatCardProps {
  icon?: string
  label: string
  value: string | number
  color?: 'blue' | 'green' | 'purple' | 'orange'
  trend?: 'up' | 'down'
  trendValue?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color = 'blue',
  trend,
  trendValue,
}) => {
  const colorStyles = {
    blue: 'border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'border-l-green-500 bg-gradient-to-br from-green-50 to-green-100',
    purple: 'border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100',
    orange: 'border-l-orange-500 bg-gradient-to-br from-orange-50 to-orange-100',
  }

  return (
    <div className={`${colorStyles[color]} rounded-xl shadow-md p-6 border-l-4`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && trendValue && (
            <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '📈' : '📉'} {trendValue}
            </p>
          )}
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </div>
  )
}
