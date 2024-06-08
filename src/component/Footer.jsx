import React from 'react';
import '../CSS/Footer.css';
import {Link, useLocation} from 'react-router-dom'
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaNetworkWired, FaTwitter, FaWeebly, FaWeibo, FaWindowRestore } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation()
  return (
    <footer className={location.pathname==="/userlogin"||location.pathname==="/usersignup"?"footerdisappear":"footer"}>
      <div className="footer-container">
        
        <div className="footer-contact">
          <h2></h2>
     
          <FaWeibo/>

          <h4>HOT SALES NG</h4>
          <p>Email: samnergy@gmail.com</p>
          <p>Phone: +234 811 819 7054 </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to={"/"} className="footer-link">Home</Link>
          <Link to={"/aboutus"} className="footer-link">About us</Link>
          <Link to={"/foodmart"} className="footer-link">Food Mart</Link>
          <Link to={"/kitchenutensils"} className="footer-link">Kitchen Utensils</Link>
          <Link to={"/fashion"} className="footer-link">Fashion</Link>
          <Link to={"/cookinggasandaccessories"} className="footer-link">Cooking gas & accessories</Link>
          <Link to={"/bellyinn"} className="footer-link">Belly Inn</Link>
          <Link to={"/healthcare"} className="footer-link">Health Care</Link>
          <Link to={"/blog"} className="footer-link">Blog / Drop Shipping</Link>
          <Link to={"/buyandsellfood"} className="footer-link">Buy and sell food</Link>
       
        </div>
        <div className="footer-payment">
          <h4>Payment Methods:</h4>
          <ul>
            <p> <FaCcVisa/> Visa</p>
            <p><FaCcMastercard/> Mastercard</p>
            {/* <li>PayPal</li> */}
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-link"><FaFacebook/></a>
          <a href="https://twitter.com" className="social-link"><FaTwitter/></a>
          <a href="https://instagram.com" className="social-link"><FaInstagram/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
