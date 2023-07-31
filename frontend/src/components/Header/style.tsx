import { Button, styled } from "@mui/material";

export const StyledHeader = styled("header")`
  display: flex;
  width: 90vw;
  justify-content: space-between;
  align-items: center;
  // padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 60px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
  }
  ul li {
    margin-left: 20px;
  }
  a {
    text-decoration: none;
  }
  ul li a {
    display: flex;
    align-items: center;
  }
  ul li a:hover {
    color: #777;
  }
  ul li a svg {
    margin-right: 5px;
  }
`;

export const LogoutButton = styled(Button)`
  color: blue;
  cursor: pointer;
`;
