import axios from 'axios';

const baseUrl = 'http://localhost:3000';

axios.defaults.withCredentials = true;

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}/login`, credentials, {
    withCredentials: true,
  });
  return res.data;
};

const createNewLogin = async (credentials) => {
  const res = await axios.post(`${baseUrl}/join`, {
    withCredentials: true,
  });
  return res.data;
};

export default { login, createNewLogin };
