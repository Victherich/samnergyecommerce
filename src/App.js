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
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/deliverydetailpage" element={<DeliveryDetailPage/>}/>
          <Route path="/ordersummarypage" element={<OrderSummaryPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
