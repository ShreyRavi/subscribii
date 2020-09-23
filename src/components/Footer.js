import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { Grid, AppBar, Toolbar, Typography, Select, IconButton, MenuItem } from '@material-ui/core';

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

const Footer = ({darkMode, setDarkMode}) => {
    const [timePeriod, setTimePeriod] = useState('month');
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton onClick={toggleDarkMode} edge="start" className={classes.darkModeButton} color="inherit" aria-label="menu">
            { darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
            </IconButton>
            <Grid direction="column">
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
                </Select>
            </Grid>
            <Typography variant="h4" className={classes.resultLabel}>$0.00</Typography>
        </Toolbar>
        </AppBar>
    );
}

export default Footer;