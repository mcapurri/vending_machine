import React, { memo, useContext } from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { EditButton, Wrapper } from './style';
import { CartItem } from '../../Utils/API/products';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import { formatPrice } from '../../Utils/format';

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

    const isSeller = user.id === item.sellerId;
    const isBuyer = user.role === 'buyer';

    return (
      <Wrapper>
        <div>
          <Typography component="p" variant="h6">
            {item.productName}
          </Typography>
          <Typography component="h3" variant="h6">
            {formatPrice(item.cost)}
          </Typography>
          {item.amountAvailable === 0 && (
            <Typography component="p" variant="h5" color="red">
              Out of Stock
            </Typography>
          )}
        </div>
        {isBuyer && (
          <Button
            variant="outlined"
            onClick={() => handleAddToCart(item)}
            size={matches ? 'small' : 'medium'}
          >
            Add to cart
          </Button>
        )}

        {isSeller && (
          <EditButton
            variant="outlined"
            href={`/edit/${item._id}`}
            size={matches ? 'small' : 'medium'}
          >
            Edit
          </EditButton>
        )}
      </Wrapper>
    );
  }
);

export default Item;
