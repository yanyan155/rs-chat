import React, { Component } from 'react';
import HeaderComponent from "../HeaderComponent";
import ChatComponent from "../ChatComponent";
import MessageComponent from "../MessageComponent";
import './AppComponent.css';

// get information from 
// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'lala',
      messages: []
    };
    this.ws = new WebSocket("ws://st-chat.shas.tel")
  }

  UNSAFE_componentWillMount() {
    this.ws.onopen = () => {
      console.log('connected');
    }
    this.ws.onmessage = evt => {
      //const message = evt.data;
      const message = JSON.parse(evt.data);
      this.addMessage(message);
      console.log(this.state.messages);
    }
    this.ws.onclose = () => {
      console.log('disconnected');
    }
  }

  addMessage = messages =>
    this.setState((state) =>{
        let newMessages = [...state.messages].concat(...messages);
        return {  messages: newMessages};
    });

  render() {
    return (
      <div className="container">
        <HeaderComponent />
        <ChatComponent list={ this.state.messages } />
        <MessageComponent />
      </div>
    );
  }
}

export default AppComponent;
