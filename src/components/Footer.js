import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { Grid, AppBar, Toolbar, Typography, Select, IconButton, MenuItem, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    darkModeButton: {
        marginRight: theme.spacing(2),
    },
    avgExpensesLabel: {
        flexGrow: 1,
    },
    resultLabel: {
        marginLeft: 'auto',
        marginRight: 0,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
}));

const Footer = ({data, darkMode, toggleDarkMode, timePeriod, setTimePeriod, visible}) => {
    const AverageExpenses = () => {
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
        return (
        <Typography variant="h4" className={classes.resultLabel}>
            ${averageExpensesString}
        </Typography>
        );
    };
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            {
                visible ? 
                    <>
                        <Tooltip title={darkMode ? "Enable Light Mode" : "Enable Dark Mode"}>
                            <IconButton onClick={toggleDarkMode} edge="start" className={classes.darkModeButton} color="inherit" aria-label="menu">
                                { darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                        <Grid direction="column" container>
                            <Typography variant="h6" className={classes.avgExpensesLabel}>
                            Average Expenses
                            </Typography>
                            <Select
                            style={{ color: 'white' }}
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}>
                                <MenuItem value={'month'}>Per Month</MenuItem>
                                <MenuItem value={'week'}>Per Week</MenuItem>
                                <MenuItem value={'year'}>Per Year</MenuItem>
                                <MenuItem value={'day'}>Per Day</MenuItem>
                            </Select>
                        </Grid>
                        <AverageExpenses />
                    </>
                :
                <Typography variant="caption">Copyright &copy; Shreyas Tallamraju 2020. All Rights Reserved.</Typography>
            }
            
        </Toolbar>
        </AppBar>
    );
}

export default Footer;