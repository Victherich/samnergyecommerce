import React, { useContext, useEffect, useState } from 'react';
import "../CSS/UserSignUp.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingUI from '../component/LoadingUI';
import { Context } from './Context';
import {userLogin } from '../Features/Slice';
import { FaHome } from 'react-icons/fa';

const UserLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,setLoading,loginUrl}=useContext(Context)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);
  const [emailError,setEmailError]=useState("")


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
  


//form Validation
let isValid = true;
const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      } else {
        setEmailError("");
      }
  
      return isValid;
    };

    
const [firstClick,setFirstClick]=useState(false)
useEffect(()=>{
  if(firstClick===true){
    validateForm()
  }
},[formData])



  const handleSubmit = async (e) => {
      e.preventDefault();
      setFirstClick(true)
      validateForm()
      
      if(isValid===true){

        setLoading(true)
  
        try {
          const response = await axios.post(`${loginUrl}`, formData);
          console.log(response.data);

          setLoading(false)
          Swal.fire({
            icon:"success",
            title:"Login Successful",
            // text:response.data.message,
            showConfirmButton:false,
            timer:2000
          })
          
          // const userId = true
          // const userInfo = true
        //   const userId = response.data.checkUser._id
          const userInfo = response.data.user
          const userToken = response.data.token
          dispatch(userLogin({userInfo,userToken}))
          navigate("/userdashboard")
  
        } catch (error) {
          console.error(error);
          setLoading(false)
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
            title: "Login Failed",
            text: errorMessage,
            showConfirmButton: false,
            timer: 3000
          });
          
        }
      }
    
  };

//   useEffect(()=>{
//     if(logOutHomeNavigate===true){
//       navigate("/")
//     }
//   },[])



  //handleimg password show
  const [passwordShow,setPasswordShow]=useState("password")

  const handleNavigate = ()=>{
    handleLoading()
    navigate("/")
  }
  
  const handleLoading=()=>{
    const load = setTimeout(()=>{
      setLoading(true)
    },100)
  
    const stopLoad = setTimeout(()=>{
      setLoading(false)
    },1000)
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
              <img src=""/><h1>Login</h1>
              </div>
      
              <div className='agentinput'>
                <label htmlFor="">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='example@gmail.com' required />
                  <p style={{fontSize:"small",color:"red"}}>{emailError}</p>
              </div>
              
              <div className='agentinput' style={{position:"relative"}}>
                <label htmlFor="">Password</label>
                <input
                  type={passwordShow}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter password' required />
                  {passwordShow==="text"?<FaEye onClick={()=>setPasswordShow("password")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"38%",right:"10px"}}/>:
                 
                 <FaEyeSlash onClick={()=>setPasswordShow("text")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"38%",right:"10px"}}/>}
                 <Link to="/forgotpassword" style={{color:"green",cursor:"pointer",textDecoration:"none"}}>Forgot Password?</Link>
              </div>

              <button className='AgentSignUpNextButton'>Login</button>
              <p className='myspan'>Don't have an account?  
              <Link to={"/usersignup"} className='AgentFormPage1Link'> Sign Up</Link></p>
            </div>
        </form>
      </div>
      {loading&&<LoadingUI/>}
    </div>
  );
};

export default UserLogin;
