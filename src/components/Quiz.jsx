import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import Navbar from './Navbar';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [questions] = useState([
    {
      question: 'Apa ibu kota Indonesia?',
      options: ['Jakarta', 'Bali', 'Bandung', 'Surabaya'],
      correctAnswer: 'Jakarta',
    },
    {
      question: 'Berapa jumlah provinsi di Indonesia?',
      options: ['34', '33', '35', '36'],
      correctAnswer: '34',
    },
    // Tambahkan soal lainnya di sini
  ]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
        setSelectedOption(null); 
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        navigate('/result', { state: { answers, questions } });
    }
  };

  return (
    <div>
      <Timer />
      <div>
      <div className="container">
    <div className="card">
        <div className='card-header'>Soal</div>
        <div className='card-body'>
            <h2>{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="form-check">
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        value={option}
                        onChange={() => handleAnswer(option)}
                        checked={selectedOption === option}
                        className="form-check-input"
                    />
                    <label htmlFor={`option-${index}`} className="form-check-label">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    </div>
</div>
      </div>
    </div>
  );
};

export default Quiz;
