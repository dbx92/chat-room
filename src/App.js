import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_f2dsN1gROAk__CaDQLTdvuIZlwr8XbY",
    authDomain: "chat-room-203d3.firebaseapp.com",
    databaseURL: "https://chat-room-203d3.firebaseio.com",
    projectId: "chat-room-203d3",
    storageBucket: "chat-room-203d3.appspot.com",
    messagingSenderId: "807939504677"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      room:"select a room",
      user:"Guest",
    }
    this.setUser=this.setUser.bind(this);
  }
  setUser(user){
    console.log(user);
    if(user === null){
        this.setState({user:{displayName: 'Guest'}});
    } else {
      this.setState({user:user})
    }
  }
  setRoom(room){
    if(!room){
      room={}
    }
    this.setState({room:room})
}
  render() {
    return (
      <div>
      <User
      firebase={firebase}
      roomId={this.state.room.key}
      user={this.state.user}
      setUser={this.setUser}
      />
      <RoomList
      firebase={firebase}
      activeRoom= {this.state.room}
      setRoom={(id)=> this.setRoom(id)}
      />
      <MessageList
      firebase={firebase}
      roomId= {this.state.room.key}
      user={this.state.user}
      messageId={this.state.messageId}
      />
    </div>
    );
  }
}

export default App;
