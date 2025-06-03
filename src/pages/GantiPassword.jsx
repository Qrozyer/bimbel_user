import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { editData } from '../utils/api';
import { toast } from 'react-toastify';
import './GantiPassword.css';

const isValidPassword = (password, email) => {
  const specialChars = /[!@#$%^&*()~_+=]/g;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const repeated = /(.)\1\1/;
  const sequentialAlpha = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i;
  const sequentialNum = /012|123|234|345|456|567|678|789/;
  const sequentialSpecial = /!@#|@#\$|#\$%|\$%\^|%\^&|\^&\*/;
  const number = /[0-9]/;

  if (password.length < 8) return 'Password minimal 8 karakter';
  if ((password.match(specialChars) || []).length < 2) return 'Password harus mengandung minimal 2 karakter spesial';
  if (!number.test(password)) return 'Password harus mengandung minimal 1 angka';
  if (!uppercase.test(password)) return 'Password harus mengandung minimal 1 huruf besar';
  if (!lowercase.test(password)) return 'Password harus mengandung minimal 1 huruf kecil';
  if (repeated.test(password)) return 'Password tidak boleh mengandung karakter yang diulang lebih dari 2 kali';
  if (sequentialAlpha.test(password)) return 'Password tidak boleh mengandung urutan huruf seperti abc';
  if (sequentialNum.test(password)) return 'Password tidak boleh mengandung urutan angka seperti 123';
  if (sequentialSpecial.test(password)) return 'Password tidak boleh mengandung urutan karakter spesial seperti !@#';
  if (password.toLowerCase() === email.toLowerCase()) return 'Password tidak boleh sama dengan email';
  return null;
};

function GantiPassword() {
  const navigate = useNavigate();

  const [peserta, setPeserta] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('peserta') || sessionStorage.getItem('peserta');
    const parsed = stored ? JSON.parse(stored)?.peserta : null;
    if (!parsed) {
      navigate('/login');
    } else {
      setPeserta(parsed);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMsg = isValidPassword(password, peserta?.PesertaEmail || '');
    if (validationMsg) {
      toast.error(validationMsg);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi password tidak sesuai');
      return;
    }

    try {
      const res = await editData('peserta/pwd', peserta.PesertaId, {
        PesertaPassword: password,
      });

      if (res) {
        const storage = localStorage.getItem('peserta') ? localStorage : sessionStorage;
        const storedPeserta = JSON.parse(storage.getItem('peserta'));
        if (storedPeserta?.peserta) {
          storedPeserta.peserta.isDefaultPassword = false;
          storage.setItem('peserta', JSON.stringify(storedPeserta));
        }

        toast.success('Password berhasil diperbarui');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Gagal memperbarui password');
    }
  };

  const handleLewati = () => {
  const pesan = 'Anda belum mengganti password. Segera ganti password untuk keamanan akun Anda!';
  localStorage.setItem('notifikasi', pesan);
  toast.warn(pesan);
  navigate('/');
};


  if (!peserta) return null;

  return (
    <div className="ganti-password-container m-5" style={{ display: 'flex' }}>
      <div className="ganti-password-left" style={{ flex: '1 1 40%' }}>
        <h2>Selamat Datang Kembali!</h2>
        <p>Untuk tetap terhubung, silakan ubah password Anda sesuai ketentuan:</p>
        <ul className="small">
          <li>Minimal 8 karakter</li>
          <li>Tidak sama dengan email</li>
          <li>Minimal 2 karakter spesial (!@#$%^&*()~_+=)</li>
          <li>Minimal 1 huruf besar</li>
          <li>Minimal 1 huruf kecil</li>
          <li>Tidak boleh karakter yang berulang (aaa, 111)</li>
          <li>Tidak boleh urutan huruf/angka/spesial (abc, 123, !@#)</li>
        </ul>
      </div>

      <div className="ganti-password-right" style={{ flex: '1 1 55%' }}>
        <h2>Ganti Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group password-input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
            <span
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
  style={{ cursor: 'pointer' }}
>
  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</span>

          </div>

          <div className="input-group password-input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Konfirmasi Password Baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
            <span
  className="toggle-password"
  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  style={{ cursor: 'pointer' }}
>
  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</span>

          </div>

          <button type="submit" className="submit-button btn btn-primary w-100">
            Simpan Password
          </button>
        </form>
        <h1 className="back-login mt-3">
          <button className="btn btn-link" style={{ fontSize: '30px' }} onClick={handleLewati}>Lewati</button>
        </h1>
      </div>
    </div>
  );
}

export default GantiPassword;
