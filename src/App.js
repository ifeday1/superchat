import React, { useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBhsvt_f9zDPuCkjoghPFsK0dO1ltpiy7M",
  authDomain: "superchat-d24ef.firebaseapp.com",
  projectId: "superchat-d24ef",
  storageBucket: "superchat-d24ef.appspot.com",
  messagingSenderId: "78397640757",
  appId: "1:78397640757:web:6162b4089786a94e12a17c",
  measurementId: "G-4H2TV57LRC"
})

const auth = firebase.auth();;
const firestore= firebase.firestore();

function App() {

  const SignIn = () =>  {
    const SignInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return(
      <button onClick={SignInWithGoogle} >Sigin in with Google</button>
    )
  }

  const SignOut = () => {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  const ChatRoom = () => {
    const messagesRef = firestore.collection('message');
    const query = messagesRef.orderBy('createdAT').limit(25); 

    const [messages]= useCollectionData(query, {idField: 'id'});
    
    const [formValue, setFormValue] = useState('');

    const sendMessage =async(e) => {


    }

    return(
      
      <React.Fragment>
      <div>{messages && messages.map(msg => <ChatMessage  key={msg.id} message={msg} />)}</div>
      </React.Fragment>
    )
  }

  <form onSubmit={sendMessage}>
  <input value={formValue} onChange={(e =>setFormValue(e.target.value))} />

  <button type='submit'>Submit </button>
  </form>

  const ChatMessage = () => {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid ===auth.currentUser.uid ? 'sent' : 'received' ; 

    return (
      <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
      </div>
    )
  }

  return (
    <div className="App">
    <header>
  
    </header>
    <section>
    {user? <ChatRoom /> : <SignIn />}
    </section>
    </div>
  );
}

export default App
