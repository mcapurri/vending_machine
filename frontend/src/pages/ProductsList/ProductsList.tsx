import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Drawer, Grid, Badge } from '@mui/material';
import { FaShoppingCart as CartIcon } from 'react-icons/fa';
import { fetch } from '../../Utils/API/products';
import Cart from '../../components/Cart';
import { Wrapper, IconButton } from './style';
import Item from '../../components/Item';
import Spinner from '../../components/Spinner';

interface Product {
  id?: string;
  amountAvailable?: number;
  cost: number;
  productName: string;
  sellerId?: string;
}

export interface CartItem extends Product {
  amount: number;
  sum: number;
}

const ProductsList: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { data, isLoading } = useQuery<CartItem[]>('products', fetch);

  const getTotalItems = (items: CartItem[]) => items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItem) => {
    setCartItems((prev: CartItem[]) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        }
        return [...acc, item];
      }, [] as CartItem[])
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
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
        {data?.map((item: CartItem) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductsList;