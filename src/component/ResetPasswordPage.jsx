import React, { useContext, useEffect, useState } from 'react';
import "../CSS/UserSignUp.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingUI from '../component/LoadingUI';
import { Context } from './Context';
import { FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import BackButton from './BackButton';

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const {loading,setLoading,resetPasswordUrl} = useContext(Context)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstClick, setFirstClick] = useState(false)
  const [passwordShow, setPasswordShow] = useState("password")
  const [confirmPasswordShow, setConfirmPasswordShow] = useState("password")
  const [resetPageSwitch,setResetPageSwitch]=useState(false)

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    if (formData.password.length < 8) {
      setPasswordError("Password must be minimum of 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
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
        const response = await axios.post(`${resetPasswordUrl}/${token}`, { password: formData.password });
        setLoading(false)
        // Swal.fire({
        //   icon: "success",
        //   text: "Password reset successfully.",
        //   showConfirmButton: false,
        //   timer: 2000
        // });
        setResetPageSwitch(true)
      } catch (error) {
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
      title: "Password Reset Failed",
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
              <img src=""/><h1>Reset Password</h1>
            </div>
            {resetPageSwitch===false?<div className='agentinput' style={{position:"relative"}}>
              <label htmlFor="password">New Password</label>
              <input
                type={passwordShow}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter password' required />
              {passwordShow==="text" ? 
                <FaEye onClick={() => setPasswordShow("password")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/> :
                <FaEyeSlash onClick={() => setPasswordShow("text")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>}
            </div>:<div><p>Your Password has successfully been reset</p></div>}

            {passwordError && <p style={{ color: 'red', fontSize: 'small' }}>{passwordError}</p>}


            {resetPageSwitch===false&&<div className='agentinput' style={{position:"relative"}}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type={confirmPasswordShow}
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm password' required />
              {confirmPasswordShow==="text" ? 
                <FaEye onClick={() => setConfirmPasswordShow("password")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/> :
                <FaEyeSlash onClick={() => setConfirmPasswordShow("text")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>}
            </div>}
            {confirmPasswordError && <p style={{ color: 'red', fontSize: 'small' }}>{confirmPasswordError}</p>}
            {resetPageSwitch===false?<button type="submit" className='AgentSignUpNextButton'>Reset Password</button>:
            <button type="button" onClick={()=>navigate("/userlogin")} className='AgentSignUpNextButton'>Login</button>}
          </div>
        </form>
      </div>
      {/* <BackButton/> */}
      {loading && <LoadingUI/>}
    </div>
  );
};

export default ResetPasswordPage;
