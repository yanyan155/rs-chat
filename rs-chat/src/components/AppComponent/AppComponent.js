import React from 'react';
import HeaderComponent from "../HeaderComponent";
import ChatComponent from "../ChatComponent";
import MessageComponent from "../MessageComponent";
import SendComponent from "../SendComponent";
import LoginComponent from "../LoginComponent";
import './AppComponent.css';


const AppComponent = () => {

  return (
    <div className="container">
      <HeaderComponent />
    	<ChatComponent />
      <MessageComponent />
      <SendComponent />
    </div>
  );
}

export default AppComponent;

/*
  let string = `Symbols < > / { }`;
<p>Chat</p>
      <p>welcome to personal chat!</p>
      <p>{string} are forbidden!</p>*/