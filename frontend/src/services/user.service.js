import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const UserService = {
  getUserBoard
};

export default UserService;
