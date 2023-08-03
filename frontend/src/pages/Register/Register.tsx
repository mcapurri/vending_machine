import React, { useCallback, useContext, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Link,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import { signupUser } from '../../Utils/API/auth';
import { FormControl } from './style';
import Spinner from '../../components/Spinner';

const Register: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { dispatch } = useContext<ContextValueType>(UserContext);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation(signupUser);

  const initialValues = {
    username: '',
    password: '',
    confirm: '',
    role: '',
    deposit: 0,
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .required('Username is a required field')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is a required')
      .min(5, 'Password must be at least 5 characters'),
    confirm: Yup.string()
      .required('Confirm your password')
      .min(5, 'Password must be at least 5 characters'),
    role: Yup.string(),
  });

  const onSubmit = useCallback(
    async (
      values: FormikValues,
      {
        resetForm,
      }: FormikHelpers<{
        username: string;
        password: string;
        confirm: string;
        role: string;
        deposit: number;
      }>
    ) => {
      const { username, password, confirm, role, deposit } = values;

      if (password !== confirm) {
        setErrorMessage('Passwords do not match');
        resetForm();
        return;
      }

      try {
        const registeredUser = await mutateAsync({
          username,
          password,
          role,
          deposit,
        });
        if (registeredUser) {
          dispatch({
            type: 'SET_USER',
            payload: {
              id: registeredUser.id,
              username: registeredUser.username,
              role: registeredUser.role,
              deposit: registeredUser.deposit,
            },
          });
        }
        navigate('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setErrorMessage(message);
        }
      }

      resetForm();
    },
    [dispatch, navigate]
  );

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
            }}
          >
            <Typography component="h1" variant="h5" pb={6}>
              Sign up
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
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleChange}
                  value={values.username}
                />
                <p className="error">{errors.username && touched.username && errors.username}</p>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
                <p className="error">{errors.password && touched.password && errors.password}</p>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="confirm"
                  onChange={handleChange}
                />{' '}
                <p className="error">{errors.confirm && touched.confirm && errors.confirm}</p>
                <FormControl>
                  <InputLabel>Your Role</InputLabel>
                  <Select
                    displayEmpty
                    value={values.role}
                    onChange={handleChange}
                    label="Role"
                    name="role"
                  >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Do you already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default Register;
