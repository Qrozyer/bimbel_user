import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMateri } from '../../actions/materiActions';
import { fetchData } from '../../utils/api';
import DaftarMateri from '../../components/DaftarMateri';
import Swal from 'sweetalert2';

const MateriPage = () => {
  const { id } = useParams(); // SubId
  const [materi, setMateriData] = useState([]);
  const [namaSubBidang, setNamaSubBidang] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataMateri = async () => {
      try {
        const data = await fetchData('materi');
        if (data) {
          const filtered = data.filter((item) => item.SubId === parseInt(id));
          setMateriData(filtered);
        }
      } catch (error) {
        console.error('Error fetching materi:', error);
      }
    };
    fetchDataMateri();
  }, [id]);

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      try {
        const data = await fetchData(`sub-bidang/pilih/${id}`);
        console.log('Data Sub Bidang:', data);
        if (data) {
          setNamaSubBidang(data.SubNama);
        }
      } catch (error) {
        console.error('Error fetching sub bidang:', error);
      }
    };
    fetchDataSubBidang();
  }, [id]);

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-secondary d-flex align-items-center h5 mb-0"
          style={{ backgroundColor: '#20B486', borderColor: '#20B486' }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left me-2"></i> Kembali
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div
          className="card-header text-white d-flex justify-content-between align-items-center mb-0"
          style={{ backgroundColor: '#20B486' }}
        >
          <h5 className="mb-0">Materi untuk Sub Bidang: {namaSubBidang || '...'}</h5>
        </div>
        <div className="card-body">
          {materi.length ? (
            <DaftarMateri data={materi} />
          ) : (
            <p className="text-muted">Belum ada materi untuk sub bidang ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateriPage;
