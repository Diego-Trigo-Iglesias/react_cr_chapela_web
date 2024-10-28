import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import competitions from "../Data/Competitions";
import { aboutText, aboutSummary, newsInformation, sponsors } from "../Data/AboutText";
import "./Home.css";

const Home = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const aboutRef = useRef(null);
  const menuRef = useRef(null);

  const toggleAboutExpansion = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setIsAboutExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, menuRef]);

  // Filtrar y ordenar competiciones futuras
  const currentDate = new Date(); // Obtener la fecha actual
  const futureCompetitions = competitions.filter((competition) => new Date(competition.date) > currentDate);
  const sortedCompetitions = futureCompetitions.sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextCompetitions = sortedCompetitions.slice(0, 2); // Tomar las 2 competiciones más próximas

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="overlay-text">Club de Remo Chapela</h1>
        <img src="wave.jpg" alt="Ola" className="wave-image" />
        <p>Excelencia en el deporte desde 1984</p>
      </header>

      <section className="home-about" ref={aboutRef}>
        <h2>Sobre Nosotros</h2>
        <div>
          {(isAboutExpanded ? aboutText : [aboutSummary]).map((section, index) => {
            if (typeof section === "string") {
              return <p key={index}>{section}</p>;
            }
            switch (section.type) {
              case "title":
                return <h3 key={index}>{section.content}</h3>;
              case "subtitle":
                return <h4 key={index}>{section.content}</h4>;
              case "paragraph":
              default:
                return <p key={index}>{section.content}</p>;
            }
          })}
        </div>
        <button className="toggle-button" onClick={toggleAboutExpansion}>
          {isAboutExpanded ? "Mostrar menos" : "Leer más"}
        </button>
      </section>

      <section className="home-sponsors">
        <h2>Sponsors</h2>
        <div className="sponsor-logos">
          {sponsors.map((sponsor, index) => (
            <img key={index} src={sponsor.src} alt={sponsor.alt} />
          ))}
        </div>
      </section>

      <section className="home-events">
        <div className="header-container">
          <h2>Próximas Competiciones</h2>
          {nextCompetitions.length > 0 && (
            <Link to="/calendar" className="view-calendar">
              <span className="view-calendar-icon">📅</span>
              Ver más competiciones en el calendario
            </Link>
          )}
        </div>
        <div className="event-cards">
          {nextCompetitions.length > 0 ? (
            nextCompetitions.map((competition) => (
              <Link to={`/calendar/${competition.id}`} className="event-card" key={competition.id}>
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
      </section>



      <section className="home-news">
        <h2>Noticias Destacadas</h2>
        <div className="news-cards">
          {newsInformation.map((newsItem, index) => (
            <div key={index} className="news-card">
              <div className="news-card-content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <h2>¡No dudes en contactarnos!</h2>
        <Link to="/contact">
          <button className="cta-button">
            <img src="/contact.png" alt="Contact Us" className="cta-image" />
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
