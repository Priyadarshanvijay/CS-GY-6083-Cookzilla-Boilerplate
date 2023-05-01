import axios from "axios";
import {API_URL} from "../constants";

const getPeopleResults = async ({firstName, lastName, email}) => {
  const {data} = await axios.get(`${API_URL}people?firstName=${firstName}&lastName=${lastName}&email=${email}`)
  console.log(data)
  return data;
}

const PeopleService = {
  getPeopleResults
}

export default PeopleService;