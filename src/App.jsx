import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Slider from "./pages/Slider";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      {/* AppLayout will wrap all these routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<Home />} />
        {/* <Route path="rooms" element={<Slider />}>
          <Route path=":roomID" element={<DetailsRoom />} />
        </Route> */}
        <Route path="rooms" element={<Slider />} />
      </Route>
    </Routes>
  );
}

export default App;
