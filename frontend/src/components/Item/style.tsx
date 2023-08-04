import { Button, styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  width: 80vw;
  border: 1px solid lightblue;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  button {
    border-radius: 10px;
    height: 30px;
    align-self: center;
    margin-right: 2%;
    font-weight: bold;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }

  @media only screen and (min-width: 550px) {
    width: 60vw;
  }
`;

export const EditButton = styled(Button)`
  margin-right: 10px;
  align-self: center;
  font-weight: bold;
`;
