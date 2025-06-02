import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setDurasi } from '../../reducers/ujianSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Ujian.css';

const UjianPage = () => {
  const navigate = useNavigate();
  const { ujianid } = useParams();
  const [ujianData, setUjianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [jumlahSoal, setJumlahSoal] = useState(0);
  const dispatch = useDispatch();

  const handleStartQuiz = (sectionId) => {
    navigate(`/ujian-soal/${sectionId}`);
  };

  useEffect(() => {
    const fetchUjianData = async () => {
      try {
        const response = await fetchData(`ujian/data/pilih/${ujianid}`);        
        const sectionData = await fetchData(`soal/section/pilih/${response.SectionID}`);
        setUjianData({ ...response, SectionNama: sectionData.SectionNama });
        dispatch(setDurasi(response.Durasi));
        setIsActive(response.Tampil === 1);

        // Ambil jumlah soal
        const soal = await fetchData(`ujian/soal/${response.SectionID}`);
        setJumlahSoal(soal.length || 0);

        setLoading(false);
      } catch (error) {
        console.error('Gagal memuat data ujian:', error);
        setLoading(false);
      }
    };

    fetchUjianData();
  }, [ujianid, dispatch]);

  useEffect(() => {
    let timerWarning = null;

    if (ujianData && ujianData.AkhirUjian) {
      const akhirUjian = new Date(ujianData.AkhirUjian).getTime();
      const now = Date.now();
      const warningTime = akhirUjian - 10 * 60 * 1000;
      const selisih = warningTime - now;

      if (selisih > 0) {
        timerWarning = setTimeout(() => {
          toast.warn('⚠️ Waktu ujian tersisa kurang dari 10 menit. Periksa kembali jawabanmu.', {
            position: 'top-center',
            autoClose: 8000,
            theme: 'colored',
          });
        }, selisih);
      }
    }

    return () => {
      if (timerWarning) clearTimeout(timerWarning);
    };
  }, [ujianData]);

  if (loading) return <div>Memuat data ujian...</div>;
  if (!ujianData) return <div>Ujian tidak ditemukan.</div>;

  return (
    <div className="ujian-section-container">
      <button
        className="btn btn-secondary d-flex align-items-center h5 mb-3"
        style={{ backgroundColor: '#20B486', borderColor: '#20B486' }}
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left me-2"></i> Kembali
      </button>

      <div className="card border-0 shadow-sm">
        <div className="card-header text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#20B486' }}>
          <h5 className="mb-0">Detail Ujian</h5>
        </div>

        <div className="card-body">
          <table className="table table-borderless mb-4">
            <tbody>
              <tr>
                <th>Ujian</th>
                <td>:</td>
                <td>{ujianData.SectionNama || '-'}</td>
              </tr>
              <tr>
                <th>Tanggal Mulai</th>
                <td>:</td>
                <td>{new Date(ujianData.AwalUjian).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Tanggal Berakhir</th>
                <td>:</td>
                <td>{new Date(ujianData.AkhirUjian).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Durasi</th>
                <td>:</td>
                <td>{ujianData.Durasi} menit</td>
              </tr>
              <tr>
                <th>Jumlah Soal</th>
                <td>:</td>
                <td>{jumlahSoal} soal</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>:</td>
                <td>
                  {isActive ? (
                    <span className="badge bg-success">Ujian Aktif</span>
                  ) : (
                    <span className="badge bg-danger">Ujian Tidak Aktif</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="alert alert-warning fs-6">
            <strong>📌 Harap perhatikan:</strong>
            <ul className="mb-0 mt-2">
              <li>- Jawablah soal dengan jujur tanpa membuka catatan atau sumber lain maupun bantuan pihak lain.</li>              
              <li>- Pastikan perangkat dan koneksi stabil sebelum memulai.</li>
              <li>- Waktu ujian akan berjalan otomatis setelah kamu klik <strong>Mulai Ujian</strong>.</li>
              <li>- Sistem akan mengingatkan 10 menit sebelum waktu ujian berakhir.</li>              
              <li>- Gunakan waktu dengan baik dan pastikan <strong>10 menit terakhir</strong> kamu telah memeriksa semua jawaban.</li>
              <li>- Setelah selesai, klik tombol <strong>Selesai Ujian</strong> untuk menyimpan hasilmu.</li>                    
            </ul>                                  
                        <br /><strong>📞 Bantuan Teknis:</strong><br />
  <ul className="mb-0 mt-2">
  <li>Jika mengalami kendala saat ujian, silakan hubungi:</li>
    <li>WhatsApp: <a href="https://wa.me/6282325646503" target="_blank" rel="noopener noreferrer">+62 823-2564-6503</a></li>    
  </ul>
          </div>

          {isActive ? (
            <button
              className="btn btn-success mt-3"
              onClick={() => handleStartQuiz(ujianData.SectionID)}
            >
              <i className="fas fa-play me-2"></i> Mulai Ujian
            </button>
          ) : (
            <button className="btn btn-secondary mt-3" disabled>
              <i className="fas fa-clock me-2"></i> Ujian Belum Aktif
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UjianPage;
