import apiClient from "./apiClient";

export const login = (data) => {
  console.log({
    userName: data.userName,
    password: data.password,
  });

  return apiClient.post(`/auth/signin`, {
    userName: data.userName,
    password: data.password,
  });
};

export const logout = () => {
  return apiClient.post(`/auth/signout`);
};
