/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Accordion, AccordionSummary, AccordionDetails, Grid, Drawer, Divider, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    <Drawer style={{ maxWidth: '20vw' }} anchor="left" open={visible} onClose={onClose}>
      <Grid className={classes.root}>
       <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={6}>
            <Button style={darkMode ? { color: 'white' } : {}} onClick={() => onClose()} color="primary" aria-label="close">
                Close &#x2715;
            </Button>
          </Grid>
          <Grid item>
          <Typography variant="h4">
            Subscribii &nbsp;
            <img alt="Subscribii Logo" className={classes.logo} src={LogoImage} />
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body1">
            Subscriptions Under Control
          </Typography>
          </Grid>
        </Grid>
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
            <Typography className={classes.heading}>Is Subscribii Free and Open-Source?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Subscribii is open-source and is always meant to be free. You can view all of our source code on our Github (see github.com/ShreyRavi/subscribii). The only requirement is to have a Google account (which is free).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How Do I Toggle Dark/Light Mode?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Click on the sun icon on the bottom left to toggle between Dark Mode and Light Mode. Your dark mode setting is saved after login.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How Is My Data Used?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Subscribii does not explicitly, intentionally use data for any purpose other than the functioning of the app. This app was built for technical, hobby showcase purposes only.
            All data is stored on Google Firebase (see firebase.google.com/support/privacy) only, and due to privacy restrictions, this app is meant for use only in the United States.
            Please contact shreyastallamraju@gmail.com with any questions regarding this app. You can see Subscribii's privacy policy at
              {' '}
              <a className={darkMode ? classes.linksDarkMode : classes.links} href="https://github.com/ShreyRavi/subscribii/blob/master/PrivacyPolicy.md">here</a>
              .
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How Do I Report A Bug/Contribute Code?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              I'd love your help! Feel free to either shoot me an email at shreyastallamraju@gmail.com or navigate to the Subscribii Github at github.com/ShreyRavi/subscribii and open a pull request!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider />
        <Typography variant="caption">
          Copyright &copy; Shreyas Tallamraju { (new Date().getFullYear()) }. All Rights Reserved.
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
