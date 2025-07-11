import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import NotFound from './components/NotFound';


import Login from './pages/Login';
import GantiPassword from './pages/GantiPassword';
import Logout from './pages/Logout';

import BidangPage from './pages/bidang/Bidang';
import BidangmuPage from './pages/bidang/Bidangmu';
import SubBidangPage from './pages/subBidang/subBidang';
import MateriPage from './pages/materi/Materi';
import IsiMateri from './pages/materi/IsiMateri';
import ProfilPeserta from './pages/profile/Profil';
import UjianSectionList from './pages/ujian/UjianSection';
import UjianPage from './pages/ujian/Ujian';
import UjianSoal from './pages/ujian/UjianSoal';
import HasilUjian from './pages/ujian/HasilUjian';
import UjianMateri from './pages/materi/UjianMateri';
import Ujianmu from './pages/ujian/Ujianmu';
import HasilUjianMateri from './pages/materi/HasilUjianMateri';
import EditProfilPesertaPage from './pages/profile/EditProfilPesertaPage';
import HubungiKami from './pages/HubungiKami';
import PembahasanPage from './pages/ujian/Pembahasan';
import Menu from './pages/Menu';


const App = () => {
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/hubungi-kami" element={<HubungiKami />} />

        <Route element={<PrivateRoute />}>
          <Route path="/ganti-password" element={<GantiPassword />} />  
          <Route path="/ujian-soal/:sectionId" element={<UjianSoal />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/bidangmu" element={<BidangmuPage />} />
          <Route path="/daftar-bidang" element={<BidangPage />} />
          <Route path="/sub-bidang/:id" element={<SubBidangPage />} />
          <Route path="/materi/:id" element={<MateriPage />} />
          <Route path="/isi-materi/:id" element={<IsiMateri />} />
          <Route path="/ujianmu" element={<Ujianmu />} />
          <Route path="/daftar-ujian" element={<UjianSectionList />} />
          <Route path="/ujian/:ujianid" element={<UjianPage />} />
          <Route path="/profil" element={<ProfilPeserta />} />
          <Route path="/profil/edit" element={<EditProfilPesertaPage />} />
          <Route path="/hasil-ujian/:sectionId/:pesertaId" element={<HasilUjian />} />  
          <Route path="/ujian-materi/:materiId" element={<UjianMateri />} />
          <Route path="/hasil-materi/:materiId/:pesertaId" element={<HasilUjianMateri />} />  
          <Route path="/pembahasan/:sectionId" element={<PembahasanPage />} />
          <Route path="/menu" element={<Menu />} />                
          <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;