import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Wrapper } from './style';
import { CartItem } from '../../Utils/API/products';
import { formatPrice } from '../../Utils/format';

const PurchaseSuccess: React.FC = () => {
  const { state } = useLocation();
  const { purchaseData, invoiceSubtotal, TAX_RATE, invoiceTaxes, invoiceTotal } = state;
  const { purchasedProducts, change } = purchaseData;
  console.log(state);
  const occurrences: { [key: number]: number } = {};

  change.forEach((num: number) => {
    occurrences[num] = (occurrences[num] || 0) + 1;
  });

  return (
    <Wrapper>
      <Typography component="h1" variant="h4" ml={10} mb={3}>
        Receipt
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Qty</b>
              </TableCell>
              <TableCell align="right">
                <b>Price</b>
              </TableCell>
              <TableCell align="right">
                <b>Sum</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchasedProducts.map((item: CartItem) => (
              <TableRow key={item._id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
                <TableCell align="right">{formatPrice(item?.cost)}</TableCell>
                <TableCell align="right">{formatPrice(item.sum!)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <b>Subtotal</b>
              </TableCell>
              <TableCell align="right">{formatPrice(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Tax</b>
              </TableCell>
              <TableCell align="right">{`${TAX_RATE} %`}</TableCell>
              <TableCell align="right">{formatPrice(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <b>Total</b>
              </TableCell>
              <TableCell align="right">
                <b>{formatPrice(invoiceTotal)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="h1" variant="h6" ml={3} mt={3}>
        Thank you for choosing us
      </Typography>
      <Typography component="div">
        <Typography component="h1" variant="h6" ml={3} mt={3}>
          Your change is:
        </Typography>
        {Object.keys(occurrences).map((num) => (
          <Typography key={num} component="p" variant="body1" ml={3}>
            Coin: {num} x {occurrences[Number(num)]}
          </Typography>
        ))}
      </Typography>
    </Wrapper>
  );
};
export default PurchaseSuccess;
