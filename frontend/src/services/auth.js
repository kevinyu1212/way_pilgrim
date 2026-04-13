import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const checkEmail = (email) => axios.post(`${API_URL}/check-email`, { email });
export const checkNickname = (nickname) => axios.post(`${API_URL}/check-nickname`, { nickname });
export const findEmail = (nickname) => axios.post(`${API_URL}/find-email`, { nickname });
