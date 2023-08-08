import React, { useCallback, useContext } from 'react';
import { useQuery } from 'react-query';
// import { Drawer } from '@mui/material';
import { CartItem, fetch } from '../../Utils/API/products';
import Cart from '../../components/Cart';
import { Wrapper, Grid, Drawer } from './style';
import Item from '../../components/Item';
import Spinner from '../../components/Spinner';
import { ContextValueType, UserContext } from '../../Context/UserContext';

interface ProductsListProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsList: React.FC<ProductsListProps> = ({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext<ContextValueType>(UserContext);
  const { data, isLoading } = useQuery<CartItem[]>('products', fetch);

  const handleAddToCart = useCallback(
    (clickedItem: CartItem): void => {
      setCartItems((prev: CartItem[]) => {
        const isItemInCart = prev.find((item) => item._id === clickedItem._id);

        if (isItemInCart) {
          return prev.map((item) =>
            item._id === clickedItem._id ? { ...item, amount: item.amount + 1 } : item
          );
        }

        return [...prev, { ...clickedItem, amount: 1 }];
      });
    },
    [setCartItems]
  );

  const handleRemoveFromCart = useCallback(
    (id: string): void => {
      setCartItems((prev) =>
        prev.reduce((acc, item) => {
          if (item._id === id) {
            if (item.amount === 1) return acc;
            return [...acc, { ...item, amount: item.amount - 1 }];
          }
          return [...acc, item];
        }, [] as CartItem[])
      );
    },
    [setCartItems]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setCartOpen={setCartOpen}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item: CartItem) => {
          return user.role === 'seller' && user.id === item.sellerId ? (
            <Grid key={item._id} item xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ) : user.role === 'buyer' ? (
            <Grid key={item._id} item xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ) : null;
        })}
      </Grid>
    </Wrapper>
  );
};

export default ProductsList;
