import type { Order } from '../models/order'
import { OrderSide, OrderStatus } from '../models/order'

const randomFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function generateMockOrders(count: number): Order[] {
  const orders: Order[] = []
  const instruments = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3']
  const sides = [OrderSide.BUY, OrderSide.SELL]
  const statuses = [
    OrderStatus.OPEN,
    OrderStatus.PARTIAL,
    OrderStatus.EXECUTED,
    OrderStatus.CANCELLED
  ]

  for (let i = 0; i < count; i++) {
    const quantity = Math.floor(Math.random() * 100) + 1
    const status = randomFromArray(statuses)

    const quantityRemaining =
      status === OrderStatus.EXECUTED || status === OrderStatus.CANCELLED
        ? 0
        : Math.floor(Math.random() * quantity)

    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 100000000))

    orders.push({
      id: `${i + 1}`,
      instrument: randomFromArray(instruments),
      side: randomFromArray(sides),
      price: parseFloat((Math.random() * 100).toFixed(2)),
      quantity,
      quantityRemaining,
      status,
      createdAt,
      history: [
        { status: OrderStatus.OPEN, date: new Date(createdAt.getTime() - 1000000) },
        { status, date: createdAt }
      ]
    })
  }

  return orders
}
