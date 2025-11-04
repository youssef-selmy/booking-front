import React from 'react'

const Card = ({children, className}) => {
  return (
    <div className={`bg-white p-5 rounded-xl border border-[#ddd] ${className}`}>{children}</div>
  )
}

export default Card