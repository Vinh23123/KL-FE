import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Slider from "./pages/Slider";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Rooms from "./pages/Room/Rooms";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateRoom from "./pages/dashboard/CreateRoom";
import Setting from "./pages/dashboard/Setting";
import RoomsDashboard from "./pages/dashboard/RoomsDashboard";

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
        <Route path="rooms" element={<Rooms />} />
        <Route path="booking-history" element={<Rooms />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/rooms" element={<RoomsDashboard />} />
        <Route path="/dashboard/createRoom" element={<CreateRoom />} />
        <Route path="/dashboard/setting" element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default App;
