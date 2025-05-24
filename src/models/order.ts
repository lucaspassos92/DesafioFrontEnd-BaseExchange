export enum OrderSide {
  BUY = 'Compra',
  SELL = 'Venda',
}

export enum OrderStatus {
  OPEN = 'Aberta',
  PARTIAL = 'Parcial',
  EXECUTED = 'Executada',
  CANCELLED = 'Cancelada',
}

export interface Order {
  id: string
  instrument: string
  side: OrderSide
  price: number
  quantity: number
  quantityRemaining: number
  status: OrderStatus
  createdAt: Date
  history?: Array<{ date: Date; status: OrderStatus }>
}
