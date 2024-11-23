import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { fetchAllRooms, createRoom } from "../services/roomApi";
import Spinner from "../../components/Spinner";
import Room from "./Room";
import "../../styles/_Rooms.scss";
import { fetchAllRooms } from "../../redux/slice/room";

const FAKE_ROOM = [
  {
    RoomID: 1,
    hotel: {
      hotel_id: 1,
      hotel_name: "Thinh Vuong Hotel",
      description:
        "Serene Horizon Hotel offers a perfect blend of luxury and comfort in the heart of the city. Our elegantly designed rooms feature stunning city or sea views, modern amenities, and plush bedding for ultimate relaxation. Enjoy a complimentary breakfast, world-class dining, and unwind with a cocktail at our rooftop bar. Guests can also relax at our spa, outdoor pool, or fitness center. For business travelers, we offer fully equipped meeting rooms and a business center. With our 24/7 concierge service and proximity to top attractions, Serene Horizon Hotel promises an unforgettable stay.",
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
  },
  {
    RoomID: 1,
    hotel: {
      hotel_id: 1,
      hotel_name: "Thinh Vuong Hotel",
      description:
        "Serene Horizon Hotel offers a perfect blend of luxury and comfort in the heart of the city. Our elegantly designed rooms feature stunning city or sea views, modern amenities, and plush bedding for ultimate relaxation. Enjoy a complimentary breakfast, world-class dining, and unwind with a cocktail at our rooftop bar. Guests can also relax at our spa, outdoor pool, or fitness center. For business travelers, we offer fully equipped meeting rooms and a business center. With our 24/7 concierge service and proximity to top attractions, Serene Horizon Hotel promises an unforgettable stay.",
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
  },
  {
    RoomID: 1,
    hotel: {
      hotel_id: 1,
      hotel_name: "Thinh Vuong Hotel",
      description:
        "Serene Horizon Hotel offers a perfect blend of luxury and comfort in the heart of the city. Our elegantly designed rooms feature stunning city or sea views, modern amenities, and plush bedding for ultimate relaxation. Enjoy a complimentary breakfast, world-class dining, and unwind with a cocktail at our rooftop bar. Guests can also relax at our spa, outdoor pool, or fitness center. For business travelers, we offer fully equipped meeting rooms and a business center. With our 24/7 concierge service and proximity to top attractions, Serene Horizon Hotel promises an unforgettable stay.",
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
  },
  {
    RoomID: 1,
    hotel: {
      hotel_id: 1,
      hotel_name: "Thinh Vuong Hotel",
      description:
        "Serene Horizon Hotel offers a perfect blend of luxury and comfort in the heart of the city. Our elegantly designed rooms feature stunning city or sea views, modern amenities, and plush bedding for ultimate relaxation. Enjoy a complimentary breakfast, world-class dining, and unwind with a cocktail at our rooftop bar. Guests can also relax at our spa, outdoor pool, or fitness center. For business travelers, we offer fully equipped meeting rooms and a business center. With our 24/7 concierge service and proximity to top attractions, Serene Horizon Hotel promises an unforgettable stay.",
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
  },
  {
    RoomID: 1,
    hotel: {
      hotel_id: 1,
      hotel_name: "Thinh Vuong Hotel",
      description:
        "Serene Horizon Hotel offers a perfect blend of luxury and comfort in the heart of the city. Our elegantly designed rooms feature stunning city or sea views, modern amenities, and plush bedding for ultimate relaxation. Enjoy a complimentary breakfast, world-class dining, and unwind with a cocktail at our rooftop bar. Guests can also relax at our spa, outdoor pool, or fitness center. For business travelers, we offer fully equipped meeting rooms and a business center. With our 24/7 concierge service and proximity to top attractions, Serene Horizon Hotel promises an unforgettable stay.",
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
  },
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const rooms = useSelector((state) => state.room.data);
  console.log("State", state);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  if (state.room.isLoading) return <Spinner />;
  // if (state.room.isError) return <Error />
  return (
    <section>
      <div className="rooms-container">
        {FAKE_ROOM.map((room) => (
          <Room room={room} key={room.id} />
          // <Slider room={room} key={room.RoomID} />
        ))}
      </div>
    </section>
  );
};

export default Rooms;
