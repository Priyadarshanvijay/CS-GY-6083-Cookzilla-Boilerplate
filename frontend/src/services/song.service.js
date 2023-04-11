import axios from "axios";
import {API_URL} from "../constants";

const getSongs = async () => {
  const {data} = await axios.get(API_URL + "song")
  if(data){
    localStorage.setItem('song', JSON.stringify(data))
  }
  return data;
}

const getAllSongs = () => {
  return JSON.parse(localStorage.getItem("song"));
};

const SongService = {
  getSongs,
  getAllSongs
}

export default SongService;
