import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import { fetchData } from '../../utils/api';
import DaftarSubBidang from '../../components/DaftarSubBidang';
import Swal from 'sweetalert2';

const SubBidangPage = () => {
  const { id } = useParams();
  const [namaBidang, setNamaBidang] = useState('');
  const [subBidang, setSubBidangData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      try {
        const data = await fetchData('sub-bidang');
        if (data) {
          const filtered = data.filter((item) => item.BidangId === parseInt(id));
          setSubBidangData(filtered);
        }
      } catch (error) {
        console.error('Error fetching sub-bidang:', error);
      }
    };
    fetchDataSubBidang();
  }, [id]);

  useEffect(() => {
    const fetchDataBidang = async () => {
      try {
        const data = await fetchData('bidang');
        if (data) {
          const match = data.find((item) => item.BidangId === parseInt(id));
          if (match) {
            setNamaBidang(match.BidangNama);
          }
        }
      } catch (error) {
        console.error('Error fetching bidang:', error);
      }
    };
    fetchDataBidang();
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
        <div className="card-header text-white d-flex justify-content-between align-items-center mb-0" style={{ backgroundColor: '#20B486' }}>
          <h5 className="mb-0">Sub Bidang untuk Bidang: {namaBidang}</h5>
        </div>
        <div className="card-body">
          <DaftarSubBidang data={subBidang} />
        </div>
      </div>
    </div>
  );
};

export default SubBidangPage;
