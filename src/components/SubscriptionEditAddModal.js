/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { red, indigo } from '@material-ui/core/colors';
import DayjsUtils from '@date-io/dayjs';
import {
  Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Select,
  MenuItem, InputLabel, InputAdornment, OutlinedInput, TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getAdjustedAmount } from '../util/util';

const useStyles = makeStyles(() => ({
  form: {
    padding: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  formItem: {
    marginTop: '20px',
  },
  fabButton: {
    position: 'relative',
    zIndex: 99,
    top: 20,
    left: 125,
    margin: '0 auto',
  },
}));

const SubscriptionEditAddModal = ({
  editSubscription,
  subscriptionKey,
  data,
  addSubscription,
  visible,
  onClose,
  darkMode,
}) => {
  const searchData = data.filter((subscription) => subscription.key === subscriptionKey);
  const subscriptionToEdit = searchData.length ? searchData[0] : null;
  // useState
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('month');
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // useEffect
  useEffect(() => {
    const updateStates = () => {
      if (subscriptionKey && subscriptionToEdit) {
        setName(subscriptionToEdit.name);
        setAmount(getAdjustedAmount(subscriptionToEdit.amount, subscriptionToEdit.timePeriod));
        setTimePeriod(subscriptionToEdit.timePeriod);
        setDate(new Date(subscriptionToEdit.date.year,
          Number(subscriptionToEdit.date.month) - 1,
          subscriptionToEdit.date.day), 0, 0, 0, 0);
        setNotes(subscriptionToEdit.notes);
      }
    };
    updateStates();
  }, [subscriptionKey, subscriptionToEdit]);

  // class functions
  const handleAmountChange = (e) => {
    const newAmount = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(newAmount);
  };

  const resetFields = () => {
    setName('');
    setAmount('');
    setTimePeriod('month');
    setDate(null);
    setNotes('');
    onClose();
  };

  const handleEditAddSubscription = () => {
    if (!subscriptionKey) {
      addSubscription(name, amount, timePeriod, date, notes);
    } else {
      editSubscription(subscriptionKey, name, amount, timePeriod, date, notes);
    }
    resetFields();
  };

  const normalTheme = createMuiTheme({
    palette: {
      type: 'light',
      background: {
        default: null,
      },
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });

  // styling
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Dialog open={visible} onClose={() => { resetFields(); onClose(); }}>
        <Fab
          size="small"
          onClick={() => onClose()}
          color="primary"
          aria-label="add"
          className={classes.fabButton}
        >
          <CloseIcon />
        </Fab>
        <DialogTitle>
          {subscriptionKey ? 'Edit Subscription' : 'Add Subscription'}
        </DialogTitle>
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
          <ThemeProvider theme={showCalendar ? normalTheme : null}>
            <DatePicker
              required
              autoOk
              className={classes.datePicker}
              id="date"
              value={date}
              onOpen={() => {
                setShowCalendar(true);
              }}
              onClose={() => {
                setShowCalendar(false);
              }}
              onChange={setDate}
            />
          </ThemeProvider>
          <InputLabel className={classes.formItem} htmlFor="timePeriod">Cycle</InputLabel>
          <Select
            fullWidth
            required
            id="timePeriod"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <MenuItem value="month">Per Month</MenuItem>
            <MenuItem value="week">Per Week</MenuItem>
            <MenuItem value="year">Per Year</MenuItem>
            <MenuItem value="day">Per Day</MenuItem>
          </Select>
          <InputLabel className={classes.formItem} htmlFor="timePeriod">Notes</InputLabel>
          <TextField
            id="notes"
            multiline
            rows={2}
            value={notes}
            placeholder="Insert Notes Here..."
            onChange={(e) => setNotes(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button style={darkMode ? { color: 'white' } : {}} onClick={handleEditAddSubscription} color="primary">
            {subscriptionKey ? 'Edit Subscription' : 'Add Subscription'}
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default SubscriptionEditAddModal;
