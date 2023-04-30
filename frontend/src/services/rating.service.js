import axios from "axios";
import {API_URL} from "../constants";
import authHeader from "./auth-header";

const postRating = async (songRating, user, songID) => {
  const {data} = await axios.post(`${API_URL}rating`, {songRating, user, songID},{headers:authHeader()})
  console.log(data)
  return data;
}

const RatingService = {
  postRating
}

export default RatingService;