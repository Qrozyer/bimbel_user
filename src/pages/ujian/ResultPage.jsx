import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { answers, questions } = location.state;

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += questions[index].Point;
      }
    });
    return score;
  };

  return (
    <div className="container py-4">
      <h2>Hasil Ujian</h2>
      <p>Total Skor: {calculateScore()}</p>
    </div>
  );
};

export default ResultPage;
