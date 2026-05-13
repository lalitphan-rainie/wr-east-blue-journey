import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fooshaQuiz } from '../data/quizData';

const FooshaQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lives, setLives] = useState(3);
  const [showRefill, setShowRefill] = useState(false);
  const [captainCode, setCaptainCode] = useState("");

  const handleAnswer = (index) => {
    if (index === fooshaQuiz[currentStep].correct) {
      if (currentStep + 1 < fooshaQuiz.length) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(); // Quiz finished!
      }
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) setShowRefill(true);
    }
  };

  const resetLives = () => {
    if (captainCode.toLowerCase() === "boa hancock") { // Your secret code
      setLives(3);
      setShowRefill(false);
      setCaptainCode("");
    }
  };

  return (
    <div className="quiz-container">
      {/* Heart Display */}
      <div className="hearts-row">
        {[...Array(3)].map((_, i) => (
          <motion.span 
            key={i} 
            animate={{ opacity: i < lives ? 1 : 0, scale: i < lives ? 1 : 0.5 }}
            className="heart"
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {!showRefill ? (
        <div className="question-box">
          <h3 className="pirate-font">{fooshaQuiz[currentStep].question}</h3>

        {/* NEW: Render the reference image if it exists */}
          {fooshaQuiz[currentStep].image && (
            <div className="quiz-reference-container">
            <img 
                src={fooshaQuiz[currentStep].image} 
                alt="Where is this?" 
                className="quiz-reference-image" 
            />
            </div>
            )}

          <div className="options-grid">
            {fooshaQuiz[currentStep].options.map((option, i) => (
                <button 
                key={i} 
                onClick={() => handleAnswer(i)} 
                className={fooshaQuiz[currentStep].isImageQuiz ? "option-img-btn" : "option-btn"}
                >
                {fooshaQuiz[currentStep].isImageQuiz ? (
                    <img src={option} alt={`Option ${i}`} className="quiz-option-image" />
                ) : (
                    option
                )}
                </button>
            ))}
            </div>
        </div>
      ) : (
        <div className="refill-screen">
          <p>No more hearts! Ask your Captain to refill.</p>
          <input 
            type="password" 
            placeholder="Captain's Code" 
            value={captainCode}
            onChange={(e) => setCaptainCode(e.target.value)}
          />
          <button onClick={resetLives} className="pirate-button">Refill</button>
        </div>
      )}
    </div>
  );
};

export default FooshaQuiz;