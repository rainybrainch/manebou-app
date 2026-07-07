import React from 'react'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = '確認',
  cancelText = 'キャンセル',
  isDanger = false,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <div className="p-6">{children}</div>
        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant={isDanger ? 'danger' : 'primary'} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const ConfirmDialog: React.FC<{
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
}> = ({ isOpen, onConfirm, onCancel, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      onConfirm={onConfirm}
      confirmText="削除"
      cancelText="キャンセル"
      isDanger={true}
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  )
}
