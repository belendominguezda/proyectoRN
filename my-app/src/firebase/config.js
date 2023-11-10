import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDq-udejyP48NqNTfcBFR63EMBpXDaZanc",
  authDomain: "proyectoprogra-749f6.firebaseapp.com",
  projectId: "proyectoprogra-749f6",
  storageBucket: "proyectoprogra-749f6.appspot.com",
  messagingSenderId: "958879539492",
  appId: "1:958879539492:web:7308f8b046b6541c66d3b1",
  measurementId: "G-PEDM86109M"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
