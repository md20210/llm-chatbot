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
    } catch (error) {
      console.error("Error:", error);
    }
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>LLM Chatbot</h1>
      <div style={{ 
  height: '300px', 
  overflowY: 'auto', 
  border: '1px solid #ccc', 
  padding: '10px', 
  marginBottom: '10px', 
  backgroundColor: '#f9f9f9' 
}}>
  {chatHistory.map((entry, index) => (
    <div key={index} style={{ marginBottom: '15px' }}>
      <p style={{ 
        color: '#007bff', 
        backgroundColor: '#e7f1ff', 
        padding: '8px', 
        borderRadius: '8px', 
        display: 'inline-block', 
        maxWidth: '70%' 
      }}>
        <strong>You:</strong> {entry.user}
      </p>
      <p style={{ 
        color: '#28a745', 
        backgroundColor: '#e6ffe6', 
        padding: '8px', 
        borderRadius: '8px', 
        display: 'inline-block', 
        maxWidth: '70%' 
      }}>
        <strong>Bot:</strong> {entry.bot}
      </p>
    </div>
  ))}
</div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ 
          width: '70%', 
          marginRight: '10px', 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          outline: 'none',
          transition: 'border-color 0.3s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#ccc'}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button 
        onClick={sendMessage}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;