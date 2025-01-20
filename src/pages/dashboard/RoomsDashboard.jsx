import {
  CaretLeft,
  CaretRight,
  DotsThree,
  Funnel,
  SortAscending,
  SortDescending,
} from "@phosphor-icons/react";
import "../../styles/_RoomDashboard.scss";
import SearchForm from "../../components/SearchForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import apiClient from "../../services/apiClient";
import { formatCurrency } from "../../helpers/formatCurrency";
import Modal from "../../components/Modal";
import EditRoom from "./EditRoom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatDate } from "../../helpers/formatDate";
import { toLocalDateTime } from "../../helpers/toLocalDateTime";
import { Tooltip as ReactTooltip } from "react-tooltip";
const RoomsDashboard = () => {
  const sizeIcon = 40;
  const roomsDashboard = "rooms-dashboard";

  const [isLoadingFetchRoom, setIsLoadingFetchRoom] = useState(false);
  const [isLoadingEditRoom, setIsLoadingEditRoom] = useState(false);
  const [isLoadingDeleteRoom, setIsLoadingDeleteRoom] = useState(false);
  const [isLoadingDeleteRoomImg, setIsLoadingDeleteRoomImg] = useState(false);
  const [error, setError] = useState("");

  const [roomsResponse, setRoomResponse] = useState();
  const [roomEditResponse, setRoomEditResponse] = useState({});
  const [roomDeleteResponse, setRoomDeleteResponse] = useState({});
  const [deleteRoomImgRes, setDeleteRoomImgRes] = useState({});
  const [updatedRoom, setUpdatedRoom] = useState({});
  const [roomImageResponse, setRoomImageUpdatedResponse] = useState({});
  const [updateRes, setUpdateRes] = useState();
  const [userBooking, setUserBooking] = useState({});
  const [userEmails, setUserEmails] = useState({});

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [sortBy, setSortBy] = useState("roomNumber");
  const [sortDir, setSortDir] = useState("asc");
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const {
    data: hotel,
    isLoading,
    isError,
  } = useSelector((state) => state.hotel);

  useEffect(() => {
    const fetchAllRoomsByHotelId = async () => {
      try {
        setIsLoadingFetchRoom(true);
        const roomsRespone = await apiClient.get(
          `hotels/${hotel.hotelId}/rooms?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
        );
        console.log(
          "RoomsRespone Data: ",
          JSON.stringify(roomsRespone.data?.data?.pageNo, null, 2)
        );
        setRoomResponse(roomsRespone.data?.data);
        setIsLoadingFetchRoom(false);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoadingFetchRoom(false);
      }
    };

    if (
      hotel ||
      roomDeleteResponse ||
      deleteRoomImgRes ||
      updatedRoom ||
      roomImageResponse ||
      updateRes
    ) {
      fetchAllRoomsByHotelId();
    }
  }, [
    hotel,
    pageNo,
    pageSize,
    sortBy,
    sortDir,
    roomDeleteResponse,
    deleteRoomImgRes,
    updatedRoom,
    roomImageResponse,
    updateRes,
  ]);

  useEffect(() => {
    const fetchEmailsForRooms = async () => {
      if (roomsResponse?.content?.length > 0) {
        const emailPromises = roomsResponse.content.map(async (room) => {
          if (room?.reservationList?.length > 0) {
            const lastReservationId =
              room.reservationList[room.reservationList.length - 1]
                ?.reservationId;

            try {
              const response = await apiClient.get(
                `/reservations/${lastReservationId}`
              );
              return {
                roomId: room.roomId,
                email: response.data?.data?.userDto?.mail || "N/A",
              };
            } catch (error) {
              console.error(
                `Error fetching user email for room ${room.roomId}`,
                error
              );
              return { roomId: room.roomId, email: "Error fetching email" };
            }
          }
          return { roomId: room.roomId, email: "No reservations" };
        });

        const emailResults = await Promise.all(emailPromises);
        const emailMap = emailResults.reduce((acc, result) => {
          acc[result.roomId] = result.email;
          return acc;
        }, {});
        setUserEmails(emailMap);
      }
    };

    fetchEmailsForRooms();
  }, [roomsResponse]);

  const handleIncreseaPageNo = () => {
    setPageNo((state) => state + 1);
  };

  const handleDecreasePageNo = () => {
    setPageNo((state) => state - 1);
  };
  const handleSortDirAsc = () => {
    setSortDir("asc");
  };
  const handleSortDirDec = () => {
    setSortDir("dec");
  };

  const handleOpenModal = async (roomId) => {
    setIsOpenModalEdit(true);

    try {
      setIsLoadingEditRoom(true);
      const roomEditRespone = await apiClient.get(`rooms/${roomId}`);
      // console.log(
      //   "RoomsRespone Data: ",
      //   JSON.stringify(roomEditRespone.data?.data, null, 2)
      // );
      setRoomEditResponse(roomEditRespone.data?.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoadingFetchRoom(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModalEdit(false);
  };

  const handleDeleteRoomById = async (roomId) => {
    try {
      setIsLoadingDeleteRoom(true);
      const roomEditRespone = await apiClient.delete(`rooms/${roomId}`);
      // console.log(
      //   "RoomsRespone Data: ",
      //   JSON.stringify(roomEditRespone.data, null, 2)
      // );
      setRoomDeleteResponse(roomEditRespone.data);
      toast.success("Delete room successfully");
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoadingDeleteRoom(false);
    }
  };

  const handleUpdateStatus = async (roomId) => {
    try {
      setIsLoadingDeleteRoom(true);
      const updateStatus = await apiClient.put(`rooms/${roomId}`);
      // console.log(
      //   "RoomsRespone Data: ",
      //   JSON.stringify(roomEditRespone.data, null, 2)
      // );
      setUpdateRes(updateStatus.data);
      toast.success("Update room successfully");
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoadingDeleteRoom(false);
    }
  };

  const handleDeleteImgById = async (imgId) => {
    try {
      setIsLoadingDeleteRoomImg(true);
      const roomImgDeleteRespone = await apiClient.delete(
        `roomImages/${imgId}`
      );
      // console.log(
      //   "roomImgDeleteRespone Data: ",
      //   JSON.stringify(roomImgDeleteRespone.data, null, 2)
      // );
      setIsLoadingDeleteRoomImg(false);
      setDeleteRoomImgRes({ ...roomImgDeleteRespone.data }); // Ensure a new object is set
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsOpenModalDelete(true);
      setIsOpenModalEdit(false);
      setIsLoadingDeleteRoomImg(false);
    }
  };

  const handOpenModal = (e) => {
    console.log("Open Modal");

    console.log(e);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("submit form");

    // call api -> return one room math with room number based on hotel id
  };

  if (
    isLoading ||
    isLoadingFetchRoom ||
    isLoadingDeleteRoom ||
    isLoadingDeleteRoomImg
  )
    return <Spinner />;

  return (
    <>
      {isOpenModalDelete ? (
        <Modal onCloseModal={() => setIsOpenModalDelete(false)}>
          {deleteRoomImgRes.message}
        </Modal>
      ) : null}
      {isOpenModalEdit ? (
        <Modal>
          <EditRoom
            room={roomEditResponse}
            roomImgRes={deleteRoomImgRes}
            onDeleteButton={handleDeleteImgById}
            onCloseModal={setIsOpenModalEdit}
            updatedRoom={updatedRoom}
            handleRoomImageUpdatedRes={setRoomImageUpdatedResponse}
            handleUpdatedRoom={setUpdatedRoom}
          />
        </Modal>
      ) : null}
      <div className="rooms-dashboard">
        <div className="rooms-dashboard__function-container mb-8">
          <div className="rooms-dashboard__function-container__items">
            {/* <input
              type="text"
              value={onChangeSearch}
              onChange={(e) => setOnChangeSearch(e.target.value)}
            /> */}
            <SortAscending
              className="rooms-dashboard__icon-sort-dir"
              onClick={handleSortDirAsc}
              size={sizeIcon}
            />
            <SortDescending
              className="rooms-dashboard__icon-sort-dir"
              onClick={handleSortDirDec}
              size={sizeIcon}
            />
          </div>
        </div>

        {/* Table Design for Room Details */}
        <table className="rooms-dashboard__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room Number</th>
              <th>Status</th>
              <th>View Type</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Payment Status</th>
              <th>User Booking</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomsResponse?.content?.map((room) => (
              <tr key={room.roomId}>
                <td>
                  <img
                    className="rooms-dashboard__table-img"
                    src={room?.roomImageDtos[0]?.secureUrl}
                    alt="room-img"
                    loading="lazy"
                  />
                </td>
                <td>{room.roomNumber}</td>
                <td>
                  <span
                    className={
                      room?.status === "UNAVAILABLE"
                        ? "rooms-dashboard__room-unavailable"
                        : room?.status === "HIRING"
                        ? "rooms-dashboard__room-hiring"
                        : "rooms-dashboard__room-available"
                    }
                  >
                    {room.status}
                  </span>
                </td>
                <td>{room.viewType}</td>
                <td>{formatCurrency(room.pricePerNight)}</td>
                <td>{room.capacity}</td>
                {/* <td>{room.capacity}</td> */}

                <td>
                  {room.status === "HIRING" ? (
                    new Date(
                      room?.reservationList[
                        room?.reservationList.length - 1
                      ]?.checkIn
                    )
                      .toISOString()
                      .split("T")[0]
                  ) : (
                    <></>
                  )}
                </td>

                <td>
                  {room.status === "HIRING" ? (
                    new Date(
                      room.reservationList[
                        room?.reservationList.length - 1
                      ]?.checkOut
                    )
                      .toISOString()
                      .split("T")[0]
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {room.status === "HIRING" ? (
                    <span
                      className={
                        room.reservationList[room.reservationList.length - 1]
                          ?.payment?.paymentStatus === "COMPLETE"
                          ? "rooms-dashboard__payment-complete"
                          : room.reservationList[
                              room.reservationList.length - 1
                            ]?.payment?.paymentStatus === "FAILED"
                          ? "rooms-dashboard__payment-failed"
                          : "rooms-dashboard__payment-pending"
                      }
                    >
                      {room?.reservationList[room.reservationList.length - 1]
                        ?.payment
                        ? room?.reservationList[room.reservationList.length - 1]
                            ?.payment?.paymentStatus
                        : "PENDING"}
                    </span>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {/* Tooltip for Email */}
                  <button
                    className="rooms-dashboard__table-btn"
                    data-tooltip-id={`tooltip-${room.roomId}`}
                    data-tooltip-content={
                      userEmails[room.roomId]
                        ? `Email: ${userEmails[room.roomId]}`
                        : "Loading..."
                    }
                  >
                    Infor
                  </button>
                  <ReactTooltip id={`tooltip-${room.roomId}`} />
                </td>
                <td>
                  {room.status === "AVAILABLE" ||
                  room.status === "UNAVAILABLE" ? (
                    <button
                      className="rooms-dashboard__table-btn edit-btn"
                      onClick={() => handleOpenModal(room.roomId)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="rooms-dashboard__table-btn delete-btn"
                      onClick={() => handleUpdateStatus(room.roomId)}
                    >
                      Check-Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="rooms-dashboard__pag">
          {roomsResponse?.totalPages ? (
            <>
              {pageNo > 0 && (
                <CaretLeft onClick={handleDecreasePageNo} size={32} />
              )}
              {[...Array(roomsResponse.totalPages).keys()].map((pageIndex) => {
                const pageNumber = pageIndex + 1;
                return (
                  <p
                    key={pageNumber}
                    className={`rooms-dashboard__pag-item ${
                      roomsResponse.pageNo === pageNumber - 1
                        ? "rooms-dashboard__pag-item--active"
                        : ""
                    }`}
                    onClick={() => setPageNo(pageNumber - 1)}
                  >
                    {pageNumber}
                  </p>
                );
              })}
              {!roomsResponse.last && (
                <CaretRight onClick={handleIncreseaPageNo} size={32} />
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default RoomsDashboard;
