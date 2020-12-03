/* eslint react/jsx-filename-extension: 0 */
/* eslint arrow-body-style: 0 */
/* eslint no-alert: 0 */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Container, Fab, Typography, Tooltip, responsiveFontSizes,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, indigo, blueGrey } from '@material-ui/core/colors';
import Header from './components/Header';
import SubscriptionList from './components/SubscriptionList';
import Footer from './components/Footer';
import SubscriptionEditAddModal from './components/SubscriptionEditAddModal';
import SettingsDrawer from './components/SettingsDrawer';
import Controls from './components/Controls';
import { getCompareFunction, getAdjustedAmount } from './util/util';
import ScreenshotImg from './screenshot.png';

const firebaseConfig = {
  apiKey: 'AIzaSyCGqQXoH3bKZJlPZjkgy6ejcWDcvHRVDjU',
  authDomain: 'subscribii.firebaseapp.com',
  databaseURL: 'https://subscribii.firebaseio.com',
  projectId: 'subscribii',
  storageBucket: 'subscribii.appspot.com',
  messagingSenderId: '494404712228',
  appId: '1:494404712228:web:75abefacd21f836f1ca5b1',
  measurementId: 'G-EWKWBM572Y',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const firebaseAuth = firebase.auth();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const useStyles = makeStyles(() => ({
  rootDarkMode: {
    backgroundColor: '#212121',
    color: 'white',
    height: (props) => props.height,

  },
  root: {
    height: (props) => props.height,
  },
  fabButton: {
    position: 'fixed',
    zIndex: 9999999999,
    bottom: 80,
    right: 20,
    margin: '0 auto',
  },
  subscriptionList: {
    position: 'relative',
    top: 100,
  },
  screenshot: {
    alignSelf: 'center',
    width: '70vw',
    margin: '0px',
    padding: '0px',
  },
  introPage: {
    textAlign: 'center',
  },
}));

const SubscribiiApp = () => {
  // useState
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [timePeriod, setTimePeriod] = useState('month');
  const [controlTimePeriod, setControlTimePeriod] = useState('default');
  const [sortWith, setSortWith] = useState('byDate');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [data, setData] = useState([]);
  const [editSubscriptionKey, setEditSubscriptionKey] = useState(null);

  // useEffect
  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()) {
        const s = snap.val();
        const newData = Object.keys(s).map((key) => {
          return { ...s[key], ...{ key } };
        });
        setData(newData);
      }
    };
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').on('value', handleData, (error) => alert(error));
    return () => { db.ref('users/').child(uid).child('subs/').off('value', handleData); };
  }, [user]);
  useEffect(() => {
    const handleDarkMode = (snap) => {
      if (snap.val()) {
        setDarkMode(snap.val());
      }
    };
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('darkMode').on('value', handleDarkMode, (error) => alert(error));
    return () => { db.ref('users/').child(uid).child('darkMode').off('value', handleDarkMode); };
  }, [user, darkMode]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  // class functions
  const toggleDarkMode = () => {
    const uid = user ? user.uid : 'guest';
    setDarkMode(!darkMode);
    db.ref('users/').child(uid).child('darkMode').set(!darkMode);
  };
  const addSubscription = (name, amount, newTimePeriod, date, notes) => {
    if (!user) {
      alert("Error: You're not logged in!");
      return;
    }
    if (!name || !amount || !newTimePeriod || !date) {
      alert("Error: You haven't filled out all required inputs!");
      return;
    }
    const proratedAmount = getAdjustedAmount(amount, newTimePeriod, false);
    if (proratedAmount === null) {
      alert('Error: Incorrect Time Period Entered!');
      return;
    }
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').push({
      name,
      amount: proratedAmount,
      newTimePeriod,
      date: {
        day: date.date(),
        month: (date.month() + 1),
        year: date.year(),
      },
      notes,
    });
  };
  const deleteSubscription = (key, confirm = true) => {
    if (confirm && !window.confirm('Are you sure you want to delete this subscription?')) {
      return;
    }
    const uid = user ? user.uid : 'guest';
    if (data.length === 1) {
      setData([]);
    }
    db.ref('users/').child(uid).child('subs/').child(key)
      .set(null);
  };
  const editSubscription = (key) => {
    if (key) {
      setEditSubscriptionKey(key);
      setShowSubscriptionModal(!showSubscriptionModal);
      setEditSubscriptionKey(key);
    }
  };
  const editSubscriptionFromDB = (key, name, amount, newTimePeriod, date, notes) => {
    if (!user) {
      alert("Error: You're not logged in!");
      return;
    }
    if (!name || !amount || !newTimePeriod || !date) {
      alert("Error: You haven't filled out all required inputs!");
      return;
    }
    const proratedAmount = getAdjustedAmount(amount, newTimePeriod, false);
    if (proratedAmount === null) {
      alert('Error: Incorrect Time Period Entered!');
      return;
    }
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').child(key)
      .set({
        name,
        amount: proratedAmount,
        timePeriod: newTimePeriod,
        date: {
          day: new Date(date).getDate(),
          month: new Date(date).getMonth() + 1,
          year: new Date(date).getFullYear(),
        },
        notes,
      });
    setEditSubscriptionKey(null);
  };
  const handleLogout = () => {
    setData([]);
    setDarkMode(false);
    firebase.auth().signOut();
  };
  const getFilteredData = () => {
    const tempData = [...data].sort(getCompareFunction(sortWith));
    if (searchTerm) {
      return tempData.filter((datum) => (
        datum.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        || (datum.notes.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
    }
    return tempData;
  };

  // styling
  const classes = useStyles({
    height: `${(100 + ((data.length) * 15)).toString()}}vh`,
  });
  const palletType = darkMode ? 'dark' : 'light';
  const mainPrimaryColor = darkMode ? blueGrey[900] : indigo[500];
  const backgroundColor = darkMode ? '#212121' : null;
  const mainSecondaryColor = darkMode ? red[800] : red[500];
  let customTheme = createMuiTheme({
    palette: {
      type: palletType,
      background: {
        default: backgroundColor,
      },
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  customTheme = responsiveFontSizes(customTheme, ['xs', 'sm', 'md', 'lg', 'xl'], 8);

  // render
  return (
    <div className={darkMode ? classes.rootDarkMode : classes.root}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            showSettingsDrawer={showSettingsDrawer}
            setShowSettingsDrawer={(m) => setShowSettingsDrawer(m)}
            user={user}
            uiConfig={uiConfig}
            firebaseAuth={firebaseAuth}
            logout={handleLogout}
          />
          <Container
            maxWidth="lg"
            className={classes.subscriptionList}
          >
            {
              user !== null ? (
                <>
                  <Controls
                    sortWith={sortWith}
                    darkMode={darkMode}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    controlTimePeriod={controlTimePeriod}
                    setSortWith={setSortWith}
                    setControlTimePeriod={setControlTimePeriod}
                  />
                  <SubscriptionList
                    user={user}
                    searchTerm={searchTerm}
                    data={getFilteredData()}
                    editSubscription={editSubscription}
                    deleteSubscription={(idx) => deleteSubscription(idx)}
                    controlTimePeriod={controlTimePeriod}
                  />
                </>
              )
                : (
                  <Container className={classes.introPage}>
                    <Typography variant="h3">
                      Subscribii
                      <br />
                    </Typography>
                    <Typography variant="h5">
                      Subscriptions Under Control
                      <br />
                    </Typography>
                    <Typography variant="body1">
                      <br />
                      <b>Subscribii</b>
                      is a tool to keep track of all of your subscriptions.
                      <br />
                      <br />
                      <img className={classes.screenshot} alt="subscribii screenshot" src={ScreenshotImg} />
                      <br />
                      <br />
                      Get started now by signing in with Google and adding your subscriptions!
                      <br />
                    </Typography>
                  </Container>
                )
            }
          </Container>
          {
            user === null || showSubscriptionModal ? <></>
              : (
                <Tooltip title="Add a Subscription">
                  <Fab
                    onClick={() => setShowSubscriptionModal(true)}
                    color="secondary"
                    aria-label="add"
                    className={classes.fabButton}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              )
          }
          <SettingsDrawer
            visible={showSettingsDrawer}
            onClose={() => setShowSettingsDrawer(false)}
            darkMode={darkMode}
          />
          <SubscriptionEditAddModal
            addSubscription={addSubscription}
            editSubscription={editSubscriptionFromDB}
            subscriptionKey={editSubscriptionKey}
            data={data}
            visible={showSubscriptionModal}
            darkMode={darkMode}
            onClose={() => {
              setEditSubscriptionKey(null);
              setShowSubscriptionModal(false);
            }}
          />
          <Footer
            visible={user !== null}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            data={data}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SubscribiiApp;
