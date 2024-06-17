import React, { useContext, useState } from 'react';
import '../CSS/ProductDetailPage.css';
import { FaBackspace, FaHeart } from 'react-icons/fa';
import p13 from "../Images/p4 (1).jpeg";
import p14 from "../Images/p4 (1).png";
import p15 from "../Images/p4 (2).png";
import p16 from "../Images/p4 (3).png";
import { FaBackward } from 'react-icons/fa6';
import { Context } from './Context';
import p1 from "../Images/p1a__1_-removebg-preview.png"
import p5 from "../Images/p3 (1).jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart ,addToWishlist} from '../Features/Slice';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetailPage = () => {
  const userToken = useSelector(state=>state.userToken)
  const dispatch = useDispatch()
  const {loading,setLoading,wishListAddUrl}=useContext(Context)

    const {DataDetail}=useContext(Context)
    const ProductDetail=useSelector(state=>state.ProductDetail)

    
  const product = {
    title: 'Sample Product',
    description: 'This is a great product.',
    amount: 99.99,
    images: [p13,p14,p1,p5]
  };

  const [imageSwitch,setImageSwitch]=useState(0)



  const handleLoading=()=>{
    
    const load = setTimeout(()=>{
      setLoading(true)
    },100)

    const stopLoad = setTimeout(()=>{
      setLoading(false)
    },1000)
  }


  const handleAddToCart = ()=>{
    // handleLoading()
    dispatch(addToCart(DataDetail))
    Swal.fire({icon:"success",text:"Item added to cart",showConfirmButton:false,timer:2000})
  }

  const handleAddToWishlist = (e)=>{
    // handleLoading()
    if(userToken)
      {
        handleAddToWishlist2(e)
        dispatch(addToWishlist(DataDetail))
    Swal.fire({icon:"success",text:"Item added to wishlist",showConfirmButton:false,timer:2000})}
    else{
      Swal.fire({icon:"warning",text:"Please login to add to wishlist",timer:2000,showConfirmButton:false})
    }
  }



  const handleAddToWishlist2 = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const token = localStorage.getItem('token'); // Assuming you store token in localStorage
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      };
      const response = await axios.post(`${wishListAddUrl}`, DataDetail, config);
      console.log(response.data);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Item added to wishlist',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };




  return (
    <div className='ProductDetailWrap'>
        <div className="product-detail">
      <div className="image-gallery">
        {imageSwitch===0&&<img src={ProductDetail?.image} alt="Product" className="main-image" />}
        {imageSwitch===1&&<img src={ProductDetail?.image} alt="Product" className="main-image" />}
        {imageSwitch===2&&<img src={product.images[2]} alt="Product" className="main-image" />}
        {imageSwitch===3&&<img src={product.images[3]} alt="Product" className="main-image" />}
        
        <div className="thumbnail-images">
          
          <img src={ProductDetail?.image} alt="Product" className={imageSwitch===0?"thumbnail-imageActive":"thumbnail-image"} onClick={()=>setImageSwitch(0)}/>
          <img src={ProductDetail?.image} alt="Product" className={imageSwitch===1?"thumbnail-imageActive":"thumbnail-image"} onClick={()=>setImageSwitch(1)}/>
          <img src={product.images[2]} alt="Product" className={imageSwitch===2?"thumbnail-imageActive":"thumbnail-image"} onClick={()=>setImageSwitch(2)}/>
          <img src={product.images[3]} alt="Product" className={imageSwitch===3?"thumbnail-imageActive":"thumbnail-image"} onClick={()=>setImageSwitch(3)}/>
        </div>
        
      </div>
      <div className="product-info">
        <h1>{ProductDetail.title}</h1>
        <span>{ProductDetail.description}</span>
        <p className="amount">₦ {new Intl.NumberFormat().format(ProductDetail.price * 1000)}</p>
        <button className="buy-now" onClick={handleAddToCart}>Add to Cart</button>
        <button className="buy-now" onClick={handleAddToWishlist2} style={{backgroundColor:"white",
        color:"green",
        border:"1px solid green",
        display:"flex",
        justifyContent:"center",
        gap:"10px"}}><FaHeart />Add to Wishlist</button>
    
        
      </div>
      
    </div>
    <div className='BackButtonWrap'>
    <button onClick={()=>window.history.back()}><FaBackward/> Back</button>
</div>
    </div>
  );
};

export default ProductDetailPage;
