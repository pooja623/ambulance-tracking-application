// database/firebaseDb.js
import * as firebase from '@react-native-firebase/auth';
import React, { Component } from 'react';
const firebaseConfig = {
    apiKey: "AIzaSyB-dFKW5NEZr7KLZ8xKmVGVb9Z99bilujI",
    authDomain: "console.firebase.google.com/project/ambulance-6e615/authentication/providers",
    databaseURL: "https://console.firebase.google.com/project/ambulance-6e615/authentication/providers",
    projectId: "ambulance-6e615",
    storageBucket: "console.firebase.google.com/project/ambulance-6e615/storage/ambulance-6e615.appspot.com/files",
    //messagingSenderId: "000000000000000",
    appId: "1:320761084160:android:3861dcf10ea0a7bfc8dbe5"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
