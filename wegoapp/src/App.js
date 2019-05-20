import React, { Component, Fragment } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';

import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Meetings from './Meetings';
import Checkin from './Checkin';
import Welcome from './Welcome';
import Attendees from './Attendees';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase.database().ref(`meetings/${FBUser.uid}`);
        
        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingList = [];

          for (let item in meetings) {
            meetingList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingList,
            howManyMeetings: meetingList.length
          });
        })
      } else {
        this.setState({ user: null })
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged( FBUser => {
      FBUser.updateProfile({
        displayName: userName
      })
      .then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      });
    });
  }

  logOutUser = evt => {
    evt.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase.auth().signOut().then( () => { navigate('/login'); });
  }

  addMeeting = meetingName => {
    const ref = firebase.database()
    .ref(`meetings/${this.state.user.uid}`);
    
    ref.push({ meetingName: meetingName });
  }

  render() {
    const { user, displayName, meetings, userID } = this.state;
    return (
      <Fragment>
        <Navigation user={user} logOutUser={this.logOutUser} />
        {user && <Welcome userName={displayName} logOutUser={this.logOutUser} />}
        <Router>
          <Home path="/" user={user} />
          <Login path="/login" />
          <Meetings path="/meetings" meetings={meetings} userID={userID} addMeeting={this.addMeeting} />
          <Checkin path="/checkin/:userID/:meetingID" />
          <Attendees path="/attendees/:userID/:meetingID" adminUser={this.state.userID} />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
