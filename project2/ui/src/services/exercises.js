import axios from "axios";
const baseUrl = "/api/exercises";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

const exerciseService = { getAll, getById };

export default exerciseService;
