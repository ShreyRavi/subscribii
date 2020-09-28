import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { Grid, AppBar, Toolbar, Typography, Select, IconButton, MenuItem, Tooltip } from '@material-ui/core';
import { getAverageExpensesString } from '../util/util';

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
    introFooter: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    links: {
        textDecoration: 'none',
        color: 'white',
    }
}));

const Footer = ({ data, darkMode, toggleDarkMode, timePeriod, setTimePeriod, visible }) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={visible ? null : classes.introFooter}>
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
                        <Typography variant="h4" className={classes.resultLabel}>
                            ${getAverageExpensesString(data, timePeriod)}
                        </Typography>
                    </>
                :
                <Typography variant="caption">Copyright &copy; Shreyas Tallamraju 2020. All Rights Reserved.<br /><a className={classes.links} href={'https://github.com/ShreyRavi/subscribii'}>Github</a> | <a className={classes.links} href={'mailto:shreyastallamraju@gmail.com'}>Contact</a> | <a className={classes.links} href={'https://github.com/ShreyRavi/subscribii/blob/master/PrivacyPolicy.md'}>Legal</a></Typography>
            }
            
        </Toolbar>
        </AppBar>
    );
}

export default Footer;