import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Slider from "./pages/Slider";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
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
