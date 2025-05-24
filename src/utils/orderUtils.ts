import { OrderSide, OrderStatus, type Order } from "../models/order"

export function matchOrders(newOrder: Order, existingOrders: Order[]): Order[] {
  const updatedOrders = [...existingOrders]
  const matchingSide = newOrder.side === OrderSide.BUY ? OrderSide.SELL : OrderSide.BUY

  for (let i = 0; i < updatedOrders.length && newOrder.quantityRemaining > 0; i++) {
    const order = updatedOrders[i]

    const isMatch =
      order.instrument === newOrder.instrument &&
      order.side === matchingSide &&
      order.status !== OrderStatus.EXECUTED &&
      order.status !== OrderStatus.CANCELLED &&
      ((newOrder.side === OrderSide.BUY && newOrder.price >= order.price) ||
        (newOrder.side === OrderSide.SELL && newOrder.price <= order.price))

    if (isMatch) {
      const matchQty = Math.min(newOrder.quantityRemaining, order.quantityRemaining)

      newOrder.quantityRemaining -= matchQty
      order.quantityRemaining -= matchQty

      // Atualiza status da contraparte
      if (order.quantityRemaining === 0) {
        order.status = OrderStatus.EXECUTED
      } else {
        order.status = OrderStatus.PARTIAL
      }

      order.history = [
        ...(order.history || []),
        { date: new Date(), status: order.status },
      ]

      // Atualiza status da nova ordem
      if (newOrder.quantityRemaining === 0) {
        newOrder.status = OrderStatus.EXECUTED
      } else {
        newOrder.status = OrderStatus.PARTIAL
      }

      newOrder.history = [
        ...(newOrder.history || []),
        { date: new Date(), status: newOrder.status },
      ]
    }
  }

  return updatedOrders
}
