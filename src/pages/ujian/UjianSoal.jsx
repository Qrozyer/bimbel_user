import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Mengimpor useSelector untuk mengambil data dari Redux
import SoalUjian from '../../components/SoalUjian'; // Mengimpor komponen Quiz
import Timer from '../../components/Timer'; // Mengimpor komponen Timer
import { fetchData } from '../../utils/api'; // Mengimpor fetchData dari utils/api

const UjianSoal = () => {
  const { sectionId } = useParams(); // Mengambil sectionId dari URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const durasi = useSelector((state) => state.ujian.durasi); // Mengambil durasi dari Redux

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Mengambil soal berdasarkan sectionId
        const response = await fetchData(`ujian/soal/${sectionId}`);
        if (response) {
          setQuestions(response); // Menyimpan soal ke state
        } else {
          console.error('No questions found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [sectionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4">
      <h1>Ujian Anda</h1>
      <Timer duration={durasi} /> {/* Timer untuk ujian menggunakan durasi dari Redux */}
      <SoalUjian questions={questions} />
    </div>
  );
};

export default UjianSoal;
