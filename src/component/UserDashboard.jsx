import React, { useContext, useState } from 'react';
import '../CSS/UserDashBoard.css';
import { Link,Switch, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from './Context';
import WishList from './WishList';
import UserAccount from './UserAccount';
import UserOrders from './UserOrders';
import { userLogout } from '../Features/Slice';

const UserDashboard = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const wishlist = useSelector(state=>state.wishlist)
    const cart = useSelector(state=>state.cart)
    const {loading,setLoading,dashContent,setDashContent,userAllOrders,setUserAllOrders}=useContext(Context)

    const handleLoading=()=>{
 
        const load = setTimeout(()=>{
          setLoading(true)
        },100)
    
        const stopLoad = setTimeout(()=>{
          setLoading(false)
        },1000)
      }

      const getTotal = () => {
        return cart.reduce((total, item) =>total + item.qty, 0);
      };

      

  return (
    <div className="dashboard">
      <div className="sidebar">
        <nav>
          <ul>
            <li onClick={()=>setDashContent(0)}><p>Account</p></li>
            <li onClick={()=>setDashContent(1)}><p>Orders</p></li>
            <li onClick={()=>setDashContent(2)}><p>Wishlist ({wishlist.length})</p></li>
          
            {/* <li><p>Wishlist</p></li> */}
            <li><p onClick={()=>navigate("/cartpage")}>Cart ({getTotal()})</p></li>
            <li><p onClick={()=>{dispatch(userLogout());handleLoading()}}>Logout</p></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        {/* <Switch>
          <Route path={`${path}/account`} component={UserAccount} />
          <Route path={`${path}/orders`} component={UserOrders} />
          <Route path={`${path}/wishlist`} component={Wishlist} />
          <Route path={`${path}/cart`} component={Cart} />
        </Switch> */}
        {dashContent===0&&<UserAccount/>}
        {dashContent===1&&<UserOrders/>}
        {dashContent===2&&<WishList/>}
      </div>
    </div>
  );
};

export default UserDashboard;
