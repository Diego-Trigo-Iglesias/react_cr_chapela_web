import React, { useState } from "react";
import resultsInfo from "../Data/Results"
import "./Results.css";

const Results = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredResults = resultsInfo.filter(item => {
    const categoryMatch = categoryFilter ? item.category === categoryFilter : true;
    const modalityMatch = modalityFilter ? item.modality === modalityFilter : true;
    const genderMatch = genderFilter ? item.gender === genderFilter : true;

    return categoryMatch && modalityMatch && genderMatch;
  });

  // Funciones para restablecer los filtros
  const resetFilters = () => {
    setCategoryFilter("");
    setModalityFilter("");
    setGenderFilter("");
  };

  return (
    <div>
      <h1>Resultados</h1>
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Seleciona Categoria</option>
          <option value="Alevín">Alevín</option>
          <option value="Infantil">Infantil</option>
          <option value="Cadete">Cadete</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Sénior">Sénior</option>
          <option value="Veterano">Veterano</option>
        </select>
        <select value={modalityFilter} onChange={(e) => setModalityFilter(e.target.value)}>
          <option value="">Seleciona Modalidad</option>
          <option value="Batel">Batel</option>
          <option value="Trainerilla">Trainerilla</option>
          <option value="Trainera">Trainera</option>
          <option value="Otra">Otra</option>
        </select>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Seleciona Género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <button className="reset-filters-button" onClick={resetFilters}>
          <img src="/deleteFilters.png" alt="Reset Filters" />
        </button>
      </div>
      <div className="results-container">
        {filteredResults.map(result => (
          <div key={result.id} className="result-card">
            <h3>{result.competitionName}</h3>
            <p>Categoria: {result.category}</p>
            <p>Modalidad: {result.modality}</p>
            <p>Género: {result.gender}</p>
            <p>Resultado: {result.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
