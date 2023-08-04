import React, { useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Drawer, Grid, Badge } from '@mui/material';
import { FaShoppingCart as CartIcon } from 'react-icons/fa';
import { CartItem, fetch } from '../../Utils/API/products';
import Cart from '../../components/Cart';
import { Wrapper, IconButton } from './style';
import Item from '../../components/Item';
import Spinner from '../../components/Spinner';
import { ContextValueType, UserContext } from '../../Context/UserContext';

const ProductsList: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useContext<ContextValueType>(UserContext);
  const { data, isLoading } = useQuery<CartItem[]>('products', fetch);

  const getTotalItems = (items: CartItem[]): number =>
    items.reduce((acc, item) => acc + item.amount, 0);

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
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <IconButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <CartIcon />
        </Badge>
      </IconButton>

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
