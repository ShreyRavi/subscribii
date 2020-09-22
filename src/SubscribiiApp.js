import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

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

const SubscribiiApp = () => {
  return (
    <div>
      <h1>Subscribii</h1>
    </div>
  );
}

export default SubscribiiApp;
