import { Typography, styled } from '@mui/material';

export const Wrapper = styled('div')`
  padding: 3% 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  color: darkgreen;
  height: 100%;
`;

export const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid darkgreen;
  margin-bottom: 50px;
  width: 100%;
  min-height: 7%;
  padding-bottom: 3%;
`;

export const CartButtonContainer = styled('div')`
  display: flex;
  align-items: center;
`;

export const Div = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Title = styled(Typography)`
  font-family: 'Roboto Slab', serif;
  padding-bottom: 5%;
  font-size: 2rem;
  color: darkgreen;
  font-weight: bold;
  @media (min-width: 576px) {
    font-size: 4rem;
    padding-bottom: 0;
  }
`;
