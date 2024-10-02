import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Rooms from "./pages/Rooms";
import DetailsRoom from "./pages/DetailsRoom";

function App() {
  return (
    <Routes>
      {/* AppLayout will wrap all these routes */}
      <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="rooms" element={<Rooms />}>
          <Route path=":roomID" element={<DetailsRoom />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
