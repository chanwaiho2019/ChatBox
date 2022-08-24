function ChatMessage(props) {
    const { text, uid, photoURL, createdAt } = props.message;
    const messageClass = uid === props.auth.currentUser.uid ? 'sent' : 'received';

    /**
     * Get the time infromation from timestamp
     * @returns {String} Time in hh:mm format
     */
    const getTime = () => {
      if (createdAt) {
        let date =  createdAt.toDate();
        let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return hour + ':' + minute;
      }
    }

    return (
        <div className={`message ${messageClass}`}>
          <img src={photoURL} alt="#" referrerpolicy="no-referrer" />
          <div>
            <p>{text}</p>
            <small>{getTime()}</small>
          </div>
        </div>
    );
  }

  export default ChatMessage;