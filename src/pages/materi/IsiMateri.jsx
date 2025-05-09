import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';

const IsiMateri = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);  // State untuk menandakan materi selesai
  const navigate = useNavigate();

  useEffect(() => {
    const getMateri = async () => {
      try {
        const data = await fetchData(`materi/pilih/${id}`);
        if (data) {
          setMateri(data);
        }
      } catch (error) {
        console.error('Gagal mengambil data materi:', error);
      }
    };
    getMateri();
  }, [id]);

  const handleCompletion = async () => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin sudah menyelesaikan materi ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Selesai',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      setIsCompleted(true);
      Swal.fire('Selesai!', 'Anda telah menyelesaikan materi.', 'success');
    }
  };

  if (!materi) {
    return <div style={{ textAlign: 'center', marginTop: '60px' }}>Memuat materi...</div>;
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fdfdfd',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>

      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#007bff',
          marginBottom: '25px',
        }}
      >
        {materi.MateriJudul}
      </h2>

      <div
        style={{
          fontSize: '1.1rem',
          color: '#333',
          lineHeight: '1.7',
        }}
        dangerouslySetInnerHTML={{ __html: materi.MateriIsi }}
      />

      {/* Tombol selesai */}
      {!isCompleted && (
        <button
          className="btn btn-success mt-4"
          onClick={handleCompletion}
        >
          Selesai
        </button>
      )}

      {/* Tombol mulai ujian, muncul setelah konfirmasi selesai */}
      {isCompleted && (
        <button
          className="btn btn-primary mt-4 ms-2"
          onClick={() => navigate(`/ujian-materi/${id}`)}  // Sesuaikan dengan rute ujian Anda
        >
          Mulai Ujian
        </button>
      )}
    </div>
  );
};

export default IsiMateri;
