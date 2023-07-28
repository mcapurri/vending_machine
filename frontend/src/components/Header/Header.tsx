import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { StyledHeader, LogoutButton } from "./style";

function Header() {
  const navigate = useNavigate();
  const user: boolean = false;

  const onLogout = () => {
    console.log("Logged out");
    navigate("/");
  };

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <FaHome /> Home
        </Link>
      </div>
      <ul>
        {user ? (
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
