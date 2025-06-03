// Timer.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Timer = ({ duration, onTimeUp, onTenMinutesLeft }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // panggil saat habis
      return;
    }

    if (timeLeft === 600 && !notified) {
      toast.info('⏳ Sisa waktu tinggal 10 menit! Silakan periksa kembali jawaban Anda.', {        
        autoClose: 10000,
      });
      setNotified(true);      
      onTenMinutesLeft?.(); // opsional callback
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, notified]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h4>
        Waktu Tersisa: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h4>
    </div>
  );
};

export default Timer;
