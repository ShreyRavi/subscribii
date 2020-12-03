/* eslint no-alert: 0 */
/* eslint no-param-reassign: 0 */
// Subscribii Internal Utilities

// DayJS Imports
import dayjs from 'dayjs';

const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Internal util.js Methods

/**
 * ordinalSuffixOf - returns the ordinal suffix of an integer i
 * @param {Number} i - integer to return ordinal suffix of
 * @returns {String} - the ordinal suffix in string form
 * source: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 */
const ordinalSuffixOf = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const isToday = (a) => a.getFullYear() === new Date().getFullYear()
  && a.getMonth() === new Date().getMonth() && a.getDate() === new Date().getDate();
const isWithinDays = (a, days, exact = true) => {
  const today = new Date();
  const later = new Date(today);
  later.setDate(today.getDate() + days);
  if (!exact) {
    if (a.getFullYear() === later.getFullYear()
    && a.getMonth() === later.getMonth()
    && a.getDate() <= later.getDate()) {
      return true;
    }
    return false;
  }
  if (a.getFullYear() === later.getFullYear()
      && a.getMonth() === later.getMonth()
      && a.getDate() === later.getDate()) {
    return true;
  }
  return false;
};

// External util.js Methods

/**
 * getAdjustedAmount - a method that returns a string adjust with the time period
 * @param {Number} amount - amount to adjust
 * @param {String} timePeriod - time period to adjust to
 * @param {Boolean} adjust - whether to divide (true) or multiply by time factor
 * @param {String} message - optional message to add to the end of a pretty amount
 * @returns {String} - prettified amount adjusted
 */
export const getAdjustedAmount = (amount, timePeriod, adjust = true, message = '') => {
  const msg = message ? message + timePeriod : '';
  const timePeriodDivisorMap = {
    year: 1,
    month: 12,
    week: 52,
    day: 364.25,
  };
  if (!(timePeriod in timePeriodDivisorMap)) {
    alert('Error: Incorrect Time Period!');
    return '0.00';
  }
  if (adjust) {
    return (Math.round((parseFloat(amount) * 100) / timePeriodDivisorMap[timePeriod]) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + msg;
  }
  // else, unadjust
  return (Math.round((parseFloat(amount) * 100)
  * timePeriodDivisorMap[timePeriod]) / 100).toFixed(2).toString() + msg;
};

/**
 * getAverageExpensesString - a method that returns a string of average
 * expenses based on the subscription data and time period to average on
 * @param {Array.Object} data - an array of subscription objects
 * @param {String} timePeriod - a string to denote time period to average
 * @returns {String} - returns a string that is a prettified amount of the sum
 * of all subscriptions amounts
 */
export const getAverageExpensesString = (data, timePeriod) => {
  const sumYearlyExpenses = data.reduce((sum, subscription) => sum
  + parseFloat(subscription.amount), 0);
  return getAdjustedAmount(sumYearlyExpenses, timePeriod);
};

/**
 * getDueDate - a method that returns the next date iterated by a given time period
 * @param {Object} date - the date to change in an Object format ({date, month, year})
 * @param {String} timePeriod - a string (year, month, week, day) to iterate on
 * @returns {Date} - the next due date
 */
export const getDueDate = (date, timePeriod) => {
  const today = new Date();
  if (!date) {
    return null;
  }
  const origPaymentDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));
  if (origPaymentDate >= today) {
    return origPaymentDate;
  }
  let result = dayjs(origPaymentDate).add(1, timePeriod);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  while (yesterday > result) {
    result = dayjs(result).add(1, timePeriod);
  }
  return result;
};

export const getPrettyDueDateString = (
  date, timePeriod, verbose = false, adjustTimePeriod = null,
) => {
  if (!date) {
    return null;
  }
  const dueDate = new Date(getDueDate(date, timePeriod));
  if (adjustTimePeriod !== null) {
    timePeriod = adjustTimePeriod;
  }
  if (isToday(dueDate)) {
    if (!verbose) {
      return 'today';
    }
    return `today, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  }
  if (isWithinDays(dueDate, 1)) {
    if (!verbose) {
      return 'tomorrow';
    }
    return `tomorrow, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  }
  if (isWithinDays(dueDate, 6 - new Date().getDay(), false) && timePeriod !== 'week') {
    return getPrettyDueDateString(date, timePeriod, verbose, 'week');
  }
  if (timePeriod === 'year') {
    return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  } if (timePeriod === 'month' || (timePeriod === 'week' && !isWithinDays(dueDate, 6 - new Date().getDay(), false))) {
    if (!verbose) {
      return `${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
    }
    return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  } if (timePeriod === 'week') {
    if (!verbose) {
      return `${daysMap[dueDate.getDay()]}`;
    }
    return `${daysMap[dueDate.getDay()]}, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  } if (timePeriod === 'day') {
    if (!verbose) {
      return 'tomorrow';
    }
    return `tomorrow, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  }
  return null;
};

export const getPrettyDateString = (date, timePeriod) => {
  if (!date) {
    return '';
  }
  if (timePeriod === 'year') {
    return ` annually on ${date.month}/${date.day}`;
  } if (timePeriod === 'month') {
    return ` on the ${ordinalSuffixOf(Number(date.day))} of every month`;
  } if (timePeriod === 'week') {
    return ` every ${daysMap[new Date(Number(date.year), Number(date.month) - 1, Number(date.day)).getDay()]}`;
  } if (timePeriod === 'day') {
    return ' every day';
  } if (timePeriod === 'full') {
    return `${date.month}/${date.day}/${date.year}`;
  }
  return '';
};

/**
 * getCompareFunction - a method that returns a comparison function for sort()
 * @param {String} typeOfSort - a string that denotes which comparison to return
 * @returns {Function} - a lambda function that can be used for sorting
 */
export const getCompareFunction = (typeOfSort) => {
  // Date Sorting
  if (typeOfSort === 'byDate') {
    return (a, b) => {
      const aDueDate = getDueDate(a.date, a.timePeriod);
      const bDueDate = getDueDate(b.date, b.timePeriod);
      if (aDueDate < bDueDate) {
        return -1;
      } if (bDueDate < aDueDate) {
        return 1;
      }
      return 0;
    };
  }
  // Amount Descending Sorting
  if (typeOfSort === 'byAmountDescending') {
    return (a, b) => {
      if (parseFloat(a.amount) > parseFloat(b.amount)) {
        return -1;
      } if (parseFloat(a.amount) < parseFloat(b.amount)) {
        return 1;
      }
      return 0;
    };
  }
  // Amount Ascending Sorting
  if (typeOfSort === 'byAmountAscending') {
    return (a, b) => {
      if (parseFloat(a.amount) < parseFloat(b.amount)) {
        return -1;
      } if (parseFloat(a.amount) > parseFloat(b.amount)) {
        return 1;
      }
      return 0;
    };
  }
  // Cycle Sorting
  if (typeOfSort === 'byCycle') {
    const mapTimePeriodToPriority = {
      day: 0,
      week: 1,
      month: 2,
      year: 3,
    };
    return (a, b) => {
      if (mapTimePeriodToPriority[a.timePeriod] < mapTimePeriodToPriority[b.timePeriod]) {
        return -1;
      } if (mapTimePeriodToPriority[a.timePeriod] > mapTimePeriodToPriority[b.timePeriod]) {
        return 1;
      }
      return 0;
    };
  }
  // Alphabetical Sorting
  if (typeOfSort === 'byAlpha') {
    return (a, b) => {
      if (a.name < b.name) {
        return -1;
      } if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
  }
  // Failure Case
  return null;
};
