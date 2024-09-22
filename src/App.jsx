import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Rooms from "./pages/Rooms"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/home" element={<Home />} />;
        <Route path="/rooms" element={<Rooms />} />;
      </Route>
    </Routes>
  );
}

export default App;
