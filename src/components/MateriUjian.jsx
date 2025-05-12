import React, { useState } from 'react';
import { addData } from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const MateriUjian = ({ questions }) => {
  const { materiId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);
  const navigate = useNavigate();

  const storedPeserta = JSON.parse(sessionStorage.getItem('peserta'));
  const pesertaId = storedPeserta ? storedPeserta.PesertaId : null;

  if (!pesertaId) {
    return (
      <div>
        <p>Peserta ID tidak ditemukan. Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div className="alert alert-warning mt-3">Soal belum tersedia.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div className="alert alert-warning mt-3">Soal tidak ditemukan.</div>;
  }

  const handleAnswer = () => {
    if (!selectedOption) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Pilih jawaban terlebih dahulu!',
      });
      return;
    }

    const alreadyAnswered = answers.find(
      (a) => a.MsId === currentQuestion.MsId
    );

    let updatedAnswers;
    if (alreadyAnswered) {
      updatedAnswers = answers.map((a) =>
        a.MsId === currentQuestion.MsId
          ? { ...a, Jawaban: selectedOption }
          : a
      );
    } else {
      updatedAnswers = [
        ...answers,
        {
          MsId: currentQuestion.MsId,
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
      const response = await addData('ujian/materi/bundle', answers);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Ujian selesai!',
          text: 'Jawaban Anda berhasil disimpan!',
        }).then(() => {
          navigate(`/hasil-materi/${materiId}/${pesertaId}`);
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
      const prevAnswer = answers.find((a) => a.MsId === prevQuestion.MsId);
      setSelectedOption(prevAnswer ? prevAnswer.Jawaban : null);
    }
  };

  const currentAnswer = answers.find((a) => a.MsId === currentQuestion.MsId);

  return (
    <div className="card mt-3">
      <div className="card-header">Soal {currentQuestionIndex + 1}</div>
      <div className="card-body">
        <h4 dangerouslySetInnerHTML={{ __html: currentQuestion.Soal }}></h4>
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
            <label
              className="form-check-label"
              htmlFor={`option-${index}`}
              dangerouslySetInnerHTML={{
                __html: currentQuestion[`Opsi${option}`],
              }}
            />
          </div>
        ))}

        <div className="mt-3">
          <button onClick={handleAnswer} className="btn btn-primary me-2">
            Jawab
          </button>

          {currentQuestionIndex > 0 && (
            <button onClick={handlePrevious} className="btn btn-secondary me-2">
              Sebelumnya
            </button>
          )}

          {lastQuestionAnswered && (
            <button onClick={handleFinishQuiz} className="btn btn-success">
              Selesaikan Ujian
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateriUjian;
