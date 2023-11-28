import React from 'react'
import { Pagination } from 'antd'

const CustomPagination = ({ defaultCurrent, total, onChange }) => {
  return (
    <Pagination
      defaultCurrent={defaultCurrent}
      total={total}
      onChange={onChange}
    />
  )
}

export default CustomPagination
