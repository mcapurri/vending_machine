import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome, FaPlus, FaCoins } from 'react-icons/fa';
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

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <FaHome /> Home
        </Link>
      </div>
      <ul>
        {user.id ? (
          <>
            {user.role === 'buyer' ? (
              <li>
                <Link to="/deposit">
                  <FaCoins /> <span>Deposit</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/add">
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
              <Link to="/login">
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> <span>Sign up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </StyledHeader>
  );
}

export default Header;
