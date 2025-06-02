import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SoalUjian from '../../components/SoalUjian';
import Timer from '../../components/Timer';
import { fetchData } from '../../utils/api';

const UjianSoal = () => {
  const { sectionId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [loading, setLoading] = useState(true);
  const durasi = useSelector((state) => state.ujian.durasi);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetchData(`ujian/soal/${sectionId}`);
        if (response) {
          setQuestions(response);
        } else {
          console.error('No questions found');
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

    Promise.all([fetchQuestions(), fetchSectionName()]).then(() => {
      setLoading(false);
    });
  }, [sectionId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <div className="card mt-3">
        <div
  className="card-header position-relative"
  style={{ backgroundColor: '#20B486', color: 'white', minHeight: '60px' }}
>
  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
    <h5 className="mb-0">{sectionName || 'Section'}</h5>
  </div>
  <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
    <Timer duration={durasi} />
  </div>
</div>

        <div className="card-body">
          <SoalUjian questions={questions} />
        </div>
      </div>
    </div>
  );
};

export default UjianSoal;
