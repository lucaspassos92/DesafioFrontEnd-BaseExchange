import { useEffect, useState } from 'react'
import CreateOrderForm from './components/CreateOrderForm'
import OrderTable from './components/OrderTable'
import { OrderStatus, type Order } from './models/order'
import { generateMockOrders } from './mocks/generateMockORders'
import ConfirmCancelModal from './components/ConfirmCancelModal'
import { matchOrders } from './utils/orderUtils'
import logoGif from '../public/logo-base.gif'
import { Plus } from 'lucide-react'

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrderToCancel, setSelectedOrderToCancel] = useState<Order | null>(null)

  const [filters, setFilters] = useState({
    id: '',
    instrument: '',
    status: '',
    side: '',
  })

  useEffect(() => {
    const mockOrders = generateMockOrders(12)
    setOrders(mockOrders)
  }, [])

  const filteredOrders = orders.filter(order => {
    return (
      order.id.toLowerCase().includes(filters.id.toLowerCase()) &&
      order.instrument.toLowerCase().includes(filters.instrument.toLowerCase()) &&
      (filters.status ? order.status === filters.status : true) &&
      (filters.side ? order.side === filters.side : true)
    )
  })

  const handleCreateOrder = (newOrder: Order) => {
    const updatedOrders = matchOrders({ ...newOrder }, [...orders])
    setOrders([newOrder, ...updatedOrders])
    setIsModalOpen(false)
  }

  const handleCancelOrderClick = (id: string) => {
    const order = orders.find(o => o.id === id)
    if (!order) return
    setSelectedOrderToCancel(order)
  }
  const handleConfirmCancel = () => {
    if (!selectedOrderToCancel) return

    setOrders(prev =>
      prev.map(order =>
        order.id === selectedOrderToCancel.id
          ? {
            ...order,
            status: OrderStatus.CANCELLED,
            quantityRemaining: 0,
            history: [
              ...(order.history ?? []),
              { status: OrderStatus.CANCELLED, date: new Date() }
            ]
          }
          : order
      )
    )

    setSelectedOrderToCancel(null)
  }
  return (

    <div className="min-h-screen bg-white p-6" style={{ backgroundColor: '#fff' }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#2c290a' }} >Desafio Front End</h1>
          <h1 className="text-2xl font-bold" style={{ color: '#ba94f2' }} >Gerenciamento de Ordens</h1>
        </div>
        <img
          src={logoGif}
          alt="Logo"
          className="w-[150px] h-auto object-contain"
        />
      </div>
      {/* Botão de adicionar nova ordem */}

      <div className="mb-4 flex flex-wrap gap-4 items-end" style={{ color: '#2c290a' }}>
        <div>
          <label className="block text-sm font-medium">ID</label>
          <input
            type="text"
            value={filters.id}
            onChange={e => setFilters({ ...filters, id: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Instrumento</label>
          <input
            type="text"
            value={filters.instrument}
            onChange={e => setFilters({ ...filters, instrument: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
            className="border rounded px-2 py-1"
          >
            <option value="">Todos</option>
            <option value="Aberta">Aberta</option>
            <option value="Parcial">Parcial</option>
            <option value="Executada">Executada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Lado</label>
          <select
            value={filters.side}
            onChange={e => setFilters({ ...filters, side: e.target.value })}
            className="border rounded px-2 py-1"
          >
            <option value="">Todos</option>
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
          </select>
        </div>
        <div className="ml-auto justify-end mb-4">
          <button
          title='Adicionar nova ordem'
            onClick={() => setIsModalOpen(true)}
            className="text-white px-4 py-2 rounded transition flex"
            style={{ backgroundColor: '#2c290a', color:'#fff' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ccf728', e.currentTarget.style.color = '#2c290a')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c290a', e.currentTarget.style.color = '#fff')}
          >
            Nova Ordem <Plus className='ml-3'/>
          </button>
        </div>
      </div>
      <OrderTable orders={filteredOrders} onCancel={handleCancelOrderClick} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" rounded-lg shadow-lg w-full max-w-md p-6 relative" style={{ backgroundColor: '#2c290a' }}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#fff' }}>Criar Nova Ordem</h2>
            <CreateOrderForm onCreate={handleCreateOrder} />
          </div>
        </div>
      )}
      <ConfirmCancelModal
        isOpen={!!selectedOrderToCancel}
        order={selectedOrderToCancel}
        onConfirm={handleConfirmCancel}
        onCancel={() => setSelectedOrderToCancel(null)}
      />
    </div>
  )
}

export default App
