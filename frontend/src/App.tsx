import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { Layout } from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import DepositCredit from './pages/DepositCredit';
import PurchaseSuccess from './pages/PurchaseSuccess';
import { CartItem, fetch } from './Utils/API/products';
import ProductsList from './pages/ProductsList';
import Spinner from './components/Spinner';

function App(): JSX.Element {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchedItem, setSearchedItem] = useState<CartItem | null>(null);

  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
    'products',
    fetch,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
      },
    }
  );

  const flattenedProducts = useMemo(
    () => (data ? data.pages.flatMap((page) => page.products) : []),
    [data]
  );

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [handleObserver]);

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            cartItems={cartItems}
            setCartOpen={setCartOpen}
            products={flattenedProducts}
            setSearchedItem={setSearchedItem}
          />
        }
      >
        <Route
          index
          element={
            <ProductsList
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartItems={cartItems}
              setCartItems={setCartItems}
              products={flattenedProducts}
              searchedItem={searchedItem}
              lastElementRef={lastElementRef}
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
