import React, { useEffect, useState } from 'react'
import "../CSS/LoadingUI.css"
// import Logo from "../Images/HomeHub Logo.svg"

const LoadingUI2 = () => {

    const [wait,setWaiting]=useState(0)
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setWaiting(prevState=>(prevState+1)%6)
        },10000)

        return ()=>clearInterval(intervalId)
    },[])

    console.log(wait)

  return (
    <div className='LoadingUiWrap'>
      <div className='LoadingUi'>
          {/* <img src={Logo} alt="Loading"/> */}
          <h2>HotSalesNg</h2>
          {wait===0&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>Please Wait for a moment...</h3>}
          {wait===1&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>Confirming your order...</h3>}
          {wait===2&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>Your Satisfaction is our  goal...</h3>}
          {wait===3&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>Hang-on for a little while...</h3>}
          {wait===4&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>Your order is being confirmed...</h3>}
          {wait===5&&<h3 style={{color:"green",fontStyle:"italic",padding:"10px",textAlign:"center"}}>We care about our customers...</h3>}
      </div>
      
    </div>
  )
}

export default LoadingUI2
