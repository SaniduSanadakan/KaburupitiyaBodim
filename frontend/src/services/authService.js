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

export const getAllUsers = async () => {
    try {
      const { data } = await api.get("/auth/users");
    return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { error: true, message: "Failed to fetch users" };
    }
}
    