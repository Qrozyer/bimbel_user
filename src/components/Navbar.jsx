import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('peserta');
    localStorage.removeItem('token');
    sessionStorage.removeItem('peserta'); 
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#20b486' }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white fw-bold"
          to="/"
          style={{ letterSpacing: '1.2px', fontSize: '1.5rem' }}
        >
          Bimbel Kebidanan
        </Link>
        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" aria-current="page" to="/">
                Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/bidang">
                Materi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/ujian">
                Ujian
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/profil">
                Profil
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white fw-semibold d-flex align-items-center"
                onClick={handleLogout}
                style={{ textDecoration: 'none', gap: '6px' }}
              >
                <i className="fas fa-sign-out-alt"></i>                
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
