import React, { useEffect, useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationid = 1;
      try {
        const response = await fetch(`http://localhost:8000/location/${locationid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchLocations();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-list">
          <h4>Filmovi</h4>
          <ul>
            <li>Najbolje ocjenjeni filmovi</li>
            <li>Trenutno u bioskopu</li>
            <li>Uskoro</li>
          </ul>
        </div>
        <div className="footer-list">
          <h4>Lokacije</h4>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {
                <li>
                  {locations.city}, {locations.country} - {locations.place}
                </li>
              }
            </ul>
          )}
        </div>
        <div className="footer-list">
          <h4>Informacije</h4>
          <ul>
            <li>O nama</li>
          </ul>
        </div>
        <div className="footer-list">
          <h4>Pratite nas</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className="footer-list">
          <h4>Autori</h4>
          <ul>
            <li>MilicaS</li>
            <li>MilicaB</li>
            <li>UnaM</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;