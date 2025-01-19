import { useEffect, useState } from "react";

import "../../styles/_ReservationRoom.scss";
import { formatDate } from "../../helpers/formatDate";
import Modal from "../../components/Modal";
import UpdateReservation from "../reservation/UpdateReservation";
import { formatCurrency } from "../../helpers/formatCurrency";
import apiClient from "../../services/apiClient";

const ReservationRoom = ({
  res,
  onOpenModal,
  onCloseModal,
  handleSetResDelete,
  resDelete,
  onReservationRoomResponse,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpenModalRes, setIsOpenModalRes] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({});

  const handleOpenModalRes = () => {
    setIsOpenModalRes(true);
  };

  const handleCloseModalRes = () => {
    setIsOpenModalRes(false);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    // if (newWindow) newWindow.opener = null;
  };

  const handleDeleteReservation = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.delete(
        `/reservations/${res.reservationId}`
      );
      console.log("Delete Response Data: ", response.data);
      handleSetResDelete(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      onCloseModal(true);
      setIsLoading(false);
    }
  };

  const handlePayment = async (reservationId) => {
    console.log("Reservation Id", reservationId);

    // handle payment
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `reservations/${reservationId}/payments/create`
      );
      console.log("Create Payment Response Data: ", response.data);
      setPaymentResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paymentResponse?.data?.paymentUrl) {
      console.log(
        "Check Payment Response Data: ",
        paymentResponse?.data?.paymentUrl
      );
      openInNewTab(paymentResponse?.data?.paymentUrl);
    }
  }, [paymentResponse?.data?.paymentUrl]);
  const renderPaymentStatus = (res) => {
    const { paymentStatus } = res;
    return paymentStatus;
  };

  return (
    <>
      {onOpenModal ? (
        <Modal onCloseModal={() => onCloseModal(false)}>
          {resDelete?.status}
        </Modal>
      ) : (
        <></>
      )}
      <div className="reservation-container">
        <div key={res?.reservationId}>
          <p hidden>Reservation Id: {res.reservationId}</p>
          {res?.rooms?.map((room) => (
            <div key={room.roomId} className="reservation-room-container">
              <h3>{room?.hotel?.hotelName}</h3>
              <div className="reservation-room">
                <div className="reservation-room__info">
                  <div className="reservation-room__details">
                    <p hidden>Room Id {room.roomId}</p>
                    <p>Room Number: {room.roomNumber}</p>
                    <span
                      className={`reservation-room__status ${
                        res?.payment?.paymentStatus === "COMPLETE"
                          ? "reservation-room__status--confirmed"
                          : "reservation-room__status--pending"
                      }`}
                    >
                      {res?.payment?.paymentStatus}
                    </span>
                  </div>
                  <p className="mb-1">Check-In: {formatDate(res.checkIn)}</p>
                  <p className="mb-1">Check-Out: {formatDate(res.checkOut)}</p>
                  <p>Total Price: {formatCurrency(res.totalAmount)}</p>
                </div>
                {res.payment?.paymentStatus !== "COMPLETE" ? (
                  <div className="reservation-room__action">
                    <button
                      type="button"
                      className="reservation-room__btn"
                      onClick={handleOpenModalRes}
                    >
                      ...
                    </button>
                    {/* <button
                      type="button"
                      onClick={handleDeleteReservation}
                      className="reservation-room__btn  reservation-room__btn--delete"
                    >
                      🗑️
                    </button> */}
                    <button
                      type="button"
                      onClick={() => handlePayment(res?.reservationId)}
                      className="reservation-room__btn  reservation-room__btn--pay"
                    >
                      💵
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {isOpenModalRes && (
                <Modal onCloseModal={handleCloseModalRes}>
                  <UpdateReservation
                    onReservationRoomResponse={onReservationRoomResponse}
                    onCloseModal={handleCloseModalRes}
                    roomId={room.roomId}
                    reservationId={res?.reservationId}
                  />
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationRoom;
