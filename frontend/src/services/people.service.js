import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

const getPeopleResults = async ({firstName, lastName, email}) => {
  const {data} = await axios.get(`${API_URL}people?firstName=${firstName}&lastName=${lastName}&email=${email}`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const PeopleService = {
  getPeopleResults
}

export default PeopleService; 