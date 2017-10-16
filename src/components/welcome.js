import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
    setInterval(() => {
      this.setState({
        time: new Date()
      })
    }, 2000);
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <h2>It is {this.state.time.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Welcome;