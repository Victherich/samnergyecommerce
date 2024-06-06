import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import p1 from "../Images/p1a__1_-removebg-preview.png";
import p2 from "../Images/p1a__2_-removebg-preview.png";
import p3 from "../Images/p1a__1_-removebg-preview.png";
import p4 from "../Images/p1a__1_-removebg-preview (1).png";
import p5 from "../Images/p2 (1).jpeg";
import p6 from "../Images/p2 (1).png";
import p7 from "../Images/p2 (2).png";
import p8 from "../Images/p2 (3).png";
import p9 from "../Images/p3 (1).jpeg";
import p10 from "../Images/p3 (1).png";
import p11 from "../Images/p3 (2).png";
import p12 from "../Images/p3 (3).png";
import p13 from "../Images/p4 (1).jpeg";
import p14 from "../Images/p4 (1).png";
import p15 from "../Images/p4 (2).png";
import p16 from "../Images/p4 (3).png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { productDetailAssign } from '../Features/Slice';


export const Context = createContext()

const ContextProvider = ({children}) => {
  // const navigate =useNavigate()
    const [loading,setLoading]=useState(false)
    const [searchResult, setSearchResult]=useState([])
    const dispatch = useDispatch()
    const allData = [
      {
          id: 1,
          title: "Organic Apples",
          description: "Fresh and organic apples, straight from the farm.",
          price: 500,
          images: [p1, p2, p3, p4]
      },
      {
          id: 2,
          title: "Stainless Steel Knife Set",
          description: "High-quality stainless steel knife set, perfect for any kitchen.",
          price: 700,
          images: [p5, p6, p7, p8]
      },
      {
          id: 3,
          title: "Classic White T-Shirt",
          description: "Comfortable and stylish classic white t-shirt.",
          price: 900,
          images: [p9, p10, p11, p12]
      },
      {
          id: 4,
          title: "Propane Gas Cylinder",
          description: "20 lb propane gas cylinder, ideal for grilling.",
          price: 1000,
          images: [p16, p14, p15, p13]
      }
  ];

  
const [productDetail,setProductDetail]=useState({})



const [Data,setData]=useState([])




const handleData = async()=>{
        setLoading(true)
    try{
        const response = await axios.get("https://fakestoreapi.com/products")
        console.log(response)
        setData(response.data)
    }catch(error){
        console.error(error)
    }finally{
        setLoading(false)
    }
}

useEffect(()=>{
handleData()
},[])


const [DataDetail,setDataDetail]=useState({})
const handleDataDetail = async(id)=>{
  setLoading(true)
  const updatedObj = Data.find((e)=>e.id===id)
  setDataDetail(updatedObj)
try{
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`) 
  console.log(response)
  // setDataDetail(response.data)
  dispatch(productDetailAssign(response.data))

}catch(error){
  console.error(error)
}finally{
  setLoading(false)
}
}


const [searchInput,setSearchInput]=useState("")
  
  const [navigateState,setNavigateState]=useState(false)
//anima
  // const handleSearch = ()=>{
  //   const updatedArray = allData.includes((e)=>e.title===searchInput)
  //   setSearchResult(updatedArray)
  //   setNavigateState(true)
  //   // navigate("/searchresult")
  // }

  const handleSearch = () => {
  if(searchInput.length>0){
      // const updatedArray = allData.filter((e) => e.title == searchInput);
    // setSearchResult(updatedArray);
    // setNavigateState(true);
    // navigate("/searchresult") // Uncomment this if you're using React Router to navigate
    const updatedArray = Data.filter(
      (property) =>
        property.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResult(updatedArray);
    setNavigateState(true);
  }
};
console.log(searchResult)
  


  return (
    <Context.Provider value={{loading,setLoading,searchInput,setSearchInput,searchResult, 
    setSearchResult,
    handleSearch,navigateState,setNavigateState,productDetail,setProductDetail,Data,DataDetail,handleDataDetail}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider




//https://chatgpt.com/c/c7a8b537-03a7-40e7-9d58-4619cecb84bd