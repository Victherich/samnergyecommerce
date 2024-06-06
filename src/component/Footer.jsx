import React from 'react';
import '../CSS/Footer.css';
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/about-us" className="footer-link">About Us</a>
          <a href="/contact-us" className="footer-link">Contact Us</a>
        </div>
        <div className="footer-contact">
          <p>Email: samnergy@gmail.com</p>
          <p>Phone: +234 811 819 7054 </p>
        </div>
        <div className="footer-payment">
          <p>Payment Methods:</p>
          <ul>
            <li> <FaCcVisa/> Visa</li>
            <li><FaCcMastercard/> Mastercard</li>
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
