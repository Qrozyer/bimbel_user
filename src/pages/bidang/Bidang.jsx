import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import DaftarBidang from '../../components/DaftarBidang';
import { useNavigate } from 'react-router-dom'; 

const BidangPage = () => {
  const bidang = useSelector((state) => state.bidang.bidang);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang'); // Tambahkan endpoint 'bidang'
      if (data) {
        dispatch(setBidang(data));
      }
    };
    fetchDataBidang();
  }, [dispatch]);


  // Jika data kosong, tampilkan keterangan dan tombol kembali
  if (!bidang.length) {
    return (
      <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
        <h3 className="text-center">Data Bidang Tidak Tersedia</h3>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h5 className="p-2 ml-6 mb-4 text-secondary">Pilih Bidang</h5>
      <DaftarBidang 
        data={bidang}         
      />
    </div>
  );
};

export default BidangPage;
