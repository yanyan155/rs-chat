import React, { Component } from 'react';
import HeaderComponent from "../HeaderComponent";
import ChatComponent from "../ChatComponent";
import MessageComponent from "../MessageComponent";
import LoginComponent from "../LoginComponent";
import './AppComponent.css';

// get information from 
// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807
// https://medium.com/practo-engineering/websockets-in-react-the-component-way-368730334eef

//localStorage.clear();

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
      let messagesJSON = localStorage.getItem('messages');
      if(messagesJSON) {
        let messages = JSON.parse(messagesJSON);
        messages.forEach(el => this.ws.send(JSON.stringify(el)));
        localStorage.removeItem('messages');
      }
    }
    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    }
    this.ws.onclose = () => {
      console.log('disconnected');
      // set timeout here
      setTimeout(
          function() {
              window.location.reload(true);
          }
          ,8000
      );
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

    if(this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(toSend));
    } else {
      // save to local storage
      //localStorage.setItem('name', name); JSON.parse(window.localStorage.getItem('user'));
      let messagesJSON = localStorage.getItem('messages');
      let messages;
      if(messagesJSON) {
        messages = JSON.parse(messagesJSON);
      } else {
        messages = [];
      }
      messages.push(toSend);
      localStorage.setItem('messages', JSON.stringify(messages));
    }
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
