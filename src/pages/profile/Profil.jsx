import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import './Profil.css';

const ProfilPesertaPage = () => {
  const [peserta, setPeserta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const getStoredPesertaId = () => {
    const stored = localStorage.getItem('peserta') || sessionStorage.getItem('peserta');
    try {
      const parsed = JSON.parse(stored);
      return parsed?.peserta?.PesertaId || null;
    } catch (e) {
      return null;
    }
  };

  const pesertaId = getStoredPesertaId();

  const handleGantiPassword = () => {
  navigate('/ganti-password');
};


  useEffect(() => {
    const fetchPesertaDetail = async () => {
      try {
        const data = await fetchData(`/peserta/pilih/${pesertaId}`);
        if (!data || !data.PesertaId) {
          throw new Error('Data peserta tidak valid.');
        }
        setPeserta(data);
      } catch (err) {
        console.error("Gagal fetch detail peserta:", err);
        setError(err.message || 'Terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };

    if (pesertaId) {
      fetchPesertaDetail();
    } else {
      setError('Peserta ID tidak ditemukan.');
      setLoading(false);
    }
  }, [pesertaId]);

  if (loading) return <p>Loading data peserta...</p>;

  return (
    <div className="profil-container">
      <div className="profil-left">
        <h2>👤 Profil Peserta</h2>
        <p>Berikut adalah informasi lengkap dari peserta.</p>
      </div>

      <div className="profil-right">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="profil-card glass-card">
              <div className="card-header">
                <h4>Informasi Peserta</h4>
              </div>
              <div className="card-body">
                <table className="profil-table">
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>:</td>
                      <td>{peserta.PesertaNama}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>{peserta.PesertaEmail}</td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td>:</td>
                      <td>{peserta.PesertaJk === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>:</td>
                      <td>{peserta.PesertaAlamat || '-'}</td>
                    </tr>
                    <tr>
                      <td>No. HP</td>
                      <td>:</td>
                      <td>{peserta.PesertaNohp || '-'}</td>
                    </tr>
                    <tr>
                      <td>Pendidikan Terakhir</td>
                      <td>:</td>
                      <td>{peserta.PesertaPendidikanTerakhir || '-'}</td>
                    </tr>
                    <tr>
                      <td>Asal Sekolah</td>
                      <td>:</td>
                      <td>{peserta.PesertaAsalSekolah || '-'}</td>
                    </tr>
                    <tr>
                      <td>Periode</td>
                      <td>:</td>
                      <td>{peserta.PesertaPeriode || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex justify-content-between text-end mt-4">
              <button onClick={handleGantiPassword} className="btn btn-secondary">
                Ganti Password
              </button>
              <button onClick={() => navigate('/profil/edit')} className="btn btn-primary">
                Edit Profil
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilPesertaPage;
