import axios from "axios";
import {API_URL} from "../constants";

const register = (userName,
  password,
  firstName,
  lastName,
  email,
  profile) => {
  return axios.post(API_URL + "signup", {
    userName,
    password,
    firstName,
    lastName,
    email,
    profile
  });
};

const login = (userName, password) => {
  return axios
    .post(API_URL + "login", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem('song')
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
