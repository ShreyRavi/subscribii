import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { StyledFirebaseAuth } from 'react-firebaseui';

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
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            Welcome to Subscribii, {userName}!
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