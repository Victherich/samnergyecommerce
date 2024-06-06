import React from 'react';
import '../CSS/CartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Features/Slice';
import Swal from 'sweetalert2'

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleQuantityChange = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    Swal.fire({icon:"success",text:"Item removed from cart",showConfirmButton:false,timer:2000})
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * 1000 * item.qty, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart?.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt="cartImg"/>
              <span className="item-name">{item.title}</span>
              <span className="item-price">₦ {new Intl.NumberFormat().format(item.price*1000)}</span>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <span>Total: ₦ {new Intl.NumberFormat().format(getTotal())}</span>
          </div>
          <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
