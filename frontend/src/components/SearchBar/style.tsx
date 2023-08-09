import { Container as ContainerMUI, styled } from '@mui/material';

export const Container = styled(ContainerMUI)`
  display: flex;
  flex-direction: column;
`;

export const SearchInput = styled('div')`
  display: flex;
`;

export const ProductsContainer = styled('div')`
  position: absolute;
  top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: normal;
  color: black;
  width: 180px;
  font-size: 20px;
  z-index: 100;
  background: #ffffff;
`;

export const Product = styled('div')`
  padding-bottom: 5px;
`;
