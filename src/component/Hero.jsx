import React, { useState ,useEffect} from 'react'
import "../CSS/Hero.css"
import heroImg5 from "../Images/heroimg5.jpeg"
import heroImg6 from "../Images/heroimg6.jpeg"
import heroImg7 from "../Images/heroimg7.jpeg"
import heroImg8 from "../Images/heroimg8.jpeg"


const Hero = () => {
    const [HeroSwitch,setHeroSwitch]=useState(0)
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setHeroSwitch(prevState=>(prevState+1)%3)
        },3000)

        return ()=>clearInterval(intervalId)
    },[])
    
  return (
    <div className='HeroWrap'>
        <div className='HeroRight'>
            {/* <img src={heroImg5} alt="heroImg5"/> */}
            <img src={heroImg5} alt="heroImg6"/>
            {/* <img src={heroImg7} alt="heroImg7"/> */}
            <img src={heroImg7} alt="heroImg8"/>
        </div>
        <div className='HeroLeft'>
        {HeroSwitch===0&&<div className='Hero1'>
            <p>HotSalesNg</p>
            {/* <h2>Best Collections</h2> */}
        </div>}
        {HeroSwitch===1&&<div className='Hero2'>
            <p>HotSalesNg</p>
            {/* <h2>Best Deals</h2> */}
        </div>}
        {HeroSwitch===2&&<div className='Hero3'>
            <p>HotSalesNg</p>
            {/* <h2>Easy Shopping</h2> */}
        </div>}
        </div>
        <div className='HeroRight'>
            {/* <img src={heroImg5} alt="heroImg5"/> */}
            <img src={heroImg6} alt="heroImg6"/>
            {/* <img src={heroImg7} alt="heroImg7"/> */}
            <img src={heroImg8} alt="heroImg8"/>
        </div>
        
        <div className='CircleWrap'>
             <div className={HeroSwitch===0?'CircleActive':'Circle'}>
                </div>      
                <div className={HeroSwitch===1?'CircleActive':'Circle'}>
                </div> 
                <div className={HeroSwitch===2?'CircleActive':'Circle'}>
                </div> 
                             
        </div>
    </div>
  )
}

export default Hero
