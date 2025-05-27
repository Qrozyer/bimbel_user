import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPeserta } from '../reducers/pesertaSlice';
import './Login.css';

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
    const stored = localStorage.getItem('peserta') || sessionStorage.getItem('peserta');
    const parsed = stored ? JSON.parse(stored)?.peserta : null;
    if (parsed) {
      navigate('/');
    } else {
      setPeserta(parsed);
    }
  }, [navigate]);

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
          Accept: 'application/json',
        }
      });

      toast.success(res.data.message || 'Login berhasil!');

      const isDefaultPassword = password.trim() === 'user';

      const pesertaData = {
        ...res.data,
        isDefaultPassword,
      };

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem('token', token);
      storage.setItem('peserta', JSON.stringify({ peserta: pesertaData }));

      dispatch(setPeserta({ peserta: pesertaData }));

      if (isDefaultPassword) {
        navigate('/ganti-password', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login gagal!';
      toast.error(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Bimbel Kebidanan</h2>
        <p>Masuk ke akun Anda untuk melanjutkan ke sistem pembelajaran kami.</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button type="submit" className="submit-button">Masuk</button>

          <div className="forgot-link">
            <a href="#">Lupa password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
