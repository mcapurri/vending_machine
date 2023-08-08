import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Drawer,
} from '@mui/material';
import { CartItem, fetch } from '../../Utils/API/products';
import Cart from '../../components/Cart';
import { Wrapper, Grid } from './style';
import Item from '../../components/Item';
import Spinner from '../../components/Spinner';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import { formatPrice } from '../../Utils/format';
import { fetchUser } from '../../Utils/API/auth';

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
  const { user, dispatch } = useContext<ContextValueType>(UserContext);
  const { data, isLoading: productLoading } = useQuery<CartItem[]>('products', fetch);
  const { data: me, isLoading: userLoading, refetch } = useQuery('user', fetchUser);

  console.log('me', me);

  useEffect(() => {
    if (me) {
      refetch();
      dispatch({
        type: 'SET_USER',
        payload: {
          deposit: me?.deposit,
          ...user,
        },
      });
    }
  }, [me?.deposit]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleAddToCart = useCallback(
    (clickedItem: CartItem): void => {
      console.log('clicked cost', clickedItem.cost);
      console.log('deposit', me?.deposit);
      if (me && me.deposit! < clickedItem.cost) {
        setSelectedItem(clickedItem);
        setDialogOpen(true);
        return;
      }
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
    [setCartItems, me]
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
    [setCartItems, user.deposit]
  );

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedItem(null);
  }, []);

  if (userLoading || productLoading) {
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
      {user.username && (
        <>
          <h2>
            Welcome, {user.username}, your current credit is {formatPrice(me?.deposit!)}
          </h2>
          <p>
            <a href="/deposit">Add credit now</a> and enjoy shopping with us
          </p>
        </>
      )}

      <Grid container spacing={3} mt={3}>
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

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Insufficient funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You do not have enough deposit to buy {selectedItem?.productName}. Please{' '}
            <a href="/deposit">add credit</a> to your deposit before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ProductsList;
