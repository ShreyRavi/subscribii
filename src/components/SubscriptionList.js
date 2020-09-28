import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography, IconButton, Tooltip, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const SubscriptionList = ({ user, data, deleteSubscription, timePeriod, searchTerm }) => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const handleAccordionChange = (key) => {
    if (openAccordions.indexOf(key) > -1) {
      setOpenAccordions(openAccordions.filter(a => a !== key));
    } else {
      setOpenAccordions(openAccordions.concat([key]));
    }
  }
  const prettyAmount = (amt) => {
    if (timePeriod === 'year') {
      return (parseFloat(amt)).toFixed(2).toString() + " per year";
    } else if (timePeriod === 'month') {
      return (Math.round((parseFloat(amt) * 100) / 12) / 100).toFixed(2).toString() + " per month";
    } else if (timePeriod === 'week') {
      return (Math.round((parseFloat(amt) * 100) / 52) / 100).toFixed(2).toString() + " per week";
    } else if (timePeriod === 'day') {
      return (Math.round((parseFloat(amt) * 100) / 365) / 100).toFixed(2).toString() + " per day";
    }
    alert("Error: Incorrect Time Period");
    return "0.00"
  };
  const prettyTimePeriod = (str) => {
    if (!str) {
      return '';
    }
    if (str === 'day') {
      return 'Daily';
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1) + 'ly';
  };
  const prettyDate = (date) => {
    if (!date) {
      return '';
    }
    return `${date['month']}/${date['day']}/${date['year']}`;
  };
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
              ${prettyAmount(subscription.amount)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid direction="column" container>
              <Typography>
                Payment Date: {prettyDate(subscription.date)}
              </Typography>
              <Typography>
                Cycle: {prettyTimePeriod(subscription.timePeriod)} 
              </Typography>
              <Typography>
                Notes: {subscription.notes}
              </Typography>
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