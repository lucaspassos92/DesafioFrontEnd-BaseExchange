import React from 'react'
import type { Order } from '../models/order'

interface ConfirmCancelModalProps {
  isOpen: boolean
  order: Order | null
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmCancelModal: React.FC<ConfirmCancelModalProps> = ({
  isOpen,
  order,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Confirmar Cancelamento</h2>
        <p className="mb-4">
          Tem certeza que deseja cancelar a ordem <strong>#{order.id}</strong> ({order.instrument})?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Cancelar Ordem
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCancelModal
