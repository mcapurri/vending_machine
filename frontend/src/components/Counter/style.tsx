import { Button as ButtonMUI, styled, Box } from "@mui/material";

export const Button = styled(ButtonMUI)`
  min-width: 12px;
  height: 18px;
  padding: 5px;
  margin: 5px;
  background: lightgrey;
  color: blue;
  text-decoration: none;
  text-align: center;
  border: 1px solid blue;


  &:hover {
    background: #575b71;
    color: #fff;
  }
`;

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;
