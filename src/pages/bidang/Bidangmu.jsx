import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import DaftarBidangmu from '../../components/DaftarBidangmu';
import { useNavigate } from 'react-router-dom'; 

const BidangmuPage = () => {
  const bidang = useSelector((state) => state.bidang.bidang);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang');
      if (data) {
        dispatch(setBidang(data));
      }
    };
    fetchDataBidang();
  }, [dispatch]);


  if (!bidang.length) {
    return (
      <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
        <h3 className="text-center">Data Bidang Tidak Tersedia</h3>
      </div>
    );
  }

  return (
  <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
    <button
  className="btn btn-secondary d-flex align-items-center h5 mb-3"
  style={{ backgroundColor: '#20B486', borderColor: '#20B486' }}
  onClick={() => navigate('/')}
>
  <i className="fas fa-arrow-left me-2"></i> Kembali
</button>
    <div className="card border-0  shadow-sm">
      <div className="card-header text-white d-flex justify-content-between align-items-center mb-0" style={{ backgroundColor: '#20B486' }}>
        <h5 className="">Pilih Bidang</h5>
      </div>
      <div className="card-body">
        <DaftarBidangmu data={bidang} />
      </div>
    </div>
  </div>
);
};

export default BidangmuPage;