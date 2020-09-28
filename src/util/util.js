// source: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
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
const isDecember = (m) => parseInt(m) === 12 ? 1 : 0;
const isToday = (a) => a.getFullYear() === new Date().getFullYear() && a.getMonth() === new Date().getMonth() && a.getDate() === new Date().getDate();
const isTomorrow = (a) => Math.round((a - new Date())/(1000*60*60*24)) === 1;
export const getCompareFunction = (typeOfSort) => {
    if (typeOfSort === 'byDate') {
      return (a, b) => {
        const aDueDate = getDueDate(a.date, a.timePeriod);
        const bDueDate = getDueDate(b.date, b.timePeriod);
        return Math.abs(Date.now() - aDueDate) - Math.abs(Date.now() - bDueDate);
      };
    } else if (typeOfSort === 'byAmountDescending') {
      return (a, b) => {
        if (parseFloat(a.amount) > parseFloat(b.amount)) {
          return -1;
        } else if (parseFloat(a.amount) < parseFloat(b.amount))  {
          return 1;
        } 
        return 0;
      };
    } else if (typeOfSort === 'byAmountAscending') {
      return (a, b) => {
        if (parseFloat(a.amount) < parseFloat(b.amount)) {
          return -1;
        } else if (parseFloat(a.amount) > parseFloat(b.amount))  {
          return 1;
        } 
        return 0;
      };
    } else if (typeOfSort === 'byCycle') {
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
    } else if (typeOfSort === 'byAlpha') {
      return (a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } 
        return 0;
      };
    }
    return null;
};

export const getAverageExpensesString = (data, timePeriod) => {
    let averageExpensesString = '0.00';
    const sumYearlyExpenses = data.reduce((sum, subscription) => sum + parseFloat(subscription.amount), 0);
    if (timePeriod === 'year') {
        averageExpensesString = (sumYearlyExpenses).toFixed(2).toString();
    } else if (timePeriod === 'month') {
        averageExpensesString = (Math.round((sumYearlyExpenses * 100) / 12) / 100).toFixed(2).toString();
    } else if (timePeriod === 'week') {
        averageExpensesString = (Math.round((sumYearlyExpenses * 100) / 52) / 100).toFixed(2).toString();
    } else if (timePeriod === 'day') {
        averageExpensesString = (Math.round((sumYearlyExpenses * 100) / 365) / 100).toFixed(2).toString();
    } else {
        alert("Error: Incorrect Time Period!");
    }
    return averageExpensesString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const prettyAmount = (amt, tp, m='') => {
    const msg = m ? m + tp : '';
    if (tp === 'year') {
      return (parseFloat(amt)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + msg;
    } else if (tp === 'month') {
      return (Math.round((parseFloat(amt) * 100) / 12) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + msg;
    } else if (tp === 'week') {
      return (Math.round((parseFloat(amt) * 100) / 52) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + msg;
    } else if (tp === 'day') {
      return (Math.round((parseFloat(amt) * 100) / 365) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + msg;
    }
    alert("Error: Incorrect Time Period");
    return "0.00"
};

export const getDueDate = (date, tp) => {
    const today = new Date();
    if (!date) {
      return '';
    }
    const origPaymentDate = new Date(parseInt(date['year']), parseInt(date['month']) - 1, parseInt(date['day']));
    if (tp === 'year') {
      if (today.getMonth() > origPaymentDate.getMonth()) {
        return new Date(parseInt(today.getFullYear() + 1), parseInt(date['month']) - 1, parseInt(date['day']));
      } else if (today.getMonth() === origPaymentDate.getMonth()) {
        if (today.getDate() > origPaymentDate.getDate()) {
            return new Date(parseInt(today.getFullYear() + 1), parseInt(date['month']) - 1, parseInt(date['day']));
        } else {
            return new Date(parseInt(today.getFullYear()), parseInt(date['month']) - 1, parseInt(date['day']));
        }
      } else {
        return new Date(parseInt(today.getFullYear()), parseInt(date['month']) - 1, parseInt(date['day']));
      }
    } else if (tp === 'month') {
      if (today.getDate() > origPaymentDate.getDate()) {
        return new Date(parseInt(today.getFullYear() + isDecember(date['month'])), parseInt(date['month']), parseInt(date['day']));
      } else {
        return new Date(parseInt(today.getFullYear()), parseInt(date['month']) - 1, parseInt(date['day']));
      }
    } else if (tp === 'week') {
      const dueDay = new Date(parseInt(date['year']), parseInt(date['month']) - 1, parseInt(date['day'])).getDay();
      if (today.getDay() > dueDay) {
        today.setDate(today.getDate() + (7 - (today.getDay() - dueDay)));
        return today;
      } else {
        today.setDate(today.getDate() + (dueDay - today.getDay()));
        return today;
      }
    } else if (tp === 'day') {
      today.setDate(today.getDate() + 1);
      return today;
    }
    return today;
};

export const prettyDueDate = (date, tp, verbose=false) => {
    if (!date) {
      return '';
    }
   const dueDate = getDueDate(date, tp);
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
   if (tp === 'year') {
    return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (tp === 'month') {
     if (!verbose) {
      return `${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
     }
     return `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (tp === 'week') {
    const daysMap = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    if (!verbose) {
      return `${daysMap[dueDate.getDay()]}`;
    }
    return `${daysMap[dueDate.getDay()]}, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   } else if (tp === 'day') {
    if (!verbose) {
      return 'tomorrow';
    }
    return `tomorrow, ${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
   }
   return '';
};

export const prettyDate = (date, tp) => {
    if (!date) {
      return '';
    }
    if (tp === 'year') {
      return ` annually on ${date['month']}/${date['day']}`;
    } else if (tp === 'month') {
      return ` on the ${ordinal_suffix_of(parseInt(date['day']))} of every month`;
    } else if (tp === 'week') {
      const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return ` every ${daysMap[new Date(parseInt(date['year']), parseInt(date['month']) - 1, parseInt(date['day'])).getDay()]}`;
    } else if (tp === 'day') {
      return ' every day';
    } else if (tp === 'full') {
      return `${date['month']}/${date['day']}/${date['year']}`
    }
    return '';
};