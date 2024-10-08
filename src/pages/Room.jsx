import PropTypes from "prop-types";

import "../styles/Room.scss";

const Room = ({ room = {} }) => {
  return (
    <div>
      <p>Hello</p>
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
