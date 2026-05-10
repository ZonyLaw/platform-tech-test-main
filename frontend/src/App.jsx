import React, { useState, useEffect } from 'react';
import "../style/style.css";


const App = () => {
  const [formData, setFormData] = useState({ name: '', message: '', file: null });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData()
    submitData.append('name', formData.name);
    submitData.append('message', formData.message);
    submitData.append('file', formData.file);
    setError(null);
    try {
      const res = await fetch("http://localhost:5003/api/submit", {
        method: 'POST',
        body: submitData,
      });
      
      console.log("complted upload")
     for (const [key, value] of submitData.entries()) {
  console.log(key, value);
}
      const data = await res.json();
      setResponse(data);


    } catch (err) {
      setError(err.message);
    }
  };


  
  const handleFileChange = (e) => {
    const newfile = e.target.files[0];

    console.log("Selected file>>>:", newfile);

    setFormData((prev)=>({...prev, file: newfile}));
};


  useEffect(() => {
    document.body.className="background";
  }, []);

  return (
    <div className="app box-size">
      <h1 className="text-centre">Form Submission</h1>
      <form onSubmit={handleSubmit} className="form-format">
        <div >
          <label htmlFor="name" className="field-label">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="message" className="field-label">
            Message:
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="file" className="field-label">
            File Upload:
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
        </div>



        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre className="code-block">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
