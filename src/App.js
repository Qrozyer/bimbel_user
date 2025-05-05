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
import Quiz from './components/Quiz';
import Result from './components/Result';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import NotFound from './components/NotFound';


import Login from './pages/Login';
import BidangPage from './pages/bidang/Bidang';
import SubBidangPage from './pages/subBidang/subBidang';


const App = () => {
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<BidangPage />} />
          <Route path="/sub-bidang/:id" element={<SubBidangPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;