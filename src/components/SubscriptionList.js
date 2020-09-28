import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography, IconButton, Tooltip, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { prettyAmount, prettyDate, prettyDueDate } from '../util/util';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px',
  },
  noDataMessage: {
    textAlign: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const SubscriptionList = ({ user, data, deleteSubscription, controlTimePeriod, searchTerm }) => {
  // useState
  const [openAccordions, setOpenAccordions] = useState([]);
  const handleAccordionChange = (key) => {
    if (openAccordions.indexOf(key) > -1) {
      setOpenAccordions(openAccordions.filter(a => a !== key));
    } else {
      setOpenAccordions(openAccordions.concat([key]));
    }
  }
  
  // styling
  const classes = useStyles();
  const userName = user ? user.displayName : 'Guest';
  return (
    <Container className={classes.root}>
      {
        data.length ?
        data.map((subscription) =>
          <Accordion key={`accordion_${subscription.key}`} expanded={(openAccordions.indexOf(subscription.key) > -1)} onChange={() => handleAccordionChange(subscription.key)}>
          <AccordionSummary
            expandIcon={<Tooltip title="See More"><ExpandMoreIcon /></Tooltip>}
          >
            <Typography className={classes.heading}>
              {subscription.name}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {
                controlTimePeriod === 'default' ?
                `$${prettyAmount(subscription.amount, subscription.timePeriod, ' per ')}, due ${prettyDueDate(subscription.date, subscription.timePeriod)}`
                :
                `$${prettyAmount(subscription.amount, controlTimePeriod, ' per ')}`
              }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid direction="column" container>
              <Typography>
                You are paying ${prettyAmount(subscription.amount, subscription.timePeriod)}{prettyDate(subscription.date, subscription.timePeriod)} since {prettyDate(subscription.date, 'full')}.
              </Typography>
              <br />
              <Typography>
                Next payment will be due {prettyDueDate(subscription.date, subscription.timePeriod, true)}.
              </Typography>
              {
                subscription.notes ?
                <Typography>
                  <br />
                  Notes: {subscription.notes}
                </Typography>
                :
                <></>
              }
            </Grid>
          </AccordionDetails>
          <AccordionActions>
            <Tooltip title="Permanently Delete Subscription">
              <IconButton onClick={() => {deleteSubscription(subscription.key)}}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </AccordionActions>
        </Accordion>
        )
        :
        searchTerm === '' ?
        <Typography className={classes.noDataMessage} variant="h4">
          <br />
          Welcome to Subscribii, {`${userName}!`}<br /><br />
          Get started by adding a subscription.
        </Typography> 
        :
        <Typography className={classes.noDataMessage} variant="h4">
          <br />
          No search results found, {`${userName}!`}
        </Typography> 
      }
    </Container>
  );
}

export default SubscriptionList;