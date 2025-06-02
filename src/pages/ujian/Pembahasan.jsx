import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { fetchData } from '../../utils/api';

const PembahasanPage = () => {
  const { sectionId } = useParams();
  const [soalUjian, setSoalUjian] = useState([]);
  const [soalLengkap, setSoalLengkap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const ujianSoal = await fetchData(`ujian/soal/${sectionId}`);
        const semuaSoal = await fetchData(`soal`);

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
        Pembahasan Soal - Section {sectionId}
      </h3>

      {pembahasanSoal.length === 0 && <p style={{ color: 'black' }}>Tidak ada soal untuk section ini.</p>}

      {pembahasanSoal.map((soal, idx) => (
        <div key={soal.Id} className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">
            <strong>Soal #{idx + 1}</strong>
          </div>
          <div className="card-body" style={{ color: 'black' }}>
            {/* Pertanyaan */}
            <div>{parse(soal.SoalPertanyaan)}</div>
            
            <ul className="list-group my-3">
              <li className="list-group-item">{parse(soal.OpsiA || soal.SoalA)}</li>
              <li className="list-group-item">{parse(soal.OpsiB || soal.SoalB)}</li>
              <li className="list-group-item">{parse(soal.OpsiC || soal.SoalC)}</li>
              <li className="list-group-item">{parse(soal.OpsiD || soal.SoalD)}</li>
              <li className="list-group-item">{parse(soal.OpsiE || soal.SoalE)}</li>
            </ul>

            {/* Jawaban Benar */}
            <p>
              <strong>Jawaban Benar: </strong>{' '}
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
            {soal.SoalVideo && soal.SoalVideo !== '-' && (
              <div className="mt-3">
                <strong>Video Pembahasan:</strong><br />
                <video controls width="100%" src={soal.SoalVideo} />
              </div>
            )}
          </div>
        </div>
      ))}

      <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
    </div>
  );
};

export default PembahasanPage;
