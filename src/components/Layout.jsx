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
      {/* Sidebar di kiri */}
      <div className="d-none d-md-block bg-gray-100" style={{ width: '300px'}}>
        <Sidebar />
      </div>

      {/* Area utama: Navbar di atas konten, Footer di bawah konten */}
      <div className="d-flex flex-column flex-grow-1" style={{ minHeight: '100vh' }}>
        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Konten utama */}
        <main className="flex-grow-1 overflow-auto p-4 pb-5 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-center bg-gray-100">
          <Footer />
        </footer>
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
