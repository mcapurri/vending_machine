import { IconButton as IconButtonMUI, styled } from '@mui/material';

export const Wrapper = styled('div')`
  margin: 40px;
  display: 'flex',
  flexDirection: 'column',
  height: 100vh
`;

export const IconButton = styled(IconButtonMUI)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 180px;
  color: blue;
`;
