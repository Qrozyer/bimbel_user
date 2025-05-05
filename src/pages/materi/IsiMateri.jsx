import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';

const IsiMateri = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
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
    </div>
  );
};

export default IsiMateri;
