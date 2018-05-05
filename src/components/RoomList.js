import React, { Component } from 'react';


class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms: [ ]
    };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }
deleteChatRoom(){

}

componentDidMount(){
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
      console.log(snapshot.val());
    room.key = snapshot.key;
    this.setState({rooms:this.state.rooms.concat(room)})
  });
}
  render(){
    return(
      <div className="rooms">
      <h1>"Rooms"</h1>
      {this.state.rooms.map((room, i) => (
        <div key={i}>
          {room.name}
        </div>
      ))}
          </div>
          );
}
}

export default RoomList;
