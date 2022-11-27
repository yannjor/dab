import axios from "axios";
const baseUrl = "/api/submissions";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const token = window.localStorage.getItem("exerciseUser");
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getStatus = async (id) => {
  const request = axios.get(`/api/submissionstatus/${id}`);
  return request.then((response) => response.data);
};

const submissionService = { getAll, create, getStatus };

export default submissionService;
