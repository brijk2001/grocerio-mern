import React, { useState, useEffect } from 'react';

import './Display.css'

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5002/showdata', {
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

        const interval = setInterval(fetchData, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <form>
                <label className='Tit-le'>Inventory</label>
                <table className='myProducts'>
                    {products.map(item => (
                        <tr key={item.productName}>
                            <div class="card">
                                <img src={`./uploads/${item.imageURL}`} />
                                <div className='Product'>{item.productName}</div>
                                <div className='Price'>Rs.{item.productPrice}/-</div>
                                <div class="card__content">
                                    <p class="card__title">{item.productName}</p>
                                    <p class="card__description">{item.productDescription}</p>
                                </div>
                            </div>
                        </tr>
                    ))}
                </table>
            </form>
        </>
    );
};

export default DisplayProducts;
