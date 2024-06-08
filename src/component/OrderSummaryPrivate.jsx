import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OrderSummaryPrivate = () => {
    const userId = useSelector(state=>state.userId)
  return (
    <div>
      {userId?<Outlet/>:<Navigate to="/userlogin"/>}
    </div>
  )
}

export default OrderSummaryPrivate
