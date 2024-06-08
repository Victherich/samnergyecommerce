import React, { useContext, useEffect, useState } from 'react';
import "../CSS/UserSignUp.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingUI from './LoadingUI';
import { Context } from './Context';
import { FaHome } from 'react-icons/fa';

const UserSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,setLoading}=useContext(Context)
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError,setTermsError]=useState("")
  const [signUpFirstClick,setSignUpFirstClick]=useState(false)


useEffect(()=>{
  if(signUpFirstClick===true){
    validateForm()
  }
},[formData,isChecked])

  //form Validation
  let isValid = true;
const validateForm = () => {
      
      if (formData.fullName.length < 5) {
        setFullNameError("Full name must be minimum of 5 characters");
        isValid = false;
      } else {
        setFullNameError("");
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      } else {
        setEmailError("");
      }
  
      const phoneRegex = /^\d{11}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        setPhoneNumberError("Phone number must be 11 digits");
        isValid = false;
      } else {
        setPhoneNumberError("");
      }

      if (formData.password.length<8) {
          setPasswordError("Password must be minimum of 8 characters")
          isValid = false;
      }else {
        setPasswordError("");
      }
  
      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }

      if(isChecked!==true){
        setTermsError("Please agree with terms and conditions");
        isValid = false
      }else{
        setTermsError('');
      }
  
      return isValid;
    };


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpFirstClick(true)
    validateForm();
    if (isValid === true) {
      setLoading(true)

      try {
        const response = await axios.post("   ", formData);
        console.log(response.data);
      
        setLoading(false)
        Swal.fire({
          title:"Sign up successfull",
          text:response.data.message,
          showConfirmButton:true,
          timer:2000, 
        })
        const user = response.data.user
        const id = response.data.user._id
        // dispatch(userLogin({user,id}))
        navigate("/userlogin")

      } catch (error) {
        console.error(error);
     
        setLoading(false)
        Swal.fire({
          icon:"error",title:error.message,text:error.response.data,showConfirmButton:false,timer:2000
        })
      }
    } 
    
    
  };



//handling password input show
const [passwordShow,setPasswordShow]=useState("password")
const [confirmPasswordShow,setConfirmPasswordShow]=useState("password")



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
        <form onSubmit={handleSubmit} className='agentForm'>
            <div className='AgentFormPage1'>
              <div className='SignUpHeadingWrap'>
              <img src=""/><h1>Sign Up</h1>
              </div>
              <div className='agentinput'>
                <label htmlFor="">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='John Doe' required />
              </div>
              {fullNameError && <p style={{ color: 'red', fontSize: 'small' }}>{fullNameError}</p>}

              <div className='agentinput'>
                <label htmlFor="">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='example@gmail.com' required />
              </div>
              {emailError && <p style={{ color: 'red', fontSize: 'small' }}>{emailError}</p>}
              <div className='agentinput'>
                <label htmlFor="">Phone number</label>
                <input
                  type="text"
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='234801234567' required />
              </div>
              {phoneNumberError && <p style={{ color: 'red', fontSize: 'small' }}>{phoneNumberError}</p>}

              <div className='agentinput' style={{position:"relative"}}>
                <label htmlFor="">Password</label>
                <input
                  type={passwordShow}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter password' required />
                  {passwordShow==="text"?<FaEye onClick={()=>setPasswordShow("password")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>:
                  <FaEyeSlash onClick={()=>setPasswordShow("text")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>}
              </div>
              {passwordError && <p style={{ color: 'red', fontSize: 'small' }}>{passwordError}</p>}

              <div className='agentinput' style={{position:"relative"}}>
                <label htmlFor="">Confirm Password</label>
                <input
                  type={confirmPasswordShow}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm password' required />
                  {confirmPasswordShow==="text"?<FaEye onClick={()=>setConfirmPasswordShow("password")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>:
                  <FaEyeSlash onClick={()=>setConfirmPasswordShow("text")} style={{color:"rgba(0, 128, 0, 0.541)",fontSize:"1.5rem",cursor:"pointer",position:"absolute",top:"50%",right:"10px"}}/>}
              </div>
              {confirmPasswordError && <p style={{ color: 'red', fontSize: 'small' }}>{confirmPasswordError}</p>}

              <div className='AgreeTermsAndConditionsWrap'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)} />
              <p>I agree to the terms and conditions</p>
              </div>
              {termsError && <p style={{ color: 'red', fontSize: 'small' }}>{termsError}</p>}
              <button className='AgentSignUpNextButton'
                type="submit">Sign Up</button>
              <p className='myspan'>Already have an account?  
              <Link to={"/userlogin"} className='AgentFormPage1Link'> Login</Link></p>
            </div>
        </form>
      </div>
      {loading&&<LoadingUI/>}
    </div>
  );
};

export default UserSignUp;