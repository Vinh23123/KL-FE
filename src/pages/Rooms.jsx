import { useEffect, useState } from "react";

import { fetchAllRooms, createRoom } from "../services/roomApi";
import Spinner from "../components/Spinner";
import Room from "../pages/Room";

import "../styles/Rooms.scss";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const createRoom = async (roomData) => {
    try {
      const res = await createRoom(roomData);
      console.log("Room created successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

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
    <section>
      <div className="rooms-container">
        {rooms.map((room) => (
          <Room room={room} key={room.RoomID} />
          // <Slider room={room} key={room.RoomID} />
        ))}
      </div>
    </section>
  );
};

export default Rooms;
