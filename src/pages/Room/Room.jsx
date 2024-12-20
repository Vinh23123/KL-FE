import "../../styles/_Room.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Room = ({ room = {} }) => {
  const navigate = useNavigate();

  const handleClickDetail = (id) => {
    console.log(room.roomId);
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="room">
      <div className="room__container">
        <p hidden>{room.roomId}</p>
        <div className="room__img-container">
          <img
            className="room__img"
            src={room?.roomImageDtos[0]?.secureUrl}
            alt="Room Image"
          />
        </div>
        <div className="room__content">
          <div className="room__content--1">
            <p>
              <strong>Room Number: </strong> {room.roomNumber}
            </p>
            <p className="room__price">
              From {room?.pricePerNight} VND / 1 night
            </p>
          </div>
          <div className="room__content--1">
            <p>Capacity: {room.capacity}</p>
            <button
              className="room__btn"
              onClick={() => handleClickDetail(room.roomId)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Room.prototype = {
  room: PropTypes.shape({
    images: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    Capacity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Room;
