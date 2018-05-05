import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <RoomList
      firebase={firebase}
      />
    );
  }
}

export default App;
