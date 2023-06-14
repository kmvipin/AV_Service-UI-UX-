import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './CustomerCartStyles.module.css';
import NavBar from './HomeComponent/NavBar';

const UserCart = () => {
  const [products,setProducts] = useState([]);
  const getOrders=()=>{
    const token = sessionStorage.getItem('token');
    if(token === null){
      console.error("First Login");
      return;
    }

    fetch('http://localhost:8080/api/customer/getCustomerOrders',{
      method : 'GET',
      headers : {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+token
      }
    })
    .then((response)=>{
      console.log("helllooooo");
      if(response.status === 401){
        console.error("Unauthorized User");
        return;
      }
      else{
        return response.json();
      }
    })
    .then((result)=>{
        if(result !== null){
          setProducts(result);
        }
        console.log(result);
    })
    .catch((error)=>console.error(error));
  }
  useEffect(()=>{
    getOrders();
  },[])

  const renderProducts = () => {
    return products.map((product) => (
      <CSSTransition key={product.service_id} timeout={500} classNames="fade">
        <div className={`${styles.productItem} ${styles.fade}`}>
          <div className={`${styles.productItemContent} flex items-center`}>
            <img
              src={`https://www.shutterstock.com/image-vector/shopping-cart-vector-icon-flat-260nw-1690453492.jpg`}
              alt={product.service.service_name}
              className={`${styles.productImage} w-16 h-16 object-cover rounded-md shadow-md mr-6`}
            />
            <div>
              <h2
                className={`${styles.productName} text-lg font-semibold mb-2`}
              >
                {product.service.service_name}
              </h2>
              <p className={`${styles.productDescription} text-gray-600`}>
                {product.service.message}
              </p>
            </div>
          </div>
          <div className={`${styles.productItemActions} flex items-center`}>
            <span
              className={`${styles.productPrice} text-lg font-semibold mr-4`}
            >
              {product.service.unit_price} Rs.
            </span>
            <button
              className={`${styles.removeButton} bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded`}
            >
              Remove
            </button>
            <text className={`${styles.status}`}>{product.status}</text>
          </div>
        </div>
      </CSSTransition>
    ));
  };

  return (
    <div className={styles.background}>
    <div className={`${styles.container} mx-auto p-4`}>
    <NavBar />
      {/* <h1 className={`${styles.title} text-3xl font-bold mb-6`}>Your Cart</h1> */}
      <br/><br/><br/>
      <TransitionGroup component={null}>{renderProducts()}</TransitionGroup>
      <div
        className={`${styles.totalSection} flex items-center justify-between mt-6`}
      >
        <h2 className={`${styles.total} text-xl font-semibold`}>
          Total: $74.97
        </h2>
        <button
          className={`${styles.checkoutButton} bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded`}
        >
          Checkout
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserCart;
