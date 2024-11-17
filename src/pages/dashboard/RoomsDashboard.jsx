import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import "../../styles/_RoomDashboard.scss";

const RoomsDashboard = () => {
  const roomsDashboard = "rooms-dashboard";
  const handOpenModal = (e) => {
    console.log("Open Modal");

    console.log(e);
  };
  return (
    <div className={`${roomsDashboard}`}>
      <div className="mb-8">
        <form className={`${roomsDashboard}__search-wrapper`}>
          <input
            className={`${roomsDashboard}__input`}
            type="text"
            placeholder="Search"
          />
          <button className={`${roomsDashboard}__search-button`} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </button>
        </form>
      </div>
      <div className={`${roomsDashboard}__room-details`}>
        <div className={`${roomsDashboard}__img-container`}>
          <img
            className={`${roomsDashboard}__img`}
            src="/src/assets/room_image/The-quality-service.jpg"
            alt="room-img"
          />
        </div>
        <div className={`${roomsDashboard}__description`}>
          <div className={`${roomsDashboard}__description__status mb-8`}>
            <p>Room Number: 1</p>
            <p>Room Status</p>
            <p>Type Room</p>
          </div>
          <p className="mb-8">Price 10.0$ </p>
          <p className="mb-8">Capacity: 1</p>
        </div>
        <DotsThree
          className={`${roomsDashboard}__dotsthree`}
          onClick={handOpenModal}
          size={32}
        />
      </div>
      <div className={`${roomsDashboard}__room-details`}>
        <div className={`${roomsDashboard}__img-container`}>
          <img
            className={`${roomsDashboard}__img`}
            src="/src/assets/room_image/The-quality-service.jpg"
            alt="room-img"
          />
        </div>
        <div className={`${roomsDashboard}__description`}>
          <div className={`${roomsDashboard}__description__status mb-8`}>
            <p>Room Number: 1</p>
            <p>Room Status</p>
            <p>Type Room</p>
          </div>
          <p className="mb-8">Price 10.0$ </p>
          <p className="mb-8">Capacity: 1</p>
        </div>
        <DotsThree
          className={`${roomsDashboard}__dotsthree`}
          onClick={handOpenModal}
          size={32}
        />
      </div>
      <div className={`${roomsDashboard}__room-details`}>
        <div className={`${roomsDashboard}__img-container`}>
          <img
            className={`${roomsDashboard}__img`}
            src="/src/assets/room_image/The-quality-service.jpg"
            alt="room-img"
          />
        </div>
        <div className={`${roomsDashboard}__description`}>
          <div className={`${roomsDashboard}__description__status mb-8`}>
            <p>Room Number: 1</p>
            <p>Room Status</p>
            <p>Type Room</p>
          </div>
          <p className="mb-8">Price 10.0$ </p>
          <p className="mb-8">Capacity: 1</p>
        </div>
        <DotsThree
          className={`${roomsDashboard}__dotsthree`}
          onClick={handOpenModal}
          size={32}
        />
      </div>
      <div className={`${roomsDashboard}__room-details`}>
        <div className={`${roomsDashboard}__img-container`}>
          <img
            className={`${roomsDashboard}__img`}
            src="/src/assets/room_image/The-quality-service.jpg"
            alt="room-img"
          />
        </div>
        <div className={`${roomsDashboard}__description`}>
          <div className={`${roomsDashboard}__description__status mb-8`}>
            <p>Room Number: 1</p>
            <p>Room Status</p>
            <p>Type Room</p>
          </div>
          <p className="mb-8">Price 10.0$ </p>
          <p className="mb-8">Capacity: 1</p>
        </div>
        <DotsThree
          className={`${roomsDashboard}__dotsthree`}
          onClick={handOpenModal}
          size={32}
        />
      </div>
      <div className={`${roomsDashboard}__pag`}>
        <CaretLeft size={32} />
        <p
          className={`${roomsDashboard}__pag-item ${roomsDashboard}__pag-item--active`}
        >
          1
        </p>
        <p className={`${roomsDashboard}__pag-item`}>2</p>
        <p className={`${roomsDashboard}__pag-item`}>3</p>
        <p className={`${roomsDashboard}__pag-item`}>4</p>
        <CaretRight size={32} />
      </div>
    </div>
  );
};
export default RoomsDashboard;
