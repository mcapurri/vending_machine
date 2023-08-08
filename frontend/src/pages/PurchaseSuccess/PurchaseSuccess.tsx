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

const PurchaseSuccess: React.FC = () => {
  const { state } = useLocation();
  const { purchaseData, invoiceSubtotal, TAX_RATE, invoiceTaxes, invoiceTotal } = state;
  const { purchasedProducts, change } = purchaseData;

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
                <TableCell align="right">{`${item?.cost?.toFixed(2)}`}</TableCell>
                <TableCell align="right">{`${item?.sum?.toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <b>Subtotal</b>
              </TableCell>
              <TableCell align="right">{`${invoiceSubtotal.toFixed(2)}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Tax</b>
              </TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{`${invoiceTaxes.toFixed(2)}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <b>Total</b>
              </TableCell>
              <TableCell align="right">
                <b>{`${invoiceTotal.toFixed(2)}`}</b>
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
