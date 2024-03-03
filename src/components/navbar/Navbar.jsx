import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Add Product", path: "/add-product" },
];
const settings = ["Profile", "Logout"];

const Navbar = (props) => {
  const { isAuthenticated } = props;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isSignUpScreen, setIsSignUpScreen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddShoppingCartIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "36px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-com
          </Typography>

          <Box sx={{ flexGrow: 1, display: "none" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {}
              {pages.map((page) => (
                <div>
                  {isAuthenticated && (
                    <MenuItem key={page?.name} onClick={handleCloseNavMenu}>
                      <NavLink
                        to={page.path}
                        style={{ textDecoration: "none" }}
                      >
                        {page.name}{" "}
                      </NavLink>
                    </MenuItem>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          <AddShoppingCartIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "36px",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-com
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {isAuthenticated && (
              <Box display="flex">
                {pages.map((page) => (
                  <MenuItem key={page?.name} onClick={handleCloseNavMenu}>
                    <NavLink
                      to={page.path}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {page.name}{" "}
                    </NavLink>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
          {!isAuthenticated && (
            <NavLink
              component="Button"
              style={{ textDecoration: "none", color: "white" }}
              activeClassName="active-link"
              to={isSignUpScreen ? "sign-up" : "/log-in"}
            >
              <Button
                variant="outlined"
                className="btn-outlined"
                onClick={() => setIsSignUpScreen(!isSignUpScreen)}
              >
                {isSignUpScreen ? "Sign Up" : " Log In"}
              </Button>
            </NavLink>
          )}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
