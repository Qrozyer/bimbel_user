import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';

// Mengimpor gambar
import lesson1Image from '../assets/images/lesson1.jpg';
import lesson2Image from '../assets/images/lesson2.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleStartNow = (ujianid) => {
    // Arahkan ke halaman ujian dengan ujianid yang diberikan
    navigate(`/ujian/${ujianid}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Carousel */}
      <div className="px-4">
        <h3 className="text-lg font-semibold mb-2">Ujian Yang Berlangsung Untuk Anda</h3>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className="rounded-lg"
        >
          <div className="bg-white rounded-lg shadow p-4">
            <img
              src={lesson1Image}
              alt="Lesson 1"
              style={{
                width: '100%', // Mengisi lebar penuh
                height: '300px', // Menentukan tinggi gambar
                objectFit: 'cover', // Gambar akan terpotong dan tetap memenuhi area
                objectPosition: 'center', // Memastikan gambar terpusat dengan baik
              }}
            />
            <div className="mt-2">
              <h4 className="font-semibold">Ujian UTBK 1</h4>
              <p className="text-sm text-gray-600">22 Juni 2025</p>
              <button
  onClick={() => handleStartNow(1)} // Mengarahkan ke ujian dengan id 2
  className="btn btn-primary mt-1"
>
  Start Now
</button>

            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <img
              src={lesson2Image}
              alt="Lesson 2"
              style={{
                width: '100%', // Mengisi lebar penuh
                height: '300px', // Menentukan tinggi gambar
                objectFit: 'cover', // Gambar akan terpotong dan tetap memenuhi area
                objectPosition: 'center', // Memastikan gambar terpusat dengan baik
              }}
            />
            <div className="mt-2">
              <h4 className="font-semibold">Ujian Materi Matematika</h4>
              <p className="text-sm text-gray-600">26 Mei 2025</p>
              <button
  onClick={() => handleStartNow(1)} // Mengarahkan ke ujian dengan id 2
  className="btn btn-primary mt-1"
>
  Start Now
</button>

            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;