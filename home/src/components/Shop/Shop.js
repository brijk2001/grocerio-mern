import React, { useEffect, useState } from 'react'

import 'reactjs-popup/dist/index.css';
import Cart from '../Cart/Cart';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import './Shop.css'

const TimerComponent = () => {
    return <div className='myMessage'>Product added to Cart</div>;
}

const Shop = () => {

    const style = {
        position: 'absolute',
        padding: '10px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [clickedProduct, setClickedProduct] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const addProducts = (e, item) => {
        e.preventDefault();
        setClickedProduct(previousProduct => [...previousProduct, item]);
        setShowMessage(true);
        console.log(clickedProduct);
    }

    const [products, setProducts] = useState([]);
    const fetchData = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/showdata', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error != null) {
                    alert(data.error);
                } else {
                    setProducts(data.response);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        let timer;
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    return (
        <>
            <button className='cart' onClick={handleOpen}><img width="60" height="60" src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-groceries-plant-based-diet-soft-fill-soft-fill-juicy-fish.png" alt="external-groceries-plant-based-diet-soft-fill-soft-fill-juicy-fish" /></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} className="Cart">
                    <div className="Cart-title">My Cart</div>
                    <Cart products={clickedProduct} methods = {setClickedProduct} />
                </Box>
            </Modal>
            <form className='main-form'>
                <div className='Header-Shop'>Shops in your Area</div>
                <button className='Shop1-btn' onClick={fetchData}>
                    <img alt="" className='Shop1' src='https://www.indiafilings.com/learn/wp-content/uploads/2023/03/How-can-I-register-my-shop-and-establishment-online.jpg' />
                </button>

                <table className='myProducts'>
                    {products.map(item => (
                        <tr key={item.__id}>
                            <div className="card">
                                <div className="card-img"><img alt="" src={`./uploads/${item.imageURL}`} /></div>
                                <div className="card-title">{item.productName}</div>
                                <hr className="card-divider" />
                                <div className="card-footer">
                                    <div className="card-price"><span>₹</span> {item.productPrice}</div>
                                    <button className="card-btn" onClick={(e) => { addProducts(e, item) }}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </tr>
                    ))}
                </table>
                {showMessage && <TimerComponent />}
            </form>
        </>
    );

}
export default Shop;
