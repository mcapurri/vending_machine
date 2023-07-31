import React from 'react';
import { Button } from '@mui/material';
import { Wrapper } from './style';
import { CartItem } from '../../pages/ProductsList/ProductsList';

type ItemProps = {
  item: CartItem;
  handleAddToCart: (clickedItem: CartItem) => void;
};

const Item: React.FC<ItemProps> = ({
  item,
  handleAddToCart,
}: {
  item: CartItem;
  handleAddToCart: (clickedItem: CartItem) => void;
}) => (
  <Wrapper>
    <div>
      <p>{item.productName}</p>
      <h3>€{item.cost}</h3>
    </div>
    <Button variant="outlined" onClick={() => handleAddToCart(item)}>
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
