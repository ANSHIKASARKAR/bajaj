import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "globals.css";

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      setError(''); // Clear any previous errors
      const res = await axios.post('YOUR_BACKEND_API_URL', parsedData);
      setResponse(res.data);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const handleOptionChange = (selectedOptions) => {
    setOptions(selectedOptions.map(option => option.value));
  };

  const filteredResponse = response ? response.filter(item => {
    if (options.includes('Alphabets') && /^[A-Za-z]+$/.test(item)) return true;
    if (options.includes('Numbers') && /^[0-9]+$/.test(item)) return true;
    if (options.includes('Highest lowercase alphabet') && item === response.sort().reverse().find(char => /^[a-z]+$/.test(char))) return true;
    return false;
  }) : [];

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder="Enter JSON" />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={[
              { value: 'Alphabets', label: 'Alphabets' },
              { value: 'Numbers', label: 'Numbers' },
              { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
            ]}
            onChange={handleOptionChange}
          />
          <div>
            {filteredResponse.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
