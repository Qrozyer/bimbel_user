import React, { useState, useEffect } from 'react';

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Durasi dalam detik

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h4>Waktu Tersisa: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h4>
    </div>
  );
};

export default Timer;
