import { Paper as PaperMUI, Button, styled } from '@mui/material';

export const Paper = styled(PaperMUI)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ShopNowButton = styled(Button)`
  width: 300px;
  margin-left: 3%;
  font-weight: bold;
  background: lightgrey;
  color: blue;
  border: 1px solid blue;
  align-self: center;
  justify-self: center;
`;

export const CartContainer = styled('div')`
  width: 400px; /* Adjust the width as needed */
  padding: 1rem;
  background-color: #ffffff;
  margin: 5% 0;
`;
