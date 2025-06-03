import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar Desktop */}
      <div className="d-none d-md-block bg-gray-100" style={{ width: '240px' }}>
        <Sidebar />
      </div>

      {/* Area Utama */}
      <div className="d-flex flex-column flex-grow-1 bg-gray-100" style={{ minHeight: '100vh' }}>
        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Konten Utama */}
        <main className="flex-grow-1 py-3 px-3 mb-4 mr-5">
          <div className="w-100">
            <Outlet />
          </div>
        </main>

        {/* Footer Desktop */}
        <footer className="text-center py-2 footer-desktop">
          <Footer />
        </footer>

        {/* Sidebar Mobile (Bottom Navbar) */}
        <div className="d-md-none">
          <Sidebar isMobile />
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
};

export default Layout;
