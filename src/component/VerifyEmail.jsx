import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/VerifyEmail.css'; // Import the CSS file

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigate= useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`https://hotsalesngonboarding.onrender.com/api/auth/verify/${token}`);
        console.log(response.data)
        setVerificationMessage(response.data.message);
      } catch (error) {
        setVerificationMessage(error.response.data.error);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="VerifyContainer">
      <h2>Email verification</h2>
      {!verificationMessage&&<h2>Please wait...</h2>}
      <h2>{verificationMessage}</h2>
      {verificationMessage&&<button className='AgentSignUpNextButton' onClick={()=>navigate("/userlogin")}>Login</button>}
    </div>
  );
};

export default VerifyEmail;
