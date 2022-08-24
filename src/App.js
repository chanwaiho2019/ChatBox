import './App.css';

import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import GoogleButton from 'react-google-button';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// Import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";

// Import components
import ChatRoom from './components/ChatRoom';

// Add specific icon to your fontawesome library
library.add(fas);

const firebaseConfig = {
  apiKey: "AIzaSyBNwCLC-oCzDXQacOBpk9zRq7TgrmHmD-M",
  authDomain: "superchat-f23d9.firebaseapp.com",
  projectId: "superchat-f23d9",
  storageBucket: "superchat-f23d9.appspot.com",
  messagingSenderId: "950647814584",
  appId: "1:950647814584:web:67cf9e18347a1861d9374d",
  measurementId: "G-2V1Z0RCKXX"
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const firestore = firebase.firestore();

/**
 * Sign in with google
 * @returns GoogleButton component
 */
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div id='sign-in'>
      <h1>Welcome to ChatBox</h1>
      <GoogleButton onClick={signInWithGoogle} />
    </div>
  );
}

/**
 * Sign out component
 * @returns A button for user to sign out
 */
function SignOut() {
  return auth.currentUser && (
    // <button className='signout-button' onClick={() => auth.signOut()}>Sign Out</button>
    <button className='signout-button' onClick={() => auth.signOut()}><FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /></button>
    
  );
}

function App() {
  // Store the user
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <div className='company-name'>
          <h1>ChatBox</h1>
          <FontAwesomeIcon icon="fa-solid fa-comment" />
        </div>
        <SignOut />
      </header>
      <section id="content">
          {user ? <ChatRoom firestore={firestore} auth={auth} /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
