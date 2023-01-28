import React from 'react'
import { Outlet } from 'react-router-dom'

function Notifications() {
  return (
    <div>
      notifications
      <Outlet></Outlet>
    </div>
  )
}

export default Notifications
