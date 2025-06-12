import React, { useState } from 'react';
import './Quiz.css';

const quizData = [
  {
    question: "What level of study are you interested in?",
    options: ["Undergraduate", "Postgraduate", "Diploma/Certificate", "PhD/Research"]
  },
  {
    question: "Which countries are you considering?",
    options: ["USA", "UK", "Canada", "Australia", "Europe", "Not sure yet"]
  },
  {
    question: "What’s your preferred field of study?",
    options: ["Engineering/Tech", "Business/Management", "Health & Medicine", "Humanities/Arts", "Other"]
  }
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quizData[currentIndex];
  const totalQuestions = quizData.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert("Please select an option before continuing.");
      return;
    }

    setAnswers([...answers, { question: currentQuestion.question, answer: selectedOption }]);
    setSelectedOption(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalAnswers = [...answers.map(ans => ans.answer), selectedOption];
      alert("🎉 Quiz completed!\n\n" + JSON.stringify(finalAnswers, null, 2));

    }
  };

  return (
    <div className="quiz-card">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <h3 className="question-count">QUESTION {currentIndex + 1} OF {totalQuestions}</h3>

      <div className="question-box">
        <p>{currentQuestion.question}</p>
      </div>

      <div className="options-label">OPTIONS</div>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`option-placeholder ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <button className="continue-btn" onClick={handleNext}>CONTINUE</button>
    </div>
  );
};

export default Quiz;
