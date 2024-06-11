import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Swal from 'sweetalert2';
import { FaBackward, FaHome } from 'react-icons/fa';
// import Header from '../components/Header';
import Logo from '../Images/c1-removebg-preview.png';
import '../CSS/ContactUs.css';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', message: '' });
    const [formErrors, setFormErrors] = useState({ fullName: '', email: '', phoneNumber: '', message: '' });
    const [state, handleSubmit] = useForm('mnqervvv');
    const [firstClick,setHandleFristClick]=useState(false)

   

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName) {
            errors.fullName = 'Please enter your full name';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Please enter your phone number';
        }
        setFormErrors(errors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if(firstClick===true){
            validateForm();
        }
    }, [formData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setHandleFristClick(true)
        validateForm();
        if (Object.keys(formErrors).length === 0) {
            Swal.fire({
                title: 'Loading',
                text: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                timer: 2000
            });
            Swal.showLoading();
            handleSubmit(e);
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    if (state.succeeded) {
        Swal.fire({ icon: 'success', showConfirmButton: false, timer: 2000 });
        return (
            <div className="form-submit-ui-wrap">
                <div className="form-submit-ui">
                    <img src={Logo} alt="Logo" />
                    <p>Your request has been submitted. We will get back to you soon. Thanks.</p>
                    <button onClick={()=>navigate("/")}><FaHome/>Home</button>
                </div>
            </div>
        );
    }

    const handleLocation = () => {
        window.history.back();
    };

    return (
        <div className="contact-us-wrap">
            {/* <Header /> */}
            <div className="contact-us">
                <div className="contact-us-header">
                    <h1>Contact Us</h1>
                </div>
                <div className="contact-us-body">
                    <div className="contact-us-body-left">
                        <form onSubmit={handleFormSubmit}>
                            <label className='FormLabel'>
                                <div className="input-label-child">
                                    <p>Enter Full Name:</p>
                                    <input
                                        id="fullName"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Eg. John Ani"
                                        required
                                    />
                                </div>
                                {formErrors.fullName && <p className="error-text">{formErrors.fullName}</p>}
                            </label>
                            <label className='FormLabel'>
                                <div className="input-label-child">
                                    <p>Enter Email Address:</p>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@gmail.com"
                                        required
                                    />
                                </div>
                                {formErrors.email && <p className="error-text">{formErrors.email}</p>}
                            </label>
                            <label className='FormLabel'>
                                <div className="input-label-child">
                                    <p>Enter Phone Number:</p>
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Eg. 07063448446"
                                        required
                                    />
                                </div>
                                {formErrors.phoneNumber && <p className="error-text">{formErrors.phoneNumber}</p>}
                            </label>
                            <label cla>
                                <div className="input-label-child">
                                    <p>Message (optional):</p>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please enter your message here"
                                    />
                                </div>
                                {formErrors.message && <p className="error-text">{formErrors.message}</p>}
                            </label>
                            <div className="submit-button-wrap">
                                <button type="submit" disabled={state.submitting}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="contact-us-body-right">
                        <img src={Logo} alt="Contact us" />
                    </div>
                </div>
                {/* <div className="back-button-wrap">
                    <button onClick={handleLocation}><FaBackward /> Back</button>
                </div> */}
            </div>
       
        </div>
    );
};

export default ContactUs;
