// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Replace the following with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYjFd48q6YHJ-EzBBn4rShNnPdNhEngpM',
  authDomain: 'my-street-96715.firebaseapp.com',
  projectId: 'my-street-96715',
  storageBucket: 'my-street-96715.firebasestorage.app',
  messagingSenderId: '1073923463621',
  appId: '1:1073923463621:web:810ec74c7e6d16379013ac',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

export { firebaseApp, auth, db, functions };
