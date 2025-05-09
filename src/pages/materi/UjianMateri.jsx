import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Mengimpor useSelector untuk mengambil data dari Redux
import MateriUjian from '../../components/MateriUjian'; // Mengimpor komponen Quiz
import Timer from '../../components/Timer'; // Mengimpor komponen Timer
import { fetchData } from '../../utils/api'; // Mengimpor fetchData dari utils/api

const UjianMateri = () => {
  const { materiId } = useParams(); // Mengambil materiId dari URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Mengambil soal berdasarkan materiId
        const response = await fetchData(`ujian/materi/${materiId}`);
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
  }, [materiId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4">
      <h1>Ujian Anda</h1>
      <MateriUjian questions={questions} />
    </div>
  );
};

export default UjianMateri;
