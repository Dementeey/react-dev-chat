import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const config = {
  apiKey: 'AIzaSyBnUOkzeLlKl26O1OTS6FXzcNJs--3kjJI',
  authDomain: 'react-dev-chat.firebaseapp.com',
  databaseURL: 'https://react-dev-chat.firebaseio.com',
  projectId: 'react-dev-chat',
  storageBucket: 'react-dev-chat.appspot.com',
  messagingSenderId: '75686167106',
};

firebase.initializeApp(config);

export default firebase;
