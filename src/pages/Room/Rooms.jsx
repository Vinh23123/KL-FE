import { useEffect, useState } from "react";

// import { fetchAllRooms, createRoom } from "../services/roomApi";
import Spinner from "../../components/Spinner";
import Room from "./Room";
import "../../styles/_Rooms.scss";
import apiClient from "../../services/apiClient";
import { Outlet } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchhAllRooms = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/rooms`);
        // The null and 2 arguments are for pretty-printing the JSON with indentation.
        // console.log(
        //   "Room Response Data: ",
        //   JSON.stringify(response.data.data, null, 2)
        // );
        setRooms(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchhAllRooms();
  }, []);

  if (isLoading) return <Spinner />;
  // if (state.room.isError) return <Error />
  return (
    <section>
      <div className="rooms-container">
        {rooms?.map((room) => (
          <Room room={room} key={room.roomId} />
        ))}
        {/* When you nest routes in React Router v6, the child routes will not
        render unless you include <Outlet /> in the parent component. */}
        {/* <Outlet /> is a placeholder where the child route components are rendered. */}
        {/* <Outlet /> */}
      </div>
    </section>
  );
};

export default Rooms;
