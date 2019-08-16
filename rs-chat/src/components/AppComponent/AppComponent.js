import React, { Component } from 'react';
import HeaderComponent from "../HeaderComponent";
import ChatComponent from "../ChatComponent";
import MessageComponent from "../MessageComponent";
import LoginComponent from "../LoginComponent";
import notifyMe from "../notification";

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('name') || null,
      messages: [],
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
      document.querySelector(".chat-wrap").scrollBy(0,50000);
      if(document["webkitHidden"]) {
        message.slice(-3).forEach(el => notifyMe(el));
      }
    }
    this.ws.onclose = () => {
      console.log('disconnected');
      setTimeout(
          function() {
              window.location.reload(true);
          }
          ,8000
      );
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
