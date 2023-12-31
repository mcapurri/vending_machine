import React from 'react';
import { Container, Button } from './style';
import { CartItem } from '../../Utils/API/products';

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
}) => (
  <Container>
    <Button onClick={() => removeFromCart(item._id)}>
      <b>-</b>
    </Button>
    <h2>{item.amount}</h2>
    <Button onClick={() => addToCart(item)}>
      <b>+</b>
    </Button>
  </Container>
);
export default Counter;
