import React, { useState } from "react";
import { ligaFemenina, ligaA, ligaB } from "../Data/RowersData";
import "./Team.css";

const Rowers = () => {
  const [activeTab, setActiveTab] = useState("ligaA");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderRowers = () => {
    let rowersList;

    switch (activeTab) {
      case "ligaFemenina":
        rowersList = ligaFemenina;
        break;
      case "ligaB":
        rowersList = ligaB;
        break;
      default:
        rowersList = ligaA;
    }

    return (
      <div className="card-container">
        {rowersList.map((deportista, index) => (
          <div className="card" key={index}>
            <div className="card-title">
              {deportista.nombre} {deportista.apellido}
            </div>
            <div className="card-detail">
              <div>Estado actual: {deportista.status}</div>
              <div>
                Años en el club: {deportista.trayectoria.join(" - ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="rowers-tabs">
        <button
          onClick={() => handleTabClick("ligaA")}
          className={`rowers-tab-button ${activeTab === "ligaA" ? "active" : ""}`}
        >
          Liga A
        </button>
        <button
          onClick={() => handleTabClick("ligaFemenina")}
          className={`rowers-tab-button ${activeTab === "ligaFemenina" ? "active" : ""}`}
        >
          Liga Femenina
        </button>
        <button
          onClick={() => handleTabClick("ligaB")}
          className={`rowers-tab-button ${activeTab === "ligaB" ? "active" : ""}`}
        >
          Liga B
        </button>
      </div>
      {renderRowers()}
    </div>
  );
};

export default Rowers;
