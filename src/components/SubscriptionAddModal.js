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

const SubscriptionAddModal = ({addSubscription, visible, onClose, darkMode}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('month');
  const handleNameChange = (e) => {
    //const newName = e.target.value.replace(/[^A-Za-z0-9]/g, '');
    setName(e.target.value);
  };
  const handleAmountChange = (e) => {
    const newAmount = e.target.value.replace(/[^0-9$.]/g, '');
    setAmount(newAmount);
  };
  const handleAddSubscription = () => {
    addSubscription(name, amount, timePeriod);
    setName('');
    setAmount('');
    setTimePeriod('month');
    onClose();
  };
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
            onChange={(e) => handleNameChange(e)}
        />
        <InputLabel className={classes.formItem} htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
            id="amount"
            label="Amount"
            fullWidth
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={amount}
            onChange={(e) => handleAmountChange(e)}
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
            <MenuItem value={'day'}>Per Day</MenuItem>
        </Select>
        </DialogContent>
        <DialogActions>
          <Button style={darkMode ? { color: 'white' } : {}} onClick={handleAddSubscription} color="primary">
            Add Subscription
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default SubscriptionAddModal;