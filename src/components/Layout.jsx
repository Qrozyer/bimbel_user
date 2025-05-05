// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="wrapper">
      <Navbar />

      {/* AdminLTE content wrapper */}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid pt-3">
            <Outlet />
          </div>
        </section>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Layout;
