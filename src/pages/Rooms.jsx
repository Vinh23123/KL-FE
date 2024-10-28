import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { fetchAllRooms, createRoom } from "../services/roomApi";
import Spinner from "../components/Spinner";
import Room from "../pages/Room";
import "../styles/_Rooms.scss";
import { fetchAllRooms } from "../redux/slice/room";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const rooms = useSelector((state) => state.room.data);
  console.log("State", state);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  if (state.room.isLoading) return <Spinner />;
  // if (state.room.isError) return <Error />
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
