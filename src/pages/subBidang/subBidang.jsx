import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Menambahkan useDispatch
import { setSubBidang } from '../../actions/subBidangActions';  // Pastikan action setSubBidang ada
import { fetchData, deleteData } from '../../utils/api';  // Fungsi untuk fetch data
import DaftarSubBidang from '../../components/DaftarSubBidang';
import { useNavigate } from 'react-router-dom';  // Mengimpor useNavigate
import Swal from 'sweetalert2';

const SubBidangPage = () => {
  const { id } = useParams();  // Mengambil bidangId dari URL
  const [subBidang, setSubBidangData] = useState([]);  // State untuk daftar sub bidang
  const dispatch = useDispatch();  // Menggunakan dispatch untuk memperbarui state Redux
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman sub bidang

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      try {
        const data = await fetchData('sub-bidang');
        if (data) {
          const filteredSubBidang = data.filter((item) => item.BidangId === parseInt(id));
          setSubBidangData(filteredSubBidang);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataSubBidang();
  }, [id]);

  // Jika data kosong, tampilkan tombol Kembali dan Tambah Sub Bidang
  if (!subBidang.length) return (
    <div className="pt-4 mb-4 ml-3">
      <h1 className="ml-3 mb-3">Sub Bidang untuk Bidang: {subBidang[0]?.BidangNama}</h1>
      {/* Tombol Kembali */}
      <button 
        className="btn btn-secondary mb-4 ml-3" 
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
      >
        Kembali
      </button>
    </div>
  );

  return (
    <div className="m-5">
      <h1 className="ml-4 mb-3">Sub Bidang untuk Bidang: {subBidang[0]?.BidangNama}</h1>
      {/* Tombol Kembali */}
      <button 
        className="btn btn-secondary mb-4 ml-4" 
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
      >
        Kembali
      </button>
      <DaftarSubBidang 
        data={subBidang}
      />
    </div>
  );
};

export default SubBidangPage;
