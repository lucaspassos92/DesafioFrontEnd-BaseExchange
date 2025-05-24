import { describe, it, expect } from 'vitest'
import { matchOrders } from '../orderUtils'
import { Order, OrderStatus } from '../../models/order'

const baseOrder = {
  instrument: 'PETR4',
  price: 100,
  history: [],
} as Partial<Order>

const createOrder = (props: Partial<Order>): Order => ({
  id: props.id || Math.random().toString(),
  instrument: props.instrument || 'PETR4',
  price: props.price ?? 100,
  quantity: props.quantity ?? 10,
  quantityRemaining: props.quantityRemaining ?? props.quantity ?? 10,
  side: props.side || 'Compra',
  status: props.status || OrderStatus.OPEN,
  history: props.history || [],
})

describe('matchOrders', () => {
  it('deve executar completamente quando as quantidades são iguais e o preço é compatível', () => {
    const buyOrder = createOrder({ side: 'Compra', price: 100, quantity: 10 })
    const sellOrder = createOrder({ side: 'Venda', price: 100, quantity: 10 })

    const updated = matchOrders(buyOrder, [sellOrder])

    expect(buyOrder.status).toBe(OrderStatus.EXECUTED)
    expect(buyOrder.quantityRemaining).toBe(0)

    expect(updated[0].status).toBe(OrderStatus.EXECUTED)
    expect(updated[0].quantityRemaining).toBe(0)
  })

  it('deve executar parcialmente quando nova ordem tem quantidade maior que contraparte', () => {
    const buyOrder = createOrder({ side: 'Compra', price: 100, quantity: 15 })
    const sellOrder = createOrder({ side: 'Venda', price: 100, quantity: 10 })

    const updated = matchOrders(buyOrder, [sellOrder])

    expect(buyOrder.status).toBe(OrderStatus.PARTIAL)
    expect(buyOrder.quantityRemaining).toBe(5)

    expect(updated[0].status).toBe(OrderStatus.EXECUTED)
    expect(updated[0].quantityRemaining).toBe(0)
  })

  it('não deve executar se o preço não for compatível', () => {
    const buyOrder = createOrder({ side: 'Compra', price: 90, quantity: 10 })
    const sellOrder = createOrder({ side: 'Venda', price: 100, quantity: 10 })

    const updated = matchOrders(buyOrder, [sellOrder])

    expect(buyOrder.status).toBe(OrderStatus.OPEN)
    expect(buyOrder.quantityRemaining).toBe(10)

    expect(updated[0].status).toBe(OrderStatus.OPEN)
    expect(updated[0].quantityRemaining).toBe(10)
  })
})
