import axios from "axios";
import {API_URL} from "../constants";

const getSearchResults = async ({song, artist, album, genre, songRating}) => {
  const {data} = await axios.get(`${API_URL}search?song=${song}&artist=${artist}&album=${album}&genre=${genre}&songRating=${songRating}`)
  return data;
}

const SearchService = {
  getSearchResults
}

export default SearchService;