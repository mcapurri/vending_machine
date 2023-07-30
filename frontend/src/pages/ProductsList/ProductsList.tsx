import React, { useState, useEffect } from "react";
import { fetch } from "../../Utils/API/products";
import axios from "axios";

interface Product {
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();

  const fetchProducts = async () => {
    try {
      const fetchedProducts: Product[] = await fetch();
      setProducts(fetchedProducts);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(message);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("fetchedProducts", products);

  return <div>ProductsList</div>;
};

export default ProductsList;
