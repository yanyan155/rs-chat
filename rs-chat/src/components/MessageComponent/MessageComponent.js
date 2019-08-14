import React from 'react';
import './MessageComponent.css';

const MessageComponent = () => {
  return (
    <form>
	  <div className="row">
	    <div className="col">
	      <input type="text" className="form-control" placeholder="Type message" />
	    </div>
	    <div className="col">
	      <button type="submit" className="btn btn-primary">Send</button>
	    </div>
	  </div>
	</form>
  );
}

export default MessageComponent;