import React from 'react';
import Header from './component/Header';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import Footer from './component/Footer';
import FoodMart from './component/FoodMart';
import KitchenUtensils from './component/KitchenUtensils';
import Fashion from './component/Fashion';
import CookingGasAndAcc from './component/CookingGasAndAcc';
import BellyInn from './component/BellyInn';
import HealthCare from './component/HealthCare';
import SearchResult from './component/SearchResult';
import ProductDetailPage from './component/ProductDetailPage';
import ScrollToTop from './component/ScrollToTop';
import CartPage from './component/CartPage';
import WishList from "./component/WishList";
import DeliveryDetailPage from './component/DeliveryDetailPage';
import OrderSummaryPage from './component/OrderSummaryPage';
import UserDashboard from './component/UserDashboard';
import UserSignUp from './component/UserSignUp';
import UserLogin from './component/UserLogin';
import UserPrivate from './component/UserPrivate';
import DelieryDetailPrivate from './component/DelieryDetailPrivate';
import OrderSummaryPrivate from './component/OrderSummaryPrivate';
import EmailRedirectPage from './component/EmailRedirectPage';
import VerifyEmail from './component/VerifyEmail';
import AboutUsPage from './component/AboutUsPage';
import ContactUs from './component/ContactUs';
import ForgotPasswordPage from './component/ForgotPasswordPage';
import ResetPasswordPage from './component/ResetPasswordPage';


const App = () => {
  
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/foodmart" element={<FoodMart/>}/>
          <Route path="/kitchenutensils" element={<KitchenUtensils/>}/>
          <Route path="/fashion" element={<Fashion/>}/>
          <Route path="/cookinggasandaccessories" element={<CookingGasAndAcc/>}/>
          <Route path="/bellyinn" element={<BellyInn/>}/>
          <Route path ="/healthcare" element={<HealthCare/>}/>
          <Route path="/searchresult" element={<SearchResult/>}/>
          <Route path="/productdetailpage" element={<ProductDetailPage/>}/>
          <Route path="/cartpage" element={<CartPage/>}/>
          
          <Route path="/usersignup" element={<UserSignUp/>}/>
          <Route path="/userlogin" element={<UserLogin/>}/>

          <Route element={<UserPrivate/>}>
          <Route path="/userdashboard" element={<UserDashboard/>}/>    
          </Route>

          <Route element = {<DelieryDetailPrivate/>}>
          <Route path="/deliverydetailpage" element={<DeliveryDetailPage/>}/>
          </Route>

          <Route element={<OrderSummaryPrivate/>}>
          <Route path="/ordersummarypage" element={<OrderSummaryPage/>}/>
          </Route>

          <Route path="/emailredirectpage" element={<EmailRedirectPage/>}/>
          <Route path="/verify/:token" element={<VerifyEmail/>} />
          <Route path="/aboutus" element={<AboutUsPage/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path= "/forgotpassword" element={<ForgotPasswordPage/>}/>
          <Route path="/resetpassword/:token" element={<ResetPasswordPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
