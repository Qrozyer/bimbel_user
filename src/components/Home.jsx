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
  const [materiList, setMateriList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const materiRes = await fetchData('materi');
        setMateriList(materiRes.slice(0, 6));

        const subBidangRes = await fetchData('sub-bidang');
        setSubBidangList(subBidangRes);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
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

  const getSubNama = (subId) => {
    const sub = subBidangList.find((s) => s.SubId === subId);
    return sub?.SubNama || 'Sub-bidang tidak ditemukan';
  };

  return (
    <div className="home-container rounded-2xl shadow-xl m-4 p-6 bg-white">
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
            <p className="label">Total Materi</p>
            <p className="value">24</p>
          </div>
        </div>
        <div className="overview-card card-yellow">
          <div className="icon-container bg-white text-yellow">
            <FaClipboardList />
          </div>
          <div>
            <p className="label">Total Ujian</p>
            <p className="value">12</p>
          </div>
        </div>
        <div className="overview-card card-blue">
          <div className="icon-container bg-white text-blue">
            <FaUsers />
          </div>
          <div>
            <p className="label">Total Peserta</p>
            <p className="value">57</p>
          </div>
        </div>
      </div>

      {/* Popular Materi */}
      <div className="popular-header mt-5 mb-3">
        <h3>Popular Materi</h3>
      </div>

      <div className="popular-grid">
        {materiList.map((materi, index) => (
          <div key={materi.MateriId} className="materi-card">
            <img
              src={images[index]}
              alt={materi.MateriJudul}
              className="materi-image"
            />
            <div className="materi-content">
              <h4>{materi.MateriJudul}</h4>
              <p className="text-muted mb-1">
                <strong>Sub Bidang:</strong> {getSubNama(materi.SubId)}
              </p>            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
