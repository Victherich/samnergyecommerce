

import React, { useState, useEffect, useContext } from 'react';
import '../CSS/FeaturedCollections.css';
import { FaHeart, FaHeartCirclePlus } from 'react-icons/fa6';
import { FaArrowCircleLeft, FaArrowCircleRight, FaBackspace, FaHeartBroken } from 'react-icons/fa';
import p1 from "../Images/p1a__1_-removebg-preview.png";
import p2 from "../Images/p1a__2_-removebg-preview.png";
import p3 from "../Images/p1a__1_-removebg-preview.png";
import p4 from "../Images/p1a__1_-removebg-preview (1).png";
import p5 from "../Images/p2 (1).jpeg";
import p6 from "../Images/p2 (1).png";
import p7 from "../Images/p2 (2).png";
import p8 from "../Images/p2 (3).png";
import p9 from "../Images/p3 (1).jpeg";
import p10 from "../Images/p3 (1).png";
import p11 from "../Images/p3 (2).png";
import p12 from "../Images/p3 (3).png";
import p13 from "../Images/p4 (1).jpeg";
import p14 from "../Images/p4 (1).png";
import p15 from "../Images/p4 (2).png";
import p16 from "../Images/p4 (3).png";
import { useNavigate } from 'react-router-dom';
import Photo6 from "../Images/heroimg3.jpeg"
import colImg from "../Images/cat1.jpeg"
import axios from 'axios';
import { Context } from './Context';
import { Link } from 'react-router-dom';

const CookingGasAndAccessories = () => {
    const {loading,setLoading,Data,handleDataDetail}=useContext(Context)
    const navigate=useNavigate()



    const data = [
        {
            id: 1,
            title: "Organic Apples",
            description: "Fresh and organic apples, straight from the farm.",
            price: "500 000",
            images: [p1, p2, p3, p4]
        },
        {
            id: 2,
            title: "Stainless Steel Knife Set",
            description: "High-quality stainless steel knife set, perfect for any kitchen.",
            price: "700 000",
            images: [p5, p6, p7, p8]
        },
        {
            id: 3,
            title: "Classic White T-Shirt",
            description: "Comfortable and stylish classic white t-shirt.",
            price: "900 000",
            images: [p9, p10, p11, p12]
        },
        {
            id: 4,
            title: "Propane Gas Cylinder",
            description: "20 lb propane gas cylinder, ideal for grilling.",
            price: "1 000 000",
            images: [p16, p14, p15, p13]
        }
    ];

    
    const [data2,setData2]=useState([])
    useEffect(()=>{
            setData2([...data.reverse()])
    },[])

const handleNavigate=()=>{
    navigate("/productdetailpage")
}


const style1 ={
    backgroundImage: `url(${colImg})`
}

    return (
        <div className='FeaturedCollections FeaturedCollectionsB'>
            <div className='FeaturedCollectionHeaderImgWrap' style={style1}><h1>COOKING GAS AND ACCESSORIES</h1></div>
            
            <div className='Collections'>
                {Data.slice(8,14).map((d)=>(
                    <Link to={'/productdetailpage'} className='ProductCard2' key={d.id} onClick={()=>handleDataDetail(d.id)}>
                    <div className='CardUp'>
                          <img src={d.image} alt="photo"/>
                    </div>
                    <div className='CardDown'>
                      <p>{d.title.slice(0,13)}...</p>
                      <span>₦ {new Intl.NumberFormat().format(d.price * 1000)}</span>
                    </div>
                  </Link>
                ))}

            </div>
            
        </div>
    );
};

export default CookingGasAndAccessories;

