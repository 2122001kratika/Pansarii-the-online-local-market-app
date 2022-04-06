import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen() {
    
    const cart = useSelector( (state) => state.cart );
    const navigate = useNavigate();
    useEffect( () => {
    if(!cart.paymentMethod){
        navigate('/payment');
    }
   });
    const toPrice = (num) => Number(num.toFixed(2));//5.123 => "5.12" =>5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemPrice > 1000? toPrice(0): toPrice(50);
    cart.taxPrice = toPrice(0.10 * cart.itemPrice);
    cart.totalPrice = toPrice(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

    const placeOrderHandler = () =>{
       //TODO: dispatch place order section
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top">
                 <div className="col-2">
                     <ul>
                         <li>
                             <div className="card card-cody">
                                 <h2>Shipping</h2>
                                 <p>
                                     <strong>Name:</strong> { cart.shippingAddress.fullName } <br />
                                     <strong>Address:</strong> { cart.shippingAddress.address} <br />
                                     { cart.shippingAddress.city }, { cart.shippingAddress.postalCode }, 
                                     { cart.shippingAddress.country }  
                                 </p>
                             </div>
                         </li>
                         <li>
                             <div className="card card-cody">
                                 <h2>Payment</h2>
                                 <p>
                                     <strong>Method:</strong> { cart.paymentMethod } 
                                 </p>
                             </div>
                         </li>
                         <li>
                             <div className="card card-cody">
                                 <h2>OrderItems</h2>
                                 <ul>
                                    {cart.cartItems.map( (item) => (
                                        <li key={item.product}> 
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                                            </div>
                                        </div>
                                        </li>
                                       ))
                                    }
                                 </ul>
                             </div>
                         </li>
                     </ul>
                 </div>
                 <div className="col-1">
                     <div className='card card-body'>
                         <ul>
                             <li>
                                 <h2>Order Summary</h2>
                             </li>
                             <li>
                                 <div className="row">
                                   <div>Items</div>
                                   <div>Rs.{cart.itemsPrice.toFixed(2)}</div>
                                 </div>
                             </li>
                             <li>
                                 <div className="row">
                                   <div>Shipping</div>
                                   <div>Rs.{cart.shippingPrice.toFixed(2)}</div>
                                 </div>
                             </li>
                             <li>
                                 <div className="row">
                                   <div>Tax</div>
                                   <div>Rs.{cart.taxPrice.toFixed(2)}</div>
                                 </div>
                             </li> <li>
                                 <div className="row">
                                   <div><strong>Order Total</strong></div>
                                   <div><strong>Rs.{cart.totalPrice.toFixed(2)}</strong></div>
                                 </div>
                             </li>
                             <li>
                                 <button type="button" 
                                         onClick={placeOrderHandler} 
                                         className="primary proceed"
                                         disabled={cart.cartItems.length === 0}>
                                     Place Order
                                 </button>
                             </li>
                         </ul>
                     </div>
                 </div>
            </div>
        </div>
    )
}
