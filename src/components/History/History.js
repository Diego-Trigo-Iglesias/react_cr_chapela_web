import React from "react";
import { history } from "../Data/HistoryData";
import "./History.css";

const History = () => {
  return (
    <div className="history-container">
      {history.map((item, index) => {
        if (item.type === "title") {
          return <h1 key={index} className="history-title">{item.content}</h1>;
        } else if (item.type === "subtitle") {
          return <h2 key={index} className="history-subtitle">{item.content}</h2>;
        } else if (item.type === "paragraph") {
          return <p key={index} className="history-paragraph">{item.content}</p>;
        }
        return null; // Si no es un tipo esperado, no renderiza nada
      })}
    </div>
  );
};

export default History;
