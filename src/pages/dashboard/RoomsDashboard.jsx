import {
  CaretLeft,
  CaretRight,
  DotsThree,
  Funnel,
  SortAscending,
  SortDescending,
} from "@phosphor-icons/react";
import "../../styles/_RoomDashboard.scss";
import SearchForm from "../../components/SearchForm";
import { useState } from "react";

const RoomsDashboard = () => {
  const sizeIcon = 40;
  const roomsDashboard = "rooms-dashboard";
  const [description, setDescription] = useState("");
  const handOpenModal = (e) => {
    console.log("Open Modal");

    console.log(e);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("submit form");

    // call api -> return one room math with room number based on hotel id
  };

  return (
    <div className={`${roomsDashboard}`}>
      <div className={`${roomsDashboard}__function-container mb-8`}>
        <form onSubmit={handleSubmitForm}>
          <SearchForm
            state={description}
            setState={setDescription}
            width="600px"
          />
        </form>
        <div className={`${roomsDashboard}__function-container__items `}>
          <Funnel size={sizeIcon} />
          <SortAscending size={sizeIcon} />
          <SortDescending size={sizeIcon} />
        </div>
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
