import React, { Component } from 'react';
import './style.sass';

export default class App extends Component {
  state = {
    task: {
      title: "Primera tarea",
      description: "Acostarme a dormir",
      done: true
    }
  }

  clickButton = () => {
    const task = this.state.task;
    this.state.task.done = !this.state.task.done;
    this.setState({task});
  }

  render() {
    return (
      <div id="red">
        <h1>{this.state.task.title}</h1>
        <h3>{this.state.task.description}</h3>
        <p>{this.state.task.done.toString()}</p>
        <button onClick={this.clickButton}>Hacer algo</button>
      </div>
    )
  }
}
