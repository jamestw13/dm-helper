import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useContext } from "react";
import { UserContext } from "../features/users";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import { Avatar } from "./Avatar";

const Header = () => {
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const { user, loggedIn } = useContext(UserContext);

  return (
    <header>
      <Link to="/" className="home-link link">
        <div className="header-title">Stat Block</div>
      </Link>

      {loggedIn && (
        <>
          <nav
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link to="/friends">
              <Button onClick={() => navigate("/friends")}>Friends</Button>
            </Link>
          </nav>
          <nav
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link className="link" to="/" onClick={logout}>
              <Button>Logout</Button>
            </Link>
            <Link to={`/${user?._id}`}>
              <Button>
                {user.firstname
                  ? `${user.firstname || ""} ${user.lastname || ""}`
                  : user.username}
              </Button>
            </Link>
            <Link to={`/${user?.username}`}>
              <Avatar />
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
