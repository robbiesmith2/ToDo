import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCybs9yGeAVWvHcLpzvWVIQjQ4sTmJxNOg",
    authDomain: "to-do-list-4892b.firebaseapp.com",
    databaseURL: "https://to-do-list-4892b.firebaseio.com",
    projectId: "to-do-list-4892b",
    storageBucket: "to-do-list-4892b.appspot.com",
    messagingSenderId: "66635545412",
    appId: "1:66635545412:web:6fb2226458b7aa36037511",
    measurementId: "G-DYZG9R51TE"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()