import React, { useContext } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import ProductsList from '../ProductsList';
import { ContextValueType, UserContext } from '../../Context/UserContext';
import { Greetings } from './style';

const Home: React.FC = () => {
  const matches = useMediaQuery('(max-width:450px)');

  const { user } = useContext<ContextValueType>(UserContext);

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { width: matches === false ? '40vw' : '70vw', background: 'red' },
      }}
    >
      {user.username && <Greetings>Welcome back, {user.username}</Greetings>}
      <ProductsList />
    </Box>
  );
};

export default Home;
