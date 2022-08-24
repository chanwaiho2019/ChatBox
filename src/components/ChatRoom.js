import React from 'react'
import { useRef, useState } from 'react';
import firebase from 'firebase/compat/app'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import components
import ChatMessage from './ChatMessage';


function ChatRoom(props) {
    const dummy = useRef();
    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    // Listen to data with a hook
    const [messages] = useCollectionData(query, {idField: 'id'});
  
    const [formValue, setFormValue] = useState("");
  
    const sendMessage = async(e) => {
      //Prevent the default browser reload behavior
      e.preventDefault();
  
      const { uid, photoURL } = props.auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid, 
        photoURL
      });
  
      // Reset the input with empty string
      setFormValue("");
  
      // scroll to this element smoothly
      dummy.current.scrollIntoView({ behavior: 'smooth'});
    }
    
    return (
      <div className='chatroom'>
        <div className='message-container'>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
          <div ref={dummy}></div>
        </div>
  
        <form className='form' onSubmit={sendMessage}>
          <input className='input' value={formValue} placeholder='Type a message' onChange={(e) => setFormValue(e.target.value)}/>
          <button className="send" type="submit"><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
        </form>
      </div>
      
    );
  }

  export default ChatRoom;