import React, { useState } from 'react'
import type { Order } from '../models/order'
import { OrderSide, OrderStatus } from '../models/order'

interface Props {
  onCreate: (newOrder: Order) => void
}

const CreateOrderForm: React.FC<Props> = ({ onCreate }) => {
  const [instrument, setInstrument] = useState('')
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY)
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const priceNumber = parseFloat(price)
    const quantityNumber = parseInt(quantity)

    if (!instrument || isNaN(priceNumber) || isNaN(quantityNumber) || quantityNumber <= 0 || priceNumber <= 0) {
      alert('Preencha todos os campos com valores válidos.')
      return
    }

    const newOrder: Order = {
      id: `${Math.random().toString(36).substr(2, 9)}`,
      instrument,
      side,
      price: priceNumber,
      quantity: quantityNumber,
      quantityRemaining: quantityNumber,
      status: OrderStatus.OPEN,
      createdAt: new Date(),
      history: [
        { status: OrderStatus.OPEN, date: new Date() }
      ]
    }

    onCreate(newOrder)
    setInstrument('')
    setSide(OrderSide.BUY)
    setPrice('')
    setQuantity('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">

      <div>
        <label className="block mb-1">Instrumento</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={instrument}
          onChange={e => setInstrument(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Lado</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={side}
          onChange={e => setSide(e.target.value as OrderSide)}
        >
          <option value="Compra">Compra</option>
          <option value="Venda">Venda</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Preço</label>
        <input
          type="number"
          step="0.01"
          className="w-full border px-3 py-2 rounded"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Quantidade</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Ordem
      </button>
    </form>
  )
}

export default CreateOrderForm
