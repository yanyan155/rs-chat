import React, { Component } from 'react';
import HeaderComponent from "../HeaderComponent";
import ChatComponent from "../ChatComponent";
import MessageComponent from "../MessageComponent";
import LoginComponent from "../LoginComponent";
import './AppComponent.css';

// get information from 
// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807
// https://medium.com/practo-engineering/websockets-in-react-the-component-way-368730334eef

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('name') || null,
      messages: [],
      //ws: new WebSocket("ws://st-chat.shas.tel")
    };
  }

  ws = new WebSocket("ws://st-chat.shas.tel");

  UNSAFE_componentWillMount() {
    this.ws.onopen = () => {
      console.log('connected');
    }
    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    }
    this.ws.onclose = () => {
      console.log('disconnected');
      window.location.reload(true);
      /*this.setState({
        ws: new WebSocket("ws://st-chat.shas.tel")
      })*/
    }
  }
  getName = name => {
    localStorage.clear();
    localStorage.setItem('name', name);
    this.setState({
      name: name
    })
  }

  addMessage = messages => {
    this.setState((state) =>{
        let newMessages = [...state.messages].concat(...messages);
        return {  messages: newMessages};
    });
  }

  sendMessage = message => {
    const toSend = { from: this.state.name, message: message };
    this.ws.send(JSON.stringify(toSend));
  }

  render() {
    if(this.state.name === null) {
      return (
        <div className="container">
          <LoginComponent getName= { this.getName } />
        </div>
      );
    } else {
      return (
        <div className="container">
          <HeaderComponent name= {this.state.name} />
          <ChatComponent list={ this.state.messages } />
          <MessageComponent sendMessage= { this.sendMessage } />
        </div>
      );
    }
  }
}

export default AppComponent;
