import axios from "axios";
const API_URL = "http://localhost:3000/";

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
