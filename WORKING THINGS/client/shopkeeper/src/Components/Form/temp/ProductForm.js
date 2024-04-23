import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [logFile, setLogFile] = useState({
    'productName': '',
    'productDescription': '',
    'productPrice': 0.0,
    'productQuantity': 0,
    'file': null,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setLogFile({
        ...logFile,
        [name] : value
    });

    // console.log(name, value);
  };

  const handleChangeFile = (e) => {
    setLogFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", logFile);
      const response = await axios.post("http://localhost:3001/logs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Upload file</h1>
        <form onSubmit={handleSubmit}>
            Enter Your Details <br/><br/>
            Product Name: <input onChange={handleChange} type="text" name="productName" /><br/><br/>
            Product Description: <textarea onChange={handleChange} name="productDescription" style={{'width': '398px', 'height': '19px'}}/><br/><br/>
            Product Price: <input onChange={handleChange} step={0.1} type="number" name="productPrice" /><br/><br/>
            Product Quantity: <input type="number" onChange={handleChange} /><br/><br/>
            File: <input onChange={handleChangeFile} type="file" name="file" /><br/><br/>
            <button type='submit'>OK</button>
        </form>
      </div>
    </>
  );
};

export default App;
