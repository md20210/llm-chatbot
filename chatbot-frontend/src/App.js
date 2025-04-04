import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://localhost:8000/chat', { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
    }
    setMessage('');
  };

  return (
    <div>
      <h1>LLM Chatbot</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
      <p><strong>Bot:</strong> {response}</p>
    </div>
  );
}

export default App;