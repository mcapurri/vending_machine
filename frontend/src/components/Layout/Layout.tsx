import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IconButton, Badge } from '@mui/material';
import { FaShoppingCart as CartIcon } from 'react-icons/fa';
import { CartItem } from '../../Utils/API/products';
import { Menu, Burger } from '../BurgerMenu';
import { Div, Container, CartButtonContainer, Wrapper, Title } from './style';
import SearchBar from '../SearchBar';
import { ContextValueType, UserContext } from '../../Context/UserContext';

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

  const { user } = useContext<ContextValueType>(UserContext);

  return (
    <Wrapper>
      <Title>Vending Machine</Title>
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
          {user.role === 'buyer' ? (
            <CartButtonContainer>
              <IconButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                  <CartIcon style={{ width: '2rem', color: 'darkgreen' }} />
                </Badge>
              </IconButton>
            </CartButtonContainer>
          ) : null}
        </Div>
      </Container>
      <main>
        <Outlet />
      </main>
    </Wrapper>
  );
};
