import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import PageNotFound from './components/PageNotFound';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';

function App() {

const cart = useSelector(state => state.cart);
const { cartItems } = cart;
const userSignin = useSelector( (state) => state.userSignin);
const { userInfo } =userSignin;

const dispatch = useDispatch();
const signoutHandler = () => {
     dispatch(signout());
};

  return (
       <BrowserRouter>
       <div className="grid-container">
           <header className="row medium">
               <div >
                 <Link to="/"><img src='/Images/trans.png' alt="Logo" width="300px" height="80px"/> </Link> 
               </div>
               
               <div style={{ justifyContent:"space-around", marginBottom:" 6px", marginLeft:"0px", marginRight:"20px"}} >
                    <div style={{ background:"#83d420", borderRadius:"10px", border:"white solid 1px",  backgroundSize:"0ex", padding:" 0px 5px"}} >
                            <h1>Your Own Market At Your Own Home </h1>
                    </div>
               </div>
           
               <div className="row" style={{marginLeft:"20px"}}>
                {
                     userInfo ? (
                          <div className="dropdown">
                            <Link to="#">
                                 {userInfo.name} <i className="fa fa-caret-down"></i> {' '}
                            </Link>
                            <ul className='dropdown-content'>
                                <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                            </ul>
                         </div>  
                     ) : (
                         <Link to="/signin">Sign In</Link> 
                     )
                } 
                <Link to="/cart">
                              <img src='/Images/cart.png' alt="Logo" width="70px" height="70px"/>
                              { cartItems.length > 0 &&(
                              <span className="badge">{ cartItems.length }</span>
                )} 
               
                </Link> 
              </div>
           </header>
           <main >
              <Routes>
                   <Route path="/shipping" element={ <ShippingAddressScreen />} />
                   <Route path="/cart" element={<CartScreen />} />
                   <Route path="/cart/:id" element={<CartScreen />} />
                   <Route path="/product/:id" element={ <ProductScreen /> } />
                   <Route path="/signin" element={ <SignInScreen />} />
                   <Route path="/register" element={ <RegisterScreen />} />
                   <Route path="/payment" element={ <PaymentMethodScreen />} />
                   <Route path="/placeorder" element={ <PlaceOrderScreen />} />
                   <Route exact path='/' element={<HomeScreen />} /> 
                   <Route element={ <PageNotFound /> } />
              </Routes>
           </main>

           <footer className="row center">
              All rights reserved
           </footer>
       </div>
       </BrowserRouter>
  );
}

export default App;