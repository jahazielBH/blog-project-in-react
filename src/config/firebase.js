import firebase from 'firebase/app';
import 'firebase/firestore';


const config = {
    apiKey: "AIzaSyD10QDDh_DXvrFHWyf7_4R9GN7dyeAwTXE",
    authDomain: "blog-2bcc6.firebaseapp.com",
    databaseURL: "https://blog-2bcc6-default-rtdb.firebaseio.com",
    projectId: "blog-2bcc6",
    storageBucket: "blog-2bcc6.appspot.com",
    messagingSenderId: "75273878652",
    appId: "1:75273878652:web:4f3381988cece0e6529df9",
    measurementId: "G-W926YC6857"
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;