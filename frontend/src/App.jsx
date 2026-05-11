import React, { useState, useEffect, useRef } from 'react';
import "../style/style.css";


const App = () => {
  const [formData, setFormData] = useState({ name: '', message: '', file: null });
  const [response, setResponse] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
   
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
      
      const data = await res.json();

      if (res.ok) {
        setSuccessMessage('File uploaded successfully');

        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      }
      setResponse(data);

      setFormData({ name: '', message: '', file: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }


    } catch (err) {
      setError(err.message);
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.file) {
      newErrors.file = 'File is required';
    }

    setFormErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleFileChange = (e) => {
    const newfile = e.target.files[0];

    console.log("Selected file>>>:", newfile);

    setFormData((prev)=>({...prev, file: newfile}));
};

  useEffect(() => {
    console.log(error);
  }, [error]);


  useEffect(() => {
    document.body.className="background";
  }, []);

  return (
    <div className="app box-size">
      <h1 className="text-centre">Form Submission</h1>
      <form onSubmit={handleSubmit} className="form-format">
        {successMessage && (<p>{successMessage}</p>)}
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
          {formErrors.name && (
              <p className="error">{formErrors.name}</p>
            )}
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
         {formErrors.message && (
              <p className="error">{formErrors.message}</p>
            )}

        </div>

        <div>
          <label htmlFor="file" className="field-label">
            File Upload:
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
         {formErrors.file && (
              <p className="error">{formErrors.file}</p>
            )}
            
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
