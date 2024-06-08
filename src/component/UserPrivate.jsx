import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivate = () => {
const userId = useSelector(state=>state.userId)

  return (
    <div>
      {userId?<Outlet/>:<Navigate to="/userlogin"/>}

      
    </div>
  )
}

export default UserPrivate
