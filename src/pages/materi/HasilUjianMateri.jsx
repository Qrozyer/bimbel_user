import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';
import { convertToEmbedUrl } from '../../utils/video'; // Gunakan fungsi dari utils/video

const HasilUjianMateri = () => {
  const { materiId, pesertaId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [pembahasan, setPembahasan] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      try {
        const nilai = await fetchData(`ujian/materi/hasil/nilai/${materiId}/${pesertaId}`);
        const bahasan = await fetchData(`ujian/materi/hasil/${materiId}/${pesertaId}`);
        setResult(nilai);
        setPembahasan(bahasan);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengambil data',
          text: 'Terjadi kesalahan saat mengambil data ujian. Silakan coba lagi.',
        });
      }
    };

    getResult();
  }, [materiId, pesertaId]);

  if (!result) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h2>Hasil Ujian</h2>

      <div className="card mb-4">
        <div className="card-body text-dark">
          <h5>Nilai: <strong>{result.nilai}</strong></h5>
          <h5>Jumlah Soal: {result.jumlah_soal}</h5>
          <h5>Jumlah Benar: {result.jumlah_benar}</h5>
          <h5>Jumlah Salah: {result.jumlah_salah}</h5>
        </div>
      </div>

      <h3>Pembahasan Soal</h3>
      {pembahasan.map((item, index) => {
        const isCorrect = item.Benar === 1;
        const embedUrl = convertToEmbedUrl(item.Video);

        return (
          <div
            key={index}
            className={`card mb-3 border-${isCorrect ? 'success' : 'danger'}`}
          >
            <div className="card-body text-dark">
              <h5>
                Soal {index + 1} {isCorrect ? '✅' : '❌'}
              </h5>
              <p><strong>Pertanyaan:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: item.Soal }} />
              <ul>
                <li><strong>A:</strong> <span dangerouslySetInnerHTML={{ __html: item.OpsiA }} /></li>
                <li><strong>B:</strong> <span dangerouslySetInnerHTML={{ __html: item.OpsiB }} /></li>
                <li><strong>C:</strong> <span dangerouslySetInnerHTML={{ __html: item.OpsiC }} /></li>
                <li><strong>D:</strong> <span dangerouslySetInnerHTML={{ __html: item.OpsiD }} /></li>
                <li><strong>E:</strong> <span dangerouslySetInnerHTML={{ __html: item.OpsiE }} /></li>
              </ul>
              <p><strong>Jawaban Anda:</strong> {item.Jawaban}</p>
              <p><strong>Jawaban Benar:</strong> {item.JawabanBenar}</p>
              <p><strong>Pembahasan:</strong></p>
              <pre style={{ whiteSpace: 'pre-wrap' }}><span dangerouslySetInnerHTML={{ __html: item.Pembahasan }}></span></pre>

              {embedUrl ? (
                <div className="mt-3">
                  <strong>Video:</strong>
                  <div className="ratio ratio-16x9 mt-2">
                    <iframe
                      src={embedUrl}
                      title={`Video pembahasan ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <p><strong>Video:</strong> Tidak tersedia</p>
              )}
            </div>
          </div>
        );
      })}

      <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default HasilUjianMateri;
