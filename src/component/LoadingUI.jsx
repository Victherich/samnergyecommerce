import React from 'react'
import "../CSS/LoadingUI.css"
// import Logo from "../Images/HomeHub Logo.svg"

const LoadingUI = () => {
  return (
    <div className='LoadingUiWrap'>
      <div className='LoadingUi'>
          {/* <img src={Logo} alt="Loading"/> */}
          <h2>HotSalesNg</h2>
          <p>Please Wait...</p>
      </div>
      
    </div>
  )
}

export default LoadingUI
