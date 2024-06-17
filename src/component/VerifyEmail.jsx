import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/VerifyEmail.css'; // Import the CSS file
import { Context } from './Context';
import Swal from 'sweetalert2';
import { FaHome } from 'react-icons/fa';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationMessageError, setVerificationMessageError] = useState('');
  const navigate= useNavigate()
  const {emailVeifyUrl}=useContext(Context)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${emailVeifyUrl}/${token}`);
        console.log(response.data)
        setVerificationMessage(response.data.message);
      } catch (error) {
        setVerificationMessageError(error.response.data.error);
        // Handle different types of errors
    let errorMessage = "An error occurred. Please try again.";
    if (error.response) {
      // Errors from the server
      if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Unexpected error from server.";
      }
    } else if (error.request) {
      // No response received
      errorMessage = "No response from server. Please check your internet connection.";
    } else {
      // Other errors
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Verification Failed",
      text: errorMessage,
      showConfirmButton: false,
      timer: 3000
    });
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="VerifyContainer">
      <h2>Email verification</h2>
      {verificationMessage||verificationMessageError?"":<h2>Please wait...</h2>}
      <h2>{verificationMessage}</h2>
      <h2>{verificationMessageError}</h2>
      {verificationMessage&&<button className='AgentSignUpNextButton' onClick={()=>navigate("/userlogin")}>Login</button>}
      {verificationMessageError&&<button className='AgentSignUpNextButton' onClick={()=>navigate("/")}><FaHome/> Home</button>}
    </div>
  );
};

export default VerifyEmail;
