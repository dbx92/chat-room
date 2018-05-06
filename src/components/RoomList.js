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

printRoomName(name){
  console.log(name);
}
  render(){
    return(
      <div className="rooms">
      <h1>"Rooms"</h1>
      {this.state.rooms.map((room, i) => (
        <div key={i} onClick={() => this.printRoomName(room.name)}>
          {room.name}
        </div>
      ))}
        <input type="text" value={this.state.newRoomName} onChange={this.textEnter}/>
        <button onClick={() => this.createChatRoom()}>X </button>
          </div>
            );
}
}

export default RoomList;
