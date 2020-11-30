//Subscribii Internal Utilities

//DayJS Imports
import dayjs from "dayjs";

const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

//Internal util.js Methods

/**
 * ordinal_suffix_of - returns the ordinal suffix of an integer i
 * @param {Number} i - integer to return ordinal suffix of
 * @returns {String} - the ordinal suffix in string form
 * source: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 */
const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
};

const isToday = (a) => a.getFullYear() === new Date().getFullYear() && a.getMonth() === new Date().getMonth() && a.getDate() === new Date().getDate();
const isTomorrow = (a) => Math.round((a - new Date())/(1000*60*60*24)) === 1;
const isWithinWeek = (a) => Math.round((a - new Date())/(1000*60*60*24)) <= 6;

//External util.js Methods

/**
 * getCompareFunction - a method that returns a comparison function for sort()
 * @param {String} typeOfSort - a string that denotes which comparison to return
 * @returns {Function} - a lambda function that can be used for sorting
 */
export const getCompareFunction = (typeOfSort) => {
    //Date Sorting
    if (typeOfSort === 'byDate') {
      return (a, b) => {
        const aDueDate = getDueDate(a.date, a.timePeriod);
        const bDueDate = getDueDate(b.date, b.timePeriod);
        return Math.abs(Date.now() - aDueDate) - Math.abs(Date.now() - bDueDate);
      };
    } 
    //Amount Descending Sorting
    else if (typeOfSort === 'byAmountDescending') {
      return (a, b) => {
        if (parseFloat(a.amount) > parseFloat(b.amount)) {
          return -1;
        } else if (parseFloat(a.amount) < parseFloat(b.amount))  {
          return 1;
        } 
        return 0;
      };
    }
    //Amount Ascending Sorting
    else if (typeOfSort === 'byAmountAscending') {
      return (a, b) => {
        if (parseFloat(a.amount) < parseFloat(b.amount)) {
          return -1;
        } else if (parseFloat(a.amount) > parseFloat(b.amount))  {
          return 1;
        } 
        return 0;
      };
    }
    //Cycle Sorting
    else if (typeOfSort === 'byCycle') {
      const mapTimePeriodToPriority = {
        'day': 0,
        'week': 1,
        'month': 2,
        'year': 3,
      };
      return (a, b) => {
        if (mapTimePeriodToPriority[a.timePeriod] < mapTimePeriodToPriority[b.timePeriod]) {
          return -1;
        } else if (mapTimePeriodToPriority[a.timePeriod] > mapTimePeriodToPriority[b.timePeriod]) {
          return 1;
        } 
        return 0;
      };
    } 
    //Alphabetical Sorting
    else if (typeOfSort === 'byAlpha') {
      return (a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } 
        return 0;
      };
    }
    //Failure Case
    return null;
};

/**
 * getAverageExpensesString - a method that returns a string of average expenses based on the subscription data and time period to average on
 * @param {Array.Object} data - an array of subscription objects
 * @param {String} timePeriod - a string to denote time period to average 
 * @returns {String} - returns a string that is a prettified amount of the sum 
 * of all subscriptions amounts
 */
export const getAverageExpensesString = (data, timePeriod) => {
    const sumYearlyExpenses = data.reduce((sum, subscription) => sum + parseFloat(subscription.amount), 0);
    return getAdjustedAmount(sumYearlyExpenses, timePeriod);
};

/**
 * getAdjustedAmount - a method that returns a string adjust with the time period
 * @param {Number} amount - amount to adjust
 * @param {String} timePeriod - time period to adjust to
 * @param {Boolean} adjust - whether to divide (true) or multiply by time factor
 * @param {String} message - optional message to add to the end of a pretty amount
 * @returns {String} - prettified amount adjusted
 */
export const getAdjustedAmount = (amount, timePeriod, adjust=true, message='') => {
    const msg = message ? message + timePeriod : '';
    const timePeriodDivisorMap = {
      'year': 1,
      'month': 12,
      'week': 52,
      'day': 364.25,
    };
    if (!(timePeriod in timePeriodDivisorMap)) {
      alert("Error: Incorrect Time Period!");
      return '0.00';
    }
    if (adjust) {
      return (Math.round((parseFloat(amount) * 100) / timePeriodDivisorMap[timePeriod]) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + msg;
    }
    //else, unadjust
    return (Math.round((parseFloat(amount) * 100) * timePeriodDivisorMap[timePeriod]) / 100).toFixed(2).toString() + msg;
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
    const origPaymentDate = new Date(parseInt(date['year']), parseInt(date['month']) - 1, parseInt(date['day']));
    if (origPaymentDate > today) {
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

export const getPrettyDueDateString = (date, timePeriod, verbose=false, adjustTimePeriod=null) => {
    if (!date) {
      return null;
    }
    let dueDate = new Date(getDueDate(date, timePeriod));
    if (adjustTimePeriod !== null) {
      timePeriod = adjustTimePeriod;
    }
   if (isToday(dueDate)) {
     if (!verbose) {
      return 'today';
     } 
     return `today, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   }
   if (isTomorrow(dueDate)) {
    if (!verbose) {
     return 'tomorrow';
    } 
    return `tomorrow, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  }
  if (isWithinWeek(dueDate) && timePeriod !== 'week') {
    return getPrettyDueDateString(date, timePeriod, verbose, 'week');
  }
   if (timePeriod === 'year') {
    return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (timePeriod === 'month') {
     if (!verbose) {
      return `${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
     }
     return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (timePeriod === 'week') {
    if (!verbose) {
      return `${daysMap[dueDate.getDay()]}`;
    }
    return `${daysMap[dueDate.getDay()]}, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (timePeriod === 'day') {
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
      return ` annually on ${date['month']}/${date['day']}`;
    } else if (timePeriod === 'month') {
      return ` on the ${ordinal_suffix_of(parseInt(date['day']))} of every month`;
    } else if (timePeriod === 'week') {
      return ` every ${daysMap[new Date(parseInt(date['year']), parseInt(date['month']) - 1, parseInt(date['day'])).getDay()]}`;
    } else if (timePeriod === 'day') {
      return ' every day';
    } else if (timePeriod === 'full') {
      return `${date['month']}/${date['day']}/${date['year']}`
    }
    return '';
};