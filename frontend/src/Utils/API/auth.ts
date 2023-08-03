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
const user = localStorage.getItem('user');
const parsedUser: Omit<User, 'password' | 'confirm'> = user ? JSON.parse(user) : null;

const headers = {
  Authorization: `Bearer ${parsedUser?.token}`,
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
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

const logout = (): void => {
  localStorage.removeItem('user');
};

const addCredit = async (coins: number[]) => {
  try {
    const response = await axios.post(`${API_URL}/deposit`, coins, { headers });
    return response.data.deposit;
  } catch (error) {
    console.error('Error depositing coins:', error);
    throw error;
  }
};

export { signupUser, login, logout, addCredit };
