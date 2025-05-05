import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Result = () => {
  const location = useLocation();
  const { answers, questions } = location.state || { answers: [], questions: [] };
  
  const correctAnswersCount = answers.reduce((count, answer, index) => {
    if (answer === questions[index].correctAnswer) {
      count += 1;
    }
    return count;
  }, 0);

  return (
    <>
    <div>
      <h2>Hasil Ujian</h2>
      <p>Jumlah soal: {questions.length}</p>
      <p>Jumlah jawaban benar: {correctAnswersCount}</p>
      <p>Jumlah jawaban salah: {questions.length - correctAnswersCount}</p>
    </div></>
  );
};

export default Result;
