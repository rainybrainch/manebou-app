import React from 'react'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = '読み込み中...' }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export const EmptyState: React.FC<{ message?: string; icon?: string }> = ({
  message = 'データがありません',
  icon = '📭',
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
