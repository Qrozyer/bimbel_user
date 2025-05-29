import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

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
          console.log(`Section ${allSections[index].SectionID} found peserta:`, found);
          return found ? [allSections[index].SectionID] : [];
        });

        console.log('userSectionIds:', userSectionIds);
        setUserSections(userSectionIds);
      } catch (error) {
        console.error('Gagal memuat data section atau peserta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pesertaId]);

  // Cek apakah peserta ada di section
  const isUserInSection = (section) => 
    userSections.some(id => String(id) === String(section.SectionID));

  // Cek apakah section aktif (Tampil === 1)
  const isActiveSection = (section) => section.Tampil === 1;

  return (
    <div className="container m-0">
      <h2 className="mb-4 text-primary">Daftar Sesi Ujian</h2>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="row">
          {sections.map((section) => {
            const userInSection = isUserInSection(section);
            const active = isActiveSection(section);

            console.log(`Section ID: ${section.SectionID}, UserInSection: ${userInSection}, Active: ${active}`);

            return (
              <div className="col-md-6 mb-4" key={section.Id}>
                <div
                  className={`card shadow-sm h-100 ${
                    userInSection ? '' : 'bg-light text-muted'
                  }`}
                  style={{
                    cursor: userInSection && active ? 'pointer' : 'not-allowed',
                    transition: 'transform 0.2s',
                    border: userInSection && active ? '1px solid #007bff' : '1px solid #ccc',
                  }}
                >
                  <div className="card-body text-dark">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">{section.SectionNama}</h5>
                      <span
                        className={`badge px-3 py-2 ${
                          active ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {active ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>

                    <ul className="list-unstyled mt-3 mb-0">
                      <li><strong>Tanggal Ujian:</strong> {section.TglUjian || '-'}</li>
                      <li><strong>Waktu Mulai:</strong> {section.AwalUjian || '-'}</li>
                      <li><strong>Waktu Selesai:</strong> {section.AkhirUjian || '-'}</li>
                      <li><strong>Durasi:</strong> {section.Durasi} menit</li>
                      <li><strong>Update Terakhir:</strong> {section.WaktuUpdate || '-'}</li>
                    </ul>

                    {userInSection ? (
                      <button
                        className="btn btn-sm btn-success mt-3"
                        onClick={() => {
                          if (active) {
                            navigate(`/ujian/${section.SectionID}`);
                          }
                        }}
                        disabled={!active}
                        style={{ cursor: active ? 'pointer' : 'not-allowed' }}
                      >
                        Kerjakan
                      </button>
                    ) : (
                      <div className="mt-3 d-flex align-items-center">
                        <span style={{ fontSize: '1.2rem' }} className="me-2">🔓</span>
                        <small>Tidak tersedia untuk Anda</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .hoverable:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default UjianSectionList;
