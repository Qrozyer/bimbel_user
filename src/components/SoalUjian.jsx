import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { addData } from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const SoalUjian = forwardRef(({ questions }, ref) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);

  const navigate = useNavigate();

  const storedPeserta =
    JSON.parse(sessionStorage.getItem('peserta')) ||
    JSON.parse(localStorage.getItem('peserta'));
  const pesertaId = storedPeserta?.peserta?.PesertaId;

  useImperativeHandle(ref, () => ({
    forceFinish: () => {
      autoSubmit();
    },
  }));

  useEffect(() => {
    // Efek peringatan keluar tab dan unload tetap aktif
    const handleVisibilityChange = () => {
      if (document.hidden) {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian!',
          text: 'Jangan keluar dari halaman ujian. Harap fokus mengerjakan sampai selesai.',
        });
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const autoSubmit = async () => {
    const finalAnswers = [...answers];

    // Tambahkan jawaban kosong untuk soal yang belum dijawab
    questions.forEach((q) => {
      const alreadyAnswered = finalAnswers.find((a) => a.Id === q.Id);
      if (!alreadyAnswered) {
        finalAnswers.push({
          Id: q.Id,
          SectionId: q.SectionId,
          PesertaId: pesertaId,
          Jawaban: '-',
        });
      }
    });

    const response = await addData('ujian/soal/bundle', finalAnswers);
    if (response) {
      Swal.fire({
        icon: 'info',
        title: 'Waktu habis!',
        text: 'Ujian diselesaikan secara otomatis.',
      }).then(() => {
        navigate(`/hasil-ujian/${questions[0].SectionId}/${pesertaId}`);
      });
    }
  };

  if (!pesertaId) {
    return (
      <div>
        <p>Peserta ID tidak ditemukan. Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  const isAnswered = (questionId) => {
    return answers.some((a) => a.Id === questionId);
  };

  const handleAnswer = () => {
    if (!selectedOption) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Pilih jawaban terlebih dahulu!',
      });
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const alreadyAnswered = answers.find((a) => a.Id === currentQuestion.Id);

    let updatedAnswers;
    if (alreadyAnswered) {
      updatedAnswers = answers.map((a) =>
        a.Id === currentQuestion.Id ? { ...a, Jawaban: selectedOption } : a
      );
    } else {
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

  // Mulai langsung tanpa tombol mulai

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-4">
      {/* Navigasi nomor soal */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        {questions.map((q, index) => {
          const answered = isAnswered(q.Id);
          const isActive = index === currentQuestionIndex;
          return (
            <button
              key={q.Id}
              className={`btn btn-sm ${
                isActive
                  ? 'btn-primary'
                  : answered
                  ? 'btn-success'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => {
                setCurrentQuestionIndex(index);
                const thisAnswer = answers.find((a) => a.Id === q.Id);
                setSelectedOption(thisAnswer ? thisAnswer.Jawaban : null);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="d-flex justify-content-between">
          <span className="text-dark fw-semibold">
            {answers.length} dari {questions.length} soal sudah dijawab
          </span>
        </div>
        <div className="progress" style={{ height: '20px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(answers.length / questions.length) * 100}%` }}
            aria-valuenow={(answers.length / questions.length) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round((answers.length / questions.length) * 100)}%
          </div>
        </div>
      </div>

      <h5 className="mb-3 text-dark fw-bold">Soal {currentQuestionIndex + 1}</h5>

      <div
        className="text-dark"
        style={{ fontSize: '1.2rem', fontWeight: '500' }}
      >
        {parse(currentQuestion.Soal)}
      </div>

      <div className="mt-3">
        {['A', 'B', 'C', 'D', 'E'].map((option, index) => {
          const optionValue = currentQuestion[`Opsi${option}`];
          return optionValue ? (
            <div key={index} className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                name="answer"
                id={`option-${index}`}
                value={option}
                onChange={() => setSelectedOption(option)}
                checked={selectedOption === option}
              />
              <label
                className="form-check-label text-dark"
                htmlFor={`option-${index}`}
              >
                {parse(optionValue)}
              </label>
            </div>
          ) : null;
        })}
      </div>

      <div className="mt-4">
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
  );
});

export default SoalUjian;
