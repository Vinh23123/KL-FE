import "../styles/_Home.scss";
import Rooms from "./Rooms";
import { STRING } from "../constant/ConstantMessage";

const Home = () => {
  return (
    <>
      <section className="section-home">
        <div className="section-home__description">
          <h1 className="feature-tilte">Enjoy the journey with us</h1>
          <p className="section-home__content">
            Embark on a journey where every moment is an adventure waiting to be
            discovered. Beyond the destination, it's the small joys—the
            breathtaking views, the rich cultural experiences, and the stories
            you gather along the way—that make your trip unforgettable. Let go
            of the rush, immerse yourself in the journey, and truly experience
            the beauty of travel. After all, the best memories are made when you
            slow down and enjoy the ride.
          </p>
        </div>
        <div className="section-home__container">
          <div className="section-home__img-gallary">
            <img
              src="/src/assets/room_image/nature.jpg"
              alt="Computer"
              className="section-home__img"
            />
            <img
              src="/src/assets/room_image/nature.jpg"
              alt="Computer"
              className="section-home__img"
            />
            <img
              src="/src/assets/room_image/nature.jpg"
              alt="Computer"
              className="section-home__img"
            />
            <img
              src="/src/assets/room_image/nature.jpg"
              alt="Computer"
              className="section-home__img"
            />
          </div>
        </div>
      </section>

      <section className="section-feature">
        <div className="section-feature__title">
          <h2 className="feature-tilte">{STRING.FEATURES_HOME}</h2>
          <h3 className="section-feature__header--title">
            {STRING.TITLE_HOME}
          </h3>
        </div>
        <div className="section-feature__container">
          <img
            src="/src/assets/room_image/nature.jpg"
            alt="Computer"
            className="section-feature__img"
          />
          <div className="section-feature__feature">
            <div className="section-feature__item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                height="2.5rem"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <h5 className="section-feature__header">Friendly Environment</h5>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>
        </div>

        <div className="section-feature__container">
          <div className="section-feature__feature">
            <div className="section-feature__item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="section-feature__icon"
                height="2.5rem"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                />
              </svg>

              <h5 className="section-feature__header">Quality Service</h5>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>

          <img
            src="/src/assets/room_image/The-quality-service.jpg"
            alt="Computer"
            className="section-feature__img"
          />
        </div>

        <div className="section-feature__container">
          <img
            src="/src/assets/room_image/The-quality-page.jpg"
            alt="Computer"
            className="section-feature__img"
          />
          <div className="section-feature__feature">
            <div className="section-feature__item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                height="2.5rem"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <h5 className="section-feature__header">Quality Space</h5>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>
        </div>
      </section>

      <div>
        <Rooms />
      </div>
    </>
  );
};

export default Home;
