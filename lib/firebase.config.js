import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4lyQEu0KAxvOvu_E1BMjR1lupRqq6dRI",
  authDomain: "exporn2025.firebaseapp.com",
  projectId: "exporn2025",
  storageBucket: "exporn2025.firebasestorage.app",
  messagingSenderId: "577527240623",
  appId: "1:577527240623:web:c5503b2b8281b762fdc15a",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
