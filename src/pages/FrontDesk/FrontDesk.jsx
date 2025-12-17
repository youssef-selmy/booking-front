import React from 'react'
import { Outlet } from 'react-router-dom'
import FrontDeskNav from './FrontDeskNav'

const FrontDesk = () => {
  return (
    <main>
      <FrontDeskNav />
      <Outlet />
    </main>
  )
}

export default FrontDesk