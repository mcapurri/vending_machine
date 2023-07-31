import React from 'react';
import { Container, Button } from './style';
import { CartItem } from '../../pages/ProductsList/ProductsList';

interface CounterProps {
  item: CartItem;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
}

const Counter: React.FC<CounterProps> = ({
  item,
  addToCart,
  removeFromCart,
}: {
  item: CartItem;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
}) => {
  return (
    <Container>
      <Button onClick={() => removeFromCart(item.id!)}>
        <b>-</b>
      </Button>
      <h2>{item.amount}</h2>
      <Button onClick={() => addToCart(item)}>
        <b>+</b>
      </Button>
    </Container>
  );
};
export default Counter;
