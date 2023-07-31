import React from 'react';
import ProductsList from '../ProductsList';
import { Box, useMediaQuery } from '@mui/material';
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
