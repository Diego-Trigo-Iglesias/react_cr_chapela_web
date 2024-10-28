import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import competitions from "../../Data/Competitions";
import './CalendarDetail.css';

const CalendarDetail = () => {
    const { id } = useParams(); // Captura el id del evento de la URL
    const navigate = useNavigate();

    // Si hay un id, busca la competición correspondiente
    const eventDetail = id ? competitions.find(comp => comp.id === parseInt(id)) : null;

    return (
        <div className="calendar-detail-container">
            <h1>Detalles de la Competición</h1>

            <button onClick={() => navigate("/calendar")}>
                Volver al Calendario
            </button>

            {/* Mostrar la card de la competición específica */}
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
                    <p className="no-competitions">No se encontraron detalles.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarDetail;
