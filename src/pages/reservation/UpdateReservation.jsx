import { set, useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { Spinner } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { toLocalDateTime } from "../../helpers/toLocalDateTime";
import UpdateReservationForm from "./UpdateReservationForm";

const UpdateReservation = ({
  reservationId,
  roomId,
  onCloseModal,
  onReservationRoomResponse,
  reservationRoomResponse,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservationRoom, setReservationRoom] = useState({});

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/reservations/${reservationId}`);
        // console.log(
        //   "Reservation Response Data: ",
        //   JSON.stringify(response.data, null, 2)
        // );
        setReservationRoom(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservation();
  }, [reservationId]);

  if (isLoading) return <Spinner />;

  return (
    <div className="reservation">
      <h2>Reservation</h2>
      <UpdateReservationForm
        onCloseModal={onCloseModal}
        onReservationRoomResponse={onReservationRoomResponse}
        reservationRoom={reservationRoom}
        roomId={roomId}
        reservationIdToUpdate={reservationId}
      />
    </div>
  );
};

export default UpdateReservation;
