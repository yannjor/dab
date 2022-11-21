import axios from "axios";
const baseUrl = "/api/exercises";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
