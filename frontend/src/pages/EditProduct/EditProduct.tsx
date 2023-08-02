import React, { useCallback, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { CartItem, edit, fetch, deleteItem, Product } from '../../Utils/API/products';
import Spinner from '../../components/Spinner';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

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

const errorMessage = '';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: cachedData, isLoading } = useQuery<CartItem[]>('products', fetch);

  const clickedItem = cachedData?.find((item) => item._id === id);

  const editProductMutation = useMutation(edit);

  if (isLoading) {
    return <Spinner />;
  }

  if (!clickedItem) {
    return <div>Product not found.</div>;
  }

  const initialValues: CartItem = clickedItem && {
    _id: clickedItem._id,
    productName: clickedItem.productName,
    amountAvailable: clickedItem.amountAvailable || 0,
    cost: clickedItem.cost,
    sellerId: clickedItem.sellerId,
    amount: clickedItem.amount,
    sum: clickedItem.sum,
  };

  const onSubmit = async (values: CartItem, { setSubmitting }: FormikHelpers<CartItem>) => {
    try {
      setSubmitting(true);
      const edited = await editProductMutation.mutateAsync(values);
      console.log('edited', edited);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string, resetForm: () => void) => {
    try {
      const deletedProduct = await deleteItem({ _id: id });
      console.log('Deleted product:', deletedProduct);

      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

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
                  onChange={handleChange}
                  value={values.productName}
                />
                <p className="error">
                  {errors.productName && touched.productName && errors.productName}
                </p>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={values.cost}
                  />
                </Grid>
                <p className="error">
                  {errors.amountAvailable && touched.amountAvailable && errors.amountAvailable}
                </p>
                <p className="error">{errors.cost && touched.cost && errors.cost}</p>

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
