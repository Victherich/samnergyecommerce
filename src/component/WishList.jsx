import React, { useState,useContext } from 'react';
import '../CSS/WishList.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist,addToCart } from '../Features/Slice';
import Swal from 'sweetalert2'
import { Context } from './Context';



const WishList = () => {
  const {DataDetail}=useContext(Context)
  const dispatch=useDispatch()
const wishlist = useSelector(state=>state.wishlist)


  const handleRemoveItem = (id) => {
    dispatch(removeFromWishlist(id));
    Swal.fire({icon:"success",text:"Item removed from wishlist",showConfirmButton:false,timer:2000})
  };

  const handleAddToCart = ()=>{
    // handleLoading()
    dispatch(addToCart(DataDetail))
    Swal.fire({icon:"success",text:"Item added to cart",showConfirmButton:false,timer:2000})
  }

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
