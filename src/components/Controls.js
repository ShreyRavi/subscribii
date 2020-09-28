import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Select, MenuItem, InputBase, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  dateSelect: {
    fontSize: '12px',
    width: '15vw',
    marginRight: '10px',
  },
  timeSelect: {
    fontSize: '12px',
    width: '15vw',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    maxWidth: '42vw',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      width: '42vw',
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
    width: '42vw',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Controls = ({ darkMode, sortWith, setSortWith, controlTimePeriod, setControlTimePeriod, searchTerm, setSearchTerm }) => {
  const classes = useStyles();
  return (
    <Container>
        <Paper classes={classes.root}>
            <Grid justify="center" direction="row" container>
                <Select
                    className={classes.dateSelect}
                    style={darkMode ? { color: 'white' } : {}}
                    value={sortWith}
                    onChange={(e) => setSortWith(e.target.value)}
                >
                    <MenuItem value={'byDate'}>Sort By Due Date</MenuItem>
                    <MenuItem value={'byAmountDescending'}>Sort By Amount (Descending)</MenuItem>
                    <MenuItem value={'byAmountAscending'}>Sort By Amount (Ascending)</MenuItem>
                    <MenuItem value={'byCycle'}>Sort By Cycle</MenuItem>
                    <MenuItem value={'byAlpha'}>Sort By Alphabetical</MenuItem>
                </Select>
                <Select
                    className={classes.timeSelect}
                    style={darkMode ? { color: 'white' } : {}}
                    value={controlTimePeriod}
                    onChange={(e) => setControlTimePeriod(e.target.value)}
                >
                    <MenuItem value={'default'}>Per Time Period</MenuItem>
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