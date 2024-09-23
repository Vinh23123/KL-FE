import PropTypes from "prop-types";
import { formatCurrency } from "../helpers/formatCurrency";

import "../styles/Room.scss";

const Room = ({ room = {} }) => {
  // Slick settings for the carousel

  // return (
  //   <div className="room-grid">
  //     {room.images.map((image) => (
  //       <div className="room-card" key={image.image_id}>
  //         <img
  //           src={image.url}
  //           alt={`Room ${room.RoomID}`}
  //           className="room-image"
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div>
      {room.images.map((image) => (
        <img
          key={image.image_id}
          src={image.url}
          alt={`Room ${room.RoomID}`}
          className="room-image"
        />
      ))}
    </div>
  );
};

Room.prototype = {
  Name: PropTypes.string,
  Price: PropTypes.number,
  Capacity: PropTypes.number,
  images: PropTypes.object,
};

export default Room;
