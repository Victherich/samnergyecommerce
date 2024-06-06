import React, { useContext, useRef, useState,useEffect } from 'react';
import '../CSS/Header.css'
import { FaCartArrowDown, FaChevronCircleDown, FaHeart, FaHome, FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Context } from './Context';
import LoadingUI from './LoadingUI';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state=>state.cart)
  const wishlist = useSelector(state=>state.wishlist)
  const navigate = useNavigate()
  const location = useLocation()
  const {loading,setLoading,searchInput,setSearchInput,handleSearch,navigateState,setNavigateState}=useContext(Context)
  const [mobileMenuSwitch,setMobileMenuSwitch]=useState(false)
  

    //Ref for clickOutside functionality
const menuRef = useRef()

//ClickOutside functionality
useEffect(()=>{
  const handleClickOutside = (event)=>{
    if(menuRef.current && !menuRef.current.contains(event.target)){
        setMobileMenuSwitch(false)
    }
  }
  document.addEventListener("mousedown",handleClickOutside)
  return ()=>{
    document.removeEventListener("mousedown",handleClickOutside)
  }
},[])

  const [active,setActive]=useState(0)

  const handleNavigate = ()=>{
    handleLoading()
    navigate("/")
  }

  const handleLoading=()=>{
    setMobileMenuSwitch(false)
    const load = setTimeout(()=>{
      setLoading(true)
    },100)

    const stopLoad = setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  
console.log(searchInput)

useEffect(()=>{
  if(navigateState===true){
    navigate("/searchresult")
    const intervalId=setTimeout(()=>{
      setNavigateState(false)
    },1000)
  }
  
},[navigateState])


const getTotal = () => {
  return cart.reduce((total, item) =>total + item.qty, 0);
};

  return (
    <div className='HeaderWrap'>
      <div className='HeaderUp'>
        <div className='HeaderUpLeft'>
            {/* <img src="" alt="Logo"/> */}
            <h3>SAMNERGY</h3>
        </div>
        <div className='HeaderUpMid'>
            <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for products, brands and categories'/>
            <div className='SearchIconWrap' onClick={()=>{handleSearch();handleLoading()}}>
              <FaSearch/>
            </div>
        </div>
        
        <div className='HeaderUpRight'>
        <div className='HeaderUpRight1' onClick={handleNavigate}>
          <FaHome style={{cursor:"pointer"}}/><p>Home</p>
          </div>
          <div className='HeaderUpRight1' onClick={()=>{navigate("/wishlist");handleLoading()}}>
          <FaHeart/><p>Wishlist</p><p>({wishlist.length})</p>
          </div>
          <div className='HeaderUpRight1' onClick={()=>{navigate("/cartpage");handleLoading()}}>
          <FaCartArrowDown/><p>Cart</p><p>({getTotal()})</p>
          </div>
            
        </div>
      </div>
      <div className='HeaderDown'>
          <NavLink to={"/foodmart"} onClick={handleLoading} className={location.pathname==="/foodmart"?"MenuActive":"Menu"}>FOOD MART</NavLink>
          <NavLink to={"kitchenutensils"} onClick={handleLoading}  className={location.pathname==="/kitchenutensils"?"MenuActive":"Menu"}>KITCHEN UTENSILS</NavLink>
          <NavLink to={"fashion"} onClick={handleLoading} className={location.pathname==="/fashion"?"MenuActive":"Menu"} >FASHION<br/> (Samtoclassics)</NavLink>
          <NavLink to={"cookinggasandaccessories"} onClick={handleLoading} className={location.pathname==="/cookinggasandaccessories"?"MenuActive":"Menu"} >COOKING GAS AND ACCESSORIES</NavLink>
          <NavLink to={"bellyinn"} onClick={handleLoading} className={location.pathname==="/bellyinn"?"MenuActive":"Menu"} >BELLY INN</NavLink>
          <NavLink to={"healthcare"} onClick={handleLoading} className={location.pathname==="/healthcare"?"MenuActive":"Menu"} >HEALTH CARE <br/> (Healthy stops)</NavLink>
          <NavLink to={"blog"} onClick={handleLoading} className={location.pathname==="/blog"?"MenuActive":"Menu"} >BLOG / DROP SHIPPING</NavLink>
          <NavLink to={"buyandsellfood"} onClick={handleLoading} className={location.pathname==="/buyandsellfood"?"MenuActive":"Menu"} >BUY AND SELL FOOD <br/>(Free public accounts)</NavLink>
      </div>
      <div className='HeaderDown2A'><p onClick={()=>setMobileMenuSwitch(true)}>Categories <FaChevronCircleDown/></p></div>{mobileMenuSwitch===true&&<div className='HeaderDown2' ref={menuRef}>
          <NavLink to={"/foodmart"} onClick={handleLoading} className={location.pathname==="/foodmart"?"MenuActive":"Menu"}>FOOD MART</NavLink>
          <NavLink to={"kitchenutensils"} onClick={handleLoading}  className={location.pathname==="/kitchenutensils"?"MenuActive":"Menu"}>KITCHEN UTENSILS</NavLink>
          <NavLink to={"fashion"} onClick={handleLoading} className={location.pathname==="/fashion"?"MenuActive":"Menu"} >FASHION<br/> (Samtoclassics)</NavLink>
          <NavLink to={"cookinggasandaccessories"} onClick={handleLoading} className={location.pathname==="/cookinggasandaccessories"?"MenuActive":"Menu"} >COOKING GAS AND ACCESSORIES</NavLink>
          <NavLink to={"bellyinn"} onClick={handleLoading} className={location.pathname==="/bellyinn"?"MenuActive":"Menu"} >BELLY INN</NavLink>
          <NavLink to={"healthcare"} onClick={handleLoading} className={location.pathname==="/healthcare"?"MenuActive":"Menu"} >HEALTH CARE <br/> (Healthy stops)</NavLink>
          <NavLink to={"blog"} onClick={handleLoading} className={location.pathname==="/blog"?"MenuActive":"Menu"} >BLOG / DROP SHIPPING</NavLink>
          <NavLink to={"buyandsellfood"} onClick={handleLoading} className={location.pathname==="/buyandsellfood"?"MenuActive":"Menu"} >BUY AND SELL FOOD <br/>(Free public accounts)</NavLink>
      </div>}
      
      {loading&&<LoadingUI/>}
    </div>
  )
}

export default Header
