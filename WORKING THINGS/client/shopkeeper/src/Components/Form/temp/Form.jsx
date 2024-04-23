import React, {useState} from 'react'
import axios from 'axios';

function Form() {

    const [formData, setFormData] = useState({
        name : '',
        lname : '',
        file: null
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        });
    };

    const  handleChangeFile = (e) => {
        setFormData({
            ...formData,
            file : e.target.files[0]
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageData = new FormData();
        imageData.append('image', formData.file);

        try {
            const response = await axios.post('http://localhost:3001/logs', formData.file,{
                method: 'POST',
                body: imageData,
                
            });
            console.log(response.data);
        }
        catch(err) {
            console.error(err);
        }

        console.log(formData);
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            Enter Your Details <br/><br/>
            Name: <input onChange={handleChange} type="text" name="name" /><br/><br/>
            Last Name: <input onChange={handleChange} type="text" name="lname" /><br/><br/>
            File: <input onChange={handleChangeFile} type="file" name="file" /><br/><br/>
            <button type='submit'>OK</button>
        </form>
    </div>
  )
}

export default Form;