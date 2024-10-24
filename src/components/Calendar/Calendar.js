// pages/Calendar.js
import React, { useState } from "react";
import competitions from "../Events/Competitions";
import './Calendar.css'

const Calendar = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("");

  // Filtrar competiciones según los filtros
  const filteredCompetitions = competitions.filter(competition => {
    const categoryMatch = categoryFilter ? competition.categories.includes(categoryFilter) : true;
    const genderMatch = genderFilter ? competition.genders.includes(genderFilter) : true;
    const leagueMatch = leagueFilter ? competition.league.includes(leagueFilter) : true;

    return categoryMatch && genderMatch && leagueMatch;
  });

  return (
    <div>
      <h1>Calendario de Competiciones</h1>

      {/* Filtros */}
      <div className="filters">
        <label>
          Categoría:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">Todas</option>
            <option value="Alevín">Alevín</option>
            <option value="Cadete">Cadete</option>
            <option value="Juvenil">Juvenil</option>
            <option value="Absoluto">Absoluto</option>
            <option value="Veterano">Veterano</option>
          </select>
        </label>

        <label>
          Género:
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </label>

        <label>
          Liga:
          <select value={leagueFilter} onChange={(e) => setLeagueFilter(e.target.value)}>
            <option value="">Todas</option>
            <option value="Liga Gallega de Batel">Liga Gallega de Batel</option>
            <option value="Liga Gallega de Trainerillas">Liga Gallega de Trainerillas</option>
            <option value="Liga Gallega de Traineras">Liga Gallega de Traineras</option>
          </select>
        </label>
      </div>

      {/* Mostrar competiciones filtradas */}
      <div className="competition-list">
        {filteredCompetitions.map(competition => (
          <div key={competition.id} className="competition-card">
            <h3>{competition.name}</h3>
            <br/>
            <p>Fecha: {competition.date}</p>
            <p>Horario: {competition.time}</p>
            <p>Lugar: {competition.location}</p>
            <p>Categorías: {competition.categories.join(", ")}</p>
            <p>Géneros: {competition.genders.join(", ")}</p>
            <p>Liga: {competition.league}</p>
            <p>Tipo de prueba: {competition.level}</p>
          </div>
        ))}
        {filteredCompetitions.length === 0 && <p>No se encontraron competiciones.</p>}
      </div>
    </div>
  );
};

export default Calendar;
