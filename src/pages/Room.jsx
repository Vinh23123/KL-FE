import PropTypes from "prop-types";
import { formatCurrency } from "../helpers/formatCurrency";

const Room = ({ room = {} }) => {
  return (
    <div>
      <h3>{room.Name || ""}</h3>
      <p>Price: {formatCurrency(room.price) || 0}</p>
      <p>Capacity: {room.Capacity || 0}</p>
      <div>
        <h4>Images:</h4>
        {room.images.map((image) => (
          <img
            key={image.image_id}
            src={image.url}
            alt={`Room ${room.RoomID}`}
            width="100"
          />
        ))}
      </div>
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
