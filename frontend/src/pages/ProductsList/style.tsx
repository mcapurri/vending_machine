import { Grid as GridMUI, Drawer as DrawerMUI, styled } from '@mui/material';

export const Wrapper = styled('div')`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Grid = styled(GridMUI)`
  display: flex;
  flex-direction: column;
  alignitems: center;
`;
export const Drawer = styled(DrawerMUI)`
  width: 50%;
`;
