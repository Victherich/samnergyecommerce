import React, { useContext } from 'react';
import '../CSS/UserOrders.css';
import { Context } from './Context';
import { useDispatch, useSelector } from 'react-redux';

const UserOrders = () => {
  // Sample order data
  const dispatch = useDispatch()
  const userAllOrder = useSelector(state=>state.userAllOrder)



  // const orders = [
  //   {
  //     orderRef: 'ORD12345',
  //     firstName: 'John',
  //     lastName:'Clara',
  //     phone: '08012345678',
  //     email: 'john@example.com',
  //     address: '123 Main Street',
  //     state: 'Lagos',
  //     city: 'Ikeja',
  //     cartItems: [
  //       'Product 1 - 2 x ₦10,000',
  //       'Product 2 - 1 x ₦5,000',
  //     ],
  //     total: '₦ 25,000',
  //   },
  //   {
  //     orderRef: 'ORD12346',
  //     firstName: 'Jane',
  //     lastName:'Smith',
  //     phone: '08087654321',
  //     email: 'jane@example.com',
  //     address: '456 Another Street',
  //     state: 'Abia',
  //     city: 'Aba',
  //     cartItems: [
  //       'Product 3 - 1 x ₦20,000',
  //     ],
  //     total: '₦ 20,000',
  //   },
  // ];

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {userAllOrder.map((order) => (
        <div key={order.orderRef} className="order">
          <div className="order-header">
          <span><strong>Transaction Reference:</strong> {order.transactionRef}</span>
            <span><strong>Order Reference:</strong> {order.orderRef}</span><br/>
            <span><strong>Date:</strong> {order.date}</span>
            <span><strong>Total:</strong> {order.total}</span>

            <span><strong>Delivery Fee:</strong>₦ {order.deliveryCharge}</span>
          </div>
          <div className="order-details">
            <div><strong>First Name:</strong> {order.firstName}</div>
            <div><strong>Last Name:</strong> {order.lastName}</div>
            <div><strong>Phone:</strong> {order.phone}</div>
            <div><strong>Email:</strong> {order.email}</div>
            <div><strong>Address:</strong> {order.address}</div>
            <div><strong>State:</strong> {order.state}</div>
            <div><strong>City:</strong> {order.city}</div>
            <div className="cart-items">
              <strong>Items:</strong>
              <ul>
                {order.cartItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
