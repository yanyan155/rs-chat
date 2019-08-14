import React from 'react';
import './ChatItemComponent.css';

const ChatItemComponent = (props) => {
  return (
    <div className="message-wrap d-flex flex-row">
		<p className="author"><strong>{props.name}</strong></p>
		<p className="message">{props.message}</p>
	</div>
  );
}

export default ChatItemComponent;