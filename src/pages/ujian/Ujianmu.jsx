import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './Ujianmu.css';

const Ujianmu = () => {
  const [userSections, setUserSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const peserta = JSON.parse(localStorage.getItem('peserta')) || JSON.parse(sessionStorage.getItem('peserta'));
  const pesertaId = peserta?.peserta?.PesertaId;

  useEffect(() => {
    const loadUserSections = async () => {
      try {
        const allSections = await fetchData('ujian/data/section');

        const pesertaSectionPromises = allSections.map((section) =>
          fetchData(`ujian/peserta/${section.SectionID}`)
        );

        const pesertaSectionResults = await Promise.all(pesertaSectionPromises);

        const filteredSections = allSections.filter((section, index) => {
          const data = pesertaSectionResults[index];
          if (!Array.isArray(data)) return false;
          return data.some((item) => String(item.PesertaId) === String(pesertaId));
        });

        const hasilPromises = filteredSections.map(async (section) => {
          try {
            const hasil = await fetchData(`ujian/hasil/${section.SectionID}/${pesertaId}`);
            const sudahDikerjakan = hasil && typeof hasil === 'object' && hasil.jumlah_soal > 0;
            return {
              ...section,
              sudahDikerjakan,
              point: hasil?.point || 0,
            };
          } catch {
            return {
              ...section,
              sudahDikerjakan: false,
              point: 0,
            };
          }
        });

        const sectionDenganHasil = await Promise.all(hasilPromises);
        setUserSections(sectionDenganHasil);
      } catch (error) {
        console.error('Gagal memuat data ujian peserta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserSections();
  }, [pesertaId]);

  const isActiveSection = (section) => section.Tampil === 1;

  return (
    <div className="ujian-section-container">
      <button
        className="btn btn-secondary d-flex align-items-center h5 mb-3"
        style={{ backgroundColor: '#20B486', borderColor: '#20B486' }}
        onClick={() => navigate('/')}
      >
        <i className="fas fa-arrow-left me-2"></i> Kembali
      </button>

      <div className="card border-0 shadow-sm">
        <div className="card-header text-white d-flex justify-content-between align-items-center mb-0" style={{ backgroundColor: '#20B486' }}>
          <h5 className="mb-0">Ujianmu</h5>
        </div>

        <div className="card-body">
          {loading ? (
            <p>Memuat data...</p>
          ) : userSections.length === 0 ? (
            <p>Kamu belum memiliki sesi ujian yang tersedia.</p>
          ) : (
            <div className="row">
              {userSections.map((section) => {
                const active = isActiveSection(section);
                return (
                  <div className="col-md-6 mb-4" key={section.SectionID}>
                    <div
                      className={`card h-100 shadow-sm ${active ? '' : 'card-disabled'}`}
                      style={{
                        cursor: active ? 'pointer' : 'default',
                        border: active ? '1px solid #20B486' : '1px solid #ccc',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: '#6c757d', color: '#fff', fontWeight: '600' }}>
                        <span>{section.SectionNama}</span>
                      </div>

                      <div className="card-body text-dark position-relative">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <th>Tanggal Ujian</th>
                              <th>:</th>
                              <td>{section.TglUjian || '-'}</td>
                            </tr>
                            <tr>
                              <th>Waktu Mulai</th>
                              <th>:</th>
                              <td>{section.AwalUjian || '-'}</td>
                            </tr>
                            <tr>
                              <th>Waktu Selesai</th>
                              <th>:</th>
                              <td>{section.AkhirUjian || '-'}</td>
                            </tr>
                            <tr>
                              <th>Durasi</th>
                              <th>:</th>
                              <td>{section.Durasi} menit</td>
                            </tr>
                            <tr>
                              <th>Update Terakhir</th>
                              <th>:</th>
                              <td>{section.WaktuUpdate || '-'}</td>
                            </tr>
                            {section.sudahDikerjakan && (
                              <tr>
                                <th>Skor</th>
                                <th>:</th>
                                <td>{section.point} poin</td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
                          {active ? (
                            section.sudahDikerjakan ? (
                              <>
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => navigate(`/ujian/${section.SectionID}`)}
                                >
                                  <i className="fas fa-redo me-1"></i> Kerjakan Ulang
                                </button>
                                <button
                                  className="btn btn-outline-info"
                                  onClick={() => navigate(`/hasil-ujian/${section.SectionID}/${pesertaId}`)}
                                >
                                  <i className="fas fa-info-circle me-1"></i> Detail Hasil
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-outline-success"
                                onClick={() => navigate(`/ujian/${section.SectionID}`)}
                              >
                                <i className="fas fa-pencil-alt me-1"></i> Kerjakan
                              </button>
                            )
                          ) : (
                            <button className="btn btn-outline-secondary" disabled>
                              <i className="fas fa-clock me-1"></i> Belum Aktif
                            </button>
                          )}

                          <span className={`badge fs-6 px-4 py-3 ${active ? 'bg-success' : 'bg-danger'}`}>
                            {active ? 'Aktif' : 'Tidak Aktif'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ujianmu;
  