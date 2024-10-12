import { useEffect, useState } from "react";
import "../styles/Slider.scss";

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
  description: "test1",
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
  ],
};

const Slider = ({ room = {} }) => {
  const [curSlide, setCurSlide] = useState(0);
  const maxSlide = FAKE_ROOM.images?.length || 0;
  console.log(maxSlide);

  // Function to create dots
  const createDots = () => {
    return FAKE_ROOM.images.map((_, i) => (
      <button
        key={i}
        className={`dots__dot ${curSlide === i ? "dots__dot--active" : ""}`} // Fixed typo
        onClick={() => goToSlide(i)}
        data-slide={i}
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

  // Initializing the slider
  useEffect(() => {
    goToSlide(0);
  }, []);

  return (
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
              <div className="dots">{createDots()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="room-details__infor">
        <div>
          <p>test</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
