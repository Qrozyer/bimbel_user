import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api'; // Mengimpor fungsi fetchData
import Swal from 'sweetalert2';

const HasilUjianPage = () => {
  const { sectionId, pesertaId } = useParams(); // Mengambil parameter sectionId dan pesertaId dari URL
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const getResult = async () => {
      try {
        const data = await fetchData(`/ujian/hasil/${sectionId}/${pesertaId}`);
        if (data) {
          setResult(data); // Menyimpan data hasil ujian ke state
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengambil hasil',
          text: 'Terjadi kesalahan saat mengambil hasil ujian. Silakan coba lagi.',
        });
      }
    };

    getResult();
  }, [sectionId, pesertaId]);

  // Menampilkan hasil ujian jika data sudah tersedia
  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4">
      <h2>Hasil Ujian</h2>
      <div className="card">
        <div className="card-body">
          <h5>Jumlah Soal: {result.jumlah_soal}</h5>
          <h5>Jumlah Benar: {result.jumlah_benar}</h5>
          <h5>Point: {result.point}</h5>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default HasilUjianPage;
