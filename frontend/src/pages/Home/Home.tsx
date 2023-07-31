import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import ProductsList from '../ProductsList';

const Home: React.FC = () => {
  const matches = useMediaQuery('(max-width:450px)');

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { width: matches === false ? '35vw' : '70vw' },
      }}
    >
      <ProductsList />
    </Box>
  );
};

export default Home;
