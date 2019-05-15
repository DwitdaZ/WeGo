import React, { Component, Fragment } from 'react';

import Home from './Home';
import Welcome from './Welcome';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.user && <Welcome user={this.state.user} />}
        <Home user={this.state.user} />
      </Fragment>
    );
  }
}

export default App;
