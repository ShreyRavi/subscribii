import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, InputLabel, InputAdornment, OutlinedInput, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '20px',
  },
  formItem: {
    marginTop: '20px',
  },
}));

const SubscriptionAddModal = ({addSubscription, visible, onClose, darkMode}) => {
  // useState
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('month');
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState('');

  // class functions
  const handleAmountChange = (e) => {
    const newAmount = e.target.value.replace(/[^0-9$.]/g, '');
    setAmount(newAmount);
  };
  const handleAddSubscription = () => {
    addSubscription(name, amount, timePeriod, date, notes);
    setName('');
    setAmount('');
    setTimePeriod('month');
    setDate(null);
    setNotes('');
    onClose();
  };

  // styling
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Dialog open={visible} onClose={onClose}>
        <DialogTitle>Add Subscription</DialogTitle>
          <DialogContent className={classes.form}>
          <InputLabel className={classes.formItem} htmlFor="name">Name</InputLabel>
          <OutlinedInput
              required
              autoFocus
              id="name"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <InputLabel className={classes.formItem} htmlFor="amount">Amount</InputLabel>
          <OutlinedInput
              required
              id="amount"
              label="Amount"
              fullWidth
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              value={amount}
              onChange={(e) => handleAmountChange(e)}
          />
          <InputLabel className={classes.formItem} htmlFor="date">Payment Date</InputLabel>
          <DatePicker required autoOk={true} className={classes.datePicker} id="date" value={date} onChange={setDate} />
          <InputLabel className={classes.formItem} htmlFor="timePeriod">Cycle</InputLabel>
          <Select
            fullWidth
            required
            id="timePeriod"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
              <MenuItem value={'month'}>Per Month</MenuItem>
              <MenuItem value={'week'}>Per Week</MenuItem>
              <MenuItem value={'year'}>Per Year</MenuItem>
              <MenuItem value={'day'}>Per Day</MenuItem>
          </Select>
          <InputLabel className={classes.formItem} htmlFor="timePeriod">Notes</InputLabel>
          <TextField
            id="notes"
            multiline
            rows={2}
            placeholder="Insert notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            variant="outlined"
          />
          </DialogContent>
          <DialogActions>
            <Button style={darkMode ? { color: 'white' } : {}} onClick={handleAddSubscription} color="primary">
              Add Subscription
            </Button>
          </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
}

export default SubscriptionAddModal;