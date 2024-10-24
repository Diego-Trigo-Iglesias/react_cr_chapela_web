// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Definir las URLs como variables
  const facebookUrl = "https://www.facebook.com/ClubderemoChapela/?locale=es_ES";
  const instagramUrl = "https://www.instagram.com/clubderemochapela/?locale=es_ES";
  const wofcoUrl = "https://wofco-ltd.com/es/";

  return (
    <header className="header">
      <div className="navbar">
        <div className="logo-container">
          <img src="icon.png" alt="Escudo del Club" className="logo" />
          <a href={wofcoUrl} target="_blank" rel="noopener noreferrer">
            <img src="wofco.png" alt="Logo de Wofco" className="logo wofco-logo" />
          </a>
        </div>
        
        <div className="socials">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        
        <button className="menu-button" onClick={toggleMenu}>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
        </button>
      </div>
      
      {isOpen && (
        <nav className="dropdown">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/calendario" onClick={toggleMenu}>Calendario</Link>
          <Link to="/historia" onClick={toggleMenu}>Historia</Link>
          <Link to="/resultados" onClick={toggleMenu}>Resultados</Link>
          <Link to="/integrantes" onClick={toggleMenu}>Integrantes</Link>
          <Link to="/contacto" onClick={toggleMenu}>Contacto</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
