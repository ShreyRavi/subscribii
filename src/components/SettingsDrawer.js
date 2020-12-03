/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab, Accordion, AccordionSummary, AccordionDetails, Grid, Drawer, Divider, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import LogoImage from '../logo512.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: '50px',
  },
  logo: {
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    marginRight: '60vw',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 99,
    top: 10,
    right: 10,
  },
  accordion: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  links: {
    textDecoration: 'none',
    color: '#0d47a1',
  },
  linksDarkMode: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const SettingsDrawer = ({ visible, darkMode, onClose }) => {
  const classes = useStyles();
  return (
    <Drawer style={{ maxWidth: '40vw' }} anchor="left" open={visible} onClose={onClose}>
      <Grid className={classes.root}>
        <Typography variant="h4">
          Subscribii &nbsp;
          <img alt="Subscribii Logo" className={classes.logo} src={LogoImage} />
          <Fab
            size="small"
            onClick={() => onClose()}
            color="primary"
            aria-label="add"
          >
            <CloseIcon />
          </Fab>
        </Typography>
        <Typography variant="body1">
          Subscriptions Under Control
        </Typography>
        <Divider />

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>What is Subscribii?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Subscribii is a subscription management app that can be accessed on any device.
              Add your recurring payments on the app afterlogging in with your
              Google account, and access them at anytime, anywhere!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Is This Free?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Subscribii is free for you to use! You just need a Google account (which is free)!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How Do I Enable Dark Mode?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Click on the sun icon on the bottom left! Your dark mode setting is saved after login.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Privacy Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              In short, we only use your data about subscriptions to store what you want for
              the app. You can see our privacy policy at
              {' '}
              <a className={darkMode ? classes.linksDarkMode : classes.links} href="https://github.com/ShreyRavi/subscribii/blob/master/PrivacyPolicy.md">here</a>
              .
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider />
        <Typography variant="caption">
          Copyright &copy; Shreyas Tallamraju 2020. All Rights Reserved.
          <br />
          <a className={darkMode ? classes.linksDarkMode : classes.links} href="https://github.com/ShreyRavi/subscribii">Github</a>
          {' '}
          |
          {' '}
          <a className={darkMode ? classes.linksDarkMode : classes.links} href="mailto:shreyastallamraju@gmail.com">Contact</a>
          {' '}
          |
          {' '}
          <a className={darkMode ? classes.linksDarkMode : classes.links} href="https://github.com/ShreyRavi/subscribii/blob/master/PrivacyPolicy.md">Legal</a>
        </Typography>
      </Grid>
    </Drawer>
  );
};

export default SettingsDrawer;
