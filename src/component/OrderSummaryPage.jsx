import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import '../CSS/OrderSummaryPage.css';
import { Context } from './Context';
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux';
import { clearCart, handleUserAllOrder } from '../Features/Slice';
// import PaystackButton from 'react-paystack';
import PaystackPop from "@paystack/inline-js"
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
import axios from 'axios';




const deliveryFees = {
    Abia: { Umuahia: 3000, Aba: 3000, Ohafia: 3000, Arochukwu: 3000 },
    Adamawa: { Yola: 3000, Mubi: 3000, Jimeta: 3000, Numan: 3000 },
    AkwaIbom: { Uyo: 3000, Eket: 3000, "Ikot Ekpene": 3000, Oron: 3000 },
    Anambra: { Awka: 3000, Onitsha: 3000, Nnewi: 3000, Ekwulobia: 3000 },
    Bauchi: { Bauchi: 3000, Azare: 3000, Misau: 3000, "Jama'are": 3000 },
    Bayelsa: { Yenagoa: 3000, Ogbia: 3000, Sagbama: 3000, Brass: 3000 },
    Benue: { Makurdi: 3000, Gboko: 3000, Otukpo: 3000, "Katsina-Ala": 3000 },
    Borno: { Maiduguri: 3000, Biu: 3000, Bama: 3000, Chibok: 3000 },
    CrossRiver: { Calabar: 3000, Ikom: 3000, Obudu: 3000, Ugep: 3000 },
    Delta: { Asaba: 3000, Warri: 3000, Sapele: 3000, Ughelli: 3000 },
    Ebonyi: { Abakaliki: 3000, Afikpo: 3000, Onueke: 3000, Ezza: 3000 },
    Edo: { "Benin City": 3000, Ekpoma: 3000, Auchi: 3000, Uromi: 3000 },
    Ekiti: { "Ado-Ekiti": 3000, "Ikere-Ekiti": 3000, Iworoko: 3000, "Omuo-Ekiti": 3000 },
    Enugu: { Enugu: 3000, Nsukka: 3000, Agbani: 3000, Awgu: 3000 },
    Gombe: { Gombe: 3000, Kaltungo: 3000, Bajoga: 3000, Dukku: 3000 },
    Imo: { Owerri: 3000, Orlu: 3000, Okigwe: 3000, Mbaise: 3000 },
    Jigawa: { Dutse: 3000, Hadejia: 3000, Kazaure: 3000, Gumel: 3000 },
    Kaduna: { Kaduna: 3000, Zaria: 3000, Kafanchan: 3000, Kagoro: 3000 },
    Kano: { Kano: 3000, Wudil: 3000, Gwarzo: 3000, Rano: 3000 },
    Katsina: { Katsina: 3000, Funtua: 3000, Daura: 3000, Malumfashi: 3000 },
    Kebbi: { "Birnin Kebbi": 3000, Argungu: 3000, Yauri: 3000, Zuru: 3000 },
    Kogi: { Lokoja: 3000, Okene: 3000, Idah: 3000, Kabba: 3000 },
    Kwara: { Ilorin: 3000, Offa: 3000, "Omu-Aran": 3000, Jebba: 3000 },
    Lagos: { Ikeja: 3000, "Lagos Island": 3000, Epe: 3000, Badagry: 3000 },
    Nasarawa: { Lafia: 3000, Keffi: 3000, Akwanga: 3000, Karu: 3000 },
    Niger: { Minna: 3000, Suleja: 3000, Kontagora: 3000, Bida: 3000 },
    Ogun: { Abeokuta: 3000, "Ijebu-Ode": 3000, Sagamu: 3000, Ota: 3000 },
    Ondo: { Akure: 3000, "Ondo City": 3000, Owo: 3000, Ikare: 3000 },
    Osun: { Osogbo: 3000, "Ile-Ife": 3000, Ilesa: 3000, Ede: 3000 },
    Oyo: { Ibadan: 3000, "Oyo Town": 3000, Ogbomosho: 3000, Iseyin: 3000 },
    Plateau: { Jos: 3000, "Barkin Ladi": 3000, Pankshin: 3000, Shendam: 3000 },
    Rivers: { "Port Harcourt": 3000, Bonny: 3000, Ahoada: 3000, Omoku: 3000 },
    Sokoto: { Sokoto: 3000, Wurno: 3000, Illela: 3000, Tambuwal: 3000 },
    Taraba: { Jalingo: 3000, Wukari: 3000, Bali: 3000, Takum: 3000 },
    Yobe: { Damaturu: 3000, Potiskum: 3000, Nguru: 3000, Gashua: 3000 },
    Zamfara: { Gusau: 3000, "Kaura Namoda": 3000, "Talata Mafara": 3000, Zaria: 3000 },
    FCT: { Abuja: 3000, Gwagwalada: 3000, Kuje: 3000, Bwari: 3000 }
  };
  
  // console.log(deliveryFees);
    

