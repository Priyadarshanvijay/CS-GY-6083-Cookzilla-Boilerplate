import axios from "axios";
import {API_URL} from "../constants";
import authHeader from "./auth-header";

const postRating = async (songRating, songID) => {
  const {data} = await axios.post(`${API_URL}rating`, {songRating, songID},{headers: authHeader()})
  return data;
}

const RatingService = {
  postRating
}

export default RatingService;