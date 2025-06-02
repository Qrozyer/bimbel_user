import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';

const HasilUjianPage = () => {
  const { sectionId, pesertaId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [ujian, setUjian] = useState(null);
  const [peserta, setPeserta] = useState(null);
  const [section, setSection] = useState(null);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const [hasil, ujianData, pesertaData, sectionData] = await Promise.all([
          fetchData(`ujian/hasil/${sectionId}/${pesertaId}`),
          fetchData(`ujian/data/pilih/${sectionId}`),
          fetchData(`peserta/pilih/${pesertaId}`),
          fetchData(`soal/section/pilih/${sectionId}`)
        ]);

        setResult(hasil);
        setUjian(ujianData);
        setPeserta(pesertaData);
        setSection(sectionData);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengambil data',
          text: 'Terjadi kesalahan saat mengambil data. Silakan coba lagi.',
        });
      }
    };

    getAllData();
  }, [sectionId, pesertaId]);

  if (!result || !ujian || !peserta || !section) {
    return <div className="text-center text-dark">Loading...</div>;
  }

  return (
    <div className="container py-4">
      <div className="card mt-3 shadow">
        <div
          className="card-header position-relative"
          style={{ backgroundColor: '#20B486', color: 'white', minHeight: '60px' }}
        >
          <h5 className="mb-0">Hasil Ujian <br />📄 {section.SectionNama} <br />👤 {peserta.PesertaNama}</h5>
        </div>

        <div className="card-body text-dark">
          <h5 className="mb-3">📄 Info Ujian</h5>
          <p><strong>Nama Ujian:</strong> {section.SectionNama}</p>
          <p><strong>Tanggal Ujian:</strong> {ujian.TglUjian}</p>
          <p><strong>Waktu Mulai:</strong> {ujian.AwalUjian}</p>
          <p><strong>Waktu Selesai:</strong> {ujian.AkhirUjian}</p>
          <p><strong>Durasi:</strong> {ujian.Durasi} menit</p>

          <hr />

          <h5 className="mb-3">👤 Info Peserta</h5>
          <p><strong>Nama:</strong> {peserta.PesertaNama}</p>
          <p><strong>Email:</strong> {peserta.PesertaEmail}</p>
          <p><strong>Nomor HP:</strong> {peserta.PesertaNohp}</p>
          <p><strong>Asal Sekolah:</strong> {peserta.PesertaAsalSekolah}</p>

          <hr />

          <h5 className="mb-3">✅ Hasil</h5>
          <p><strong>Jumlah Soal:</strong> {result.jumlah_soal}</p>
          <p><strong>Jumlah Benar:</strong> {result.jumlah_benar}</p>
          <p><strong>Point:</strong> {result.point}</p>
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Kembali ke Beranda
        </button>

        <button
          onClick={() => navigate(`/pembahasan/${sectionId}`)}
          className="btn btn-success"
        >
          Pembahasan Soal
        </button>
      </div>
    </div>
  );
};

export default HasilUjianPage;
