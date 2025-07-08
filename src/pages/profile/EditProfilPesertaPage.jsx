import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, editData } from '../../utils/api';
import './EditProfil.css';

const EditProfilPeserta = () => {
  const navigate = useNavigate();
  const pesertaLocal = JSON.parse(localStorage.getItem("peserta") || sessionStorage.getItem("peserta"));
  const pesertaId = pesertaLocal?.peserta?.PesertaId;
  const [daftarAsal, setDaftarAsal] = useState([]);

  const [form, setForm] = useState({
    PesertaEmail: '',
    PesertaNama: '',
    PesertaJk: 'L',
    PesertaAlamat: '',
    PesertaNohp: '',
    PesertaPendidikanTerakhir: '',
    PesertaAsalSekolah: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      try {
        const data = await fetchData(`peserta/pilih/${pesertaId}`);
        if (data) {
          setForm({
            PesertaEmail: data?.PesertaEmail || '',
            PesertaNama: data?.PesertaNama || '',
            PesertaJk: data?.PesertaJk || 'L',
            PesertaAlamat: data?.PesertaAlamat || '',
            PesertaNohp: data?.PesertaNohp || '',
            PesertaPendidikanTerakhir: data?.PesertaPendidikanTerakhir || '',
            PesertaAsalSekolah: data?.PesertaAsalSekolah || '',
          });
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data peserta', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (pesertaId) {
      getInitialData();
    } else {
      Swal.fire('Error', 'Peserta tidak ditemukan', 'error');
      navigate('/');
    }
  }, [pesertaId]);

  useEffect(() => {
  const getDaftarAsal = async () => {
    try {
      const res = await fetchData('/peserta/asal');
      if (Array.isArray(res)) {
        setDaftarAsal(res);
      }
    } catch (error) {
      console.error('Gagal mengambil daftar asal', error);
    }
  };

  getDaftarAsal();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.PesertaNama || !form.PesertaEmail || !form.PesertaJk) {
      Swal.fire('Error', 'Nama, Email, dan Jenis Kelamin wajib diisi!', 'error');
      return;
    }

    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menyimpan perubahan profil?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, simpan',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const response = await editData('peserta', pesertaId, form);
      if (response) {
        Swal.fire('Sukses', 'Profil berhasil diperbarui', 'success');
        navigate('/profil');
      }
    }
  };

  const handleCancel = () => navigate('/profil');

  if (loading) return <p className="ep-loading">Loading data peserta...</p>;

  return (
    <div className="ep-wrapper">
      <div className="card ep-card">
        <div className="ep-card-header">
          <h4 className="mb-0">Edit Profil Peserta</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label text-dark">Nama</label>
            <input
              type="text"
              className="form-control"
              name="PesertaNama"
              value={form.PesertaNama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input
              type="email"
              className="form-control"
              name="PesertaEmail"
              value={form.PesertaEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Jenis Kelamin</label>
            <select
              className="form-control"
              name="PesertaJk"
              value={form.PesertaJk}
              onChange={handleChange}
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Alamat</label>
            <input
              type="text"
              className="form-control"
              name="PesertaAlamat"
              value={form.PesertaAlamat}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">No. HP</label>
            <input
              type="text"
              className="form-control"
              name="PesertaNohp"
              value={form.PesertaNohp}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Pendidikan Terakhir</label>
            <input
              type="text"
              className="form-control"
              name="PesertaPendidikanTerakhir"
              value={form.PesertaPendidikanTerakhir}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
  <label className="form-label text-dark">Asal Sekolah</label>
  <select
    className="form-control"
    name="PesertaAsalSekolah"
    value={form.PesertaAsalSekolah}
    onChange={handleChange}
  >
    <option value="">-- Pilih Asal Sekolah --</option>
    {daftarAsal.map((item, index) => (
      <option key={index} value={item.AsalDaerah}>
        {item.AsalDaerah}
      </option>
    ))}
  </select>
</div>


          <div className="text-end mt-4">
            <button className="btn btn-secondary me-2" onClick={handleCancel}>Batal</button>
            <button className="btn ep-btn-success" onClick={handleSave}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilPeserta;
