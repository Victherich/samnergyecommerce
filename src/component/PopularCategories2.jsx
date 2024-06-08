import React from 'react'
import "../CSS/PopularCategories.css"
import cat1 from "../Images/cat1.jpeg"
import cat2 from "../Images/cat2.jpeg"
import cat3 from "../Images/cat3.jpeg"
import cat4 from "../Images/cat4.jpeg"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './Context'

const PopularCategories2 = () => {
  const {loading,setLoading}=useContext(Context)
  const navigate = useNavigate()

 
  const handleLoading=()=>{
    // setMobileMenuSwitch(false)
    const load = setTimeout(()=>{
      setLoading(true)
    },100)

    const stopLoad = setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  return (
    <div className='PopularCategoriesWrap' style={{padding:"0px 0px",paddingBottom:"50px"}}>
        {/* <h1>EXPLORE POPULAR CATEGORIES</h1> */}
        <div className='PopularCategories'>
          <div style={{borderRadius:"50%"}} className='PopularCategory' onClick={()=>{navigate("/Cookinggasandaccessories");handleLoading()}}><p>Cooking gas and Accessories</p></div>
          <div style={{borderRadius:"50%"}} className='PopularCategory' onClick={()=>{navigate("/fashion");handleLoading()}}><p>Fashion</p></div>
          <div style={{borderRadius:"50%"}} className='PopularCategory' onClick={()=>{navigate("/kitchenutensils");handleLoading()}}><p>Kitchen Utensils</p></div>
          <div style={{borderRadius:"50%"}} className='PopularCategory' onClick={()=>{navigate("/foodmart");handleLoading()}}><p>Food Mart</p></div>
          {/* <div style={{borderRadius:"50%"}} className='PopularCategory' onClick={()=>{navigate("/healthcare");handleLoading()}}><p>Health Care</p></div> */}
        </div>
    </div>
  )
}

export default PopularCategories2
