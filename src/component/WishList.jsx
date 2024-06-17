import React, { useState,useContext,useEffect } from 'react';
import '../CSS/WishList.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist,addToCart } from '../Features/Slice';
import Swal from 'sweetalert2'
import { Context } from './Context';
import axios from 'axios';



const WishList = () => {
  const {DataDetail,wishListGetUrl}=useContext(Context)
  const dispatch=useDispatch()
const wishlist = useSelector(state=>state.wishlist)
const userInfo = useSelector(state=>state.userInfo)


  const handleRemoveItem = (id) => {
    dispatch(removeFromWishlist(id));
    Swal.fire({icon:"success",text:"Item removed from wishlist",showConfirmButton:false,timer:2000})
  };

  const handleAddToCart = ()=>{
    // handleLoading()
    dispatch(addToCart(DataDetail))
    Swal.fire({icon:"success",text:"Item added to cart",showConfirmButton:false,timer:2000})
  }


  const [wishlist2,setWishList2]=useState([])

  const fetchWishList = async () => {
    const loadingAlert = Swal.fire({
      // title: "fethcing your orders",
      text: "fetching your orders",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false
    });
  
    Swal.showLoading();

    try {
      const response = await axios.get(`${wishListGetUrl}/${userInfo.userId}`);
      console.log('Wishlist fetched:', response.data);
      setWishList2(response.data);
      
      
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Swal.fire({
        icon: "error",
        title: "Fetch wishlist Failed",
        text: error.response.data.error || 'An error occurred.',
        showConfirmButton: false,
        timer: 3000
      });
    }finally{
      loadingAlert.close();
    }
  };
  

useEffect(()=>{
  fetchWishList()
},[])


  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt="cartImg"/>
              <span className="item-name">{item.title}</span>
              <span className="item-price">₦ {new Intl.NumberFormat().format(item.price*1000)}</span>
              <button onClick={handleAddToCart} className="remove-button" style={{backgroundColor:"green"}}>Add to Cart</button>
     
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove from Wishlist</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
