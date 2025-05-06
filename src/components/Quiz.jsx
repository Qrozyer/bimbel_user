import React, { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle klik tombol jawab
  const handleAnswer = () => {
    if (!selectedOption) {
      alert("Pilih jawaban terlebih dahulu");
      return;
    }

    // Menyimpan jawaban yang dipilih
    setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);

    // Melanjutkan ke soal berikutnya
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null); // Reset pilihan
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Pindah ke soal berikutnya
    } else {
      alert("Ujian selesai!");
      // Arahkan ke halaman hasil atau simpan hasil
    }
  };

  // Mengambil soal yang sedang aktif
  const currentQuestion = questions[currentQuestionIndex];

  // Jika tidak ada soal, tampilkan pesan
  if (!currentQuestion) {
    return <div>Loading or No questions available</div>;
  }

  return (
    <div className="card mt-3">
      <div className="card-header">Soal {currentQuestionIndex + 1}</div>
      <div className="card-body">
        <h4>{currentQuestion.Soal}</h4>
        {['OpsiA', 'OpsiB', 'OpsiC', 'OpsiD', 'OpsiE'].map((option, index) => (
          <div key={index} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="answer"
              id={`option-${index}`}
              value={currentQuestion[option]}
              onChange={() => setSelectedOption(currentQuestion[option])}
              checked={selectedOption === currentQuestion[option]} // Menandai opsi terpilih
            />
            <label className="form-check-label" htmlFor={`option-${index}`}>
              {currentQuestion[option]}
            </label>
          </div>
        ))}
        <button
          onClick={handleAnswer}
          className="btn btn-primary mt-3"
        >
          Jawab
        </button>
      </div>
    </div>
  );
};

export default Quiz;
