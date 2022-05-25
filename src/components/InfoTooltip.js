import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'

export default function InfoTooltip({text}) {
  return (
    <>
    <Tooltip placement="top" title={text}>
        <InfoCircleOutlined />
    </Tooltip>
    </>
  )
}
