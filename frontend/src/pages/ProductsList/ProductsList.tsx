import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Drawer,
} from '@mui/material';
import { CartItem } from '../../Utils/API/products';
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
  products: CartItem[];
  searchedItem: CartItem | null;
}

const ProductsList: React.FC<ProductsListProps> = ({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
  products,
  searchedItem,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: CartItem[];
  searchedItem: CartItem | null;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const { user, dispatch } = useContext<ContextValueType>(UserContext);
  const { data: me, isLoading: userLoading, refetch } = useQuery('user', fetchUser);

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

  const handleAddToCart = useCallback(
    (clickedItem: CartItem): void => {
      const totalCartCost = cartItems.reduce((total, item) => total + item.amount * item.cost, 0);

      if (me && me.deposit && totalCartCost + clickedItem.cost <= me.deposit) {
        setCartItems((prev: CartItem[]) => {
          const isItemInCart = prev.find((item) => item._id === clickedItem._id);

          if (isItemInCart) {
            return prev.map((item) =>
              item._id === clickedItem._id ? { ...item, amount: item.amount + 1 } : item
            );
          }

          return [...prev, { ...clickedItem, amount: 1 }];
        });
      } else {
        setSelectedItem(clickedItem);
        setDialogOpen(true);
      }
    },
    [setCartItems, cartItems, me]
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

  if (userLoading) {
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
      {user.username && me !== undefined && (
        <>
          <h2>
            Welcome, {user.username}
            {me?.deposit !== null ? <>, your current credit is {formatPrice(me.deposit!)}</> : null}
          </h2>
          <p>
            <a href="/deposit">Add credit now</a> and enjoy shopping with us
          </p>
        </>
      )}

      <Grid container spacing={3} mt={3}>
        {products?.map((item: CartItem) => {
          const isSellerItem = user.role === 'seller' && user.id === item.sellerId;
          const isBuyerItem = user.role === 'buyer';

          if ((isSellerItem || isBuyerItem) && (!searchedItem || searchedItem._id === item._id)) {
            return (
              <Grid key={item._id} item xs={12} sm={4}>
                <Item
                  item={item}
                  handleAddToCart={handleAddToCart}
                  isSelected={searchedItem === item}
                />
              </Grid>
            );
          }

          return null;
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
