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
  },
  {
    question: "When are you planning to go abroad?",
    options: ["Next 6 months", "Next year", "Next 2 years", "Not sure"]
  },
  {
    question: "What is your current qualification?",
    options: ["12th Pass", "Graduate", "Postgraduate", "Diploma Holder"]
  },
  {
    question: "Do you have an English test score?",
    options: ["IELTS", "TOEFL", "PTE", "No"]
  },
  {
    question: "Do you have a passport?",
    options: ["Yes", "No"]
  },
  {
    question: "Do you have a budget in mind?",
    options: ["< 10 Lakhs", "10–20 Lakhs", "20+ Lakhs", "Not sure"]
  },
  {
    question: "Would you prefer a scholarship or funding?",
    options: ["Yes", "No", "If available"]
  },
  {
    question: "Do you need help with visa and application process?",
    options: ["Yes", "No", "Maybe"]
  }
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    method: ''
  });

  const currentQuestion = quizData[currentIndex];
  const totalQuestions = quizData.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedOption || "Skipped";
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[currentIndex - 1]);
    }
  };

  const handleSkip = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = "Skipped";
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers(Array(quizData.length).fill(null));
    setShowContactForm(false);
    setIsSubmitted(false);
    setContactInfo({ phone: '', method: '' });
  };

  const generateSummaryMessage = () => {
    return quizData.map((q, i) => `Q${i + 1}: ${q.question}\nAns: ${answers[i] || 'Skipped'}`).join('\n\n');
  };

  if (showContactForm) {
    return (
      <div className="quiz-card">
        <h2>🎉 Quiz Completed!</h2>
        <p>Here’s a summary of your responses:</p>

        <div className="summary-box">
          {quizData.map((q, i) => (
            <div key={i} className="summary-item">
              <strong>{q.question}</strong>
              <p>👉 {answers[i] || 'Skipped'}</p>
            </div>
          ))}
        </div>

        <p>Now, please tell us how we can contact you:</p>

        {!isSubmitted ? (
          <>
            <input
              type="tel"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              className="input"
            />
            <select
              value={contactInfo.method}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, method: e.target.value })
              }
              className="input"
            >
              <option value="">Preferred Contact Method</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Call">Call</option>
              <option value="Email">Email</option>
            </select>

            <div className="button-group">
              <button
                className="continue-btn"
                onClick={() => {
                  if (!contactInfo.phone || !contactInfo.method) {
                    alert("Please fill in all contact details.");
                    return;
                  }

                  const phone = contactInfo.phone.replace(/[^0-9]/g, '');
                  const message = encodeURIComponent(
                    `Hi, I completed the quiz on HumbleWalking. Here's my info:\n\n${generateSummaryMessage()}`
                  );

                  if (contactInfo.method === 'WhatsApp') {
                    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
                    window.open(whatsappURL, '_blank');
                  }

                  setIsSubmitted(true);
                }}
              >
                Send Request
              </button>

              <button className="nav-btn" onClick={handleRestart}>
                🔁 Restart Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <h4>✅ Thank you! We'll get in touch soon.</h4>
            <button className="nav-btn" onClick={handleRestart}>
              🔁 Restart Quiz
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-card">
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

      <div className="button-group">
        <button className="nav-btn" onClick={handlePrevious} disabled={currentIndex === 0}>
          ⬅ Previous
        </button>

        <button className="nav-btn skip" onClick={handleSkip}>
          Skip
        </button>

        <button className="continue-btn" onClick={handleNext}>
          {currentIndex === totalQuestions - 1 ? "Finish" : "Continue ➡"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
