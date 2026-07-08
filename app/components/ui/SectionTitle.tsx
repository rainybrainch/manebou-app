import React from 'react'

interface SectionTitleProps {
  icon?: string
  title: string
  subtitle?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="heading-2 flex items-center gap-3">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
    </div>
  )
}
