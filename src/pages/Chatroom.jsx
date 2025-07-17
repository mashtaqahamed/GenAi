import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Chatroom.css';

const dummyMessages = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  from: i % 2 === 0 ? 'user' : 'ai',
  content: `Dummy message ${i + 1}`,
  timestamp: new Date().toLocaleTimeString(),
})).reverse();

const Chatroom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState(dummyMessages.slice(0, 20));
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);

  const loadMore = () => {
    const nextPage = page + 1;
    const newMessages = dummyMessages.slice(0, nextPage * 20);
    setMessages(newMessages);
    setPage(nextPage);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMsg = {
      id: Date.now(),
      from: 'user',
      content: input,
      image: imagePreview,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setImagePreview(null);
    simulateAIResponse();
  };

  const simulateAIResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        from: 'ai',
        content: 'This is a simulated Gemini response.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScroll = () => {
    if (containerRef.current.scrollTop === 0) {
      loadMore();
    }
  };

  return (
    <div className={`chatroom-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <div className="chatroom-header">
        <h3>Chatroom #{id}</h3>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="chat-container" onScroll={handleScroll} ref={containerRef}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.from}`}
            onClick={() => handleCopy(msg.content)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>{msg.content}</p>
            {msg.image && <img src={msg.image} className="chat-image" alt="upload" />}
            <span className="timestamp">{msg.timestamp}</span>
          </motion.div>
        ))}

        {isTyping && (
          <div className="message ai typing">Gemini is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;