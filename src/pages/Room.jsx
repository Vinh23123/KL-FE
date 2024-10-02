import PropTypes from "prop-types";
import { formatCurrency } from "../helpers/formatCurrency";

import "../styles/Room.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const capacity = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.0}
    stroke="currentColor"
    className="capacity-icon"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const price = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="price-icon"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    />
  </svg>
);

const Room = ({ room = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = 1; // Control fading effect
  const navigate = useNavigate();

  const handleDetailsClick = (roomId) => {
    navigate(`/rooms/${roomId} `);
  };

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
                  {price}
                  <p className="price__original">
                    {formatCurrency(room.price)}
                  </p>
                  <p className="price__discount">
                    {formatCurrency(room.price)} / 1 night
                  </p>
                </div>

                <div className="capacity-container">
                  <div>
                    <p>{capacity}</p>
                  </div>
                  <div>
                    <p>{room.Capacity} people</p>
                  </div>
                </div>
                {/* push the room id to URL*/}
                <button
                  onClick={() => handleDetailsClick(room.RoomID)}
                  className="btn btn-position"
                >
                  Details
                </button>
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
