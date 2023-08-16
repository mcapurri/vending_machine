import { Button, styled } from '@mui/material';

export const Wrapper = styled('div')(({ isSelected }: { isSelected: boolean }) => ({
  display: 'flex',
  width: '80vw',
  border: '1px solid lightblue',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  backgroundColor: isSelected ? 'lightblue' : '#effffa;',

  button: {
    borderRadius: '10px',
    height: '30px',
    alignSelf: 'center',
    marginRight: '2%',
    fontWeight: 'bold',
  },

  div: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '1rem',
    height: '100%',
  },

  '@media only screen and (min-width: 576px)': {
    width: '60vw',
  },
}));

export const EditButton = styled(Button)`
  margin-right: 10px;
  align-self: center;
  font-weight: bold;
`;
