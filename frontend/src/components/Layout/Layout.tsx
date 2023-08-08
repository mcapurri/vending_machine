import React from 'react';
import { Outlet } from 'react-router-dom';
import { IconButton, Badge } from '@mui/material';
import { FaShoppingCart as CartIcon } from 'react-icons/fa';
import { CartItem } from '../../Utils/API/products';
import { Menu, Burger } from '../BurgerMenu';
import { Div, Container, CartButtonContainer } from './style';

interface LayoutProps {
  cartItems: CartItem[];
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getTotalItems = (items: CartItem[]): number =>
  items.reduce((acc, item) => acc + item.amount, 0);

export const Layout: React.FC<LayoutProps> = ({
  cartItems,
  setCartOpen,
}: {
  cartItems: CartItem[];
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Div>
      <h1>Vending Machine</h1>
      <Container>
        <>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </>
        <CartButtonContainer>
          <IconButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <CartIcon style={{ width: '2rem', color: 'black' }} />
            </Badge>
          </IconButton>
        </CartButtonContainer>
      </Container>
      <main>
        <Outlet />
      </main>
    </Div>
  );
};
