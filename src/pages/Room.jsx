import PropTypes from "prop-types";
import { formatCurrency } from "../helpers/formatCurrency";

import "../styles/Room.scss";
import { useEffect, useState } from "react";

const Room = ({ room = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = 1; // Control fading effect

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % room.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + room.images.length) % room.images.length
    );
  };

  return (
    <div className="slider-card">
      <div className="card">
        <button className="btn-arrow  btn-arrow-prev" onClick={prevSlide}>
          ❮
        </button>

        {/* Display the current image */}
        {room.images
          .slice(currentIndex, currentIndex + imagesToShow)
          .map((image) => (
            <div key={image.image_id} className="carousel">
              <div className="carousel-item">
                <img
                  src={image.url}
                  alt={`Room ${room.RoomID}`}
                  className="card-image"
                />
              </div>
              <div className="carousel-item-2">
                <h1>{room.Name}</h1>
                <div className="price">
                  <p className="price__original">
                    Original Price: {formatCurrency(room.price)}
                  </p>
                  <p className="price__discount">
                    Discount Price: {formatCurrency(room.price)} / 1 night
                  </p>
                </div>

                <p>Capacity: {room.Capacity}</p>
                <button className="btn btn-position">Details</button>
              </div>
            </div>
          ))}

        <button className="btn-arrow btn-arrow-next" onClick={nextSlide}>
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
