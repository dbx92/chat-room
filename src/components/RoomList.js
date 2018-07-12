import React, { Component } from 'react';


class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms: [ ],
      newRoomName:""
    };
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.textEnter = this.textEnter.bind(this);

  }
createChatRoom(){
  console.log("chatroom created");
  this.roomsRef.push({name:this.state.newRoomName});
  this.setState({newRoomName:""})
}
deleteChatRoom(){
  if(!this.props.activeRoom.key){return};
    this.roomsRef.child(this.props.activeRoom.key).remove();
    this.enterChatRoom();
}
textEnter(e){
  console.log(e.target.value);
  this.setState({newRoomName:e.target.value})
  console.log("newRoomName")
}

componentDidMount(){
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
      console.log(snapshot.val());
    room.key = snapshot.key;
    this.setState({rooms:this.state.rooms.concat(room)})
  });
  this.roomsRef.on('child_removed', snapshot => {
    this.setState({rooms:this.state.rooms.filter((r) => r.key !== snapshot.key)})
  });
}

enterChatRoom(room){
  console.log(room);
  this.props.setRoom(room);
}
  render(){
    return(
      <div className="rooms">
      <h1>Rooms</h1>
      <h3 >{this.props.activeRoom.name}</h3>
      {this.state.rooms.map((room, i) => (
        <div key={i} onClick={() => this.enterChatRoom(room)}>
          {room.name}
        </div>
      ))}
        <input type="text" value={this.state.newRoomName} onChange={this.textEnter}/>
        <button onClick={() => this.createChatRoom()}>Create Room </button>
        <button onClick={() => this.deleteChatRoom()}>Delete  Room</button>
          </div>
            );
}
}

export default RoomList;
