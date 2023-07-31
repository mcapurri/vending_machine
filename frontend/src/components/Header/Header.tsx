import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { StyledHeader, LogoutButton } from "./style";
import { useContext } from "react";
import {
  ContextValueType,
  UserContext,
  initialState,
} from "../../Context/UserContext";
import { logout } from "../../Utils/API/auth";
import React from "react";

function Header() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const onLogout = () => {
    logout();
    dispatch({
      type: "SET_USER",
      payload: initialState,
    });
    navigate("/");
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
