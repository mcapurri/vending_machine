import axios from 'axios';
import { User } from './auth';

export interface Product {
  _id: string;
  productName: string;
  amountAvailable?: number;
  cost: number;
  sellerId?: string;
}

export interface CartItem extends Product {
  amount: number;
  sum: number;
}

const API_URL = '/api/products';
const user = localStorage.getItem('user');
const parsedUser: Omit<User, 'password' | 'confirm'> = user ? JSON.parse(user) : null;

const headers = {
  Authorization: `Bearer ${parsedUser?.token}`,
};

export const fetch = async (): Promise<CartItem[]> => {
  const response = await axios.get(`${API_URL}/`);

  return response.data;
};

export const add = async ({
  amountAvailable,
  cost,
  productName,
  sellerId,
}: Omit<Product, '_id'>): Promise<Product> => {
  const response = await axios.post(
    `${API_URL}/add-product`,
    {
      amountAvailable,
      cost,
      productName,
      sellerId,
    },
    { headers }
  );

  return response.data;
};

export const edit = async ({ productName, amountAvailable, cost }: Product): Promise<Product> => {
  const response = await axios.put('/edit/id', { productName, amountAvailable, cost }, { headers });

  console.log('response.data', response.data);
  return response.data;
};
