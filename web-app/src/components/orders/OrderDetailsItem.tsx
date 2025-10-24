import type { ReactNode } from 'react'

interface OrderDetailsItemProps {
  title: string;
  input: string|number|ReactNode;
}

const OrderDetailsItem = ({ title, input }: OrderDetailsItemProps) => {
  return (
    <p className="mb-2">
      <span className="font-semibold">{title}</span>
      <span className="ml-2">{input}</span>
    </p>
  )
}

export default OrderDetailsItem
