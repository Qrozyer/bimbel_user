import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus data peserta dan token dari sessionStorage
    localStorage.removeItem('peserta')
    localStorage.removeItem('token')
    sessionStorage.removeItem('peserta'); 
    sessionStorage.removeItem('token');
    
    // Mengarahkan pengguna ke halaman login setelah logout
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Aplikasi Ujian</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Beranda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bidang">Materi</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profil">Profil</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
