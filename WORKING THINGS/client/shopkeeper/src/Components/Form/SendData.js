import React, { useState } from "react";
import axios from "axios";

import './SendData.css';

const App = () => {
  const [doneSubmit, setSubmit] = useState(false);

  const handleButton = () => {
    setSubmit(true);
    console.log(doneSubmit);
  }

  const displayForm = () => {
    if (doneSubmit) {
      return (
        <></>
      );
    }

    else {
      return (
        <>
          <div className="app">
            <div className="backdrop">
              <h1 className="Header">Your Products</h1>
            </div>
            <form onSubmit={handleSubmit}>
              Product Name: <input onChange={handleChange} type="text" name="productName" required="required" /><br /><br />
              Product Price: <input onChange={handleChange} step={0.1} type="number" name="productPrice" required="required" /><br /><br />
              Product Quantity: <input onChange={handleChange} type="number" name="productQuantity" required="required" /><br /><br />
              Product Description: <textarea onChange={handleChange} name="productDescription" style={{ width: '302px', height: '12px' }} required="required" /><br /><br />
              File: <input onChange={handleChangeFile} type="file" name="file" className="file" required="required" /><br /><br />
              <button type='submit' className="submit">Done</button>
            </form>
          </div>
        </>
      );
    }
  }

  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0.0,
    productQuantity: 0,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeFile = (e) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", productDetails.file);
      formData.append("productName", productDetails.productName);
      formData.append("productDescription", productDetails.productDescription);
      formData.append("productPrice", productDetails.productPrice);
      formData.append("productQuantity", productDetails.productQuantity);

      const response = await axios.post("http://localhost:3002/logs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response2 = await axios.post("http://localhost:5001/logs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data);
      handleButton();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* here */}
      {displayForm()}
    </>
  );
};

export default App;
