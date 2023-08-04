import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
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

type Deposit = Pick<User, 'deposit'>;

const DepositCredit: React.FC = () => {
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const [coins, setCoins] = useState<number[]>([]);
  const [deposit, setDeposit] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutateAsync } = useMutation(addCredit);

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

  const onSubmit: () => void = async () => {
    try {
      const totalDeposit = await mutateAsync(coins);
      dispatch({
        type: 'SET_USER',
        payload: {
          deposit: totalDeposit,
          ...user,
        },
      });

      setDeposit(totalDeposit);
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
  };

  return (
    <Formik initialValues={initialValues!} validationSchema={schema} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched }) => (
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
              Your new deposit is{' '}
              {(amount / 100).toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
              })}
            </Typography>
            <Typography component="h1" variant="h5" color="red">
              {errorMessage}
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Grid>
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
              <Typography component="h1" variant="h5" pb="6">
                Your total credit is now{' '}
                {(deposit / 100).toLocaleString('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </Typography>
              <Typography component="p" className="error">
                {errors.deposit && touched.deposit && errors.deposit}
              </Typography>
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
