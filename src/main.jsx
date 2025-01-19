import App from "./App.jsx";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";

import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/Spinner.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor} />
    <IconContext.Provider
      value={{
        size: 32,
        weight: "light",
      }}
    >
      <ToastContainer />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IconContext.Provider>
  </Provider>
);
