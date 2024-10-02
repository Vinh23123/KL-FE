import { useEffect, useState } from "react";

import fetchAllRooms from "../services/roomApi";
import Spinner from "../components/Spinner";
import Room from "../pages/Room";
import "../styles/Rooms.scss";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllRooms().then((res) => {
      if (res.status === 200) {
        res.json().then((rooms) => {
          // console.log(rooms);
          setRooms(rooms);
          setIsLoading(false);
        });
      }
    });
  }, []);

  if (isloading) return <Spinner />;

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <Room room={room} key={room.RoomID} />
      ))}
    </div>
  );
};

export default Rooms;
