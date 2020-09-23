import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '50px',
  },
  formItem: {
    marginTop: '30px',
  },
}));

const SubscriptionAddModal = ({addSubscription, visible, onClose}) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [timePeriod, setTimePeriod] = useState('month');
  const handleAddSubscription = () => {
    addSubscription(name, amount, timePeriod);
    onClose();
  }
  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle>Add Subscription</DialogTitle>
        <DialogContent className={classes.form}>
        <InputLabel className={classes.formItem} htmlFor="name">Name</InputLabel>
        <OutlinedInput
            autoFocus
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <InputLabel className={classes.formItem} htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
            id="amount"
            label="Amount"
            fullWidth
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <InputLabel className={classes.formItem} htmlFor="timePeriod">Cycle</InputLabel>
        <Select
          fullWidth
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
            <MenuItem value={'month'}>Per Month</MenuItem>
            <MenuItem value={'week'}>Per Week</MenuItem>
            <MenuItem value={'year'}>Per Year</MenuItem>
        </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSubscription} color="primary">
            Add Subscription
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default SubscriptionAddModal;