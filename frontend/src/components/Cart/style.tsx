import { Paper as PaperMUI, Button, styled } from '@mui/material';

export const Paper = styled(PaperMUI)`
  padding: 0 3%;
  overflow-x: hidden;
`;

export const ShopNowButton = styled(Button)`
  width: 300px;
  margin-left: 3%;
  font-weight: bold;
  background: lightgrey;
  color: blue;
  border: 1px solid blue;
`;
