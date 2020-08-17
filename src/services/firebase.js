import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8pszPHCVl2ADQc8a21RVpIaK0XkKvrDI",
    authDomain: "quickchat2-2fe85.firebaseapp.com",
    databaseURL: "https://quickchat2-2fe85.firebaseio.com",
    projectId: "quickchat2-2fe85",
    storageBucket: "quickchat2-2fe85.appspot.com",
    messagingSenderId: "284299315231",
    appId: "1:284299315231:web:a11b0d81a3aacffb702d2a"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const firestoreDb = firebase.firestore();