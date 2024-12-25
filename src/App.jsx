import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Rooms from "./pages/Room/Rooms";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateRoom from "./pages/dashboard/CreateRoom";
import Setting from "./pages/dashboard/Setting";
import RoomsDashboard from "./pages/dashboard/RoomsDashboard";
import Slider from "./pages/room/Slider";
import BookingRoomsHistory from "./pages/bookingHistory/BookingRoomsHistory";
import ResultPayment from "./components/ResultPayment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<AppLayout />}>
          <Route path="payment-result" element={<ResultPayment />} />
          <Route path="home" element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:roomId" element={<Slider />}></Route>
          <Route path="booking-history" element={<BookingRoomsHistory />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/rooms" element={<RoomsDashboard />} />
          <Route path="/dashboard/createRoom" element={<CreateRoom />} />
          <Route path="/dashboard/setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
