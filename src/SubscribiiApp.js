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
    position: 'absolute',
    zIndex: 99,
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const SubscribiiApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSubscriptionAddModal, setSubscriptionAddModal] = useState(false);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Header />
      <SubscriptionList />
      <Fab onClick={() => setSubscriptionAddModal(true)} color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
      </Fab>
      <SubscriptionAddModal visible={showSubscriptionAddModal} />
      <Footer darkMode={darkMode} setDarkMode={(m) => setDarkMode(m)} />
    </Container>
  );
}

export default SubscribiiApp;
