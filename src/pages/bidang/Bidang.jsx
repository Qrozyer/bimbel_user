import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';

import { setBidang } from '../../actions/bidangActions';
import { fetchData } from '../../utils/api';
import TableDashboard from '../../components/TableDashboard';

const baseURL = process.env.REACT_APP_BASE_URL;

const BidangPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bidang = useSelector((state) => state.bidang.bidang);
  const [token, setToken] = useState('');

  // Ambil token saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${baseURL}/token`, {
          headers: {
            'Content-Type': 'application/json',
            'x-email': 'test',
            'x-password': 'testing',
          },
        });
        setToken(res.data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
        toast.error('Gagal mengambil token');
      }
    };

    fetchToken();
  }, []);

  // Ambil data bidang dari API
  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang');
      if (data) {
        dispatch(setBidang(data));
      }
    };

    fetchDataBidang();
  }, [dispatch]);

  // Jika data kosong
  if (!bidang.length) {
    return (
      <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
        <h3 className="text-center">Data Bidang Tidak Tersedia</h3>
        <button className="btn btn-secondary mb-4 ml-3" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    );
  }

  // Tampilkan data bidang
  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="mb-4">
        <button className="btn btn-secondary ml-3 mr-2" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/soal/add')}>
          Buat Soal Baru
        </button>
      </div>

      <h3 className="ml-3 mb-2">Tambah Soal Berdasarkan Materi</h3>
      <h5 className="ml-3 text-secondary mb-4">Pilih Bidang</h5>

      <TableDashboard data={bidang} />
    </div>
  );
};

export default BidangPage;
