import React, { useState } from 'react'
import type { Order } from '../models/order'
import OrderDetailsModal from './OrderDetailsModal'
import { Trash } from 'lucide-react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface OrderTableProps {
  orders: Order[]
  pageSize?: number
  onCancel: (id: string) => void
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, pageSize = 5, onCancel }) => {
  const [sortColumn, setSortColumn] = useState<keyof Order>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime()
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue)
    }

    if (typeof aValue === 'number') {
      return sortDirection === 'asc'
        ? aValue - (bValue as number)
        : (bValue as number) - aValue
    }

    return 0
  })

  const totalPages = Math.ceil(sortedOrders.length / pageSize)
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSort = (column: keyof Order) => {
    if (column === sortColumn) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100" style={{ color: '#2c290a' }}>
            {['ID ', 'Instrumento', 'Lado', 'Preço', 'Quantidade', 'Qtd. Restante', 'Status', 'Data e Hora', 'Ação'].map(
              (col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col as keyof Order)}
                  className="cursor-pointer px-4 py-2 border text-left"
                >
                  {col} {sortColumn === col && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.instrument}</td>
              <td className="border px-4 py-2">{order.side}</td>
              <td className="border px-4 py-2">R$ {order.price.toFixed(2)}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">{order.quantityRemaining}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.createdAt.toLocaleString()}</td>
              <td className="px-4 py-2 text-center">
                {order.status === 'Aberta' || order.status === 'Parcial' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onCancel(order.id)
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Cancelar ordem"
                  >
                    <Trash size={18} />
                  </button>
                ) : (
                  <span className="text-gray-300 text-sm">---</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between mt-4">
        <button
          title='Página anterior'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          className="px-3 py-1  rounded disabled:opacity-50 flex"
          style={{ backgroundColor: '#2c290a', color: '#fff' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ccf728', e.currentTarget.style.color = '#2c290a')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c290a', e.currentTarget.style.color = '#fff')}
        >
          <ArrowLeft className='mr-2' />
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          title='Próxima página'
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-3 py-1 rounded disabled:opacity-50 flex"
          style={{ backgroundColor: '#2c290a', color: '#fff' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ccf728', e.currentTarget.style.color = '#2c290a')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c290a', e.currentTarget.style.color = '#fff')}
        >
          Próxima
          <ArrowRight className='ml-2' />
        </button>
      </div>

      {/* Modal de detalhes */}
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  )
}

export default OrderTable
