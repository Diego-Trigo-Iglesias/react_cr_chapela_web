import React, { useState } from "react";
import "./Partner.css";

const Partner = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:crchapela@hotmail.com?subject=Solicitud para hacerse socio&body=Nombre: ${name}%0D%0ACorreo: ${email}%0D%0AMensaje: ${message}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="partner-container">
      <img src="/icon.png" alt="Escudo del Club" className="club-logo" />
      <h1>Hazte Socio</h1>
      <form onSubmit={handleSubmit} className="partner-form">
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Mensaje adicional:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Enviar solicitud</button>
      </form>
      {submitted && (
        <div className="confirmation-banner">
          Solicitud enviada, nos pondremos en contacto contigo pronto.
        </div>
      )}
    </div>
  );
};

export default Partner;
