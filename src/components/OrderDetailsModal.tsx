import React from 'react'
import type { Order } from '../models/order'

interface Props {
  order: Order | null
  onClose: () => void
}

const OrderDetailsModal: React.FC<Props> = ({ order, onClose }) => {
  if (!order) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes da Ordem</h2>

        <div className="space-y-2">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Instrumento:</strong> {order.instrument}</p>
          <p><strong>Lado:</strong> {order.side}</p>
          <p><strong>Preço:</strong> R$ {order.price.toFixed(2)}</p>
          <p><strong>Quantidade:</strong> {order.quantity}</p>
          <p><strong>Quantidade Restante:</strong> {order.quantityRemaining}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Data/Hora:</strong> {order.createdAt.toLocaleString()}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Histórico de Status</h3>
          <ul className="list-disc list-inside">
            {order.history?.map((entry, index) => (
              <li key={index}>
                <span>{entry.status}</span> - <span>{entry.date.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsModal
