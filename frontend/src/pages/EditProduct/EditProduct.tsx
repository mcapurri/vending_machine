import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartItem, edit, deleteItem } from '../../Utils/API/products';
import Spinner from '../../components/Spinner';
import logger from '../../Utils/logger';
import { Button } from './style';

interface CachedData {
  pages: {
    currentPage: number;
    products: CartItem[];
    totalPages: number;
  }[];
  pageParams: (number | undefined)[];
}

const schema = Yup.object().shape({
  productName: Yup.string()
    .required('Name is a required field')
    .min(3, 'Name must be at least 3 characters'),
  cost: Yup.number().required('Cost/unit is required').positive('Cost must be a positive number'),
  amountAvailable: Yup.number()
    .required('Amount available is required')
    .integer('Amount available must be an integer')
    .min(1, 'At least 1 unit must be added'),
});

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<CachedData>('products');

  const flattenedProducts = useMemo(
    () => (cachedData ? cachedData.pages.flatMap((page) => page.products) : []),
    [cachedData]
  );

  const clickedItem = flattenedProducts.find((item: CartItem) => item._id === id);

  const { mutateAsync } = useMutation(edit);

  const initialValues: CartItem = clickedItem! && {
    _id: clickedItem?._id,
    productName: clickedItem?.productName,
    amountAvailable: clickedItem?.amountAvailable || 0,
    cost: clickedItem?.cost,
    sellerId: clickedItem?.sellerId,
    amount: clickedItem?.amount,
    sum: clickedItem?.sum,
  };

  const onSubmit: (values: CartItem, formikHelpers: FormikHelpers<CartItem>) => void = useCallback(
    async (values: CartItem, { setSubmitting }: FormikHelpers<CartItem>) => {
      try {
        setSubmitting(true);
        await mutateAsync(values);
        navigate('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setErrorMessage(message);
        }
        logger.error('Error updating product:', error);
      } finally {
        setSubmitting(false);
      }
    },
    [setErrorMessage]
  );

  const handleDeleteClick = useCallback(
    async (_id: string, resetForm: () => void) => {
      try {
        await deleteItem({ _id });

        resetForm();
        navigate('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setErrorMessage(message);
        }
        logger.error('Error deleting product:', error);
      }
    },
    [deleteItem]
  );

  if (!cachedData) {
    return <Spinner />;
  }

  if (!clickedItem) {
    return <Typography component="p">Product not found.</Typography>;
  }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values, errors, touched, isSubmitting, resetForm }) => (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 300,
            }}
          >
            <Typography component="h1" variant="h5" pb="6">
              Edit
            </Typography>
            <Typography component="h1" variant="h5" color="red">
              {errorMessage}
            </Typography>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="productName"
                  label="Name"
                  name="productName"
                  autoComplete="productName"
                  autoFocus
                  onChange={(e) => {
                    handleChange(e);
                    setErrorMessage('');
                  }}
                  value={values.productName}
                />
                <Typography component="p" color="red">
                  {errors.productName && touched.productName && errors.productName}
                </Typography>
                <Grid item xs>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amountAvailable"
                    label="Amount available"
                    id="amountAvailable"
                    type="number"
                    autoComplete="amountAvailable"
                    onChange={(e) => {
                      handleChange(e);
                      setErrorMessage('');
                    }}
                    value={values.amountAvailable}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cost"
                    label="Price unit"
                    id="cost"
                    type="number"
                    autoComplete="cost"
                    onChange={(e) => {
                      handleChange(e);
                      setErrorMessage('');
                    }}
                    value={values.cost}
                  />
                </Grid>
                <Typography component="p" color="red">
                  {errors.amountAvailable && touched.amountAvailable && errors.amountAvailable}
                </Typography>
                <Typography component="p" color="red">
                  {errors.cost && touched.cost && errors.cost}
                </Typography>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Save changes
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleDeleteClick(values._id, resetForm)}
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Delete product
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default EditProduct;
