import React from "react";
import ReactDOM from "react-dom";
import Game from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("tic-tac-toe-root")).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);