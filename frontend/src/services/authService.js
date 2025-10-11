import api from "./api"

// Login user
export const loginUser = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  };

export const logOutUser = async () => {
    const { data } = await api.get("/auth/logout");
    return data;
  };

export const getUser = async () => {
    const { data } = await api.get("/auth/me");
    return data;
  };