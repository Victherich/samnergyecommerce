import React from 'react';
import '../CSS/AboutUsPage.css';
import ab1 from "../Images/ab1.jpeg"
import ab2 from "../Images/ab2.jpeg"
import ab3 from "../Images/ab3.jpeg"
import ab4 from "../Images/ab4.jpeg"
import ab5 from "../Images/ab5.jpeg"


const AboutUsPage = () => {
    return (
        <div className="about-us">
            <section className="section who-we-are">
                <img src={ab1} alt="Who We Are" className="section-image"/>
                <h2>Who We Are</h2>
                <p>
                    Welcome to Hot Sale NG, your ultimate destination for a diverse range of products including food mart essentials, kitchen utensils, fashion under our exclusive SamtoClassics line, cooking gas and accessories, Belly Inn delicacies, healthcare products from Healthy Stop, and an engaging blog with drop shipping opportunities. We also offer a unique platform for buying and selling food through free public accounts.
                </p>
            </section>
            <section className="section what-we-do">
                <img src={ab2} alt="What We Do" className="section-image"/>
                <h2>What We Do</h2>
                <p>
                    At Hot Sale NG, we strive to provide high-quality products at competitive prices. Our vast product categories ensure that you find everything you need in one place. We believe in convenience, quality, and customer satisfaction. From everyday grocery items to the latest fashion trends, we have something for everyone.
                </p>
            </section>
            <section className="section our-accomplishments">
                <img src={ab3} alt="Our Accomplishments" className="section-image"/>
                <h2>Our Accomplishments</h2>
                <ul>
                    <li><strong>Diverse Product Range:</strong> Successfully expanded our product categories to cater to a wide array of customer needs.</li>
                    <li><strong>Customer Satisfaction:</strong> Achieved a high customer satisfaction rate with consistent positive feedback.</li>
                    <li><strong>Community Engagement:</strong> Built a thriving community of buyers and sellers with our buy and sell food platform.</li>
                    <li><strong>Innovation:</strong> Continuously innovating our services to include the latest market trends and customer preferences.</li>
                </ul>
            </section>
            <section className="section our-mission">
                <img src={ab4} alt="Our Mission" className="section-image"/>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to create a seamless shopping experience for our customers by offering a wide range of high-quality products and exceptional customer service. We aim to be a one-stop shop for all your needs, making online shopping simple, enjoyable, and rewarding.
                </p>
            </section>
            <section className="section our-vision">
                <img src={ab5} alt="Our Vision" className="section-image"/>
                <h2>Our Vision</h2>
                <p>
                    We envision becoming the leading e-commerce platform in Nigeria, known for our diverse product offerings, excellent customer service, and a strong community of buyers and sellers. We aim to set the standard for online shopping in the region by continuously improving and expanding our services.
                </p>
            </section>
        </div>
    );
};

export default AboutUsPage;
