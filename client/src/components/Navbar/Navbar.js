import React, {useState, useEffect} from "react"
import {Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../images/Logo.png'
import {useDispatch} from "react-redux";

const pages = ['Home', 'Books', 'Community', 'Contact'];

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/auth');
        setUser(null);
      }
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
  
    let signInButton;
    if (user?.result)  {
        signInButton = 
        <Box sx={{ flexGrow: 0 }}>
            <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Box>
    } 
    else if(user?.sub) {
        signInButton = 
        <Box sx={{ flexGrow: 0 }}>
            <Avatar  alt={user?.name} src={user?.picture}>{user?.name.charAt(0)}</Avatar>
            <Typography variant="h6">{user?.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Box>
    } 
    else {
        signInButton = <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    }

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to="/" >
                <img src={logo} alt="icon" height="40px"/>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            { signInButton }
          </Toolbar>
        </Container>
      </AppBar>
    );
  }






    // const history = useHistory();

    // return (
    //     <AppBar position="static" color="inherit">
    //     <Link to="/" >
    //         <img src={logo} alt="icon" height="40px"/>
    //         {/* <img component={Link} src={memoriesText} alt="icon" height="45px"/> */}
    //     </Link>
    //     {/* <Toolbar className={classes.toolbar}>
    //         { signInButton }
    //     </Toolbar> */}
    //     </AppBar>
    // );
// };


export default Navbar