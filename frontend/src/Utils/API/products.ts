import axios from 'axios';
import { QueryFunction } from 'react-query';
import logger from '../logger';

export interface Product {
  _id: string;
  productName: string;
  amountAvailable?: number;
  cost: number;
  sellerId?: string;
}

export interface CartItem extends Product {
  amount: number;
  sum?: number;
}

export interface APIResults {
  products: CartItem[];
  totalPages: number;
  currentPage: number;
}
const API_URL = '/api/products';
const LIMIT = 10;

const token = localStorage.getItem('token');

const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetch: QueryFunction<APIResults, 'products'> = async ({ pageParam = 0 }) => {
  const response = await axios.get(`${API_URL}?page=${pageParam}&limit=${LIMIT}`);

  return {
    products: response.data.products,
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
  };
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

export const edit = async ({
  _id,
  productName,
  amountAvailable,
  cost,
}: Product): Promise<Product> => {
  const response = await axios.put(
    `${API_URL}/edit/${_id}`,
    { productName, amountAvailable, cost },
    { headers }
  );

  return response.data;
};

export const deleteItem = async ({ _id }: Pick<Product, '_id'>): Promise<Product> => {
  const response = await axios.delete(`${API_URL}/edit/${_id}`, { headers });
  logger.log('deleted', response.data);
  return response.data;
};

export const buyProducts = async (products: CartItem[]): Promise<CartItem[]> => {
  const response = await axios.post(`${API_URL}/buy-products`, { products }, { headers });

  return response.data;
};
