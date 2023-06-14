import { useNavigate } from "react-router-dom";

function PayNow(service) {
    const navigate = useNavigate();
    var token = sessionStorage.getItem('token');
    var Username;
    var Usercontact;
    if(token == null){
      navigate("/login");
    }
    fetch('http://localhost:8080/api/customer/getInfo',{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
    .then(response =>{
      return response.json();
    })
    .then(data=>{
      if(data == null){
        navigate("/login");
      }
      Usercontact = data.person.mobileNumber;
      Username = data.person.email;
    })
    .catch(error => {
      console.error(error);
    })
    fetch('http://localhost:8080/api/order/create_order?amount='+service.amount, {
      method: 'POST',
      headers: {
        'Authorization' : token,
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var options = {
        key: 'rzp_test_PuP7Zb9GOv2EPt',
        amount: data.amount,
        currency: data.currency,
        name: 'AV Service',
        description: 'Service : '+service.service_name,
        image: '',
        order_id: data.id,
        handler: function(response) {
          fetch('http://localhost:8080/api/order/bookService',{
              method : 'POST',
              headers: {
                    'Authorization' : token,
                  'Content-Type': 'application/json'
              },
              body : JSON.stringify({
                  "amount" : response.amount,
                  "payment_method" : response.method,
                  "order" : {
                    "service" : {
                        "service_id" : service.service_id
                    }
                  },
                  "razorpayPaymentId" : response.razorpay_payment_id,
                  "razorpayOrderId" : response.razorpay_order_id,
                  "razorpaySignature" : response.razorpay_signature
              })
          })
          .then(function(response){
              return response.json();
          })
          .then(function(data){
            //show success message
              navigate("/");
          })
        },
        prefill: {
          name: Username,
          email: Useremail,
          contact: Usercontact
        }
      };
  
      var rzp1 = new Razorpay(options);
      rzp1.open();
    })
    .catch(function(error) {
      console.log("faileeeedddd");
      navigate("/services");
      console.error(error);
    });
  }