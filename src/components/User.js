import React, {Component} from 'react';

class User extends Component {
  constructor(props){
    super(props);
     this.signIn = this.signIn.bind(this);
     this.signOut = this.signOut.bind(this);
  }
  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( (user) => {
      console.log(user);
    this.props.setUser(user);
});
  }
      signIn(){
        console.log("signin clicked");
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
        this.setState({user:provider})
      }
      signOut(){
        console.log("signed out")
        this.props.firebase.auth().signOut();
      }
  render(){
    return(
      <div>
      <h3>User:{this.props.user.displayName}</h3>
        <button onClick={this.signIn}>signin</button>
        <button onClick={this.signOut}>signout</button>
      </div>
  )}
}
export default User;
