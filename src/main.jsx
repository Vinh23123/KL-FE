import { StrictMode } from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <IconContext.Provider
        value={{
          size: 32,
          weight: "light",
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IconContext.Provider>
    </Provider>
  </StrictMode>
);
