import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Display.css";
import { useAuth0 } from "@auth0/auth0-react";
import emailjs from 'emailjs-com';

const Displayorders1 = () => {
    const [orders, setOrders] = useState([]);

    // const sendEmail = (templateId, toEmail) => {
    //     // Your EmailJS service ID
    //     const serviceId = 'service_4lg1xqt';
    //     // Your EmailJS user ID
    //     const userId = 'ulW4POnZO57TsZpFl';

    //     // Send email
    //     const emailParams = {
    //         to_email: toEmail
    //     };
    //     emailjs.send(serviceId, templateId, emailParams, userId)
    //         .then((result) => {
    //             console.log('Email sent successfully:', result.text);
    //         }, (error) => {
    //             console.error('Email sending failed:', error.text);
    //         });
    // };

    const fetchData = () => {
        fetch("http://localhost:5005/showdata", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error != null) {
                    alert(data.error);
                } else {
                    setOrders(data.response);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };


    const updateOrderStatus = async (orderId, templateId, toEmail) => {
        const newOrderStatus = 'Shipped';

        try {
            const response = await axios.put(`http://localhost:5005/updateOrderStatus/${orderId}`, { orderStatus: newOrderStatus });
            console.log(response.data); // Updated document
            fetchData(); // Fetch updated data after updating order status
        } catch (error) {
            console.error(error);
        }

        const serviceId = 'service_4lg1xqt';
        // Your EmailJS user ID
        const userId = 'ulW4POnZO57TsZpFl';

        // Send email
        const emailParams = {
            to_email: toEmail
        };
        emailjs.send(serviceId, templateId, emailParams, userId)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Email sending failed:', error.text);
            });
    };

    const deleteOrder = async (orderId, templateId, toEmail) => {
        try {
            await axios.delete(`http://localhost:5005/deleteOrder/${orderId}`);
            // Fetch updated orders after deleting order
            fetchData();
        } catch (error) {
            console.error(error);
        }

        const serviceId = 'service_4lg1xqt';
        // Your EmailJS user ID
        const userId = 'ulW4POnZO57TsZpFl';

        // Send email
        const emailParams = {
            to_email: toEmail
        };
        emailjs.send(serviceId, templateId, emailParams, userId)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Email sending failed:', error.text);
            });
    };


    return (
        <>
            <button className="Load1" onClick={fetchData}>Orders
                <div className="red">{orders.length}</div>
            </button>


            {
                orders.length > 0 && orders[0].orderStatus.length === 0 ? (

                    <>
                        <h1>ORDERS</h1>

                        <div className="Orderss">
                            {
                                orders.map(order => (
                                    <div className="Order" key={order._id}>
                                        <strong>Customer Name: </strong>{order.User.name} <br />
                                        <strong>Phone Number: </strong>{order.User.phone} <br />
                                        <strong>Address: </strong>{order.User.address} <br />
                                        <br />
                                        <strong>Products: </strong>
                                        <div className="Order-items">
                                            {order.order.map(item => (
                                                <div className="products" key={item._id}>
                                                    <div style={{ float: "left" }}>
                                                        <strong>{item.productName}</strong>
                                                    </div>
                                                    <br />
                                                    <strong>Qty: </strong>{item.quantity}&nbsp;&nbsp;&nbsp;
                                                    <strong>Price: </strong>₹{item.productPrice}
                                                    <br />
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="amount">
                                            <strong>Total: </strong> ₹{order.Amount}
                                        </div>
                                        <div className="toggleClass">

                                            <button className="toggle" onClick={() => updateOrderStatus(order._id, "template_yfrwrh8", order.User.email)}>
                                                <img width="48" height="48" src="https://img.icons8.com/color/48/checked--v1.png" alt="checked--v1" />
                                            </button>
                                            <button onClick={() => deleteOrder(order._id, "template_rzfjecv", order.User.email)} className="toggle">
                                                <img width="40" height="40" src="https://img.icons8.com/office/40/cancel.png" alt="cancel" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : null
            }
        </>
    );
};

export default Displayorders1;
