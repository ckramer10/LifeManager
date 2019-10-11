import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDqI6CEQwlxHgi5VAL-vcUy28AzTA7jtfk",
    authDomain: "life-manager-3906b.firebaseapp.com",
    databaseURL: "https://life-manager-3906b.firebaseio.com",
    projectId: "life-manager-3906b",
    storageBucket: "",
    messagingSenderId: "234735139122",
    appId: "1:234735139122:web:5e7e6af8e7cc5924643f2b",
    measurementId: "G-CP7WW72P9Z"
};

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");