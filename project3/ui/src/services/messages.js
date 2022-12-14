import axios from "axios";

const baseUrl = "/api/messages";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const getReplies = (id) => {
  const request = axios.get(`${baseUrl}/${id}/replies`);
  return request.then((response) => response.data);
};

const createReply = async (id, reply) => {
  const token = window.localStorage.getItem("messageUser");
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}/replies`, reply, config);
  return response.data;
};

const create = async (newObject) => {
  const token = window.localStorage.getItem("messageUser");
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const messageService = {
  getAll,
  getById,
  create,
  getReplies,
  createReply,
};

export default messageService;
