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
import ProtectedRoute from "./pages/ProtectedRoute";
import CreateHotel from "./pages/hotel/CreateHotel";
import LogContainer from "./pages/LogContainer";
import UpdateUser from "./pages/user/UpdateUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/booking-app" element={<LogContainer />}>
          <Route path="/booking-app/login" element={<Login />} />
          <Route path="/booking-app/signup" element={<Signup />} />
        </Route>
        {/* <ProtectedRoute> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="payment-result" element={<ResultPayment />} />
          <Route path="home" element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:roomId" element={<Slider />}></Route>
          <Route path="booking-history" element={<BookingRoomsHistory />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/rooms" element={<RoomsDashboard />} />
          <Route path="/dashboard/createRoom" element={<CreateRoom />} />
          <Route path="/dashboard/createHotel" element={<CreateHotel />} />
          <Route path="/dashboard/setting" element={<Setting />} />
          <Route path="/dashboard/user" element={<UpdateUser />} />
        </Route>
        {/* </ProtectedRoute> */}
      </Routes>
    </>
  );
}

export default App;
