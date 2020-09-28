import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import { StyledFirebaseAuth } from 'react-firebaseui';
import LogoImage from '../logo512.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    settingsButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logoutButton: {
      color: 'white',
    },
    logo: {
      width: '32px',
      height: '32px',
      cursor: 'pointer',
    },
}));

const Header = ({showSettingsDrawer, setShowSettingsDrawer, uiConfig, firebaseAuth, user, logout}) => {
  const classes = useStyles();
  const userName = user ? user.displayName : 'Guest';
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Open Settings">
            <IconButton onClick={() => setShowSettingsDrawer(!showSettingsDrawer)} edge="start" className={classes.settingsButton} color="inherit" aria-label="menu">
              <img alt="Subscribii Logo" className={classes.logo} src={LogoImage}></img>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            {
              user === null ? 'Subscribii - Subscriptions Managed' : `Welcome to Subscribii, ${userName}!`
            }
          </Typography>
          {
            user !== null ?
            <Button className={classes.logoutButton} onClick={logout}>
              Logout
            </Button>
            :
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebaseAuth}
            />
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;