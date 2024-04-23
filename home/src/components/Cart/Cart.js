import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Cart.css'


const Cart = (props) => {

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
            total += item.productPrice * item.quantity
        })
        setAmount(total);
    }, [cartProducts]);


    // Place Order
    const buyOrder = () => {
        axios.post('http://localhost:3003/orders', cartProducts)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        .then(orderPlaced());
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

    return (
        isOrderPaced? <div>Order Placed</div>:
        <table className='myCart'>
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

            {amount === 0 ? <div className='Empty'>Your cart is empty</div> : <div className='Pay'>
                <div style={{ position: 'absolute' }}>Total:</div> <div style={{ paddingLeft: '430px', fontSize: '25px' }} className="amount">₹{amount}/-</div>
                <div><button onClick={buyOrder} className='Buy'>Buy Now</button></div>
            </div>}
        </table>
    )
}

export default Cart