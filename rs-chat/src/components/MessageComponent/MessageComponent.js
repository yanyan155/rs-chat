import React from 'react';
import './MessageComponent.css';

const MessageComponent = (props) => {

  const findString = (event) => {
    props.sendMessage(event.target.message.value);
    event.target.message.value = '';
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <form  onSubmit={findString}>
	  <div className="row">
	    <div className="col">
	      <input name="message" type="text" className="form-control" placeholder="Type message" />
	    </div>
	    <div className="col">
	      <button type="submit" className="btn btn-primary">Send</button>
	    </div>
	  </div>
	</form>
  );
}

export default MessageComponent;