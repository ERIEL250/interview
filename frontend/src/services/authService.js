import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Adjust based on your backend

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
