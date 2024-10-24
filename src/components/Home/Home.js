// pages/Home.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import competitions from "../Events/Competitions";

const Home = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false); // Estado para manejar la expansión del texto "Sobre Nosotros"

  const aboutRef = useRef(null); // Referencia para la sección "Sobre Nosotros"
  const menuRef = useRef(null); // Referencia para el menú desplegable

  const toggleAboutExpansion = () => {
    setIsAboutExpanded(!isAboutExpanded); // Alternar la expansión del texto sobre nosotros
  };

  const aboutText = "El Club de Remo Chapela es un club deportivo dedicado al remo, promoviendo valores de trabajo en equipo y excelencia deportiva. Ofrecemos formación para todas las edades y niveles, organizamos competiciones locales e internacionales, y trabajamos por la integración y el fomento del deporte en nuestra comunidad.";
  const aboutSummary = "El Club de Remo Chapela es un club deportivo dedicado al remo...";
  const newsText = "Nuestro equipo juvenil ha ganado el Campeonato Provincial 2024.";
  const sponsors = [
    { src: "wofcoSponsor.jpg", alt: "Wofco" },
    { src: "nonXunta.jpg", alt: "Non Xunta" },
    { src: "depPontevedra.png", alt: "Dep Pontevedra" },
    { src: "concelloRedondela.png", alt: "Concello Redondela" },
    { src: "xunta.png", alt: "Xunta de Galicia" },
    { src: "niso.jpg", alt: "Grupo NISO" },
    { src: "fonseca.jpeg", alt: "Talleres Fonseca" },
    { src: "torresCarrera.jpg", alt: "Torres Carrera" },
    { src: "repainox.jpg", alt: "Repainox" },
    { src: "puertoVigo.jpg", alt: "Puerto de Vigo" },
    { src: "dXura.jpg", alt: "D'Xura" },
    { src: "gasAmigo.jpg", alt: "Gasoleos Amigo" },
    { src: "aguaSana.jpg", alt: "Agua Sana" }
  ];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setIsAboutExpanded(false); // Cerrar si se hace clic fuera
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Aquí puedes cerrar el menú desplegable, si es que tienes la lógica para eso
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, menuRef]);

  const nextCompetitions = competitions.slice(0, 2); // Las 4 primeras competiciones
  const remainingCompetitions = competitions.slice(4); // El resto

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="overlay-text">Club de Remo Chapela</h1>
        <img src="wave.jpg" alt="Ola" className="wave-image" />
        <p>Excelencia en el deporte desde 1984</p>
      </header>

      <section className="home-about" ref={aboutRef}>
        <h2>Sobre Nosotros</h2>
        <p>
          {isAboutExpanded ? aboutText : aboutSummary}
        </p>
        <button className="toggle-button" onClick={toggleAboutExpansion}>
          {isAboutExpanded ? "Mostrar menos" : "Leer más"}
        </button>
      </section>

      <section className="home-sponsors">
        <h2>Patrocinadores</h2>
        <div className="sponsor-logos">
          {sponsors.map((sponsor, index) => (
            <img key={index} src={sponsor.src} alt={sponsor.alt} />
          ))}
        </div>
      </section>

      <section className="home-events">
        <h2>Próximas Competiciones</h2>
        <div className="event-cards">
          {nextCompetitions.length > 0 ? (
            nextCompetitions.map((competition) => (
              <Link to={`/event/${competition.id}`} className="event-card" key={competition.id}>
                <h3>{competition.name}</h3>
                <p>Fecha: {competition.date}</p>
                <p>Lugar: {competition.location}</p>
                <p>Horario: {competition.time}</p>
              </Link>
            ))
          ) : (
            <p>No hay competiciones próximas.</p>
          )}
        </div>
        {remainingCompetitions.length > 0 && (
          <Link to="/calendar" className="view-calendar">
            Ver más competiciones en el calendario
          </Link>
        )}
      </section>

      <section className="home-news">
        <h2>Noticias Destacadas</h2>
        <p>{newsText}</p>
      </section>

      <section className="home-cta">
        <h2>¡Únete a Nosotros!</h2>
        <button className="cta-button">Inscribirse</button>
      </section>
    </div>
  );
};

export default Home;