const OrderSummaryPage = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
  const user = useSelector((state) => state.DeliveryDetail);
  const cart = useSelector((state) => state.cart);
  const {loading,setLoading,dashContent,setDashContent,userAllOrders,setUserAllOrders}=useContext(Context)

  const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * 1000 * item.qty, 0);
    const deliveryFee = deliveryFees[user.state]?.[user.city] || 0;
    return total + deliveryFee;
  };


  const handleLoading=()=>{
    const load = setTimeout(()=>{
      setLoading(true)
    },100)

    const stopLoad = setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  const generateOrderRef = () => {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  };

  const [isChecked,setIsChecked]=useState(false)
  const email = user.email;
  const amount= calculateTotal();
  const firstname=user.firstName
  const lastname= user.lastName

  const deliveryCharge = new Intl.NumberFormat().format(deliveryFees[user.state]?.[user.city] || 0)

  const handleOrderNow2 = async (reference) => {
    setLoading(true)

    const getCurrentDateTime = () => {
      const now = new Date();
      // Calculate the timezone offset in milliseconds
      const offset = now.getTimezoneOffset() * 60000;
      // Adjust the time to the local time
      const localTime = new Date(now.getTime() - offset);
      // Convert to a readable format
      return localTime.toISOString().slice(0, 19).replace("T", " ");
    };
    
    const orderSummary = {
      date:getCurrentDateTime(),
      deliveryCharge:deliveryCharge,
      transactionRef:reference,
    orderRef:generateOrderRef(),
      firstName: user.firstName,
      lastName: user.lastName, 
      phone: user.phone,
      email: user.email,
      address: user.address,
      state: user.state,
      city: user.city,
      cartItems: cart.map((item) => `${item.title} - ${item.qty} x ₦${new Intl.NumberFormat().format(item.price * 1000)}`),
      total: `₦ ${new Intl.NumberFormat().format(calculateTotal())}`
    };
// dispatch(handleUserAllOrder(orderSummary))
// setUserAllOrders([...userAllOrders,{orderSummary}])

console.log(orderSummary)
try {
  const response = await axios.post('http://localhost:3000/send-order-summary', {
    buyerEmail: user.email,
    sellerEmail: 'digitalpremiumtech@gmail.com',
    orderSummary: JSON.stringify(orderSummary, null, 2)
    
  });

  if (response.status === 200) {
    Swal.fire({ icon: "success", text: "Order confirmed, Please check your email for details" });
    dispatch(handleUserAllOrder(orderSummary))
    dispatch(clearCart());
    navigate("/userdashboard")
    setDashContent(1)
  } else {
    Swal.fire({ icon: "error", text: "Failed to send order summary." });
  }
} catch (error) {
  Swal.fire({ icon: "error", text: "An error occurred while sending the order summary." });
}finally{
        setLoading(false)
    }
  };


  //handling payment on deliery order
  const handleOrderNow3 = async () => {
    setLoading(true)
    const loadingAlert = Swal.fire({
            title: "Loading",
            text: "Please wait...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false
          });
        
          Swal.showLoading();

    const getCurrentDateTime = () => {
      const now = new Date();
      // Calculate the timezone offset in milliseconds
      const offset = now.getTimezoneOffset() * 60000;
      // Adjust the time to the local time
      const localTime = new Date(now.getTime() - offset);
      // Convert to a readable format
      return localTime.toISOString().slice(0, 19).replace("T", " ");
    };
    

    const orderSummary = {
      date: getCurrentDateTime(),
      transactionRef:"Payment on delivery",
    orderRef:generateOrderRef(),
    deliveryCharge:deliveryCharge,
      firstName: user.firstName,
      lastName: user.lastName, 
      phone: user.phone,
      email: user.email,
      address: user.address,
      state: user.state,
      city: user.city,
      cartItems: cart.map((item) => `${item.title} - ${item.qty} x ₦${new Intl.NumberFormat().format(item.price * 1000)}`),
      total: `₦ ${new Intl.NumberFormat().format(calculateTotal())}`
    };

    try {
      const response = await axios.post('http://localhost:3000/send-order-summary', {
        buyerEmail: user.email,
        sellerEmail: 'digitalpremiumtech@gmail.com',
        orderSummary: JSON.stringify(orderSummary, null, 2)
        
      });

      if (response.status === 200) {
        Swal.fire({ icon: "success", text: "Order confirmed, Please check your email for details" });
        dispatch(handleUserAllOrder(orderSummary))
        dispatch(clearCart());
        navigate("/userdashboard")
        setDashContent(1)
      } else {
        Swal.fire({ icon: "error", text: "Failed to send order summary." });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "An error occurred while sending the order summary." });
    } finally{
        setLoading(false)
        loadingAlert.close();
    }
  };







  // const handleOrderNow = ()=>{
  //   if(isChecked){
  //       handleLoading()
  //       // handleOrderNow2()
  //       alert("payment on delivery")
        
  //   }else{
  //       handleLoading()
  //       alert("pay now on paystack")
  //   }
  // }

  const handleOrderNow = () => {
    handleLoading();
    if (isChecked) {
      handleOrderNow3()
    } else {
      payWithPaystack();
    }
  };

 

  const payWithPaystack = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      amount: amount * 100, // amount in kobo
      email: email,
      firstname: firstname,
      lastname: lastname,
      onSuccess: (transaction) => {
        // handle successful payment
        // dispatch(clearCart());
        Swal.fire({ icon: "success", text: "Payment successful!", showConfirmButton: true });
        // navigate("/userdashboard")
        // setDashContent(1)
        handleOrderNow2(transaction.reference)
        
      },
      onCancel: () => {
        // handle payment cancellation
        Swal.fire({ icon: "error", text: "Payment cancelled.", showConfirmButton: true });
      },
      onError: (error) => {
        // handle payment errors
        Swal.fire({ icon: "error", text: `Payment failed: ${error.message}`, showConfirmButton: true });
      }
    });
  };



  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="user-info">
        <h3>Delivery Information</h3>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>City:</strong> {user.city}</p>
      </div>
      <div className="cart-info">
        <h3>Cart Items</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
                <img src={item.image} alt="summaryImage"/>
              <p>{item.title} - {item.qty} x ₦ {new Intl.NumberFormat().format(item.price*1000)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="total-info">
        <h3>Total</h3>
        <p><strong>Subtotal:</strong> ₦ {new Intl.NumberFormat().format(cart.reduce((sum, item) => sum + item.price *1000 * item.qty, 0))}</p>
        <p><strong>Delivery Fee:</strong> ₦ {new Intl.NumberFormat().format(deliveryFees[user.state]?.[user.city] || 0)}</p>
        <p><strong>Grand Total:</strong> ₦{new Intl.NumberFormat().format(calculateTotal())}</p>
      </div>
      <div className='CheckBoxWrap'><input type="checkbox" isChecked={isChecked} onClick={()=>setIsChecked(!isChecked)}/> <p>Payment on delivery</p></div>      
{isChecked?<button onClick={handleOrderNow}>Order Now</button>:
<button type="button" onClick={payWithPaystack}>Pay Now</button>}

            {/* call the paystack form here  */}
            {/* <form id="paymentForm">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email-address" required value={email}  />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="tel" id="amount" required value={amount}  />
        </div>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" value={firstname} />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={lastname} />
        </div>
        <div className="form-submit">
          
        </div>
      </form> */}
    </div>

  );
};

export default OrderSummaryPage;
