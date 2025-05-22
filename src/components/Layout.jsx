import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <style>
        {`
          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .wrapper {
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
          .content-wrapper {
            flex: 1;
            background-color: #f4f6f9;
          }
        `}
      </style>

      <div className="wrapper">
        <Navbar />

        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid pt-3">
              <Outlet />
            </div>
          </section>
        </div>

        <Footer />
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
    </>
  );
};

export default Layout;
