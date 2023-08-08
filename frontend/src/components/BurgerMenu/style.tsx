import { Button, styled, ButtonProps, SxProps } from '@mui/material';

type StyledMenuProps = {
  open: boolean;
};

export const StyledMenu = styled('nav')<StyledMenuProps>(({ open }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#effffa',
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  height: '100vh',
  textAlign: 'left',
  padding: '2rem',
  position: 'absolute',
  top: 0,
  left: 0,
  transition: 'transform 0.3s ease-in-out',
  zIndex: 2,
  width: '80%',
  border: '1px solid black',

  '@media (min-width: 576px)': {
    width: '35%',
  },

  a: {
    fontSize: '1.5rem',

    textTransform: 'uppercase',
    padding: '2rem 0',
    fontWeight: 'bold',
    letterSpacing: '0.5rem',
    color: '#0d0c1d',
    textDecoration: 'none',
    transition: 'color 0.3s linear',

    '@media (min-width: 576px)': {
      textAlign: 'center',
      fontSize: '2rem',
    },

    '&:hover': {
      color: '#343078',
    },
  },
}));

type StyledBurgerProps = ButtonProps & SxProps & { open?: boolean };

export const StyledBurger = styled(Button)<StyledBurgerProps>(({ open }) => ({
  position: 'absolute',
  top: '11%',
  left: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '2rem',
  height: '2rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  zIndex: 10,

  '&:focus': {
    outline: 'none',
  },

  div: {
    width: '2rem',
    height: '0.25rem',
    background: 'black',
    borderRadius: '10px',
    transition: 'all 0.3s linear',
    position: 'relative',
    transformOrigin: '1px',

    '&:first-of-type': {
      transform: open ? 'rotate(45deg)' : 'rotate(0)',
    },

    '&:nth-of-type(2)': {
      opacity: open ? 0 : 1,
      transform: open ? 'translateX(20px)' : 'translateX(0)',
    },

    '&:nth-of-type(3)': {
      transform: open ? 'rotate(-45deg)' : 'rotate(0)',
    },
  },
}));

export const LogoutButton = styled(Button)<ButtonProps & SxProps>({
  fontSize: '1.5rem',
  textTransform: 'uppercase',
  padding: '2rem 0',
  fontWeight: 'bold',
  letterSpacing: '0.5rem',
  color: '#0d0c1d',
  textDecoration: 'none',
  transition: 'color 0.3s linear',

  '@media (min-width: 576px)': {
    fontSize: '2rem',
  },

  '&:hover': {
    color: '#343078',
  },
});

export const Ul = styled('ul')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style-type: none;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 15px;
  }
`;
