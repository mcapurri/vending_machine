import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import DepositCredit from './pages/DepositCredit';
import PurchaseSuccess from './pages/PurchaseSuccess';
import { CartItem, fetch } from './Utils/API/products';
import ProductsList from './pages/ProductsList';
import { useQuery } from 'react-query';
import Spinner from './components/Spinner';

function App(): JSX.Element {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: products = [], isLoading: productLoading } = useQuery<CartItem[]>(
    'products',
    fetch
  );

  if (productLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout cartItems={cartItems} setCartOpen={setCartOpen} products={products} />}
      >
        <Route
          index
          element={
            <ProductsList
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartItems={cartItems}
              setCartItems={setCartItems}
              products={products}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/deposit" element={<DepositCredit />} />
        <Route path="/success" element={<PurchaseSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
