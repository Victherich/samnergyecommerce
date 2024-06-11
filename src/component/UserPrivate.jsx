import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivate = () => {
const userToken = useSelector(state=>state.userToken)

  return (
    <div>
      {userToken?<Outlet/>:<Navigate to="/userlogin"/>}

      
    </div>
  )
}

export default UserPrivate
