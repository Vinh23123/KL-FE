import { useEffect, useState } from "react";
import { PaperPlaneTilt, Person } from "@phosphor-icons/react";
import { Form, useNavigate, useParams } from "react-router-dom";

import "../../styles/_Slider.scss";
import Modal from "../../components/Modal";
import PropTypes from "prop-types";
import apiClient from "../../services/apiClient";
import StarRating from "../../components/StarRating";
import TextExpander from "../../components/TextExpander";
import Spinner from "../../components/Spinner";
import MapComponent from "../../components/MapComponent";
import { formatCurrency, formatReviewDate } from "../../helpers/formatCurrency";
import CreatedReservation from "../reservation/CreatedReservation";
import FormRow from "../../components/FormRow";
import { useForm } from "react-hook-form";
import FormSubmitComment from "./FormSubmitComment";

const initialReviewList = 4;
const incrementInitialReviewList = 5;
const Slider = () => {
  const [curSlide, setCurSlide] = useState(0);
  const { roomId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [mapPosition, setMapPosition] = useState({
    latitude: 40,
    longitude: 0,
    formattedAddress: "",
  });
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayReviews, setDisplayReviews] = useState(initialReviewList);
  const [reviews, setReviews] = useState([]);
  const [isOpenRating, setIsOpenRating] = useState(false);
  const [reviewResponse, setReviewResponse] = useState();
  const [statusReservation, setStatusReservation] = useState({});
  const [isOpenRes, setIsOpenRes] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [formSubmitRating, setFormSubmitRating] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 3,
    },
  });
  const messageArr = ["Terriable", "Bad", "Okay", "Good", "Amazing"];
  const maxSlide = room?.roomImageDtos?.length || 0;

  useEffect(() => {
    if (room?.hotel?.location) {
      console.log(room?.hotel);

      setMapPosition((prev) => ({
        ...prev,
        latitude: room?.hotel?.location?.latitude,
        longitude: room?.hotel?.location?.longitude,
        formattedAddress: room?.hotel?.location?.formattedAddress,
      }));
    }

    if (room?.reviews) {
      setReviews(room?.reviews);
    }
    goToSlide(0);
  }, [room?.hotel?.location, room?.reviews]);

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/rooms/${roomId}`);
        // console.log(
        //   "Room Response Data: ",
        //   JSON.stringify(response.data.data, null, 2)
        // );
        setRoom(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      statusReservation?.status === "SUCCESS" ||
      formSubmitRating?.status === "SUCCESS"
    ) {
      fetchRoomById();
    }
    fetchRoomById();
  }, [roomId, statusReservation, formSubmitRating]);

  useEffect(() => {
    const fetchAllDiscounts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/discounts`);
        // console.log(
        //   "Room Response Data: ",
        //   JSON.stringify(response.data.data, null, 2)
        // );
        setDiscounts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    // if (isOpen) {
    fetchAllDiscounts();
    // }
  }, []);

  // Fetch reviews and sort by date
  useEffect(() => {
    if (room?.reviews) {
      const sortedReviews = [...room.reviews].sort((a, b) => {
        const dateA = new Date(a.reviewDate);
        const dateB = new Date(b.reviewDate);
        return dateB - dateA; // Newest first
      });
      setReviews(sortedReviews);
    }
  }, [room?.reviews]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsOpenRating(false);
  };

  const handleCloseModalRes = () => {
    setIsOpenRes(false);
    navigate("/booking-history");
  };

  // First Phase: Handle Comment Submission
  const handleOpenModalRating = async (data) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`/rooms/${roomId}/reviews`, {
        comment: data.comment, // Pass the user comment
      });

      setReviewResponse(response.data.data); // Save the review response
      setIsOpenRating(true); // Open the rating modal
      reset(); // Reset the comment form
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Second Phase: Handle Rating Submission
  const handleSubmitFormReview = async (data) => {
    try {
      setIsLoading(true);

      if (!reviewResponse || !reviewResponse.reviewId) {
        console.error("No review to update rating for");
        return;
      }

      const res = await apiClient.put(`/reviews/rating`, {
        reviewId: reviewResponse.reviewId, // Use the review ID from the first phase
        rating: data.rating, // Use the rating from the StarRating component
      });
      setFormSubmitRating(res.data);
      setIsOpenRating(false); // Close the rating modal
      reset(); // Reset the rating form
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ask User Confirmation
  const handleRatingDecision = () => {
    setIsOpenRating(false);
  };

  if (isLoading) return <Spinner />;

  // Function to create dots
  const createDots = () => {
    return room?.roomImageDtos?.map((_, i) => (
      <button
        key={i}
        className={`dots__dot ${curSlide === i ? "dots__dot--active" : ""}`} // Fixed typo
        onClick={() => goToSlide(i)}
      ></button>
    ));
  };

  const renderStatus = () => {
    return room?.status === "UNAVAILABLE"
      ? "room-details__room-unavailable"
      : room?.status === "HIRING"
      ? "room-details__room-hiring"
      : "room-details__room-available";
  };

  const loadMore = () => {
    setDisplayReviews(displayReviews + incrementInitialReviewList);
  };

  const handleOpenModalRes = () => {
    setIsOpenRes(true);
  };

  const goToSlide = (slideIndex) => {
    setCurSlide(slideIndex);
  };

  const slideTransform = (index) => {
    return { transform: `translateX(${100 * (index - curSlide)}%)` };
  };

  return (
    <>
      {/* {isOpenRes ? (
        <Modal onCloseModal={handleCloseModalRes}>
          {statusReservation?.status}
        </Modal>
      ) : (
        <></>
      )} */}
      {isOpen ? (
        <Modal onCloseModal={handleCloseModal}>
          <CreatedReservation
            roomId={roomId}
            onOpenModalRes={handleOpenModalRes}
            onCloseModal={handleCloseModal}
            onResponse={setStatusReservation}
            discounts={discounts}
          />
        </Modal>
      ) : (
        <> </>
      )}

      {isOpenRating && (
        <Modal onCloseModal={handleCloseModal}>
          <div className="rating-form-container">
            <h3>Please provide your rating:</h3>
            <form onSubmit={handleSubmit(handleSubmitFormReview)}>
              <div className="star-rating">
                <StarRating
                  maxRating={5}
                  defaultRating={3}
                  messages={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
                  size={28}
                  onSetRating={(rating) => setValue("rating", rating)}
                  isEdit={true}
                />
              </div>
              <button
                type="button"
                className="submit-btn"
                onClick={() => handleRatingDecision("no")}
              >
                No
              </button>
              <button type="submit" className="submit-btn">
                Yes
              </button>
            </form>
          </div>
        </Modal>
      )}
      <div className="room-details">
        <div className="slider">
          <div className="slides">
            {room.roomImageDtos?.map((slide, i) => (
              <div key={i} className="slide" style={slideTransform(i)}>
                <img src={slide.secureUrl} alt={`Slide ${i}`} />
              </div>
            ))}
            <div className="dots">{room?.roomImageDtos && createDots()}</div>
          </div>
        </div>

        <div className="room-details__infor-container">
          <span className="room-details__hotel-name">
            {room?.hotel?.hotelName}
          </span>
          <div className="room-details__flex">
            <p>
              Room Number:
              <span>{` ${room?.roomNumber}`}</span>
            </p>
            <span className={renderStatus()}>{room?.status}</span>
          </div>
          <div className="room-details__flex">
            <p>Capacity {room?.capacity}</p>
            <Person size={32} />
          </div>

          <p className="room-details__price">
            {formatCurrency(+room?.pricePerNight)}
          </p>
          <p className="room-details__description room-details__btn--space">
            {room?.description}
          </p>
          <div>
            {room?.status === "AVAILABLE" ? (
              <button
                onClick={handleOpenModal}
                className="room-details__btn room-details__btn--space"
              >
                Booking
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="room-hotel">
        {/* <h3> {room?.hotel?.hotelName}</h3>
        <p>{room?.hotel?.description}</p> */}
      </div>

      <div className="room-users">
        <div className="room-users__left-items">
          <div className="room-users__form-review">
            <FormSubmitComment handleOpenModalRating={handleOpenModalRating} />
          </div>
          <>
            <h2 className="comments-title">Comments</h2>
            <div className="room-users__rating">
              {reviews?.length ? (
                reviews
                  .slice(0, displayReviews)
                  .filter((review) => review.comment || review.rating)
                  .map((review) => (
                    <div
                      key={review.reviewId}
                      className="room-users__review-card"
                    >
                      <div className="room-users__description">
                        <div className="room-users__header">
                          <span className="room-users__username">
                            {review?.user?.username}
                          </span>
                          {review.rating ? (
                            <StarRating
                              maxRating={5}
                              defaultRating={review.rating}
                              messages={messageArr}
                              size={20}
                              isEdit={false}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <TextExpander collapsedNumWords={10} isShow={false}>
                          {review?.comment}
                        </TextExpander>

                        <p className="room-users__date">
                          {formatReviewDate(review.reviewDate)}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="room-users__no-reviews">
                  Room has no reviews yet.
                </p>
              )}
            </div>
            {/* 6 reviews > 5 -> 1 -> <></> */}
            {reviews.length > displayReviews ? (
              <div className="room-users__btn-load-more-container">
                <button
                  className="room-users__btn-load-more"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
        <div className="room-users__right-items">
          <MapComponent height="900px" position={mapPosition} />
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
