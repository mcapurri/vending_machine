import { InputBase, Container as ContainerMUI, styled } from '@mui/material';

export const Container = styled(ContainerMUI)`
  display: flex;
  flex-direction: column;
`;

export const Search = styled('div')`
  position: relative;
  border-radius: 10px;
  backgroundColor: white

  &:hover: {
    backgroundColor: blue;
  },
  marginRight: 20px,
  marginLeft: 0;
  width: 100%;
  
`;

export const SearchIconWrapper = styled('div')`
  padding: 10px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  color: inherit;

  & .muiinputbase-input: {
    padding: 10px;
    padding-left: 10px;
    // transition:
    width: 100%;

    width: 20ch;
  }
`;
