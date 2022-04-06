import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removefromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {

    const productId  = useParams().id ;
    let location = useLocation();
    const navigate = useNavigate();
    const qty = location.search? Number(location.search.split('=')[1])
                : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect( () => {
       if(productId) {
           dispatch(addToCart(productId, qty ));
       }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removefromCart(id));
     };
     const checkoutHandler = () =>{
       navigate(`/signin?redirect=shipping`);
     };
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                { cartItems.length === 0
                  ? <MessageBox> Cart is Empty.
                    <Link to="/">Go Shopping</Link>
                    </MessageBox>
                : (
                    <ul>
                        {   cartItems.map( (item) => (
                                <li key={item.product}> 
                                  <div className="row">
                                     <div>
                                         <img className="small" src={item.image} alt={item.name}></img>
                                     </div>
                                     <div className="min-30">
                                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                                     </div>
                                     <div className="Itemdropdown">
                                         <select value={item.qty} 
                                            onChange={ (e) =>
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                                )
                                            }>
                                              {
                                                  [...Array(item.countInStock).keys()].map( x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ) 
                                             )}
                                            </select>
                                     </div>
                                     <div>
                                         Rs.{item.price}
                                     </div>
                                     <div>
                                         <button type="button" className="delete" onClick={() => removeFromCartHandler(item.product)}>
                                             Delete
                                         </button>
                                     </div>
                                  </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card cardbody" style={{ textAlign: "center"}}>
                    <ul>
                        <li>
                            <h2>
                                Subtotal( { cartItems.reduce((a, c) => a + c.qty, 0 )} items):
                                 Rs.{ cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" className="proceed block" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
