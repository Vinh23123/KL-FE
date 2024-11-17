import { FAKE_ROOMS } from "../Fake-Data/FAKE_ROOMS";

import apiClient from "../services/apiClient";

export const createRoom = (roomData) => {
  return apiClient.post("/rooms", roomData);
};
export const updateRoomById = (roomId, updatedRoomData) => {
  return apiClient.put(`/rooms/${roomId}`, updatedRoomData);
};

export const deleteRoomById = (roomId) => {
  return apiClient.delete(`/rooms/${roomId}`);
};
// FAKE for testing: 'https://jsonplaceholder.typicode.com/todos/1
export const fetchAllRooms = () => {
  return apiClient.get("/rooms");
};

// for testing
export const fetchAllPosts = () => {
  return apiClient.get("https://jsonplaceholder.typicode.com/posts");
};
