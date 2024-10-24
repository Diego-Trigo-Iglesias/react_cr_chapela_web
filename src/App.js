import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar";
import History from "./components/History/History";
import Results from "./components/Results/Results";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Galery from "./components/Galery/Galery"; 
import EventDetail from "./components/Events/EventDetail"; // Asegúrate de importar tu nuevo componente
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/historia" element={<History />} />
        <Route path="/resultados" element={<Results />} />
        <Route path="/integrantes" element={<Team />} />
        <Route path="/galeria" element={<Galery />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/event/:id" element={<EventDetail />} /> {/* Nueva ruta para el detalle del evento */}
      </Routes>
    </Router>
  );
};

export default App;
