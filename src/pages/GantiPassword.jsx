import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editData } from '../utils/api';
import { toast } from 'react-toastify';

function GantiPassword() {
  const peserta = useSelector((state) => state.peserta?.peserta);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!peserta) {
    // Redirect jika belum login
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
      navigate('/'); // arahkan ke halaman utama
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">Ganti Password</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Masukkan password baru Anda</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password Baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="input-group-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Simpan Password
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-3 mb-1">
              <a href="/login">Kembali ke Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GantiPassword;
