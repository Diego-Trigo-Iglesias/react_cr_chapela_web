import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // Estado para controlar el banner

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:c.r.chapela@hotmail.com?subject=Mensaje desde el formulario&body=Email: ${email}%0D%0AMensaje: ${message}`;
    window.location.href = mailtoLink;
    setSubmitted(true); // Mostrar el banner al enviar
    setEmail(''); // Limpiar el campo de email
    setMessage(''); // Limpiar el campo de mensaje
  };

  return (
    <div className="contact-container">
      <img src="/icon.png" alt="Escudo del Club" className="club-logo" />
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label htmlFor="email">Tu correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Tu mensaje:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {submitted && (
        <div className="confirmation-banner">
          Correo enviado, nos pondremos en contacto contigo lo antes posible.
        </div>
      )}
    </div>
  );
};

export default Contact;
