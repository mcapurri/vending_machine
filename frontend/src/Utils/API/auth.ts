import axios from 'axios';
import { FormikValues } from 'formik';

const API_URL = '/api/users/';

const signupUser = async (values: FormikValues) => {
  const response = await axios.post(API_URL, values);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (values: FormikValues) => {
  const response = await axios.post(`${API_URL}login`, values);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export { signupUser, login, logout };
