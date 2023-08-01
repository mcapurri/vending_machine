import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { StyledHeader, LogoutButton } from './style';
import { ContextValueType, UserContext, initialState } from '../../Context/UserContext';
import { logout } from '../../Utils/API/auth';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const onLogout = (): void => {
    logout();
    dispatch({
      type: 'SET_USER',
      payload: initialState,
    });
    navigate('/');
  };

  const isUserInitialState =
    user.username === initialState.username &&
    user.role === initialState.role &&
    user.deposit === initialState.deposit;

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <FaHome /> Home
        </Link>
      </div>
      <ul>
        {!isUserInitialState ? (
          <li>
            <LogoutButton onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </LogoutButton>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </StyledHeader>
  );
}

export default Header;
