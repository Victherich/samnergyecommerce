import React, { useContext, useEffect, useState } from 'react';
import "../CSS/UserSignUp.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingUI from '../component/LoadingUI';
import { Context } from './Context';
import { FaHome } from 'react-icons/fa';
import BackButton from './BackButton';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,setLoading,forgotPasswordUrl} = useContext(Context)
  const [formData, setFormData] = useState({ email: "" });
  const [emailError, setEmailError] = useState("")
  const [firstClick, setFirstClick] = useState(false)
const [resendLinkSwitch,setResendLinkSwitch]=useState(false)


const handleChange = (e) => {
  if (e.target.name === 'email') {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value.toLowerCase().trim() 
    });
  } else {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  }
};

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  useEffect(() => {
    if (firstClick === true) {
      validateForm()
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstClick(true)
    
    if (validateForm()) {
      setLoading(true)
      try {
        const response = await axios.post(`${forgotPasswordUrl}`, formData);
        console.log(response.data)
        setLoading(false)
        // Swal.fire({
        //   icon: "success",
        //   text: `${response.data.message}`,
        //   showConfirmButton: true,
        
        // });
        setResendLinkSwitch(true)
     

      } catch (error) {
        console.error(error)
        setLoading(false)
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
      title: "Forgot Password Failed",
      text: errorMessage,
      showConfirmButton: false,
      timer: 3000
    });
        
      }
    }
  };

  const handleNavigate = () => {
    setLoading(true)
    navigate("/")
    setLoading(false)
  }

  return (
    <div className='agentbody'>
      <div className='agentformWrap'>
        <div className='HeaderUpRight1' style={{color:"green",fontWeight:"bold"}} onClick={handleNavigate}>
          <FaHome style={{cursor:"pointer"}}/><p>Home</p>
        </div>
        <form onSubmit={handleSubmit} className='agentForm' style={{height:"60%"}}>
          <div className='AgentFormPage1'>
            <div className='SignUpHeadingWrap'>
              <img src=""/><h1>Forgot Password</h1>
            </div>
            {resendLinkSwitch===false?<div className='agentinput'>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='example@gmail.com' required />
              <p style={{fontSize:"small",color:"red"}}>{emailError}</p>
            </div>:<div> Please click the password reset link sent to your email</div>}
            <button className='AgentSignUpNextButton'>{resendLinkSwitch===false?"Send Reset Link":"Resend Link"}</button>
          </div>
        </form>
      </div>
      <BackButton/>
      {loading && <LoadingUI/>}
    </div>
  );
};

export default ForgotPasswordPage;
