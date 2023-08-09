import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IconButton, Badge } from '@mui/material';
import { FaShoppingCart as CartIcon } from 'react-icons/fa';
import { CartItem } from '../../Utils/API/products';
import { Menu, Burger } from '../BurgerMenu';
import { Div, Container, CartButtonContainer, Wrapper } from './style';
import SearchBar from '../SearchBar';

interface LayoutProps {
  cartItems: CartItem[];
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: CartItem[];
  setSearchedItem: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

const getTotalItems = (items: CartItem[]): number =>
  items.reduce((acc, item) => acc + item.amount, 0);

export const Layout: React.FC<LayoutProps> = ({
  cartItems,
  setCartOpen,
  products,
  setSearchedItem,
}: {
  cartItems: CartItem[];
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: CartItem[];
  setSearchedItem: React.Dispatch<React.SetStateAction<CartItem | null>>;
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Wrapper>
      <h1>Vending Machine</h1>
      <Container>
        <Div>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </Div>
        <Div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={products}
            setSearchedItem={setSearchedItem}
          />
          <CartButtonContainer>
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <CartIcon style={{ width: '2rem', color: 'black' }} />
              </Badge>
            </IconButton>
          </CartButtonContainer>
        </Div>
      </Container>
      <main>
        <Outlet />
      </main>
    </Wrapper>
  );
};
