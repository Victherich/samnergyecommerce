import React from 'react'
import "../CSS/BackButton.css"
import { FaBackward } from 'react-icons/fa'

const BackButton = () => {

  return (
    <div className="back-button-wrap">
        <button onClick={()=>window.history.back()}><FaBackward /> Back</button>
    </div>
  )
}

export default BackButton
