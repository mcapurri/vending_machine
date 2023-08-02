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

export { signupUser, login, logout };
