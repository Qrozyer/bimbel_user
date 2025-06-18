import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-grow p-4 md:ml-0">
          <Outlet />
        </main>
        <footer className="footer-desktop text-center py-2">
          <Footer />
        </footer>
        {/* Sidebar Mobile */}
        <div className="md:hidden">
          <Sidebar isMobile />
        </div>
      </div>

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
