  // DeliveryDetailPage.js
  import React, { useContext } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { updateField } from '../Features/Slice';
  import '../CSS/DeliveryDetailPage.css';
  import Swal from 'sweetalert2'
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", 
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", 
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", 
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
  ];

  const cities = {
    Abia: ["Umuahia", "Aba", "Ohafia", "Arochukwu"],
    Adamawa: ["Yola", "Mubi", "Jimeta", "Numan"],
    AkwaIbom: ["Uyo", "Eket", "Ikot Ekpene", "Oron"],
    Anambra: ["Awka", "Onitsha", "Nnewi", "Ekwulobia"],
    Bauchi: ["Bauchi", "Azare", "Misau", "Jama'are"],
    Bayelsa: ["Yenagoa", "Ogbia", "Sagbama", "Brass"],
    Benue: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala"],
    Borno: ["Maiduguri", "Biu", "Bama", "Chibok"],
    CrossRiver: ["Calabar", "Ikom", "Obudu", "Ugep"],
    Delta: ["Asaba", "Warri", "Sapele", "Ughelli"],
    Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Ezza"],
    Edo: ["Benin City", "Ekpoma", "Auchi", "Uromi"],
    Ekiti: ["Ado-Ekiti", "Ikere-Ekiti", "Iworoko", "Omuo-Ekiti"],
    Enugu: ["Enugu", "Nsukka", "Agbani", "Awgu"],
    Gombe: ["Gombe", "Kaltungo", "Bajoga", "Dukku"],
    Imo: ["Owerri", "Orlu", "Okigwe", "Mbaise"],
    Jigawa: ["Dutse", "Hadejia", "Kazaure", "Gumel"],
    Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Kagoro"],
    Kano: ["Kano", "Wudil", "Gwarzo", "Rano"],
    Katsina: ["Katsina", "Funtua", "Daura", "Malumfashi"],
    Kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru"],
    Kogi: ["Lokoja", "Okene", "Idah", "Kabba"],
    Kwara: ["Ilorin", "Offa", "Omu-Aran", "Jebba"],
    Lagos: ["Ikeja", "Lagos Island", "Epe", "Badagry"],
    Nasarawa: ["Lafia", "Keffi", "Akwanga", "Karu"],
    Niger: ["Minna", "Suleja", "Kontagora", "Bida"],
    Ogun: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota"],
    Ondo: ["Akure", "Ondo City", "Owo", "Ikare"],
    Osun: ["Osogbo", "Ile-Ife", "Ilesa", "Ede"],
    Oyo: ["Ibadan", "Oyo Town", "Ogbomosho", "Iseyin"],
    Plateau: ["Jos", "Barkin Ladi", "Pankshin", "Shendam"],
    Rivers: ["Port Harcourt", "Bonny", "Ahoada", "Omoku"],
    Sokoto: ["Sokoto", "Wurno", "Illela", "Tambuwal"],
    Taraba: ["Jalingo", "Wukari", "Bali", "Takum"],
    Yobe: ["Damaturu", "Potiskum", "Nguru", "Gashua"],
    Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara", "Zaria"],
    FCT: ["Abuja", "Gwagwalada", "Kuje", "Bwari"]
  };
  
  
  
  console.log(cities);
  
  const DeliveryDetailPage = () => {
    const navigate=useNavigate()
    const {loading,setLoading}=useContext(Context)
    const dispatch = useDispatch();
    const form = useSelector((state) => state.DeliveryDetail);

    const handleChange = (field, value) => {
      dispatch(updateField({ field, value }));
    };

    const handleStateChange = (e) => {
      handleChange('state', e.target.value);
      handleChange('city', ''); // Reset city when state changes
    };


    const handleLoading=()=>{
      const load = setTimeout(()=>{
        setLoading(true)
      },100)
  
      const stopLoad = setTimeout(()=>{
        setLoading(false)
      },1000)
    }
  

    const handleSubmit = (e)=>{
      
      e.preventDefault();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(form.phone!==form.confirmPhone){
        Swal.fire({icon:"warning",text:"Phone numbers does not match",timer:2000,showConfirmButton:false})
      }else if(!regex.test(form.email)){
        Swal.fire({icon:"warning",text:"Please enter valid email",timer:2000,showConfirmButton:false})
      }else{
        handleLoading()
        navigate("/ordersummarypage")
      }
    }

    return (
      <div className="delivery-form-container">
        <h1>DELIVERY INFORMATION</h1>
        <form className="delivery-form" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input 
              type="text" 
              value={form.fullName} 
              onChange={(e) => handleChange('fullName', e.target.value)} 
              required
            />
          </label>
          <label>
            Phone:
            <input 
              type="text" 
              value={form.phone} 
              onChange={(e) => handleChange('phone', e.target.value)} 
              required
            />
          </label>
          <label>
            Confirm Phone:
            <input 
              type="text" 
              value={form.confirmPhone} 
              onChange={(e) => handleChange('confirmPhone', e.target.value)} 
              required
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={form.email} 
              onChange={(e) => handleChange('email', e.target.value)} 
              required
            />
          </label>
          <label>
            Address:
            <input 
              type="text" 
              value={form.address} 
              onChange={(e) => handleChange('address', e.target.value)}
               required
            />
          </label>
          <label>
            State:
            <select value={form.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <label>
            City:
            <select value={form.city} onChange={(e) => handleChange('city', e.target.value)} required>
              <option value="">Select City</option>
              {(cities[form.state] || []).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <button style={{backgroundColor:"green",
          color:"white",
          border:"none",
          borderRadius:"5px",
          padding:"10px 20px",
          cursor:"pointer",
          fontSize:"0.9rem"}}>Proceed</button>
        </form>
      </div>
    );
  };

  export default DeliveryDetailPage;
