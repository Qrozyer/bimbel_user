import React from 'react';
import './HubungiKami.css';

const HubungiKami = () => {
  return (
    <div className="hubungi-kami-container">
      <h2 className="text-center">Hubungi Kami</h2>
      <div className="contact-boxes">
        <a
          href="https://maps.app.goo.gl/6kbBZ8xMYW4Co67r9"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-box"
        >
          <i className="fas fa-map-marker-alt contact-icon"></i>
          <h5>Location</h5>
          <p>Kavling Valencia regency, RT.01/RW.09, Sayidan, Sumberadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55288</p>
        </a>

        <a
          href="https://wa.me/6282325646503"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-box"
        >
          <i className="fab fa-whatsapp contact-icon"></i>
          <h5>WhatsApp</h5>
          <p>+62 823-2564-6503</p>
        </a>

        <a
          href="https://www.instagram.com/jm.metha_academy"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-box"
        >
          <i className="fab fa-instagram contact-icon"></i>
          <h5>Instagram</h5>
          <p>@jm.metha_academy</p>
        </a>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=jm.metha.academy@gmail.com" target="_blank"
          className="contact-box"
        >
          <i className="fas fa-envelope contact-icon"></i>
          <h5>Email</h5>
          <p>jm.metha.academy@gmail.com</p>
        </a>
      </div>
    </div>
  );
};

export default HubungiKami;
