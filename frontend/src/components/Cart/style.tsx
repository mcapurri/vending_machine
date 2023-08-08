import { Paper as PaperMUI, Button, styled } from '@mui/material';

export const Paper = styled(PaperMUI)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ShopNowButton = styled(Button)`
  width: 200px;
  margin-left: 3%;
  font-weight: bold;
  background: lightgrey;
  color: blue;
  border: 1px solid blue;
  align-self: center;
  justify-self: center;

  @media screen and (min-width: 576px) {
    width: 300px;
  }
`;

export const CartContainer = styled('div')`
  width: 350px;
  padding: 1rem;
  padding-left: 0;
  background-color: #ffffff;
  margin: 5% 0;
  width: 100%;
  overflow: hidden;

  @media screen and (min-width: 576px) {
    width: 400px;
    padding: 1rem;
  }
`;
