import React, { useState } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../Images/Chat_Along_logo.jpg";
import MySidebar from "./sidebar";
import "../Style/header.css";
import Auth from "../utils/auth";

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const getUserName = () => {
    const userProfile = Auth.getProfile();
    console.log("userPRofle", userProfile);
    return userProfile ? userProfile.data.username : "";
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(Auth.loggedIn());
  const [name, setName] = useState(getUserName());

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    Auth.logout();
    setIsUserLoggedIn(Auth.loggedIn());
    setName(getUserName());
    // window.location.assign("/");
  };
  console.log("username", name);
  return (
    <>
      <Menu pointing secondary>
        <div className="menu_bar" onClick={handleSidebarToggle}>
          <Icon name="bars" size="big" />
        </div>
        <Menu.Item>
          <Link to="/">
            <img className="Img_logo" alt="logo" src={Logo} />
          </Link>
        </Menu.Item>

        <Menu.Menu position="center">
          <Menu.Item>
            {isUserLoggedIn ? (
              <>
              <h3>Welcome back {name}.</h3>  

              </>
            ) : (
             <p></p>
            )}
          </Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item>
            {isUserLoggedIn ? (
              <>
                <Button color="orange" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login&signup">
                <Button color="orange">Login</Button>
              </Link>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <MySidebar visible={sidebarVisible} onHide={handleCloseSidebar} />
    </>
  );
};

export default Header;


