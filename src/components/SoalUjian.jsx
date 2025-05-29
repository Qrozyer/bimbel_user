import React, { useState } from 'react';
import { addData } from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SoalUjian = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);
  const navigate = useNavigate();

  const storedPeserta = JSON.parse(sessionStorage.getItem('peserta')) || JSON.parse(localStorage.getItem('peserta'));
  const pesertaId = storedPeserta ? storedPeserta.PesertaId : null;

  if (!pesertaId) {
    return (
      <div>
        <p>Peserta ID tidak ditemukan. Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  const handleAnswer = async () => {
    if (!selectedOption) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Pilih jawaban terlebih dahulu!',
      });
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Cek apakah soal ini sudah dijawab sebelumnya
    const alreadyAnswered = answers.find(
      (a) => a.Id === currentQuestion.Id
    );

    let updatedAnswers;
    if (alreadyAnswered) {
      // Update jawaban lama
      updatedAnswers = answers.map((a) =>
        a.Id === currentQuestion.Id
          ? { ...a, Jawaban: selectedOption }
          : a
      );
    } else {
      // Tambahkan jawaban baru
      updatedAnswers = [
        ...answers,
        {
          Id: currentQuestion.Id,
          SectionId: currentQuestion.SectionId,
          PesertaId: pesertaId,
          Jawaban: selectedOption,
        },
      ];
    }

    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLastQuestionAnswered(true);
    }
  };

  const handleFinishQuiz = async () => {
    if (answers.length === questions.length) {
      const response = await addData('ujian/soal/bundle', answers);

      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Ujian selesai!',
          text: 'Jawaban Anda berhasil disimpan!',
        }).then(() => {
          navigate(`/hasil-ujian/${questions[0].SectionId}/${pesertaId}`);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menyimpan jawaban. Silakan coba lagi.',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian!',
        text: 'Pastikan Anda menjawab semua soal sebelum menyelesaikan ujian.',
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const previousIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousIndex);

      const prevQuestion = questions[previousIndex];
      const prevAnswer = answers.find((a) => a.Id === prevQuestion.Id);
      setSelectedOption(prevAnswer ? prevAnswer.Jawaban : null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find((a) => a.Id === currentQuestion.Id);

  return (
    <div className="card mt-3">
      <div className="card-header">Soal {currentQuestionIndex + 1}</div>
      <div className="card-body">
        <h4>{currentQuestion.Soal}</h4>

        {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
          <div key={index} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="answer"
              id={`option-${index}`}
              value={currentQuestion[`Opsi${option}`]}
              onChange={() => setSelectedOption(option)}
              checked={selectedOption === option}
            />
            <label className="form-check-label" htmlFor={`option-${index}`}>
              {currentQuestion[`Opsi${option}`]}
            </label>
          </div>
        ))}

        <div className="mt-3">
          <button
            onClick={handleAnswer}
            className="btn btn-primary me-2"
          >
            Jawab
          </button>

          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="btn btn-secondary me-2"
            >
              Sebelumnya
            </button>
          )}

          {lastQuestionAnswered && (
            <button
              onClick={handleFinishQuiz}
              className="btn btn-success"
            >
              Selesaikan Ujian
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoalUjian;
