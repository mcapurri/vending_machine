import axios from 'axios';
import { FormikValues } from 'formik';

export interface User {
  id: string;
  username: string;
  password: string;
  confirm: string;
  role: 'buyer' | 'seller';
  deposit?: number;
  token: string;
}

const API_URL = '/api/users';
const token = localStorage.getItem('token');

const headers = {
  Authorization: `Bearer ${token}`,
};

const signupUser = async (values: FormikValues): Promise<User | null> => {
  const response = await axios.post(`${API_URL}/register`, values);
  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: response.data._id,
        ...response.data,
      })
    );
    localStorage.setItem('token', response.data.token);
  }
  return {
    id: response.data._id,
    ...response.data,
  };
};
const login = async (values: FormikValues): Promise<User | null> => {
  const response = await axios.post(`${API_URL}/login`, values);
  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: response.data._id,
        ...response.data,
      })
    );
    localStorage.setItem('token', response.data.token);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

const fetchUser = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/fetch`, { headers });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem('user');
};

const addCredit = async (coins: number[]): Promise<number> => {
  try {
    const response = await axios.post(`${API_URL}/deposit`, coins, { headers });
    return response.data.deposit;
  } catch (error) {
    console.error('Error depositing coins:', error);
    throw error;
  }
};

export { signupUser, login, fetchUser, logout, addCredit };
