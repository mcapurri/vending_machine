import { FaHome, FaCoins, FaPlus, FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StyledBurger, StyledMenu, Ul, LogoutButton } from './style';
import { ContextValueType, UserContext, initialState } from '../../Context/UserContext';
import { logout } from '../../Utils/API/auth';

const Menu: React.FC<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const onLogout = (): void => {
    logout();
    dispatch({
      type: 'SET_USER',
      payload: initialState,
    });
    navigate('/');
    setOpen(false);
  };
  const onLinkClick = (): void => {
    setOpen(false);
  };
  return (
    <StyledMenu open={open}>
      <Ul>
        <li>
          <Link to="/" onClick={onLinkClick}>
            <FaHome /> Home
          </Link>
        </li>
        {user.id ? (
          <>
            {user.role === 'buyer' ? (
              <li>
                <Link to="/deposit" onClick={onLinkClick}>
                  <FaCoins /> <span>Deposit</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/add" onClick={onLinkClick}>
                  <FaPlus /> <span>Add product</span>
                </Link>
              </li>
            )}

            <li>
              <LogoutButton onClick={onLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </LogoutButton>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={onLinkClick}>
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={onLinkClick}>
                <FaUser /> <span>Sign up</span>
              </Link>
            </li>
          </>
        )}
      </Ul>
    </StyledMenu>
  );
};

const Burger: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export { Menu, Burger };
