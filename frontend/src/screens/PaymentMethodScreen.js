import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen() {

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector( (state)=> state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {

        if(!userInfo) {
            navigate('/signin');
        }
        if(!shippingAddress.address){
            navigate('/shipping');
          }
      });
    
    const [paymentMethod, setPaymentMethod ] = useState('Paypal');
  
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod( paymentMethod ));
        navigate('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={ submitHandler }>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" 
                               id="paypal" 
                               value="Paypal" 
                               name="paymentMethod" 
                               required 
                               checked 
                               onChange= { (e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" 
                               id="stripe" 
                               value="Stripe" 
                               name="paymentMethod" 
                               required 
                               onChange= { (e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" 
                               id="phonepe" 
                               value="Phonepe" 
                               name="paymentMethod" 
                               required
                               onChange= { (e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="phonepe">Phonepe</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" 
                               id="paytm" 
                               value="Paytm" 
                               name="paymentMethod" 
                               required
                               onChange= { (e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="paytm">Paytm</label>
                    </div>
                    <div>
                        <button className="primary" type="submit" >Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
