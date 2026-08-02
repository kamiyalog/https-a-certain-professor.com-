import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Game from "./game";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Game root element was not found.");
}

createRoot(root).render(
  <StrictMode>
    <Game />
  </StrictMode>,
);
