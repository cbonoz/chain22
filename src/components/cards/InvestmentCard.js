import React from 'react'
import { Card } from 'antd';


export default function InvestmentCard({title, children, width}) {
  return (
    <Card title={title} style={{ width }}>
      {children}
  </Card>

  )
}
