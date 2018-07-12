import React, { Component } from 'react';
import RoomList from './RoomList';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:[],
      newMessageName:"",

    };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.textEnter = this.textEnter.bind(this);
  }

  deleteMessage(key){
    console.log("delete pressed");
    console.log(key);
    this.messagesRef.child(key).remove();

}
  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
        console.log(snapshot.val());
      message.key = snapshot.key;
      this.setState({messages:this.state.messages.concat(message)})
    });
    this.messagesRef.on('child_removed', snapshot => {
      this.setState({messages:this.state.messages.filter((i) => i.key !== snapshot.key)})
  });
}
  textEnter(e){
    console.log(e.target.value);
    this.setState({newMessageName:e.target.value})
  }
  postNewMessage(){
    if(!this.props.roomId){return};
    console.log("message posted");
    this.messagesRef.push({
       user:this.props.user.displayName,
      content:this.state.newMessageName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId:this.props.roomId});
    this.setState({newMessageName:""})
  }


render(){
  return(
    <div className="messages">
    <h2>Messages</h2>
    {this.state.messages.filter((message) => message.roomId === this.props.roomId).map((message, i) => (
      <div key={i} >
        {message.user}~~
        {message.content}
        <button onClick={() => this.deleteMessage(message.key)}>delete</button>
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
