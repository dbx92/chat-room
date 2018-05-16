import React, { Component } from 'react';
import RoomList from './RoomList';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:[],
      newMessageName:""
    };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.textEnter = this.textEnter.bind(this);

  }
  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
        console.log(snapshot.val());
      message.key = snapshot.key;
      this.setState({messages:this.state.messages.concat(message)})
    });
  }
  textEnter(e){
    console.log(e.target.value);
    this.setState({newMessageName:e.target.value})
  }

  postNewMessage(){
    console.log("message posted");
    this.messagesRef.push({
      username:this.props.username,
      content:this.state.newMessageName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: 1});
    this.setState({newMessageName:""})
  }


render(){
  return(
    <div className="messages">
    <h2>Messages</h2>
    <h3>User:{this.props.username}</h3>
    <h3>Room#{this.props.roomId}</h3>
    {this.state.messages.map((message, i) => (
      <div key={i} >
        {message.content}
      </div>
))
  }
<input type="text" value={this.state.newMessageName} onChange={this.textEnter}/>
<button onClick={() => this.postNewMessage()}>Post Message </button>
</div>
)
}
}
export default MessageList;
