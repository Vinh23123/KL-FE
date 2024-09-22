import { FAKE_ROOMS } from "../Fake-Data/FAKE_ROOMS";

const fetchAllRooms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        json: () => Promise.resolve(FAKE_ROOMS),
      });
    }, 1000); // Simulating 1-second delay
  });
}


export default fetchAllRooms
