import PropTypes from "prop-types";
import { formatCurrency } from "../helpers/formatCurrency";

import "../styles/Room.scss";
import { useEffect, useState } from "react";

const Room = ({ room = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false); // Control fading effect

  const nextSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % room.images.length);
      setFade(false);
    }, 500); // Match the CSS transition duration
  };

  const prevSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(
        (currentIndex - 1 + room.images.length) % room.images.length
      );
      setFade(false);
    }, 500); // Match the CSS transition duration
  };

  return (
    <div className="slider-card">
      <div className="card">
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>

        {/* Display the current image */}
        <div className={`image-container ${fade ? "fade-out" : "fade-in"}`}>
          <img
            key={room.images[currentIndex].image_id}
            src={room.images[currentIndex].url}
            alt={`Room ${room.RoomID}`}
            className="card-image"
          />
        </div>

        <button className="next" onClick={nextSlide}>
          ❯
        </button>
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
