import React from 'react'

const Card = ({children, className, disaplePadding = false}) => {
  return (
    <div className={`bg-white ${disaplePadding ? '' : 'p-5'} rounded-xl border border-[#ddd] ${className}`}>{children}</div>
  )
}

export default Card