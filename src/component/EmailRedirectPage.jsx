import React from 'react'
import "../CSS/EmailRedirectPage.css"
import { useNavigate } from 'react-router-dom'

const EmailRedirectPage = () => {
    const navigate=useNavigate()
  return (
    <div className='FormSubmitUiWrap' >
            
        <div className='FormSubmitUi'style={{width:'100%',height:"100vh"}} >
        {/* <img src={Logo} alt="Logo"/> */}
        <h1>Welcome to Hot Sales NG !!!</h1> 
        <p>We have sent a verification link to your email. Please go your email and click on the link to verify your account. If you did'nt find the email in your inbox , kindly check your spam folder. Thanks</p>
        <button onClick={()=>navigate("/")}>Go to Home</button>
        
    </div>
    </div>
  )
}

export default EmailRedirectPage
