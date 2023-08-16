import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, useMediaQuery } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import { BigCoinImg, MediumCoinImg, SmallCoinImg } from './style';

import { User, addCredit, fetchUser } from '../../Utils/API/auth';

import fiveCents from '../../assets/5cents.png';
import tenCents from '../../assets/10cents.png';
import twentyCents from '../../assets/20cents.png';
import fifthyCents from '../../assets/50cents.png';
import oneEuro from '../../assets/1euro.png';
import { formatPrice } from '../../Utils/format';

type Deposit = Pick<User, 'deposit'>;

const DepositCredit: React.FC = () => {
  const { user, dispatch } = useContext<ContextValueType>(UserContext);
  const [coins, setCoins] = useState<number[]>([]);
  const [deposit, setDeposit] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutateAsync } = useMutation(addCredit);

  const matches = useMediaQuery('(max-width:576px)');

  const { data } = useQuery('user', fetchUser);

  useEffect(() => {
    if (data) {
      setDeposit(data.deposit!);
    }
  }, [data?.deposit]);

  const initialValues: Deposit = { deposit: data?.deposit };

  const schema = Yup.object().shape({
    coins: Yup.array().of(Yup.number()).min(1, 'Please add minimum 5 cents'),
  });

  const amount = useMemo(() => coins.reduce((sum, a) => sum + a, 0), [coins]);

  const handleDeposit = useCallback((coinValue: number) => {
    setCoins((prev) => [...prev, coinValue]);
  }, []);

  const onSubmit: () => void = useCallback(async () => {
    try {
      const totalDeposit = await mutateAsync(coins);
      const updatedUser = { ...user, deposit: totalDeposit };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({
        type: 'SET_USER',
        payload: updatedUser,
      });

      setDeposit(totalDeposit);
      setErrorMessage('');
      setCoins([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(message);
      }
    }
  }, [coins, dispatch, user]);

  return (
    <Formik initialValues={initialValues!} validationSchema={schema} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched }) => (
        <Container component="main" maxWidth={matches ? 'xs' : 'md'}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 300,
              height: '100vh',
            }}
          >
            <Typography component="h1" variant="h4" pb="6">
              {' '}
              Your current credit is {formatPrice(deposit)}
            </Typography>
            <Typography component="h1" variant="h5" pb="6" mt={5}>
              {' '}
              New deposit is {formatPrice(amount)}
            </Typography>
            <Typography component="p" pb="6" mt={5} color="blue">
              {' '}
              Select the amount you want to add to your credit
            </Typography>

            <Form onSubmit={handleSubmit}>
              <Grid mt={4}>
                <Button onClick={() => handleDeposit(5)}>
                  <SmallCoinImg
                    style={{
                      backgroundImage: `url(${fiveCents})`,
                    }}
                  />
                </Button>
                <Button onClick={() => handleDeposit(10)}>
                  <SmallCoinImg
                    style={{
                      backgroundImage: `url(${tenCents})`,
                    }}
                  />
                </Button>
                <Button onClick={() => handleDeposit(20)}>
                  <BigCoinImg
                    style={{
                      backgroundImage: `url(${twentyCents})`,
                    }}
                  />
                </Button>
                <Button onClick={() => handleDeposit(50)}>
                  <MediumCoinImg
                    style={{
                      backgroundImage: `url(${fifthyCents})`,
                    }}
                  />
                </Button>
                <Button onClick={() => handleDeposit(100)}>
                  <BigCoinImg
                    style={{
                      backgroundImage: `url(${oneEuro})`,
                    }}
                  />
                </Button>
              </Grid>
              <TextField type="hidden" value={coins} id="coins" name="coins" margin="none" />
              <div>
                <Typography component="p" className="error" mb={8}>
                  {errors.deposit && touched.deposit && errors.deposit}
                </Typography>
                <Typography component="h1" variant="h5" color="red" mb={8}>
                  {errorMessage}
                </Typography>
              </div>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Add credit
              </Button>
            </Form>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default DepositCredit;
