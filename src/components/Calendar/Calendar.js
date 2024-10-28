import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import competitions from "../Data/Competitions";
import './Calendar.css';

const Calendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("");

  // Filtrar competiciones según los filtros
  const filteredCompetitions = competitions.filter(competition => {
    const categoryMatch = categoryFilter ? competition.categories.includes(categoryFilter) : true;
    const genderMatch = genderFilter ? competition.genders.includes(genderFilter) : true;
    const leagueMatch = leagueFilter ? competition.league === leagueFilter : true;

    return categoryMatch && genderMatch && leagueMatch;
  });

  const eventDetail = id ? competitions.find(comp => comp.id === parseInt(id)) : null;

  // Función para restablecer todos los filtros
  const resetFilters = () => {
    setCategoryFilter("");
    setGenderFilter("");
    setLeagueFilter("");
  };

  return (
    <div className="calendar-container">
      <h1>Calendario de Competiciones</h1>

      {/* Filtros */}
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Alevín">Alevín</option>
          <option value="Cadete">Cadete</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Absoluto">Absoluto</option>
          <option value="Veterano">Veterano</option>
        </select>

        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Todos los géneros</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <select value={leagueFilter} onChange={(e) => setLeagueFilter(e.target.value)}>
          <option value="">Todas las ligas</option>
          <option value="Liga Gallega de Batel">Batel</option>
          <option value="Liga Gallega de Trainerillas">Trainerilla</option>
          <option value="Liga Gallega de Traineras">Trainera</option>
        </select>

        {/* Botón para restablecer filtros con imagen */}
        <button onClick={resetFilters} className="reset-filters-button">
          <img src="/deleteFilters.png" alt="Restablecer filtros" />
        </button>
      </div>

      {/* Botón para volver atrás si estamos en la vista de un evento específico */}
      {eventDetail && (
        <button onClick={() => navigate("/calendar")}>
          Volver a Calendario
        </button>
      )}

      {/* Mostrar competiciones filtradas */}
      <div className="competition-list">
        {eventDetail ? (
          <div className="competition-card">
            <h3>{eventDetail.name}</h3>
            <p>Fecha: {eventDetail.date}</p>
            <p>Horario: {eventDetail.time}</p>
            <p>Lugar: {eventDetail.location}</p>
            <p>Categorías: {eventDetail.categories.join(", ")}</p>
            <p>Géneros: {eventDetail.genders.join(", ")}</p>
            <p>Liga: {eventDetail.league}</p>
            <p>Tipo de prueba: {eventDetail.level}</p>
          </div>
        ) : (
          filteredCompetitions.length > 0 ? (
            filteredCompetitions.map(competition => (
              <div
                key={competition.id}
                className="competition-card"
                onClick={() => navigate(`/calendar/${competition.id}`)}
              >
                <h3>{competition.name}</h3>
                <p>Fecha: {competition.date}</p>
                <p>Horario: {competition.time}</p>
                <p>Lugar: {competition.location}</p>
                <p>Categorías: {competition.categories.join(", ")}</p>
                <p>Géneros: {competition.genders.join(", ")}</p>
                <p>Liga: {competition.league}</p>
                <p>Tipo de prueba: {competition.level}</p>
              </div>
            ))
          ) : (
            <p className="no-competitions">No se encontraron competiciones.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
