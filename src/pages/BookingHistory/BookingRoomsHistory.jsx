import { useEffect } from "react";
import { useState } from "react";

import apiClient from "../../services/apiClient";
import ReservationRoom from "./ReservationRoom";
import Spinner from "../../components/Spinner";
import "../../styles/_BookingHistory.scss";

const BookingRoomsHistory = () => {
  const [reservationRoom, setReservationRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpenModalResDelete, setIsOpenModalResDelete] = useState(false);
  const [resDelete, setResDelete] = useState({});
  const [reservationRoomResponse, setReservationRoomResponse] = useState({});

  useEffect(() => {
    const fetchhAllRoomsRes = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/reservations`);
        // The null and 2 arguments are for pretty-printing the JSON with indentation.
        // console.log(
        //   "Reservation Response Data: ",
        //   JSON.stringify(response.data.data, null, 2)
        // );

        const reservations = response.data.data;

        // Reverse the order of reservations
        const reversedReservations = reservations.reverse();

        setReservationRoom(reversedReservations);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      resDelete.status === "SUCCESS" ||
      reservationRoomResponse.status === "SUCCESS"
    ) {
      console.log(reservationRoomResponse);
      fetchhAllRoomsRes();
    }
    fetchhAllRoomsRes();
  }, [resDelete.status, reservationRoomResponse]);

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="room-res-container">
        {reservationRoom.map((res) => (
          <ReservationRoom
            onOpenModal={isOpenModalResDelete}
            onCloseModal={setIsOpenModalResDelete}
            handleSetResDelete={setResDelete}
            resDelete={resDelete}
            onReservationRoomResponse={setReservationRoomResponse}
            key={res.reservationId}
            res={res}
          />
        ))}
      </div>
    </section>
  );
};

export default BookingRoomsHistory;
