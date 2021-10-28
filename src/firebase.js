import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCetjdPqEdr5ieIywzXqVg-X7c8RGTCFDI",
  authDomain: "vini-react-app.firebaseapp.com",
  databaseURL: "https://vini-react-app-default-rtdb.firebaseio.com",
  projectId: "vini-react-app",
  storageBucket: "vini-react-app.appspot.com",
  messagingSenderId: "773282494024",
  appId: "1:773282494024:web:d85deeb80f9ccafbd6ca7d",
  measurementId: "G-7LWW1DLL20",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
