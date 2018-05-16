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
deleteChatRoom(rooms){
    const room = this.props.roomId;
    console.log(room);
    this.setState({rooms:this.state.rooms.splice(room)});
  //console.log(room);
// const deleted = this.state.rooms.splice(room);
 //this.setState({rooms:deleted})
}
textEnter(e){
  console.log(e.target.value);
  this.setState({newRoomName:e.target.value})
}

componentDidMount(){
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
      console.log(snapshot.val());
    room.key = snapshot.key;
    this.setState({rooms:this.state.rooms.concat(room)})
  });
}

enterChatRoom(id){
  console.log(id);
  this.props.setRoom(id);
}
  render(){
    return(
      <div className="rooms">
      <h1>Rooms</h1>
      {this.state.rooms.map((room, i) => (
        <div key={i} onClick={() => this.enterChatRoom(room.key)}>
          {room.name}
          <button onClick={(e) => this.deleteChatRoom(e)}>X</button>
        </div>
      ))}
        <input type="text" value={this.state.newRoomName} onChange={this.textEnter}/>
        <button onClick={() => this.createChatRoom()}>Create Chat Room </button>
          </div>
            );
}
}

export default RoomList;
