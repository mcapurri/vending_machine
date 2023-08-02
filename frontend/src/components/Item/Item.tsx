import React, { memo, useContext } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { EditButton, Wrapper } from './style';
import { CartItem } from '../../Utils/API/products';
import { ContextValueType, UserContext } from '../../Context/UserContext';

type ItemProps = {
  item: CartItem;
  handleAddToCart: (clickedItem: CartItem) => void;
};
const Item: React.FC<ItemProps> = memo(
  ({
    item,
    handleAddToCart,
  }: {
    item: CartItem;
    handleAddToCart: (clickedItem: CartItem) => void;
  }) => {
    const { user } = useContext<ContextValueType>(UserContext);
    const matches = useMediaQuery('(max-width:450px)');

    return (
      <Wrapper>
        {}
        <div>
          <p>{item.productName}</p>
          <h3>€{item.cost}</h3>
        </div>
        {user.id ? (
          user.role === 'buyer' ? (
            <Button
              variant="outlined"
              onClick={() => handleAddToCart(item)}
              size={matches ? 'small' : 'medium'}
            >
              Add to cart
            </Button>
          ) : user.id === item.sellerId ? (
            <EditButton
              variant="outlined"
              href={`/edit/${item._id}`}
              size={matches ? 'small' : 'medium'}
              item={item}
            >
              Edit
            </EditButton>
          ) : null
        ) : null}
      </Wrapper>
    );
  }
);

export default Item;
