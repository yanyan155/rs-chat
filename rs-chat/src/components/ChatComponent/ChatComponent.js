import React from 'react';
import ChatItemComponent from "../ChatItemComponent";
import './ChatComponent.css';

const ChatComponent = (props) => {
    console.log(props);
    if(!props.list) {
        return (
            <div className="chat-wrap">
                connecting
            </div>
        )
    } else {
        let list = props.list.map(el => {
            return <ChatItemComponent
              name={el.from}
              message={el.message}
              key={el.id}
            />
        })
        return (
            <div className="chat-wrap mt-4 mb-4">
                {list}
            </div>
        );
    }
}

export default ChatComponent;