import apiClient from "./apiClient";

export const fetchCurrentHotel = () => {
  return apiClient.get("/user/hotels");
};

export const updateCurrentHotel = (data) => {
  console.log({
    hotelId: data.hotelId,
    hotelName: data.hotelName,
    phoneNumber: data.phone,
    email: data.email,
    description: data.description,
  });

  return apiClient.put(`/hotels`, {
    hotelId: data.hotelId,
    hotelName: data.hotelName,
    phoneNumber: data.phone,
    email: data.email,
    description: data.description,
  });
};

export const createCurrentHotel = (data) => {
  console.log(data);
  return apiClient.post(`/hotels`, {
    hotelName: data.hotelName,
    phoneNumber: data.phone,
    email: data.email,
    description: data.description,
  });
};
