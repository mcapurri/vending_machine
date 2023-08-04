import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Paper, ShopNowButton } from './style';
import Counter from '../Counter';
import { CartItem, buyProducts } from '../../Utils/API/products';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const TAX_RATE = 0.07;

function ccyFormat(num: number): string {
  return `${num.toFixed(2)}`;
}

function priceRow(amount: number, cost: number): number {
  return amount * cost;
}

function createRow(_id: string, productName: string, amount: number, cost: number): CartItem {
  const sum = priceRow(amount, cost);
  return {
    _id,
    productName,
    amount,
    cost,
    sum,
  };
}

function subtotal(items: readonly CartItem[]): number {
  return items.map(({ amount, cost }) => amount * cost!).reduce((sum, i) => sum + i, 0);
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutateAsync } = useMutation(buyProducts);
  const navigate = useNavigate();

  const items = cartItems.map((item) =>
    createRow(item._id, item.productName, item.amount, item.cost)
  );

  const invoiceSubtotal = subtotal(items);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const initialValues = {
    products: cartItems.map((item) => ({
      _id: item._id,
      productName: item.productName,
      amount: item.amount,
      cost: item.cost,
    })),
  };

  const schema = Yup.object({
    products: Yup.array().of(
      Yup.object({
        _id: Yup.string().required(),
        productName: Yup.string().required(),
        amount: Yup.number().required('Amount is required').min(1, 'Amount must be at least 1'),
        cost: Yup.number().required(),
      })
    ),
  });

  const onSubmit = async (
    values: { products: CartItem[] },
    { setSubmitting }: FormikHelpers<{ products: CartItem[] }>
  ) => {
    try {
      const data = await mutateAsync(values.products);

      setCartItems([]);
      navigate('/success', {
        state: { purchaseData: data, invoiceSubtotal, TAX_RATE, invoiceTaxes, invoiceTotal },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      <Form>
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <b>Name</b>
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
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Counter addToCart={addToCart} removeFromCart={removeFromCart} item={item} />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{ccyFormat(item.cost!)}</TableCell>
                  <TableCell align="right">{ccyFormat(item.sum!)}</TableCell>
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
        <Typography component="h1" variant="h5" color="red" ml={3} mt={3}>
          {errorMessage}
        </Typography>
      </Form>
    </Formik>
  );
};

export default Cart;
