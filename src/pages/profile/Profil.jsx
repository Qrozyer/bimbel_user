import React, { useEffect, useState } from 'react';

const ProfilPesertaPage = () => {
  const [peserta, setPeserta] = useState(null);

  useEffect(() => {
    // Mengambil data peserta dari sessionStorage
    const storedPeserta = JSON.parse(sessionStorage.getItem('peserta'));

    if (storedPeserta) {
      setPeserta(storedPeserta); // Menyimpan data peserta ke state
    }
  }, []);

  // Jika data peserta belum ada, tampilkan pesan error
  if (!peserta) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Data peserta tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profil Peserta</h2>
        <p style={styles.text}><strong>ID:</strong> {peserta.PesertaId}</p>
        <p style={styles.text}><strong>Nama:</strong> {peserta.PesertaNama}</p>
        <p style={styles.text}><strong>Email:</strong> {peserta.PesertaEmail}</p>
      </div>
    </div>
  );
};

export default ProfilPesertaPage;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
    fontSize: '18px',
  },
};
