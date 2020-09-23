import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Header from './components/Header';
import SubscriptionList from './components/SubscriptionList';
import Footer from './components/Footer';
import SubscriptionAddModal from './components/SubscriptionAddModal';
import SettingsDrawer from './components/SettingsDrawer';

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

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: 'fixed',
    zIndex: 99,
    bottom: 80,
    right: 20,
    margin: '0 auto',
  },
}));

const SubscribiiApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showSubscriptionAddModal, setShowSubscriptionAddModal] = useState(false);
  //temporary
  const [data, setData] = useState([]);
  const addSubscription = (name, amount, timePeriod) => {
    let proratedAmount = '';
    if (timePeriod === 'year') {
      proratedAmount = amount;
    } else if (timePeriod === 'month') {
      proratedAmount = (parseFloat(amount) * 12).toString();
    } else if (timePeriod === 'week') {
      proratedAmount = (parseFloat(amount) * 52).toString();
    } else {
      alert("Error: Incorrect Time Period Entered!");
      return;
    }
    const newData = data.push({ name: name, amount: proratedAmount })
    setData(newData);
  }
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Header showSettingsDrawer={showSettingsDrawer} setShowSettingsDrawer={(m) => setShowSettingsDrawer(m)} />
      <SubscriptionList data={data} />
      <Fab onClick={() => setShowSubscriptionAddModal(true)} color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
      </Fab>
      <SettingsDrawer visible={showSettingsDrawer} />
      <SubscriptionAddModal
        addSubscription={addSubscription}
        visible={showSubscriptionAddModal}
        onClose={() => setShowSubscriptionAddModal(false)}
      />
      <Footer darkMode={darkMode} setDarkMode={(m) => setDarkMode(m)} />
    </Container>
  );
}

export default SubscribiiApp;
