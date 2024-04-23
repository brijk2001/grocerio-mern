import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";

import TextField from '@mui/material/TextField';
import 'react-international-phone/style.css';

import './Cart.css'
import Error from './Error/Error';

import emailjs from 'emailjs-com';


const Cart = (props) => {
    const sendEmail = () => {
        const serviceId = 'service_zlw7ug1';
        const templateId = 'template_5xkhu9a';
        const userId = 'j_OJ_saAwTS-WRDkX';
        const emailParams = {
            to_email: '21279@dhempecollege.edu.in', // Update this to the desired recipient email
        };

        emailjs.send(serviceId, templateId, emailParams, userId)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Email sending failed:', error.text);
            });
    };

    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

    function sort_cart(cart) {
        let countMap = {};
        cart.forEach(product => {
            const productName = product.productName;
            countMap[productName] = (countMap[productName] || 0) + 1;
        });

        let new_cart = [];
        for (let product of cart) {
            if (!checkitem(product.productName, new_cart)) {
                const quantity = countMap[product.productName];
                product.quantity = quantity;
                new_cart.push(product);
            }
        }
        return new_cart;
    }

    function checkitem(p_value, temp_a) {
        for (let k = 0; k < temp_a.length; k++) {
            if (p_value === temp_a[k].productName) {
                return true;
            }
        }
        return false;
    }


    const [cartProducts, setCartProducts] = useState(sort_cart(props.products));

    const handleIncr = (item) => {
        const updateCart = cartProducts.map(cartItem => {
            if (cartItem.productName === item.productName) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });

        setCartProducts(updateCart);
    }

    const handleDecr = (item) => {
        const updateCart = cartProducts.map(cartItem => {
            if (cartItem.productName === item.productName && cartItem.quantity > 0) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });

        setCartProducts(updateCart);
    }

    const [amount, setAmount] = useState(0);
    useEffect(() => {
        let total = 0;
        cartProducts.forEach(item => {
            total +=  item.productPrice * item.quantity - 10;
        })
        setAmount(total);
    }, [cartProducts]);


    // Place Order
    const buyOrder = () => {
        console.log(myOrder)
        axios.post('http://localhost:5007/data', myOrder)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .then(orderPlaced()).then(sendEmail());
    }

    const removeItem = (zeroProduct) => {
        const cleanedOrder = cartProducts.filter(item => item.productName !== zeroProduct)
        setCartProducts(cleanedOrder);
    }

    const [orderProducts, setOrderProducts] = useState(null);

    const [isOrderPaced, setOrder] = useState(false);
    const orderPlaced = () => {
        setOrder(true);
        setOrderProducts(cartProducts);
        setCartProducts([])
        props.methods([])
    }

    const [dispCheck, setDisplay] = useState(false);
    const checkOut = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            loginWithRedirect()
        }
        setDisplay(true)
    }

    const [phone, setPhone] = useState('');
    const [addr, setAddr] = useState('');


    const [myOrder, setMyOrder] = useState([]);

    const buyNow = (e) => {
        e.preventDefault();

        if (messageAdd.length === 0 && messagePhone.length === 0) {
            console.log(cartProducts)
            setMyOrder([
                {
                    orderID: Math.random().toString(36).slice(2),
                    orderStatus: '',
                    User: {
                        name: user.name,
                        email: user.email,
                        phone: phone,
                        address: addr
                    },
                    order: cartProducts,
                    Amount: amount,
                }
            ]);
        }

        if (phone.length !== 10 || isNaN(phone)) {
            setMessagePhone("Please enter a valid phone number")
        } else {
            setMessagePhone("")
        }

        if (addr.length === 0) {
            setMessageAdd("Please enter an address")
        } else {
            setMessageAdd("")
        }
    }

    // useEffect to call buyOrder after myOrder is updated
    useEffect(() => {
        if (myOrder.length > 0) {
            buyOrder();
        }
    }, [myOrder]);

    const [messageAdd, setMessageAdd] = useState(" ");
    const [messagePhone, setMessagePhone] = useState(" ");

    return (
        isOrderPaced ? <div>Order Placed</div> :
            <table className='myCart'>
                <div className="cart-items">
                    {cartProducts.map(item => (
                        (item.quantity !== 0) ?
                            <tr key={item.__id}>
                                <div className="list-item">
                                    <img alt="" src={`./uploads/${item.imageURL}`} />  {item.productName}  <span>₹</span> {item.productPrice}

                                    <div style={{
                                        float: "right"
                                    }}>
                                        <button onClick={() => { handleDecr(item) }}>-</button>
                                        {` Qty: ${item.quantity} `}
                                        <button onClick={() => { handleIncr(item) }}>+</button></div>
                                </div>
                                <br />
                                <hr />
                            </tr> : removeItem(item.productName)
                    ))}
                </div>
                <br />

                {amount === 0 ? <div className='Empty'>Your cart is empty</div> : <div className='Pay'>
                    <div style={{ position: 'absolute' }}>Total:</div> <div style={{ paddingLeft: '430px', fontSize: '25px' }} className="amount">₹{amount}/-</div>

                    <div><button onClick={checkOut} className='Buy'> Check Out </button></div>

                    {
                        dispCheck ? (
                            <div>
                                <form>
                                    <TextField variant="standard" label="Address" onChange={(e) => {
                                        setAddr(e.target.value)
                                    }}
                                        required />
                                    {<Error message={messageAdd} />}
                                    <br /><br />
                                    <TextField variant="standard" label="Number" type='tel' onChange={(e) => {
                                        setPhone(e.target.value);

                                    }} pattern="[7-9]{1}-[0-9]{4}-[0-9]{5}" maxLength={10} required />
                                    {<Error message={messagePhone} />}
                                    <button onClick={buyNow} className='Buy'>Buy Now</button>
                                </form>
                            </div>
                        ) : <></>
                    }


                </div>}
            </table>
    )
}

export default Cart