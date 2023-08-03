import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Product, add } from '../../Utils/API/products';
import Spinner from '../../components/Spinner';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import logger from '../../Utils/logger';

const initialValues: Product = {
  _id: '',
  productName: '',
  amountAvailable: 0,
  cost: 0,
};

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

const AddProduct: React.FC = () => {
  const { user } = useContext<ContextValueType>(UserContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutateAsync } = useMutation(add);

  const onSubmit = useCallback(
    async (values: Product, { resetForm, setSubmitting }: FormikHelpers<Product>) => {
      const { productName, cost, amountAvailable } = values;
      try {
        setSubmitting(true);

        await mutateAsync({
          productName,
          cost: Number(cost.toFixed(2)),
          amountAvailable,
          sellerId: user.id,
        });

        resetForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.message);
        }
        logger.error('Error adding product:', error);
      } finally {
        setSubmitting(false);
      }
    },
    []
  );
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => {
        return (
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
                Add Product
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
                      type="number"
                      name="amountAvailable"
                      label="Amount available"
                      id="amountAvailable"
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
                    Add
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
