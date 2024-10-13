import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";

createRoot(document.getElementById("root")).render(
  <IconContext.Provider
    value={{
      size: 32,
      weight: "light",
    }}
  >
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </IconContext.Provider>
);
