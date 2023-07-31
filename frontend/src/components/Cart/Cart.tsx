import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Paper, ShopNowButton } from './style';
import Counter from '../Counter';
import { CartItem } from '../../pages/ProductsList/ProductsList';

type CartProps = {
  cartItems: CartItem[];
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(amount: number, cost: number) {
  return amount * cost;
}

function createRow(id: string, productName: string, amount: number, cost: number) {
  const sum = priceRow(amount, cost);
  return { id, productName, amount, cost, sum };
}

function subtotal(items: readonly CartItem[]) {
  return items.map(({ amount, cost }) => amount * cost).reduce((sum, i) => sum + i, 0);
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
}: {
  cartItems: CartItem[];
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
}) => {
  const items = cartItems.map((item) => {
    return createRow(item.id!, item.productName, item.amount, item.cost);
  });

  const invoiceSubtotal = subtotal(items);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            {/* <TableCell align="right">
              <b>Qty</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Price</b>
            </TableCell>
            <TableCell align="right">
              <b>Sum</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Counter addToCart={addToCart} removeFromCart={removeFromCart} item={item} />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell align="right">{ccyFormat(item.cost)}</TableCell>
              <TableCell align="right">{ccyFormat(item.sum)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>
              <b>Subtotal</b>
            </TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Tax</b>
            </TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <b>Total</b>
            </TableCell>
            <TableCell align="right">
              <b>{ccyFormat(invoiceTotal)}</b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ShopNowButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Shop Now
      </ShopNowButton>
    </TableContainer>
  );
};

export default Cart;
