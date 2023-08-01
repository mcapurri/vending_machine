import axios from 'axios';

export interface Product {
  _id: string;
  amountAvailable?: number;
  cost: number;
  productName: string;
  sellerId?: string;
}

export interface CartItem extends Product {
  amount: number;
  sum: number;
}

const API_URL = '/api/products/';

export const fetch = async (): Promise<CartItem[]> => {
  const response = await axios.get(API_URL);

  return response.data;
};
