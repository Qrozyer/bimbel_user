import React from 'react';
import { useNavigate } from 'react-router-dom';  // Mengimpor useNavigate

const DaftarSubBidang = ({ data }) => {
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman Sub Bidang

  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }
  
  // Fungsi untuk mengarahkan ke halaman Sub Bidang
  const handleCardClick = (SubId) => {
    navigate(`/materi/${SubId}`); // Mengarahkan ke halaman Sub Bidang berdasarkan SubId
  };

  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item, index) => (
        <div 
          key={item.SubId} 
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#81c784', // Warna latar belakang cerah hijau
            cursor: 'pointer',  // Menambahkan cursor pointer agar pengguna tahu bahwa ini bisa diklik
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Efek transisi
          }}
          onClick={() => handleCardClick(item.SubId)}  // Menambahkan onClick untuk navigasi
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Efek saat hover
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Kembali ke ukuran semula
        >
          <div>
            <strong>{item.SubNama}</strong>
          </div>
          <div dangerouslySetInnerHTML={{ __html: item.SubKeterangan }}></div>
        </div>
      ))}
    </div>
  );
};

export default DaftarSubBidang;
