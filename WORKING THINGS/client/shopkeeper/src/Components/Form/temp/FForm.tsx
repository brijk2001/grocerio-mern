import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [logFile, setLogFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogFile(e.target.files![0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", logFile!);

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
          <div>
            <input type="file" onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default App;