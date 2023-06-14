import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SellerServices.module.css';
import SellerNavbar from "./SellerNavbar";
import logodetail from "../Assets/carpenter.png";
import AddServices from "./AddServices";
import ACImage from "../Assets/AC.png"

const SellerServices = () =>{
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleShowFormChange = (value) => {
    setShowAddServiceForm(value);
  };
  const handleRemove = (id) => {
    var token = sessionStorage.getItem('token');
    if(token == null){
      //return 
    }

    fetch('http://localhost:8080/api/service/removeService?service_id='+id,{
      method : 'DELETE',
      headers : {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+token
      }
    })
    .then(res =>{
        if(res.status === 200){
          //show success message
          return navigate('/sellerservice');
        }
        else if(res.status == 401){
          //return navigate('/login');
          //show error to login
        }
        else if(res.status === 404){
          //show error service not found
        }
        else{
          //show error page something went wrong
        }
    })
    .catch((error)=>console.error(error))
  };
function displayServices(){
  
    var token = sessionStorage.getItem('token');
    if(token == null){
        //return navigate('/login');
    }
    fetch('http://localhost:8080/api/seller/getServices',{
        method : 'GET',
        headers : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer '+token
        }
    })
    .then(res =>{
        if(res.status == 401){
            return navigate('/login');
        }
        return res.json();
    })
    .then(result =>{
        console.log(result);
        setData(result);
    })
} 

useEffect(()=>
{
    displayServices();
},[])
    return (
     <>
<SellerNavbar />
      {showAddServiceForm && <AddServices setShowAddServiceForm={handleShowFormChange}/>}
        <div className={styles.serheader}>
        <button onClick={() => setShowAddServiceForm(!showAddServiceForm)} className={styles.serbtn} id="load-btn">Add new service <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg"/></button>
        </div>
        <div>
        <div className={styles.services}>
          {data.map(data => (
            <div className={styles.service} key={data.service_id}>
            {data.category_name === 'AC' ? 
            <img src={ACImage} alt={data.service_name} className={styles['service-image']} />
            :
            <img src={logodetail} alt={data.service_name} className={styles['service-image']} />
            }
              
              <h2 className={styles['service-name']}>{data.service_name}</h2>
              <p className={styles.description}>{data.message}</p>
              <p className={styles.cost}>{data.unit_price} Rs.</p>
              <button className={styles['remove-button']} onClick={() => handleRemove(data.service_id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
        {/* <nav>
        <ul>
            <li><a href="#">My services</a></li>

        </ul>
        </nav> */}
      </>
    );
}

export default SellerServices;