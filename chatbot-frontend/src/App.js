import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post('http://localhost:8000/chat', { message });
      const newEntry = { user: message, bot: res.data.response };
      setChatHistory([...chatHistory, newEntry]);
      setMessage('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>LLM Chatbot</h1>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {chatHistory.map((entry, index) => (
          <div key={index}>
            <p><strong>You:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
            <hr />
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '70%', marginRight: '10px' }}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;