import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Fab, Typography, Tooltip, responsiveFontSizes } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Header from './components/Header';
import SubscriptionList from './components/SubscriptionList';
import Footer from './components/Footer';
import SubscriptionAddModal from './components/SubscriptionAddModal';
import SettingsDrawer from './components/SettingsDrawer';
import { red, indigo, blueGrey } from '@material-ui/core/colors';

const firebaseConfig = {
  apiKey: "AIzaSyCGqQXoH3bKZJlPZjkgy6ejcWDcvHRVDjU",
  authDomain: "subscribii.firebaseapp.com",
  databaseURL: "https://subscribii.firebaseio.com",
  projectId: "subscribii",
  storageBucket: "subscribii.appspot.com",
  messagingSenderId: "494404712228",
  appId: "1:494404712228:web:75abefacd21f836f1ca5b1",
  measurementId: "G-EWKWBM572Y"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const firebaseAuth = firebase.auth();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const useStyles = makeStyles((theme) => ({
  rootDarkMode: {
    backgroundColor: '#212121',
    width: '101vw',
    marginLeft: '-9px',
    height: '100vh',
    color: 'white',
  },
  root: {
    width: '100vw',
    marginLeft: '-10px',
    height: '100vh',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 99,
    bottom: 80,
    right: 20,
    margin: '0 auto',
  },
  subscriptionList: {
    position: 'relative',
    top: 100,
  },
}));

const SubscribiiApp = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [timePeriod, setTimePeriod] = useState('month');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showSubscriptionAddModal, setShowSubscriptionAddModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        const s = snap.val();
        setData(Object.keys(s).map(key => {
          return {...s[key], ...{key: key}};
        }));
      }
    }
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').on('value', handleData, error => alert(error));
    return () => { db.ref('users/').child(uid).child('subs/').off('value', handleData); };
  }, [user]);

  useEffect(() => {
    const handleDarkMode = snap => {
      if (snap.val()) {
        setDarkMode(snap.val());
      }
    }
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('darkMode').on('value', handleDarkMode, error => alert(error));
    return () => { db.ref('users/').child(uid).child('darkMode').off('value', handleDarkMode); };
  }, [user, darkMode]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const toggleDarkMode = () => {
    const uid = user ? user.uid : 'guest';
    setDarkMode(!darkMode);
    db.ref('users/').child(uid).child('darkMode').set(!darkMode);
  }

  const addSubscription = (name, amount, timePeriod, date, notes) => {
    if (!user) {
      alert("Error: You're not logged in!");
      return;
    }
    let proratedAmount = '';
    if (timePeriod === 'year') {
      proratedAmount = amount;
    } else if (timePeriod === 'month') {
      proratedAmount = (parseFloat(amount) * 12).toString();
    } else if (timePeriod === 'week') {
      proratedAmount = (parseFloat(amount) * 52).toString();
    } else if (timePeriod === 'day') {
      proratedAmount = (parseFloat(amount) * 365).toString();
    } else {
      alert("Error: Incorrect Time Period Entered!");
      return;
    }
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').push({ name: name, amount: proratedAmount, timePeriod: timePeriod, date: { day: date.day(), month: date.month(), year: date.year() }, notes: notes});
  };
  const deleteSubscription = (key) => {
    const uid = user ? user.uid : 'guest';
    db.ref('users/').child(uid).child('subs/').child(key).set(null);
  };
  const handleLogout = () => {
    setData([]);
    setDarkMode(false);
    firebase.auth().signOut();
  };
  const classes = useStyles();
  const palletType = darkMode ? "dark" : "light";
  const mainPrimaryColor = darkMode ? blueGrey[900] : indigo[500];
  const mainSecondaryColor = darkMode ? red[800] : red[500];
  let customTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  customTheme = responsiveFontSizes(customTheme, ['xs', 'sm', 'md', 'lg', 'xl'], 8);
  return (
    <div className={darkMode ? classes.rootDarkMode : classes.root}>
      <ThemeProvider theme={customTheme}>
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
            maxWidth="md"
            className={classes.subscriptionList}
          >
            {
              user !== null ? 
                <SubscriptionList
                  data={data}
                  deleteSubscription={(idx) => deleteSubscription(idx)}
                  timePeriod={timePeriod} 
                />
              :
                <Container>
                  <Typography variant="h3">
                    Subscriptions Kept Under Control <br />
                  </Typography>
                  <Typography variant="body2"> <br />
                    Subscribii is a tool to keep track of all of your subscriptions. <br /> Just log in with your Google account and add your subscriptions. <br /> <br /> Yep, it's that easy! <br /> <br /> Get started now by signing in with Google on the toolbar above.
                  </Typography>
                </Container>
            }
          </Container>
          {
            user === null ? <></> :
            <Tooltip title="Add a Subscription">
              <Fab
                onClick={() => setShowSubscriptionAddModal(true)}
                color="secondary"
                aria-label="add"
                className={classes.fabButton}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          }
          <SettingsDrawer
            visible={showSettingsDrawer}
            onClose={() => setShowSettingsDrawer(false)}
          />
          <SubscriptionAddModal
            addSubscription={addSubscription}
            visible={showSubscriptionAddModal}
            darkMode={darkMode}
            onClose={() => setShowSubscriptionAddModal(false)}
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
}

export default SubscribiiApp;
