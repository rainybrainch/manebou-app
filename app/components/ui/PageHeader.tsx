import React from 'react'

interface PageHeaderProps {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, description, action }) => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="heading-1 flex items-center gap-3">
            {icon && <span className="text-4xl">{icon}</span>}
            {title}
          </h1>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
