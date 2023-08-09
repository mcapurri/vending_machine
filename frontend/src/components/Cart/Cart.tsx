import React, { useCallback, useState } from 'react';
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
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContainer, Paper, ShopNowButton } from './style';
import Counter from '../Counter';
import { CartItem, buyProducts } from '../../Utils/API/products';
import { formatPrice } from '../../Utils/format';

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const TAX_RATE = 7;

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
  setCartOpen,
  addToCart,
  removeFromCart,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: string) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutateAsync } = useMutation(buyProducts);
  const navigate = useNavigate();

  const items = cartItems.map((item) =>
    createRow(item._id, item.productName, item.amount, item.cost)
  );

  const invoiceTotal = subtotal(items);
  const invoiceTaxes = (invoiceTotal * TAX_RATE) / 100;
  const invoiceSubtotal = subtotal(items) - invoiceTaxes;

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

  const onSubmit = useCallback(
    async (
      values: { products: CartItem[] },
      { setSubmitting }: FormikHelpers<{ products: CartItem[] }>
    ): Promise<void> => {
      try {
        const data = await mutateAsync(values.products);

        setCartItems([]);
        navigate('/success', {
          state: { purchaseData: data, invoiceSubtotal, TAX_RATE, invoiceTaxes, invoiceTotal },
        });
        setCartOpen(false);
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
    },
    [setCartItems, navigate, invoiceSubtotal, TAX_RATE, invoiceTaxes, invoiceTotal]
  );
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      <CartContainer>
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
                    <TableCell align="right">{formatPrice(item.cost!)}</TableCell>
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
            <ShopNowButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Shop Now
            </ShopNowButton>
          </TableContainer>
          <Typography component="h1" variant="h5" color="red" ml={3} mt={3}>
            {errorMessage}
          </Typography>
        </Form>
      </CartContainer>
    </Formik>
  );
};

export default Cart;
