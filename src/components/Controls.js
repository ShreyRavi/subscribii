import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Select, MenuItem, InputBase, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  dateSelect: {
    minWidth: '200px',
    maxWidth: '200px',
    marginRight: '10px',
    marginLeft: '5px',
  },
  timeSelect: {
    minWidth: '200px',
    maxWidth: '200px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    maxWidth: '300px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      width: '300px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '200px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Controls = ({ darkMode, sortWith, setSortWith, timePeriod, setTimePeriod, searchTerm, setSearchTerm }) => {
  const classes = useStyles();
  return (
    <Container>
        <Paper classes={classes.root}>
            <Grid direction="row" container>
                <Select
                    className={classes.dateSelect}
                    style={darkMode ? { color: 'white' } : {}}
                    value={sortWith}
                    onChange={(e) => setSortWith(e.target.value)}
                >
                    <MenuItem value={'byDate'}>Sort By Date</MenuItem>
                    <MenuItem value={'byAmountDescending'}>Sort By Amount (Descending)</MenuItem>
                    <MenuItem value={'byAmountAscending'}>Sort By Amount (Ascending)</MenuItem>
                    <MenuItem value={'byCycle'}>Sort By Cycle</MenuItem>
                    <MenuItem value={'byAlpha'}>Sort By Alphabetical</MenuItem>
                </Select>
                <Select
                    className={classes.timeSelect}
                    style={darkMode ? { color: 'white' } : {}}
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                >
                    <MenuItem value={'month'}>Per Month</MenuItem>
                    <MenuItem value={'week'}>Per Week</MenuItem>
                    <MenuItem value={'year'}>Per Year</MenuItem>
                    <MenuItem value={'day'}>Per Day</MenuItem>
                </Select>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
             </Grid>
        </Paper>
    </Container>
  );
}

export default Controls;