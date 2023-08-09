import { styled } from '@mui/material';

export const Wrapper = styled('div')`
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
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
