import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api'; // Mengimpor fetchData dari file utils/api
import { useDispatch } from 'react-redux';
import { setDurasi } from '../../reducers/ujianSlice'; // Mengimpor action setDurasi

const UjianPage = () => {
  const navigate = useNavigate();
  const { ujianid } = useParams(); // Mengambil ujianid dari URL
  const [ujianData, setUjianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false); // Status ujian aktif atau tidak
  const dispatch = useDispatch(); // Menginisialisasi dispatch Redux

  const handleStartQuiz = (sectionId) => {
    navigate(`/quiz-ujian/${sectionId}`);
  };

  useEffect(() => {
    // Memanggil fetchData untuk mengambil data ujian berdasarkan ujianid
    const fetchUjianData = async () => {
      try {
        const response = await fetchData(`/ujian/data/pilih/${ujianid}`); // Menggunakan fetchData
        setUjianData(response); // Menyimpan data ujian ke state
        setLoading(false);

        // Dispatch durasi ke Redux
        dispatch(setDurasi(response.Durasi)); // Menyimpan durasi ujian ke Redux

        // Mengecek apakah ujian sedang aktif berdasarkan Tampil
        if (response.Tampil === 1) {
          setIsActive(true); // Ujian aktif jika Tampil = 1
        } else {
          setIsActive(false); // Ujian tidak aktif jika Tampil = 0
        }

      } catch (error) {
        console.error('Error fetching ujian data:', error);
        setLoading(false);
      }
    };

    fetchUjianData();
  }, [ujianid, dispatch]); // Pastikan dispatch ada di dependensi useEffect

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ujianData) {
    return <div>No data found for this ujian.</div>;
  }

  return (
    <div className="container min-vh-100 py-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold mb-4">Detail Ujian</h2>
        <div className="mb-4">
          <p><strong>Ujian ID:</strong> {ujianData.UjianId}</p>
          <p><strong>Section ID:</strong> {ujianData.SectionId}</p>
          <p>
            <strong>Status:</strong>
            {isActive ? (
              <span className="text-success"> Ujian Aktif</span>
            ) : (
              <span className="text-danger"> Ujian Tidak Aktif</span>
            )}
          </p>
          <p><strong>Mulai:</strong> {new Date(ujianData.Mulai.String).toLocaleString()}</p>
          <p><strong>Akhir:</strong> {new Date(ujianData.Akhir.String).toLocaleString()}</p>
          <p><strong>Durasi:</strong> {ujianData.Durasi / 60} menit</p>
        </div>

        {/* Button untuk memulai ujian jika aktif */}
        {isActive && (
          <button
            onClick={() => handleStartQuiz(ujianData.SectionId)} // Misalnya sectionId = 1
            className="btn btn-primary mt-3"
          >
            Mulai Ujian
          </button>
        )}
      </div>
    </div>
  );
};

export default UjianPage;
