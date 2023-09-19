import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCB2_aWdzXQopgWwOIhUWpc4LAtL9ONWN0",
    authDomain: "jays-e6eae.firebaseapp.com",
    projectId: "jays-e6eae",
    storageBucket: "jays-e6eae.appspot.com",
    messagingSenderId: "306524012405",
    appId: "1:306524012405:web:7e5f45436e67e1ebf65d3c"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { firebase, auth, app };