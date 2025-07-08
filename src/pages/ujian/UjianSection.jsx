import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import './UjianSection.css';

const UjianSectionList = () => {
  const [sections, setSections] = useState([]);
  const [userSections, setUserSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const peserta = JSON.parse(localStorage.getItem('peserta')) || JSON.parse(sessionStorage.getItem('peserta'));
  const pesertaId = peserta?.peserta?.PesertaId;

  useEffect(() => {
    const loadData = async () => {
      try {
        const allSections = await fetchData('ujian/data/section');
        setSections(allSections);

        const pesertaSectionPromises = allSections.map((section) =>
          fetchData(`ujian/peserta/${section.SectionID}`)
        );

        const pesertaSectionResults = await Promise.all(pesertaSectionPromises);

        const userSectionIds = pesertaSectionResults.flatMap((data, index) => {
          if (!Array.isArray(data)) return [];
          const found = data.some(
            (item) => String(item.PesertaId) === String(pesertaId)
          );
          return found ? [allSections[index].SectionID] : [];
        });

        setUserSections(userSectionIds);
      } catch (error) {
        console.error('Gagal memuat data section atau peserta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pesertaId]);

  const isUserInSection = (section) =>
    userSections.some((id) => String(id) === String(section.SectionID));

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
          <h5 className="mb-0">Daftar Sesi Ujian</h5>
        </div>

        <div className="card-body">
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <div className="row">
              {sections.map((section) => {
                const userInSection = isUserInSection(section);
                const active = isActiveSection(section);

                return (
                  <div className="col-md-6 mb-4" key={section.SectionID}>
                    <div
                      className={`card h-100 shadow-sm ${userInSection && active ? '' : 'card-disabled'}`}
                      style={{
                        cursor: userInSection && active ? 'pointer' : 'default',
                        border: userInSection && active ? '1px solid #20B486' : '1px solid #ccc',
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
                          </tbody>
                        </table>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          {userInSection && active ? (
                            <button
                              className="btn btn-outline-success"
                              onClick={() => navigate(`/ujian/${section.SectionID}`)}
                            >
                              <i className="fas fa-pencil-alt me-1"></i> Kerjakan
                            </button>
                          ) : userInSection && !active ? (
                            <button className="btn btn-outline-secondary" disabled>
                              <i className="fas fa-clock me-1"></i> Belum Aktif
                            </button>
                          ) : (
                            <div className="bidang-status w-100 justify-content-between">
                              <div className="status-left">
                                <i className="fas fa-lock"></i>
                                <span className="status-text">Tidak tersedia</span>
                              </div>
                              <button
                                className="btn btn-sm btn-outline-success unlock-button"
                                onClick={() => navigate('/hubungi-kami')}
                              >
                                <i className="fas fa-unlock"></i> Unlock
                              </button>
                            </div>
                          )}
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

export default UjianSectionList;
