import React from 'react';
import '../CSS/UserAccount.css';
import { useSelector } from 'react-redux';

const UserAccount = () => {
const userInfo = useSelector(state=>state.userInfo)

  // Sample user data
  const user = {
    firstName: 'John',
    lastName: 'Clara',
    email: 'JohnClara@gmail.com',
    phoneNumber: '+23456789',
  };

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <div className="account-info">
        <div className="info-row">
          <label>Full Name:</label>
          <span>{userInfo.fullName}</span>
        </div>
        {/* <div className="info-row">
          <label>Last Name:</label>
          <span>{user.lastName}</span>
        </div> */}
        <div className="info-row">
          <label>Email:</label>
          <span>{userInfo.email}</span>
        </div>
        <div className="info-row">
          <label>Phone Number:</label>
          <span>{userInfo.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
