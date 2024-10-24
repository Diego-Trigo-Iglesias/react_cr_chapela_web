import React from "react";
import { useParams } from "react-router-dom";
import competitionsData from "./Competitions"; // Ajusta la ruta según donde guardes tus competiciones

const EventDetail = () => {
  const { id } = useParams(); // Obtener el ID del evento desde la URL
  const event = competitionsData.find((comp) => comp.id === parseInt(id)); // Buscar el evento

  if (!event) {
    return <h2>Evento no encontrado</h2>; // Mensaje si no se encuentra el evento
  }

  return (
    <div className="event-detail-container">
      <h2>{event.name}</h2>
      <p>Fecha: {event.date}</p>
      <p>Hora: {event.time}</p>
      <p>Lugar: {event.location}</p>
      <p>Categorías: {event.categories.join(", ")}</p>
      <p>Tipo de liga: {event.league}</p>
    </div>
  );
};

export default EventDetail;
