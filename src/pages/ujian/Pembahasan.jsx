import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Modal from 'react-modal';
import { fetchData } from '../../utils/api';

Modal.setAppElement('#root'); // penting untuk accessibility

const PembahasanPage = () => {
  const { sectionId } = useParams();
  const [soalUjian, setSoalUjian] = useState([]);
  const [soalLengkap, setSoalLengkap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionNama, setSectionNama] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const ujianSoal = await fetchData(`ujian/soal/${sectionId}`);
        const semuaSoal = await fetchData(`soal`);
        const sectionData = await fetchData(`soal/section/pilih/${sectionId}`);
        if (sectionData && sectionData.SectionNama) {
          setSectionNama(sectionData.SectionNama);
        } else {
          setSectionNama(`ID ${sectionId}`);
        }

        setSoalUjian(ujianSoal);
        setSoalLengkap(semuaSoal);        
        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data soal:', error);
        setLoading(false);
      }
    };
    fetchSoal();
  }, [sectionId]);

  const openModal = (videoSrc) => {
    setVideoUrl(videoSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoUrl('');
  };

  if (loading) return <div>Loading pembahasan...</div>;

  const pembahasanSoal = soalUjian.map((su) => {
    const lengkap = soalLengkap.find(sl => sl.SoalId === su.SoalId);
    return {
      ...su,
      SoalPertanyaan: lengkap?.SoalPertanyaan || 'Soal tidak ditemukan',
      SoalJawaban: lengkap?.SoalJawaban || '-',
      SoalPembahasan: lengkap?.SoalPembahasan || '-',
      SoalVideo: lengkap?.SoalVideo || '-',
    };
  });

  return (
    <div className="container py-4">
      <h3 className="mb-4" style={{ color: 'black' }}>
        Pembahasan Soal - Section {sectionNama}
      </h3>

      {pembahasanSoal.length === 0 && (
        <p style={{ color: 'black' }}>Tidak ada soal untuk section ini.</p>
      )}

      {pembahasanSoal.map((soal, idx) => (
        <div key={soal.Id} className="card mb-4 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: '#20B486' }}>
            <strong>Soal #{idx + 1}</strong>
          </div>
          <div className="card-body" style={{ color: 'black' }}>
            {/* Pertanyaan */}
            <div>{parse(soal.SoalPertanyaan)}</div>

            {/* Pilihan */}
            <ul className="list-group my-3">
              <li className="list-group-item">{parse(soal.OpsiA || soal.SoalA)}</li>
              <li className="list-group-item">{parse(soal.OpsiB || soal.SoalB)}</li>
              <li className="list-group-item">{parse(soal.OpsiC || soal.SoalC)}</li>
              <li className="list-group-item">{parse(soal.OpsiD || soal.SoalD)}</li>
              <li className="list-group-item">{parse(soal.OpsiE || soal.SoalE)}</li>
            </ul>

            {/* Jawaban Benar */}
            <p>
              <strong>Jawaban Benar: </strong>
              <span style={{ color: 'black', fontWeight: 'bold' }}>
                {soal.SoalJawaban}
              </span>
            </p>

            {/* Pembahasan */}
            <div>
              <strong>Pembahasan:</strong>
              <div>{parse(soal.SoalPembahasan)}</div>
            </div>

            {/* Video */}
            <div className="mt-3">
              <strong>Video Pembahasan:</strong><br />
              {soal.SoalVideo !== '-' ? (
                <button
                  className="btn btn-sm btn-outline-success mt-1"
                  onClick={() => openModal(soal.SoalVideo)}
                >
                  Tonton Video
                </button>
              ) : (
                <span className="text-muted"> - </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <Link to="/" className="btn btn-primary mt-4">
        Kembali ke Beranda
      </Link>

      {/* MODAL VIDEO */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Pembahasan"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000 },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#000',
            border: 'none',
            padding: 0,
            width: '90vw',
            height: '80vh',
          },
        }}
      >
        <video controls autoPlay style={{ width: '100%', height: '100%' }}>
          <source src={videoUrl} type="video/mp4" />
          Browser tidak mendukung video.
        </video>
      </Modal>
    </div>
  );
};

export default PembahasanPage;
