import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar";
import CalendarDetail from "./components/Calendar/CalendarDetail/CalendarDetail";
import History from "./components/History/History";
import Results from "./components/Results/Results";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Galery from "./components/Galery/Galery";
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:id" element={<CalendarDetail />} /> {/*Detalles del evento */}
        <Route path="/history" element={<History />} />
        <Route path="/results" element={<Results />} />
        <Route path="/team" element={<Team />} />
        <Route path="/galery" element={<Galery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} /> {/*ruta no definida redirige a home*/}
      </Routes>
    </Router>
  );
};

export default App;
