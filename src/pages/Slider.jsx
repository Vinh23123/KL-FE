import { useEffect, useState } from "react";
import { SketchLogo, Person } from "@phosphor-icons/react";
import { formatCurrency } from "../helpers/formatCurrency";

import "../styles/_Slider.scss";
import Modal from "../components/Modal";
import PropTypes from "prop-types";

const FAKE_ROOM = {
  RoomID: 1,
  hotel: {
    hotel_id: 1,
    hotel_name: "Thinh Vuong Hotel",
    location: {
      location_id: 1,
      latitude: 12312,
      longitude: 12312,
      country: "Viet Nam",
    },
  },
  Review: [
    {
      review_id: 1,
      user_id: 1,
      room_id: 1,
      rating: 5,
      title: "test",
      comment: "test",
    },
  ],
  LocationID: 1,
  Name: "Deluxe Suite",
  type: "Luxury",
  room_number: "001",
  status: "available",
  description: `
Indulge in the pinnacle of sophistication with our Luxury Suite, where modern design meets timeless elegance. Spanning over 80 square meters, this suite is designed to offer the perfect blend of comfort, privacy, and style, making it an ideal choice for both relaxation and business.

Featuring plush king-sized bedding draped in the finest linens, the room is complemented by a spacious living area with high-end furnishings, a state-of-the-art entertainment system, and floor-to-ceiling windows that provide breathtaking views of the city skyline or the tranquil beach. The elegant marble bathroom boasts a deep soaking tub, a separate rain shower, and deluxe amenities for the ultimate pampering experience.

Enjoy 24-hour concierge service, complimentary high-speed Wi-Fi, and access to our private lounge, where you can unwind with gourmet refreshments and drinks throughout the day.

Whether you’re seeking a romantic getaway or a serene retreat, the Luxury Suite promises an unforgettable stay with all the exclusivity and comfort you deserve.
`,
  price: 250.0,
  Capacity: 2,
  createdAt: "2023-09-01 10:00:00",
  updatedAt: "2023-09-01 12:00:00",
  updatedBy: "admin",
  images: [
    {
      image_id: 1,
      url: "https://images.pexels.com/photos/28464686/pexels-photo-28464686/free-photo-of-luxurious-villa-bedroom-in-saligao-goa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image_id: 2,
      url: "https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image_id: 4,
      url: "https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image_id: 5,
      url: "https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image_id: 6,
      url: "https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
};

const Slider = () => {
  const [curSlide, setCurSlide] = useState(0);
  const maxSlide = FAKE_ROOM.images?.length || 0;
  // For testig
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurSlide(curSlide < maxSlide - 1 ? curSlide + 1 : 0);
    }, 6500);

    return () => clearInterval(timer);
  }, [curSlide, maxSlide]);

  // Initializing the slider
  useEffect(() => {
    goToSlide(0);
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  // Function to create dots
  const createDots = () => {
    return FAKE_ROOM.images.map((_, i) => (
      <button
        key={i}
        className={`dots__dot ${curSlide === i ? "dots__dot--active" : ""}`} // Fixed typo
        onClick={() => goToSlide(i)}
        // data-slide={i}
      ></button>
    ));
  };

  // Function to go to specific slide
  const goToSlide = (slideIndex) => {
    setCurSlide(slideIndex);
  };

  // Function to go to next slide
  const nextSlide = () => {
    setCurSlide(curSlide === maxSlide - 1 ? 0 : curSlide + 1);
  };

  // Function to go to previous slide
  const prevSilde = () => {
    setCurSlide(curSlide === 0 ? maxSlide - 1 : curSlide - 1);
  };

  // Slide transformation function
  const slideTransform = (index) => {
    return { transform: `translateX(${100 * (index - curSlide)}%)` };
  };

  const handleReturnType = (type) => {
    console.log(type);

    if (type === "Luxury") {
      return <SketchLogo color="#4dabf7" />;
    }

    return null;
  };

  return (
    <>
      {isOpen ? <Modal onCloseModal={handleCloseModal} /> : <> </>}
      <div className="room-details">
        <div className="slider">
          {/* <button className="slider__btn slider__btn--left" onClick={prevSilde}>
          &larr;
        </button>

        <button className="slider__btn slider__btn--right" onClick={nextSlide}>
          &rarr;
        </button> */}

          <div className="slides">
            {FAKE_ROOM.images?.map((slide, i) => (
              <div key={i} className="slide" style={slideTransform(i)}>
                <img src={slide.url} alt={`Slide ${i}`} />
              </div>
            ))}

            <div className="dots">{createDots()}</div>
          </div>
        </div>

        <div className="room-details__infor">
          <div>
            <span className="room-details__hotel-name">
              {FAKE_ROOM.hotel.hotel_name}
            </span>
            <div className="room-details__flex">
              <p>
                Room Number:
                <span>{` ${FAKE_ROOM.room_number}`}</span>
              </p>
              <span
                className={
                  FAKE_ROOM.status === "unavailable"
                    ? "room-details__room-unavailable"
                    : `room-details__room-available`
                }
              >
                {FAKE_ROOM.status}
              </span>
              <span>{handleReturnType(FAKE_ROOM.type)}</span>
            </div>
            <div className="room-details__flex">
              <p>Capacity {FAKE_ROOM.Capacity}</p>
              <Person size={32} />
            </div>

            <p className="room-details__price">
              {formatCurrency(FAKE_ROOM.price)}
            </p>
            <p className="room-details__description room-details__btn--space">
              {FAKE_ROOM.description}
            </p>
            <div>
              {/* for testing */}
              <button
                className="room-details__btn room-details__btn--space"
                onClick={handleOpenModal}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Slider.prototype = {
  room: PropTypes.shape({
    images: PropTypes.object.isRequired,
    hotel_name: PropTypes.string.isRequired,
    room_number: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    Capacity: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Slider;
