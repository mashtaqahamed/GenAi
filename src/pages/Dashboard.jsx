import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Chatroom.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const dummyMessages = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  from: i % 2 === 0 ? 'user' : 'ai',
  content: `Message ${i + 1}`,
  timestamp: new Date().toLocaleTimeString(),
})).reverse();

const Chatroom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const messagesPerPage = 20;

  useEffect(() => {
    loadMessages();
  }, [page]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    const start = (page - 1) * messagesPerPage;
    const paginated = dummyMessages.slice(start, start + messagesPerPage);
    setMessages((prev) => [...paginated, ...prev]);
  };

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMsg = {
      id: Date.now(),
      from: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      image: imagePreview,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setImagePreview(null);
    simulateAIResponse();
  };

  const simulateAIResponse = () => {
    setTyping(true);
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        from: 'ai',
        content: 'This is a Gemini AI reply.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (chatContainerRef.current.scrollTop === 0 && messages.length < dummyMessages.length) {
      setPage((prev) => prev + 1);
    }
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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="chatroom-container">
      <div className="chat-header">Chatroom {id}</div>
      <div className="chat-messages" onScroll={handleScroll} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            className={`message ${msg.from}`}
            onClick={() => handleCopy(msg.content)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{msg.content}</p>
            {msg.image && <img src={msg.image} alt="upload" className="chat-image" />}
            <span className="timestamp">{msg.timestamp}</span>
          </motion.div>
        ))}
        {typing && <div className="typing">Gemini is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;
