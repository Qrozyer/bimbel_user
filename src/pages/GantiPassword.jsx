import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editData } from '../utils/api';
import { toast } from 'react-toastify';
import './GantiPassword.css'; // Pastikan kamu buat file CSS ini

function GantiPassword() {
  const peserta = useSelector((state) => state.peserta?.peserta);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!peserta) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length < 4) {
      toast.error('Password minimal 4 karakter');
      return;
    }

    const res = await editData('peserta/pwd', peserta.PesertaID, {
      PesertaPassword: password,
    });

    if (res) {
      toast.success('Password berhasil diperbarui');
      navigate('/');
    }
  };

  return (
    <div className="ganti-password-container m-5">
      <div className="ganti-password-left">
        <h2>Selamat Datang Kembali!</h2>
        <p>Untuk tetap terhubung, silakan ubah password Anda sesuai ketentuan:</p>
        <ul>
          <li>Minimal 4 karakter</li>
          <li>Gunakan kombinasi huruf dan angka (disarankan)</li>
          <li>Jangan gunakan password default</li>
        </ul>
      </div>
      <div className="ganti-password-right">
        <h2>Ganti Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="submit-button">Simpan Password</button>
        </form>
        <p className="back-login">
          <a href="/login">Kembali ke Login</a>
        </p>
      </div>
    </div>
  );
}

export default GantiPassword;