import * as firebase from 'firebase';

const config = {
    //Add config here
};

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");