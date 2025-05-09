import React, { useState } from 'react';
import { addData } from '../utils/api'; // Fungsi addData yang sudah kamu buat
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';

const SoalUjian = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  // Mengambil PesertaId dari sessionStorage
  const storedPeserta = JSON.parse(sessionStorage.getItem('peserta'));
  const pesertaId = storedPeserta ? storedPeserta.PesertaId : null;

  console.log('PesertaId:', pesertaId); // Debugging PesertaId

  if (!pesertaId) {
    return (
      <div>
        <p>Peserta ID tidak ditemukan. Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  // Handle klik tombol jawab
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

    // Menyimpan jawaban yang dipilih ke state answers (menggunakan huruf A, B, C, D, E)
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        Id: currentQuestion.Id,
        SectionId: currentQuestion.SectionId,
        PesertaId: pesertaId, // Menggunakan PesertaId dari sessionStorage
        Jawaban: selectedOption, // Menyimpan alfabet (A, B, C, D, E)
      },
    ]);

    // Melanjutkan ke soal berikutnya
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null); // Reset pilihan
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Pindah ke soal berikutnya
    }
  };

  // Menyelesaikan ujian dan mengirim jawaban ke API
  const handleFinishQuiz = async () => {
    if (answers.length === questions.length) {
      // Kirim data jawaban ke API secara batch
      const response = await addData('ujian/soal/bundle', answers);
      
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Ujian selesai!',
          text: 'Jawaban Anda berhasil disimpan!',
        }).then(() => {
          navigate(`/hasil-ujian/${currentQuestion.SectionId}/${pesertaId}`); // Redirect ke halaman hasil ujian
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
        {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
          <div key={index} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="answer"
              id={`option-${index}`}
              value={currentQuestion[`Opsi${option}`]} // Menampilkan value opsi yang sesuai
              onChange={() => setSelectedOption(option)} // Menyimpan opsi yang dipilih (A, B, C, D, E)
              checked={selectedOption === option} // Menandai opsi terpilih
            />
            <label className="form-check-label" htmlFor={`option-${index}`}>
              {currentQuestion[`Opsi${option}`]} {/* Menampilkan Opsi A, B, C, D, E */}
            </label>
          </div>
        ))}
        <button
          onClick={handleAnswer}
          className="btn btn-primary mt-3"
        >
          Jawab
        </button>

        {/* Tombol untuk menyelesaikan ujian */}
        {currentQuestionIndex === questions.length - 1 && (
          <button
            onClick={handleFinishQuiz}
            className="btn btn-success mt-3"
          >
            Selesaikan Ujian
          </button>
        )}
      </div>
    </div>
  );
};

export default SoalUjian;
