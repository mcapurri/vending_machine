import React, { useCallback } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../../Utils/API/products';
import Spinner from '../../components/Spinner';

const initialValues: Product = {
  id: '',
  productName: '',
  amountAvailable: 0,
  cost: 0,
};

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Username is a required field')
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string()
    .required('Password is a required')
    .min(5, 'Password must be at least 5 characters'),
});

const onSubmit = useCallback(async () => {}, []);

const errorMessage = '';

const EditProduct = () => {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
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
                  id="username"
                  label="Name"
                  name="name"
                  autoComplete="name"
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
                    name="amount"
                    label="Amount available"
                    id="amount"
                    autoComplete="amount"
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
                  onClick={() => console.log('Deleted')}
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
