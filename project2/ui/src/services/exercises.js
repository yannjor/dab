import axios from "axios";

const baseUrl = "/api/exercises";

const getAll = () => {
  const token = window.localStorage.getItem("exerciseUser");
  const request = axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const exerciseService = { getAll, getById };

export default exerciseService;
