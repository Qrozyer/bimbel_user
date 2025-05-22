import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPeserta } from '../reducers/pesertaSlice';

const baseURL = process.env.REACT_APP_BASE_URL;
const USER = process.env.REACT_APP_USER;
const PASS = process.env.REACT_APP_PASS;
const USER_VALUE = process.env.REACT_APP_USER_VALUE;
const PASS_VALUE = process.env.REACT_APP_PASS_VALUE;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedPeserta = localStorage.getItem('peserta') || sessionStorage.getItem('peserta');
    if (storedToken && storedPeserta) {
      dispatch(setPeserta(JSON.parse(storedPeserta)));
      navigate('/');
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${baseURL}/token`, {
          headers: {
            'Content-Type': 'application/json',
            [USER]: USER_VALUE,
            [PASS]: PASS_VALUE,
          },
        });
        setToken(res.data.token);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Gagal mengambil token');
      }
    };

    fetchToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token belum tersedia!');
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/login/peserta`, {
        PesertaEmail: email,
        PesertaPassword: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      toast.success(res.data.message || 'Login berhasil!');
      const pesertaData = res.data;
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('peserta', JSON.stringify({ peserta: pesertaData }));
      dispatch(setPeserta({ peserta: pesertaData }));

      if (password === 'admin') {
        navigate('/ganti-password');
      } else {
        navigate('/');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login gagal!';
      toast.error(msg);
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">Bimbel Kebidanan</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Login With Your Account</p>
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
