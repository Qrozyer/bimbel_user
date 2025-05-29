import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';
import { convertToEmbedUrl } from '../../utils/video';

const IsiMateri = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
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

  const embedUrl = convertToEmbedUrl(materi.MateriVideo);

  return (
    <div className="container mt-5">
      {/* Header Buttons */}
      <div className="d-flex justify-content-start align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className='fa fa-arrow-left'></i> Kembali
        </button>
        <div>
          {!isCompleted ? (
            <button className="btn btn-success ms-2" onClick={handleCompletion}>
              Selesai
            </button>
          ) : (
            <button className="btn btn-primary ms-2" onClick={() => navigate(`/ujian-materi/${id}`)}>
              Mulai Ujian
            </button>
          )}
        </div>
      </div>

      {/* Materi Card */}
      <div className="card shadow-sm">
        <div className="card-header text-white" style={{ backgroundColor: '#20B486' }}>
          <h4 className="mb-0">{materi.MateriJudul}</h4>
        </div>
        <div className="card-body">
          <h5 className='text-secondary'>Isi Materi:</h5>
          <div
            className="mb-4"
            style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.7' }}
            dangerouslySetInnerHTML={{ __html: materi.MateriIsi }}
          />

          {/* Video Materi */}
          <div className="mt-4">
            <h5 className='text-secondary'>Video Materi:</h5>
            {embedUrl ? (
              <div className="ratio ratio-16x9 mt-2">
                <iframe
                  src={embedUrl}
                  title="Video Materi"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-muted">Tidak tersedia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsiMateri;
