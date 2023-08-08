import { styled } from '@mui/material';

export const Div = styled('div')`
  padding: 3% 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 100vh;
  overflow: hidden;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10%;
  width: 100%;
  min-height: 7%;
`;

export const CartButtonContainer = styled('div')`
  position: absolute;
  top: 11%;
  right: 1.5rem;
  width: 3rem;
`;
