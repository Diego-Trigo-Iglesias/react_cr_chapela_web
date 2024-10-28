import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const facebookUrl = "https://www.facebook.com/ClubderemoChapela/?locale=es_ES";
  const instagramUrl = "https://www.instagram.com/clubderemochapela/?locale=es_ES";
  const wofcoUrl = "https://wofco-ltd.com/es/";

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <header className="header">
      <div className="navbar">
        <div className="logo-container">
          <a href="/" {...linkProps}>
            <img src="icon.png" alt="Escudo del Club Deportivo" className="logo" />
          </a>
          <a href={wofcoUrl} {...linkProps}>
            <img src="wofco.png" alt="Logo de Wofco Ltd." className="logo wofco-logo" />
          </a>
        </div>

        <div className="socials">
          <a href={facebookUrl} {...linkProps}>Facebook</a>
          <a href={instagramUrl} {...linkProps}>Instagram</a>
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
          <Link to="/calendar" onClick={toggleMenu}>Calendario</Link>
          <Link to="/history" onClick={toggleMenu}>Historia</Link>
          <Link to="/results" onClick={toggleMenu}>Resultados</Link>
          <Link to="/team" onClick={toggleMenu}>Integrantes</Link>
          <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
