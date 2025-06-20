import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaBook, FaClipboardList, FaUsers } from 'react-icons/fa';
import homeImage from '../assets/images/home1.png';
import m1 from '../assets/images/m1.jpg';
import m2 from '../assets/images/m2.jpg';
import m3 from '../assets/images/m3.jpg';
import m4 from '../assets/images/m4.jpg';
import m5 from '../assets/images/m5.jpg';
import m6 from '../assets/images/m6.jpg';
import { fetchData } from '../utils/api';

const Home = () => {
  const [bidangList, setBidangList] = useState([]);
  const [ujianList, setUjianList] = useState([]);
  const [totalBidang, setTotalBidang] = useState(0);
  const [totalUjian, setTotalUjian] = useState(0);
  const [totalPeserta, setTotalPeserta] = useState(0);
  const [subBidangCounts, setSubBidangCounts] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const bidangRes = await fetchData('/bidang');
        const bidangTop = bidangRes.slice(0, 8);
        setBidangList(bidangTop);
        setTotalBidang(bidangRes.length);

        const ujianRes = await fetchData('/ujian/data/section');
        setUjianList(ujianRes.slice(0, 8));
        setTotalUjian(ujianRes.length);

        const pesertaRes = await fetchData('/peserta');
        setTotalPeserta(pesertaRes.length);

        const counts = {};
        await Promise.all(
          bidangTop.map(async (bidang) => {
            try {
              const res = await fetchData(`/sub-bidang/filter/${bidang.BidangId}`);
              console.log(`Sub-bidang for ${bidang.BidangNama}:`, res);
              counts[bidang.BidangId] = Array.isArray(res) ? res.length : 0;
            } catch (error) {
              console.error(`Gagal mengambil sub-bidang untuk BidangId ${bidang.BidangId}:`, error);
              counts[bidang.BidangId] = 0;
            }
          })
        );
        setSubBidangCounts(counts);
      } catch (err) {
        console.error('Gagal mengambil data utama:', err);
      }
    };

    getData();
  }, []);

  const images = [m1, m2, m3, m4, m5, m6];

  const peserta =
    JSON.parse(localStorage.getItem('peserta')) ||
    JSON.parse(sessionStorage.getItem('peserta')) ||
    {};

  const namaPeserta = peserta.peserta?.PesertaNama || 'Peserta';

  return (
    <div className="home-container rounded-2xl shadow-xl p-5 bg-white">
      {/* Greeting Card */}
      <div className="greeting-card">
        <div className="greeting-text">
          <h2>Hi, {namaPeserta}</h2>
          <p>Ready to start your day with some practice or exams?</p>
        </div>
        <div className="greeting-image">
          <img src={homeImage} alt="Welcome" />
        </div>
      </div>

      {/* Overview */}
      <div className="overview-header mt-4">
        <h3>Overview</h3>
      </div>

      <div className="overview-grid">
        <div className="overview-card card-green">
          <div className="icon-container bg-white text-green">
            <FaBook />
          </div>
          <div>
            <p className="label">Total Bidang</p>
            <p className="value">{totalBidang}</p>
          </div>
        </div>
        <div className="overview-card card-yellow">
          <div className="icon-container bg-white text-yellow">
            <FaClipboardList />
          </div>
          <div>
            <p className="label">Total Ujian</p>
            <p className="value">{totalUjian}</p>
          </div>
        </div>
        <div className="overview-card card-blue">
          <div className="icon-container bg-white text-blue">
            <FaUsers />
          </div>
          <div>
            <p className="label">Total Peserta</p>
            <p className="value">{totalPeserta}</p>
          </div>
        </div>
      </div>

      {/* Popular Bidang */}
      <div className="popular-header mt-5 mb-3">
        <h3>Popular Bidang</h3>
      </div>

      <div className="popular-grid">
        {bidangList.map((bidang, index) => (
          <div className="bidang-card" key={bidang.BidangId}>
            <img
              src={images[index % images.length]}
              alt={bidang.BidangNama}
              className="bidang-image"
            />
            <div className="bidang-content">
              <h4>{bidang.BidangNama}</h4>
              <p className="text-muted mb-1">
                <strong>Total Sub-Bidang:</strong> {subBidangCounts[bidang.BidangId] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Ujian */}
      <div className="popular-header mt-5 mb-3">
        <h3>Popular Ujian</h3>
      </div>

      <div className="popular-grid">
        {ujianList.map((ujian, index) => (
          <div className="bidang-card" key={ujian.SectionId}>
            <img
              src={images[index % images.length]}
              alt={ujian.SectionNama}
              className="bidang-image"
            />
            <div className="bidang-content">
              <h4>{ujian.SectionNama}</h4>
              <p className="text-muted mb-1">
                <strong>Tanggal:</strong> {new Date(ujian.TglUjian).toLocaleDateString()}
              </p>
              <p className="text-muted">
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color: 'white',
                    backgroundColor: ujian.Tampil === 1 ? 'green' : 'red',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}
                >
                  {ujian.Tampil === 1 ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
