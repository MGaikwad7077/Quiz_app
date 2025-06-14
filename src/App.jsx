import React, { useState } from 'react';
import Quiz from './Components/Quiz/Quiz';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
  });

  const handleStart = () => setStep(2);

  const handleContinue = () => {
    if (!formData.name || !formData.email || !formData.category) {
      alert("Please fill in all fields");
      return;
    }
    setStep(3);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return ( 
    
    <div className="app-container">
      
      {step === 1 && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header">
            <div className="logo-circle"></div>
            <span className="brand">HumbleWalking</span>
          </div>
          <hr className="line" />
          <hr className="line" />
          <button className="start-btn" onClick={handleStart}>
            START →
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            name="category"
            className="input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Category</option>
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
            <option value="Counsellor">Counsellor</option>
          </select>
          <button className="start-btn" onClick={handleContinue}>
            CONTINUE
          </button>
        </motion.div>
      )}

      {step === 3 && <Quiz />}
      
    </div>
  );
};

export default App;
