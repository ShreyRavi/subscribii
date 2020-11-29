import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography, IconButton, Tooltip, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAdjustedAmount, getPrettyDateString, getPrettyDueDateString } from '../util/util';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
  },
  noDataMessage: {
    textAlign: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: '15vw',
    display: 'block',
    overflowWrap: 'anywhere',
    flexShrink: 0,
    marginRight: '5px',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    flexBasis: '20vw',
    overflow: 'auto',
    overflowWrap: 'anywhere',
    display: 'block',
    marginRight: '5px',
    flexShrink: 0,
  },
  tertiaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary,
    display: 'block',
    flexBasis: '15vw',
    overflow: 'auto',
    overflowWrap: 'anywhere',
    marginRight: '5px',
    flexShrink: 0,
  },
}));

const SubscriptionList = ({ user, data, editSubscription, deleteSubscription, controlTimePeriod, searchTerm }) => {
  // useState
  const [openAccordion, setOpenAccordion] = useState(null);
  const handleAccordionChange = (key) => {
    if (openAccordion === key) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(key);
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
          <Accordion key={`accordion_${subscription.key}`} expanded={openAccordion === subscription.key} onChange={() => handleAccordionChange(subscription.key)}>
          <AccordionSummary
            expandIcon={<Tooltip title="See More"><ExpandMoreIcon /></Tooltip>}
          >
            <Typography className={classes.heading}>
              {subscription.name}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {
                controlTimePeriod === 'default' ?
                `$${getAdjustedAmount(subscription.amount, subscription.timePeriod, true, ' / ')}`
                :
                `$${getAdjustedAmount(subscription.amount, controlTimePeriod, true, ' / ')}`
              }
            </Typography>
            <Typography className={classes.tertiaryHeading}>
              {
                `due ${getPrettyDueDateString(subscription.date, subscription.timePeriod)}`
              }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid direction="column" container>
              <Typography>
                You are paying ${getAdjustedAmount(subscription.amount, subscription.timePeriod)}{getPrettyDateString(subscription.date, subscription.timePeriod)} since {getPrettyDateString(subscription.date, 'full')}.
              </Typography>
              <br />
              <Typography>
                Next payment will be due {getPrettyDueDateString(subscription.date, subscription.timePeriod, true)}.
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
          <Tooltip title="Edit Subscription">
              <IconButton onClick={() => {editSubscription(subscription.key)}}>
                <EditIcon />
              </IconButton>
            </Tooltip>
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