import "../styles/Room.scss";
import { formatCurrency } from "../helpers/formatCurrency";

const Room = ({ room = {} }) => {
  console.log(room.images[0]);

  return (
    <div className="room">
      <div className="room__container">
        <div className="room__img-container">
          <img
            className="room__img"
            src={room.images[0].url}
            alt="Room Image"
          />
        </div>

        <div className="room__content">
          <div className="room__content--1">
            <p>{room.Name}</p>
            <p className="room__price">
              From {formatCurrency(room.price)} / 1 night
            </p>
          </div>
          <div className="room__content--1">
            <p>Capacity: {room.Capacity}</p>
            <button className="room__btn">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
