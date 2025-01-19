import { useEffect, useState } from "react";

// import { fetchAllRooms, createRoom } from "../services/roomApi";
import Spinner from "../../components/Spinner";
import Room from "./Room";
import "../../styles/_Rooms.scss";
import apiClient from "../../services/apiClient";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const initialRoomList = 6;
const incrementInitialReviewList = 6;

const Rooms = () => {
  const [displayRooms, setDisplayRooms] = useState(initialRoomList);
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [onChangeSearch, setOnChangeSearch] = useState();
  const [error, setError] = useState(null);
  // const resultSearch = +onChangeSearch
  //   ? rooms?.filter(
  //       (room) => room.roomNumber === +onChangeSearch
  //     )
  //   : roomsResponse?.content;

  useEffect(() => {
    const fetchhAllRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const response = await apiClient.get(`/rooms`);
        // The null and 2 arguments are for pretty-printing the JSON with indentation.
        // console.log(
        //   "Room Response Data: ",
        //   JSON.stringify(response.data.data, null, 2)
        // );
        setRooms(response.data.data);
        setIsLoadingRooms(false);
      } catch (error) {
        setError(error);
        setIsLoadingRooms(false);
        console.error(error);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    fetchhAllRooms();
  }, []);

  const loadMore = () => {
    setDisplayRooms(displayRooms + incrementInitialReviewList);
  };

  if (isLoadingRooms) return <Spinner />;
  // if (state.room.isError) return <Error />
  return (
    <section>
      <div className="rooms-container">
        {rooms.length > 0 ? (
          rooms
            ?.slice(0, displayRooms)
            .map((room) => <Room room={room} key={room.roomId} />)
        ) : (
          <p className="rooms__text-center">No Room is displayed</p>
        )}
        {/* When you nest routes in React Router v6, the child routes will not
        render unless you include <Outlet /> in the parent component. */}
        {/* <Outlet /> is a placeholder where the child route components are rendered. */}
        {/* <Outlet /> */}
      </div>
      {rooms.length > displayRooms ? (
        <div className="rooms-container__btn-container">
          <button className="rooms-container__btn-load-more" onClick={loadMore}>
            Load More
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Rooms;
