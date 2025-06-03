// UjianSoal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SoalUjian from '../../components/SoalUjian';
import Timer from '../../components/Timer';
import { fetchData } from '../../utils/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UjianSoal = () => {
  const { sectionId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [loading, setLoading] = useState(true);
  const durasi = useSelector((state) => state.ujian.durasi);
  const soalRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetchData(`ujian/soal/${sectionId}`);
        if (response) {
          setQuestions(response);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    const fetchSectionName = async () => {
      try {
        const sectionResponse = await fetchData(`soal/section/pilih/${sectionId}`);
        if (sectionResponse && sectionResponse.SectionNama) {
          setSectionName(sectionResponse.SectionNama);
        }
      } catch (error) {
        console.error('Error fetching section name:', error);
      }
    };

    Promise.all([fetchQuestions(), fetchSectionName()]).then(() => setLoading(false));
  }, [sectionId]);

  const handleTimeUp = () => {
    if (soalRef.current) {
      soalRef.current.forceFinish(); // panggil handle dari child
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="card mt-3">
        <div
          className="card-header position-relative"
          style={{ backgroundColor: '#20B486', color: 'white', minHeight: '60px' }}
        >
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <h5 className="mb-0">{sectionName || 'Section'}</h5>
          </div>
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <Timer duration={durasi} onTimeUp={handleTimeUp} />
          </div>
        </div>

        <div className="card-body">
          <SoalUjian questions={questions} ref={soalRef} />
        </div>
      </div>
    </div>
  );
};

export default UjianSoal;
